# Code Review & Git workflow

> **Ý chính:** Claude Code có vài tính năng git tích hợp giúp workflow nhanh hơn: **subagent review** (góc nhìn tươi mới, không thiên kiến) trước khi push, skill **`/commit-push-pr`** gộp commit + push + tạo PR một bước, và cờ **`--from-pr`** để quay lại làm tiếp một PR.

## Review bằng subagent

Trước khi push PR, bảo Claude dùng **subagent** review thay đổi. Subagent chạy trong **context window riêng, góc nhìn tươi mới (fresh eyes)** — không mang thiên kiến (bias) của main agent vừa viết code cả session.

- Khi tạo **code-reviewer subagent**, giới hạn nó ở **tool read-only**. Reviewer nên **báo lỗi, không sửa file**.
- **Check cấu hình subagent vào repo** để cả team dùng chung một reviewer.

## Skill `/commit-push-pr`

Skill này gộp **commit + push + tạo PR** trong một bước. Thay vì làm thủ công từng cái, chạy skill là Claude lo hết.

Nếu có **Slack MCP server** cấu hình với danh sách channel trong CLAUDE.md, nó **tự đăng link PR** vào channel của team.

## Nối session bằng `--from-pr`

Khi Claude tạo PR qua `gh pr create`, session được **tự động nối (linked)** với PR đó. Cần quay lại sau — vd xử lý review comment hoặc sửa build lỗi — chạy:

```
claude --from-pr <PR_NUMBER>
```

Tiếp tục ngay chỗ bạn dừng.

## Recap

Dùng **subagent** review không thiên kiến trước khi push. Dùng **`/commit-push-pr`** lo trọn luồng commit-tới-PR một bước. Dùng **`--from-pr`** để tiếp tục làm một PR sau này. Tính năng nhỏ nhưng bỏ nhiều ma sát khỏi workflow hằng ngày.

## 5 câu hỏi quan trọng

**1. Vì sao dùng subagent để review code trước khi push?**
Subagent chạy trong context window riêng với góc nhìn tươi mới (fresh eyes), không mang thiên kiến của main agent vừa viết code cả session — bắt lỗi khách quan hơn.

**2. Nên cấu hình code-reviewer subagent thế nào?**
Giới hạn ở **tool read-only** (reviewer báo lỗi, không sửa file), và **check cấu hình vào repo** để cả team dùng chung một reviewer nhất quán.

**3. Skill `/commit-push-pr` làm gì?**
Gộp **commit + push + tạo PR** trong một bước, thay vì làm thủ công từng cái.

**4. Slack MCP server liên quan gì tới `/commit-push-pr`?**
Nếu cấu hình Slack MCP server với channel liệt kê trong CLAUDE.md, skill **tự đăng link PR** vào channel team.

**5. `--from-pr` dùng để làm gì?**
`claude --from-pr <PR_NUMBER>` nối lại session đã gắn với PR đó, để quay lại làm tiếp (xử lý review comment, sửa build lỗi) ngay chỗ đã dừng.
