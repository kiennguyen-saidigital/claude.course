# File CLAUDE.md

> **Ý chính:** `CLAUDE.md` cho Claude Code **ký ức bền vững (persistent memory)** về project. File Markdown đặt ở thư mục gốc, Claude Code **tự đọc mỗi khi mở session** — nội dung được **nối vào prompt (appended to your prompt)**. Không có nó, Claude phải khám phá lại codebase từ đầu mỗi lần, và hay **giả định (assumption)** sai.

## Vấn đề nó giải quyết

Không có CLAUDE.md → mỗi session Claude bắt đầu từ số 0:
- Khám phá lại codebase.
- Đoán xem cần dependency nào.
- Không biết tính năng nào đã làm rồi.
- Tự suy diễn → khó lái (steer) Claude đi đúng hướng.

## Ví dụ

```markdown
# Project

This is a Next.js 15 app using the App Router, Tailwind, and Drizzle ORM.

# Commands
- Dev server: `pnpm dev`
- Run tests: `pnpm test`
- Lint: `pnpm lint`

# Code Style
- Use 2-space indentation
- Prefer named exports
- All API routes go in app/api/
- Use server actions instead of API routes where possible
```

Sau đó bảo Claude tạo React component → nó **đã biết** dùng Tailwind và theo quy ước code của bạn. Xem nó như **kịch bản onboarding (onboarding script)** cho codebase.

## Phân cấp bộ nhớ (memory hierarchy)

| Loại | Vị trí | Dành cho ai |
|------|--------|-------------|
| **Project-level** | Thư mục gốc của project | Cả team — **nên commit vào version control** |
| **User-level** | Thư mục config của bạn (`~/.claude/CLAUDE.md`) | Chỉ mình bạn, áp dụng cho **mọi project** — để sở thích cá nhân ở đây |

## Mẹo

- **Lưu chỉnh sửa vào memory.** Nếu bạn phải sửa Claude lặp đi lặp lại — vd "luôn dùng server actions thay vì API routes" — hãy **bảo thẳng Claude lưu quy tắc đó vào memory**. Session sau nó nhớ.
- **Tham chiếu tài liệu project.** Dùng ký hiệu `@` kèm đường dẫn file:

  ```markdown
  ## README.md

  Please read if you need more info: @README.md
  ```

- **Bắt đầu KHÔNG có CLAUDE.md.** Khuyến nghị: chạy project không có file này trước, để **thấy chỗ nào mình phải liên tục sửa lưng (course-correct)** Claude. Cách này giữ CLAUDE.md **gọn và chỉ chứa thông tin cần thiết**. Khi sẵn sàng → chạy `/init` để Claude tự sinh ra một cái.

## Recap

Khác biệt giữa session Claude Code bực bội và session hiệu quả thường nằm ở **context** — và CLAUDE.md là cách cung cấp context đó. Bắt đầu với **stack**, **sở thích (preferences)**, và **commands**, rồi bồi đắp dần.

## 5 câu hỏi quan trọng

**1. CLAUDE.md là gì và Claude Code dùng nó khi nào?**
File Markdown ở thư mục gốc project. Claude Code **tự đọc mỗi khi bắt đầu session**, nội dung được **nối vào prompt**. Cho Claude ký ức bền vững (persistent memory) về project.

**2. Không có CLAUDE.md thì vấn đề gì?**
Mỗi session Claude bắt đầu lại từ đầu: khám phá lại codebase, đoán dependency, không biết tính năng nào đã có. Nó **tự giả định** → khó lái đúng hướng.

**3. Project-level và user-level CLAUDE.md khác nhau ra sao?**
Project-level ở gốc project, **chia sẻ với team**, nên commit vào version control. User-level ở thư mục config, **chỉ mình bạn**, áp dụng cho **mọi project** — để sở thích cá nhân.

**4. Làm sao để Claude tham chiếu tài liệu khác trong project?**
Dùng ký hiệu **`@`** kèm đường dẫn: `Please read if you need more info: @README.md`.

**5. Tại sao nên bắt đầu project mà KHÔNG có CLAUDE.md?**
Để thấy rõ chỗ nào mình phải **liên tục sửa lưng (course-correct)** Claude — chỉ những chỗ đó mới đáng ghi vào file. Giữ CLAUDE.md **gọn, chỉ chứa thông tin cần thiết**. Khi sẵn sàng, chạy `/init` cho Claude tự sinh.