# Hooks

> **Ý chính:** Hook = lệnh chạy tại điểm cố định trong vòng đời Claude Code. Khác CLAUDE.md/prompt (chỉ là gợi ý, đôi khi Claude bỏ qua) — hook **deterministic**, **luôn chạy**, không ngoại lệ.

## Vì sao cần Hook

CLAUDE.md bảo "chạy Prettier sau mỗi lần sửa file" — đa số Claude làm, đôi khi quên. Hook đảm bảo việc đó xảy ra **100% lần**, không cần Claude "nhớ".

Ca dùng phổ biến:

- Tự format code sau khi edit file
- Log mọi command đã chạy (phục vụ compliance)
- Chặn thao tác nguy hiểm (sửa file production)
- Gửi thông báo khi Claude xong việc

## Cách hoạt động

Cấu hình trong `settings.json`: chọn **event**, tùy chọn **matcher** (tool nào áp dụng), rồi **command** chạy.

Các event:

| Event | Chạy khi nào |
|---|---|
| `PreToolUse` | trước khi tool call thực thi |
| `PostToolUse` | sau khi tool call xong |
| `UserPromptSubmit` | khi bạn submit prompt, trước khi Claude xử lý |
| `Stop` | khi Claude trả lời xong |
| `Notification` | khi Claude gửi notification |

Cấu hình qua lệnh `/hooks` trong Claude Code, hoặc sửa trực tiếp `settings.json`.

## Ví dụ thực tế: auto-format

Hook phổ biến nhất. Đặt `PostToolUse` với matcher `"Edit|MultiEdit|Write"` → kích hoạt mỗi khi Claude sửa file. Command kiểm tra đuôi file rồi chạy formatter tương ứng — Prettier cho TypeScript, `gofmt` cho Go, v.v.

## Chặn hành động với PreToolUse

`PreToolUse` chặn được tool call **trước khi** nó chạy. Hook nhận `tool name` + `input` dạng JSON qua **stdin**. Exit code quyết định hành vi:

| Exit code | Hành vi |
|---|---|
| `0` | cho chạy bình thường |
| `2` | **chặn** — message ở `stderr` được đưa lại cho Claude làm feedback, để nó hiểu vì sao bị chặn và tự điều chỉnh |
| khác | lỗi không chặn — hiện cho bạn thấy nhưng không dừng gì cả |

Đây là cách ép **luật cứng**: chặn ghi vào thư mục config production, chặn bash command chứa `rm -rf`, chặn commit thẳng vào `main`. Bất cứ gì team cần **đảm bảo**, không phải chỉ "gợi ý".

## Chia sẻ Hook với team

Hook cấu hình trong `.claude/settings.json` là **project-level**, check vào repo được → cả team tự động có cùng hook. Dùng biến môi trường `CLAUDE_PROJECT_DIR` trong command để trỏ tới script trong project, đảm bảo chạy đúng dù working directory hiện tại của Claude là gì.

## Tóm tắt

Hook cho bạn quyền kiểm soát **deterministic** với hành vi Claude Code. `PostToolUse` → auto-format + logging. `PreToolUse` → chặn thao tác nguy hiểm. Cấu hình qua `/hooks` hoặc `settings.json`. Check vào repo để cả team dùng chung.

Việc nào **phải** xảy ra mỗi lần, không sai sót — đừng bỏ vào prompt, bỏ vào hook.

## 5 câu hỏi quan trọng

**1. Hook khác gì với hướng dẫn trong CLAUDE.md?**
CLAUDE.md chỉ là gợi ý — Claude thường làm theo nhưng đôi khi bỏ qua. Hook là **deterministic**: cấu hình command chạy tại event cố định, luôn chạy không ngoại lệ.

**2. 5 event chính của Hook, mỗi loại chạy khi nào?**
`PreToolUse` (trước tool call) · `PostToolUse` (sau tool call xong) · `UserPromptSubmit` (khi submit prompt, trước Claude xử lý) · `Stop` (Claude trả lời xong) · `Notification` (Claude gửi notification).

**3. `PreToolUse` chặn hành động bằng cách nào? Exit code nào chặn, exit code nào không?**
Hook nhận tool name + input JSON qua stdin, quyết bằng exit code trả về: `0` = cho chạy bình thường; `2` = **chặn**, message ở stderr đưa lại cho Claude làm feedback; exit code khác = lỗi không chặn, chỉ hiện cho user thấy.

**4. Ví dụ hook thực tế phổ biến nhất là gì? Cấu hình sao?**
Auto-format sau khi sửa file: `PostToolUse` hook, matcher `"Edit|MultiEdit|Write"`, command kiểm tra đuôi file rồi gọi formatter tương ứng (Prettier, gofmt...).

**5. Làm sao chia sẻ hook cho cả team, và cần lưu ý gì khi viết command trong hook?**
Hook trong `.claude/settings.json` là project-level, check vào repo là cả team có chung. Dùng biến `CLAUDE_PROJECT_DIR` trong command để trỏ đúng script bất kể working directory hiện tại của Claude.
