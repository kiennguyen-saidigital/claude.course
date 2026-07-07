# Giới thiệu Claude Code

> **Ý chính:** Claude Code là **công cụ code kiểu agent (agentic coding tool)** — hiểu codebase, sửa file, chạy lệnh, kết nối công cụ dev sẵn có để giúp bạn làm việc nhanh hơn. Khác Claude.ai ở chỗ nó **truy cập trực tiếp** file, terminal và toàn bộ codebase, tự vào làm việc thay vì bạn copy-paste code qua lại.

## Claude Code là gì?

Công cụ code kiểu agent: hiểu codebase, sửa file, chạy lệnh, tích hợp với công cụ dev bạn đang dùng. Có mặt ở: **terminal**, **VS Code**, **Claude Desktop app**, **web**, và **JetBrains IDEs**.

## Khác Claude.ai chỗ nào?

Claude.ai: bạn phải copy-paste code qua lại. Claude Code: **truy cập trực tiếp** file, terminal, cả codebase — tự vào làm việc.

Điểm khác cốt lõi: Claude Code hoạt động như một **AI Agent**.

## AI Agent là gì?

Phần mềm có thể **tương tác với môi trường** và **thực hiện hành động** để đạt mục tiêu đã định. Bản chất: một mô hình ngôn ngữ lớn (large language model) chạy trong một **vòng lặp (loop)** thời gian thực. Agent có thể dùng **công cụ (tools)**, dịch vụ ngoài, thậm chí các agent khác để đạt mục tiêu.

## Claude Code làm được gì?

- **Đọc & hiểu codebase** — giải thích một tính năng, truy vết (trace) một bug xuyên suốt code.
- **Sửa file khắp project** — refactor một hàm và cập nhật mọi file tham chiếu tới nó.
- **Chạy lệnh terminal** — chạy build script, chạy test, cài package, rồi dùng output để quyết định bước tiếp theo.
- **Tìm kiếm web** — tra tài liệu hoặc API reference mới nhất khi cần.

## Dùng Claude Code hiệu quả — 3 khái niệm

1. **Cửa sổ ngữ cảnh (context window)** — bộ nhớ làm việc của Claude. Chứa được nhiều nhưng không phải tất cả cùng lúc. Đây là chỗ tính "agentic" phát huy: Claude tìm cách **chiến lược** để định vị câu trả lời trong codebase mà không nạp toàn bộ code vào context.

2. **Nó xin phép (asks for permission)** — mặc định, Claude Code hỏi bạn trước khi chạy lệnh hoặc thay đổi. Bạn luôn nắm quyền kiểm soát, dù muốn làm sát sao (hands-on) hay buông (hands-off).

3. **Nó có thể sai (makes mistakes)** — như mọi công cụ, Claude Code không hoàn hảo: hiểu sai ý, tạo bug, hoặc làm quá phức tạp (over-engineer). Theo dõi sát giúp bắt lỗi sớm.

## Recap

Claude Code = công cụ code kiểu agent. Đọc codebase, sửa file, chạy lệnh, kết nối công cụ ngoài để ship nhanh hơn. Dùng ngay ở: terminal, VS Code, JetBrains, Claude Desktop app.

## 5 câu hỏi quan trọng

**1. Claude Code là gì, khác Claude.ai chỗ nào?**
Công cụ code kiểu agent, truy cập trực tiếp file/terminal/codebase và tự làm việc. Claude.ai thì bạn phải copy-paste code qua lại; Claude Code tự vào sửa.

**2. AI Agent là gì?**
Phần mềm tương tác với môi trường và thực hiện hành động để đạt mục tiêu. Bản chất là một large language model chạy trong vòng lặp (loop) thời gian thực, có thể dùng tools, dịch vụ ngoài, hoặc agent khác.

**3. Claude Code làm được những việc gì?**
Đọc & hiểu codebase, sửa file khắp project (refactor + cập nhật mọi tham chiếu), chạy lệnh terminal (build/test/cài package), và tìm kiếm web để tra tài liệu.

**4. Context window là gì và vì sao quan trọng?**
Bộ nhớ làm việc của Claude — chứa nhiều nhưng không phải tất cả cùng lúc. Vì vậy Claude phải tìm cách chiến lược định vị câu trả lời trong codebase mà không nạp toàn bộ vào context (chính là tính agentic).

**5. Hai điều cần nhớ để dùng an toàn?**
Claude Code **xin phép** trước khi chạy lệnh/thay đổi (bạn giữ quyền kiểm soát), và nó **có thể sai** (hiểu sai ý, tạo bug, over-engineer) — nên theo dõi sát để bắt lỗi sớm.
