# Claude Developer Platform là gì?

**Ý chính:** Claude Developer Platform là hạ tầng của Anthropic để làm việc với Claude
bằng **code** (programmatically), thay vì chat trên trình duyệt. Bạn gửi request có cấu
trúc từ code và nhận response có cấu trúc — kiểm soát được mọi chi tiết: dùng model nào,
tốn bao nhiêu token, Claude được dùng công cụ (tool) gì, tuân theo chỉ dẫn hệ thống
(system instructions) nào.

## Platform gồm những gì

- **REST API** — gọi được từ bất kỳ ngôn ngữ nào.
- **SDK** — thư viện cho từng ngôn ngữ lập trình.
- **CLI** — giao diện dòng lệnh.
- **Console** — nơi quản lý API key, theo dõi mức dùng (usage), deploy managed agents,
  và test prompt.

## Ba lớp (three layers) của platform

Hình dung platform như 3 tầng chồng lên nhau:

| Lớp | Là gì | Gồm |
|-----|-------|-----|
| **Primitives** | Các khối xây dựng (building blocks) của API, tinh chỉnh cho Claude. Đây là thứ bạn gọi trực tiếp từ code. | Messages API, tool use, files, web search, code execution, MCP servers, skills |
| **Infrastructure** | Phần cần để xây và mở rộng (scale) hệ thống agentic vượt qua mức prototype — "đường ống" giữ mọi thứ chạy khi 1 lần gọi Claude thành 1000 lần. | Managed agents, retries, queues, observability, prompt caching, memory |
| **Controls** | Công cụ để vận hành hệ thống đó trong production — các "núm vặn" mà team dùng sau khi đã lên live. | Dashboards, evaluations (evals), workspaces, usage & spend limits, request logs |

**Câu ghi nhớ (shorthand):**
> **Build** with primitives, **scale** on infrastructure, **run** with control.

Cấu trúc này phản chiếu ngay trong Claude Console: đó là nơi lớp infrastructure và
control sống, với các mục cho building, quản lý agents, và analytics.

## Ví dụ thực tế: soạn nháp trả lời help desk

Bối cảnh: bạn quản lý một app help desk. Yêu cầu mới: soạn nháp (draft) câu trả lời dựa
trên nội dung ticket, theo đúng tone và guidelines của team. Gắn vào một nút bấm trong UI.

Đây là use case chuẩn cho **Messages API**. Luồng chạy:

1. Định nghĩa client
2. Lấy ticket mà đoạn chat đang nhắc tới
3. Gọi `messages.create`
4. Trả response về cho nút bấm để render

```python
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",   # Haiku: hợp với task soạn nháp đơn giản
    max_tokens=1024,
    system=TONE_AND_GUIDELINES,
    messages=[
        {"role": "user", "content": ticket_content}
    ],
)

draft = response.content
```

Từng tham số làm một việc cụ thể:

- **`model`** — model nào xử lý request. Ở đây là Haiku, vì soạn nháp trả lời là task đơn giản.
- **`max_tokens`** — giới hạn độ dài response của Claude.
- **`system`** — system prompt, nơi bạn định nghĩa vai trò Claude đóng. Tone và guidelines
  đặt ở đây.
- **`messages`** — mảng các object. Role `user` báo cho Claude biết đây là input của người
  dùng; nội dung ticket nằm ở đó.

Rồi lấy response, trả về nút bấm để render. Xong.

## Từ "hỏi Claude" đến "Claude là một phần của sản phẩm"

Để ý điều xảy ra trong ví dụ trên: bạn **không** xây chatbot từ đầu. Bạn **thêm Claude vào
một sản phẩm đã có sẵn**, và API là cách bạn đấu nối nó vào.

Đó là ý cốt lõi. Claude Platform là quyền truy cập ở mức API tới models, tools, và
infrastructure của Claude. Nó đưa bạn từ *"hỏi Claude một câu"* sang *"Claude là một phần
trong sản phẩm của tôi"*.

Và khi sản phẩm cần agents, platform không chỉ đưa bạn model — với **managed agents**, nó
**chạy agent giúp bạn** luôn.

## Tóm tắt (Recap)

- Claude Developer Platform = REST API + SDKs + CLIs + Console (keys, usage, managed
  agents, prompt testing).
- Ba lớp: **primitives** (Messages API, tool use, files, web search, code execution, MCP
  servers, skills) → **infrastructure** (managed agents, retries, queues, observability)
  → **controls** (dashboards, evals).
- Shorthand: build with primitives, scale on infrastructure, run with control.
- Một lệnh `messages.create` duy nhất đã đủ kiểm soát model, độ dài response, system
  prompt, và user input — đủ để gắn Claude vào một tính năng có sẵn.
- Platform đưa bạn từ hỏi-đáp sang tích hợp Claude vào sản phẩm; với managed agents,
  Anthropic chạy agent hộ bạn.

## 5 câu hỏi quan trọng

**1. Claude Developer Platform khác gì với chat Claude trên browser?**
Chat trên browser là người dùng cuối gõ tay. Platform là truy cập **programmatically**:
code gửi request có cấu trúc, nhận response có cấu trúc, và bạn kiểm soát model, số token,
tools, system instructions. Nó dùng để **nhúng Claude vào sản phẩm**, không phải để hỏi đáp.

**2. Ba lớp của platform là gì, mỗi lớp giải quyết vấn đề nào?**
- **Primitives**: các khối API bạn gọi trực tiếp (Messages API, tool use, files, web
  search, code execution, MCP, skills) → dùng để **build**.
- **Infrastructure**: managed agents, retries, queues, observability, prompt caching,
  memory → dùng để **scale** khi 1 call thành 1000 call.
- **Controls**: dashboards, evals, workspaces, usage/spend limits, request logs → dùng để
  **run** trong production.

**3. Bốn tham số cơ bản của `messages.create` làm gì?**
- `model`: chọn model xử lý request (task đơn giản → Haiku).
- `max_tokens`: giới hạn độ dài response.
- `system`: system prompt — vai trò, tone, guidelines cho Claude.
- `messages`: mảng object hội thoại; role `user` chứa input của người dùng.

**4. Tại sao ví dụ help desk chọn Haiku thay vì Opus?**
Soạn nháp trả lời theo tone/guidelines có sẵn là task **đơn giản**. Haiku là model nhanh
và rẻ nhất, đủ sức cho việc này. Chọn model phải khớp độ khó của task — không phải cứ lấy
model mạnh nhất.

**5. "Managed agents" thêm giá trị gì so với chỉ gọi API?**
Nếu chỉ gọi API, bạn tự lo phần chạy agent: vòng lặp, retries, queues, theo dõi trạng
thái. Với managed agents, Anthropic **host và chạy agent hộ bạn** — bạn không phải tự dựng
hạ tầng đó. Đây là lớp infrastructure của platform.