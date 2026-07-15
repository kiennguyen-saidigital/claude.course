# API call đầu tiên của bạn

**Ý chính:** Một lệnh `messages.create` gồm 3 thứ — **model**, **max_tokens**, và
**messages** — đủ để gửi input thật cho Claude và nhận về insight có cấu trúc. Chưa tới
20 dòng code. Mọi thứ sau này đều xây trên mẫu (pattern) này.

## Chuẩn bị

1. **Lấy API key** ở [platform.claude.com](https://platform.claude.com). Cần mua credit
   trước.
2. **Cất key vào file `.env.local`** để nó không bị commit vào version control. Hardcode
   key trong source là cách key bị lộ lên GitHub — luôn để trong file môi trường (env file).
3. **Cài SDK:**
   ```bash
   npm install @anthropic-ai/sdk
   ```

## Cấu tạo (anatomy) một request

Mọi API call đi qua hàm `messages.create`. Bạn khai báo 3 thứ:

- **`model`** — Claude model nào xử lý request.
- **`max_tokens`** — giới hạn độ dài tối đa của response.
- **`messages`** — mảng các object, mỗi object có role `user` hoặc `assistant`, cấu trúc
  giống như cách bạn trò chuyện với Claude ở nơi khác.

Dạng cơ bản nhất:

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const msg = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 1024,
  messages: [{
    role: "user",
    content: "Hello, Claude",
  }],
});
```

> SDK tự đọc API key từ biến môi trường `ANTHROPIC_API_KEY` — nên `new Anthropic()` không
> cần truyền key khi key đã nằm trong env.

## Ví dụ thật: review code có bug

Cho Claude việc thú vị hơn "hello": chỉ vào đoạn code có bug và nhờ review. Cả file ~20 dòng:

```javascript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const buggyCode = `
function add(a, b) {
  return a - b;
}
`;

const response = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 1024,
  system: "You are a terse senior code reviewer. Give feedback in one paragraph.",
  messages: [
    { role: "user", content: `Review this code:\n${buggyCode}` },
  ],
});

for (const block of response.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
```

Hai điểm cần để ý:

- **`system` (system prompt) là nơi định hình persona.** Muốn reviewer senior và ngắn gọn,
  không lải nhải → nói thẳng vào system prompt.
- **`response.content` là một mảng các block, không phải string.** Với reply text đơn giản
  thường chỉ có 1 block type `text`, nhưng Claude có thể trả nhiều block — text, tool call,
  thinking. Nên luôn **lặp qua và kiểm tra `block.type`**.

Chạy lên, Claude phát hiện hàm tên `add` nhưng lại đang trừ, và nói trong 1 đoạn: đổi
`return a - b` thành `return a + b`.

## Từ script tới sản phẩm

Trong sản phẩm thật, cùng mẫu `messages.create` này là động cơ đằng sau một endpoint kiểu
`summarize`. Ví dụ luồng cho tính năng tóm tắt cuộc họp:

1. Lấy transcript cuộc họp từ database.
2. Đưa cho Claude kèm system prompt kiểu "extract insights and risks".
3. Lưu kết quả lại vào row.
4. Trả về cho UI.

Vẫn là **cùng một call** — chỉ được bọc trong một route handler.

## Tóm tắt (Recap)

- API call đầu tiên = hàm `messages.create` với **model**, **max_tokens**, và **messages**.
- Cất API key trong `.env.local` để tránh lọt vào version control.
- Thêm **system prompt** để định hình hành vi (persona, tone) của Claude.
- `response.content` là **mảng các block** — luôn lặp và kiểm tra `type` của từng block.
- Từ đây, mọi thứ khác đều xây trên mẫu này.

## 5 câu hỏi quan trọng

**1. Ba tham số bắt buộc của `messages.create` là gì?**
`model` (model nào xử lý), `max_tokens` (giới hạn độ dài response), và `messages` (mảng
object hội thoại với role `user`/`assistant`). `system` là tuỳ chọn, thêm để định hình
persona.

**2. Vì sao phải cất API key trong `.env.local` thay vì hardcode?**
Hardcode key trong source là cách key bị commit rồi lộ công khai lên GitHub. File môi
trường (`.env.local`) nằm ngoài version control nên key không bị đẩy lên repo.

**3. `response.content` trả về kiểu gì, và vì sao phải lặp qua nó?**
Là một **mảng các block**, không phải string. Claude có thể trả nhiều loại block — `text`,
tool call, `thinking`. Nên phải lặp qua và kiểm tra `block.type`, chỉ lấy `block.text` khi
type là `text`.

**4. System prompt dùng để làm gì trong ví dụ review code?**
Định hình **persona** của Claude: "terse senior code reviewer, feedback in one paragraph".
Nó điều khiển giọng và độ dài phản hồi mà không cần nhét chỉ dẫn đó vào message của user.

**5. Cùng một `messages.create` biến thành tính năng sản phẩm ra sao?**
Bọc call trong một route handler: lấy dữ liệu từ DB (vd transcript), đưa cho Claude kèm
system prompt phù hợp, lưu kết quả lại và trả về UI. Cùng một call — chỉ khác lớp bọc
xung quanh.