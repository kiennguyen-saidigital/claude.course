# Built-in tools

**Ý chính:** Vài khả năng phổ biến tới mức Anthropic đóng gói sẵn — bạn không viết code, không
host sandbox, chỉ **khai báo tool**, Anthropic tự chạy.

## Server tools: bạn khai, Anthropic chạy

Server tool chạy trên hạ tầng Anthropic. Bạn **không thực thi** — Anthropic thực thi. Nghĩa là
**không cần agent loop** cho mấy call này: Claude tự gọi tool, kết quả trả về ngay trong cùng
response.

3 tool chính:

- **Web search** — tìm trên internet, trả kết quả kèm citation
- **Code execution** — viết và chạy Python trong sandbox
- **Web fetch** — lấy nội dung đầy đủ từ URL

## Ví dụ: 2 server tool trong 1 file

```python
import anthropic

client = anthropic.Anthropic()

# Call 1: web search — Anthropic chạy search server-side
search_response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    tools=[{"type": "web_search_20260209", "name": "web_search"}],
    messages=[
        {"role": "user", "content": "What is Anthropic's latest model release? Answer in one sentence."}
    ],
)

for block in search_response.content:
    if block.type == "server_tool_use":
        print(f"Tool call: {block.name} — {block.input}")
    elif block.type == "text":
        print(block.text)

# Call 2: code execution — Claude viết và chạy Python trong sandbox
code_response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    tools=[{"type": "code_execution_20260120", "name": "code_execution"}],
    messages=[
        {"role": "user", "content": "Calculate the mean and standard deviation of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"}
    ],
)

for block in code_response.content:
    if block.type == "server_tool_use":
        print(f"Tool call: {block.name} — {block.input}")
    elif block.type == "bash_code_execution_tool_result":
        print(f"stdout: {block.content.stdout}")
    elif block.type == "text":
        print(block.text)
```

**2 điểm cần để ý:**

- **Không có agent loop.** Không switch theo `stop_reason`, không đẩy tool result ngược lại.
  Anthropic chạy tool server-side, response đã có sẵn kết quả.
- **Block type mới** trong response: `server_tool_use` (cho tool call) và tool result block riêng
  cho từng loại (vd `bash_code_execution_tool_result` cho code execution) — cộng thêm text block
  bình thường.

**Chạy thử:** web search → thấy tool call Claude gọi được in ra, rồi câu trả lời 1 câu về model
mới nhất kèm citation gộp sẵn. Code execution → thấy code Python thật Claude viết, stdout từ
sandbox, và câu trả lời text cuối. Không cần tự dựng search crawler, không cần tự chạy Python
sandbox — chỉ khai 2 tool là có miễn phí.

## Loại còn lại: client tools

Client tool chạy **ở nơi code bạn chạy**. Được đóng gói sẵn trong Claude SDK — không cần tự viết
schema. 2 ví dụ:

- **Memory** — Claude đọc/ghi bộ nhớ xuyên suốt các session
- **Bash** — 1 bash shell persistent để Claude chạy lệnh

Client tool có cùng "hình dạng" với custom tool (bạn tự viết), nhưng SDK cung cấp sẵn schema và
runner hợp lý.

## Vì sao quan trọng trong production

Đường tắt để có tính năng vốn tốn hàng tuần code. Web search có thể chạy endpoint fact-check:
verify từng claim số liệu/quy định trong bản draft đối chiếu với web thật.

**Lưu ý:** thứ gì đó được "verify trên internet" không có nghĩa là **đúng**. Luôn double-check
kết quả Claude đưa ra.

## Tóm tắt (Recap)

- **Server tool** — web search, code execution, web fetch — khai trong mảng `tools`. Anthropic
  tự chạy.
- Kết quả trả về **ngay trong cùng response**, không cần agent loop. Tìm block `server_tool_use`
  và tool result block đi kèm text block.
- **Client tool** như memory, bash chạy nơi code bạn chạy, nhưng SDK cấp sẵn schema + runner.
- Ý tưởng "Anthropic host giùm" scale tới tận cùng: **managed agent** áp dụng ý này cho **cả
  agent**, không chỉ 1 tool.

## 5 câu hỏi quan trọng

**1. Khác biệt cốt lõi giữa server tool và custom tool (tự viết) là gì?**
Server tool do **Anthropic thực thi** trên hạ tầng của họ — bạn chỉ khai báo trong `tools`, không
viết code chạy tool, không cần agent loop. Custom tool thì **code bạn** phải tự thực thi và tự
đẩy `tool_result` ngược lại qua agent loop.

**2. Vì sao gọi server tool không cần agent loop?**
Vì Claude tự gọi tool và Anthropic tự chạy nó server-side — kết quả (`server_tool_use` +
tool result block) đã nằm sẵn trong **cùng 1 response**. Không có bước "chờ `stop_reason:
tool_use` → chạy tool → đẩy kết quả lại" như custom tool.

**3. 3 server tool chính là gì, mỗi cái làm gì?**
`web_search` — tìm web, trả kết quả kèm citation. `code_execution` — viết và chạy Python trong
sandbox. `web_fetch` — lấy nội dung đầy đủ từ 1 URL.

**4. Client tool khác server tool ở điểm nào, ví dụ là gì?**
Client tool chạy **ở nơi code của bạn chạy** (không phải trên hạ tầng Anthropic) — nhưng SDK
cung cấp sẵn schema + runner nên không cần tự viết như custom tool thường. Ví dụ: `memory` (đọc/
ghi bộ nhớ xuyên session), `bash` (shell persistent để Claude chạy lệnh).

**5. Vì sao vẫn phải double-check kết quả từ web search dù đã có citation?**
Vì "được verify trên internet" không đồng nghĩa "đúng" — nguồn web có thể sai, lỗi thời, hoặc gây
hiểu nhầm. Citation giúp truy vết nguồn, nhưng không đảm bảo tính chính xác tuyệt đối; vẫn cần
người kiểm tra lại trước khi tin dùng, nhất là với claim số liệu/quy định.
