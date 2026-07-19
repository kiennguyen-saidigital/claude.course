# Agent loop giải thích

**Ý chính:** Một API call chỉ trả về 1 response. Agent là Claude chạy **lặp** (loop):
quan sát, quyết định, hành động, lặp lại — cho tới khi việc xong. Bạn sở hữu vòng lặp và
tool; Claude sở hữu phần suy luận (reasoning).

## Agent là gì

Agent = phiên bản tự động (autonomous) của Claude, tự chạy cả 2 phía của cuộc hội thoại,
không cần người ở giữa. Agent nhận task, chọn tool, thực thi code trong vòng lặp tới khi
Claude quyết định task xong.

## Vòng lặp cơ bản (5 bước)

1. Gửi message cho Claude, kèm tool có sẵn.
2. Claude trả lời: hoặc final answer, hoặc yêu cầu dùng 1 tool đã khai báo.
3. Code của bạn thực thi tool đó.
4. Gửi kết quả tool trở lại cho Claude.
5. Lặp lại tới khi `stop_reason` là `end_turn`.

Coi như hội thoại đổi lượt: user mở đầu, agent gọi tool, tool trả kết quả, agent tiếp tục
tới khi có câu trả lời.

## Ví dụ tối giản: hỏi thời tiết Austin

Claude không tự biết thời tiết → phải gọi tool `get_weather`, đọc kết quả, rồi mới trả lời.

```python
import anthropic

client = anthropic.Anthropic()

# tools array khai báo: name, description, JSON schema cho input
tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a city.",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "The city to get weather for",
                }
            },
            "required": ["city"],
        },
    }
]

# run_tool là lookup cứng — thực tế sẽ gọi DB/API thật
def run_tool(name, tool_input):
    if name == "get_weather":
        return f"Weather in {tool_input['city']}: 95F, sunny"
    raise ValueError(f"Unknown tool: {name}")

messages = [
    {"role": "user", "content": "What should I wear in Austin today?"}
]

# Agent loop: mỗi vòng gửi messages, switch theo stop_reason
while True:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=tools,
        messages=messages,
    )

    if response.stop_reason == "end_turn":
        for block in response.content:
            if block.type == "text":
                print(block.text)
        break

    if response.stop_reason == "tool_use":
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = run_tool(block.name, block.input)
                tool_results.append(
                    {
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    }
                )

        # đẩy response của assistant + kết quả tool ngược vào messages, lặp tiếp
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})
```

**3 điểm cần nhớ:**

- `tools` array = khai báo những gì Claude được phép dùng.
- `run_tool` chỉ là hardcode demo — thực tế nối vào DB/API thật.
- Vòng `while True` chính là agent loop: `tool_use` → chạy tool, đẩy kết quả vào
  `messages`, lặp lại. `end_turn` → in text, `break`.

**Chạy thử:** turn 1 dừng ở `tool_use` (Claude gọi `get_weather` cho Austin) → turn 2 dừng
ở `end_turn` (Claude khuyên mặc đồ nhẹ, thoáng khí). Tổng: 2 API call, 1 lần chạy tool, 1
câu trả lời cuối.

## Vòng lặp này trong sản phẩm thật

Cùng shape (hình dạng) vòng lặp, chỉ đổi tool + hạ tầng: một compliance agent đọc structural
report, tra building code qua tool, ghi risk finding vào database từng cái một. Khác biệt so
với demo:

- Tool thật thay vì mock weather lookup.
- Kết quả stream về UI qua server-sent events.
- Finding được lưu (persist) vào bảng risk-finding.

## Tóm tắt (Recap)

- Agent = Claude chạy trong loop: observe → decide → act → repeat.
- Loop cơ bản: gửi messages kèm tools → chạy tool Claude yêu cầu → đẩy kết quả về → dừng
  khi `stop_reason` là `end_turn`.
- Bạn sở hữu loop và tool. Claude sở hữu phần reasoning.
- Cùng 1 shape loop scale từ demo weather nhỏ tới compliance agent sản phẩm thật — chỉ tool
  và phần plumbing (nối hạ tầng) đổi.
- Không muốn tự quản loop → dùng **managed agent**, chạy loop này sẵn trên hạ tầng Anthropic.

## 5 câu hỏi quan trọng

**1. Agent khác gì so với 1 API call đơn?**
1 API call chỉ trả về 1 response. Agent là Claude chạy lặp (loop): tự quan sát kết quả,
quyết định bước kế, hành động, lặp lại — không cần người can thiệp giữa chừng — tới khi
task xong.

**2. 5 bước của vòng lặp agent cơ bản là gì?**
(1) Gửi message + tools cho Claude. (2) Claude trả final answer hoặc yêu cầu dùng tool.
(3) Code thực thi tool đó. (4) Gửi kết quả tool lại cho Claude. (5) Lặp tới khi
`stop_reason` là `end_turn`.

**3. `stop_reason` dùng để làm gì trong loop, và có mấy giá trị chính xuất hiện trong ví dụ?**
Dùng để quyết định bước kế của loop. 2 giá trị chính: `tool_use` (Claude cần chạy tool,
chưa xong) → chạy tool và lặp tiếp; `end_turn` (Claude đã có câu trả lời cuối) → in kết quả
và `break`.

**4. Sau khi chạy tool xong, cần đẩy gì trở lại vào mảng `messages` trước khi lặp tiếp?**
Hai message: `{"role": "assistant", "content": response.content}` (giữ nguyên response gốc
của Claude, gồm cả tool_use block) và `{"role": "user", "content": tool_results}` (mảng các
`tool_result` object, mỗi cái gắn `tool_use_id` khớp với tool call tương ứng).

**5. Vì sao nói "bạn sở hữu loop và tool, Claude sở hữu reasoning"?**
Code của bạn quyết định tool nào tồn tại, cách thực thi, và cấu trúc vòng lặp (điều kiện
dừng, cách gửi lại kết quả). Claude chỉ quyết định *khi nào* gọi tool nào và *diễn giải*
kết quả ra sao — bạn không code phần suy luận đó, chỉ code hạ tầng chạy quanh nó.
