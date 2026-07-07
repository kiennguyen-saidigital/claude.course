# Claude Code hoạt động thế nào

> **Ý chính:** Claude Code khác app chat thường ở **vòng lặp agent (agentic loop)**: gom ngữ cảnh → hành động → kiểm chứng, lặp tới khi xong. Kết hợp 4 khái niệm — agentic loop, cửa sổ ngữ cảnh (context window) được quản lý, công cụ (tools), và quyền hạn (permissions) cấu hình được — tất cả ngay trong terminal.

## Agentic loop (vòng lặp agent)

Cách tốt nhất để hiểu Claude Code:

1. Bạn nhập **prompt** vào Claude Code.
2. Claude **gom ngữ cảnh (gather context)** cần thiết bằng cách gọi model; model trả về **text** hoặc một **tool call** để Claude Code thực thi.
3. Nó **hành động (take action)** — vd sửa file hoặc chạy lệnh.
4. Nó **kiểm chứng kết quả (verify results)** — xem có đạt điều prompt yêu cầu không.
5. Đạt → Claude dừng, chờ prompt kế. Chưa đạt → **lặp lại**, thử tiếp tới khi kết quả hoàn chỉnh và kiểm chứng được.

> Suốt vòng lặp, bạn có thể **thêm ngữ cảnh (add context)**, **ngắt (interrupt)**, hoặc **lái (steer)** model về đúng mục tiêu — bất cứ lúc nào.

## Context (ngữ cảnh)

Claude có **cửa sổ ngữ cảnh (context window)** — quyết định lưu & tham chiếu được bao nhiêu: hội thoại, nội dung file, output lệnh... Chạm giới hạn → Claude Code **nén (compact)** hội thoại: tự quyết cái gì bỏ được hoặc tóm tắt, để đưa context về mức dùng được.

## Tools (công cụ)

Tools là **xương sống** của cách agent làm việc. Hầu hết trợ lý AI chỉ: text vào → text ra. Tools cho phép Claude Code **quyết khi nào chạy code** để tiến gần hoàn thành task — vd tool đọc file, tool tìm web, hay vô số khả năng khác. Claude Code dùng **hiểu ngữ nghĩa (semantic understanding)** để quyết khi nào gọi tool và dùng output ra sao.

## Permissions (quyền hạn)

Vài chế độ quyền:

| Chế độ | Hành vi |
|--------|---------|
| **Default** | Hỏi xin phép rõ ràng trước khi sửa file hoặc chạy lệnh shell. |
| **Auto-accept** | Sửa file không hỏi, nhưng lệnh vẫn cần phê duyệt. |
| **Plan mode** | Chỉ dùng tool **read-only** để lập kế hoạch (plan) trước khi bắt tay làm. |

Cấu hình tất cả trong **file settings**. **Thận trọng khi bỏ qua quyền (skip permissions)** — cho Claude Code chạy lệnh tự do nghĩa là một sai sót có thể khó bắt kịp trước khi nó xảy ra.

## Recap

Claude Code gộp nhiều khái niệm agent: agentic loop, context window được quản lý, tools, và permissions cấu hình được — tất cả trong terminal. Nó đọc codebase, hành động, và **tự kiểm chứng việc mình làm**. Đó là điểm khác căn bản so với một cửa sổ chat.

## 5 câu hỏi quan trọng

**1. Agentic loop gồm những bước nào?**
Nhập prompt → gom ngữ cảnh (model trả text hoặc tool call) → hành động (sửa file/chạy lệnh) → kiểm chứng kết quả. Đạt thì dừng, chưa đạt thì lặp lại tới khi hoàn chỉnh và kiểm chứng được.

**2. Trong loop bạn kiểm soát bằng cách nào?**
Bất cứ lúc nào có thể thêm ngữ cảnh (add context), ngắt (interrupt), hoặc lái (steer) model về đúng mục tiêu.

**3. Chuyện gì xảy ra khi chạm giới hạn context window?**
Claude Code **nén (compact)** hội thoại — tự quyết cái gì bỏ được hoặc tóm tắt để đưa context về mức dùng được.

**4. Tools là gì và vì sao quan trọng?**
Tools là xương sống của agent: thay vì chỉ text-vào-text-ra, chúng cho Claude Code chạy code (đọc file, tìm web...) để hoàn thành task. Claude dùng hiểu ngữ nghĩa để quyết khi nào gọi tool và dùng output ra sao.

**5. Ba chế độ permission khác nhau thế nào?**
**Default**: hỏi trước khi sửa file/chạy lệnh. **Auto-accept**: sửa file không hỏi, lệnh vẫn cần duyệt. **Plan mode**: chỉ dùng tool read-only để lập kế hoạch trước khi làm. Thận trọng khi bỏ qua quyền vì sai sót khó bắt kịp.
