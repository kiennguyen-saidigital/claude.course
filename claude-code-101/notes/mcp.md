# MCP (Model Context Protocol)

> **Ý chính:** MCP là **chuẩn mở (open standard)** cho Claude Code kết nối tới **tool và nguồn dữ liệu ngoài** — database, app năng suất, repo công khai. Nhiều context của bạn nằm **ngoài codebase**; MCP bắc cầu. Claude **tự hiểu khi nào cần dùng tool** để trả lời tốt hơn.

## Tool trong AI agentic là gì

**Tool** cho agent (như Claude Code) khả năng **thực hiện hành động** để hoàn thành task — khác AI thường chỉ trả về text. Ví dụ:

- Team dùng **Linear** → thêm Linear MCP server để kéo chi tiết issue (vd ticket `MEN-12`).
- Cần doc mới nhất của dependency → docs MCP server như **Context7** cấp cho Claude Code (vd tra shadcn/ui).

## Thêm MCP server

Lệnh: `claude mcp add`. Hai loại chính:

| Loại | Dùng cho |
|------|----------|
| **HTTP** | Dịch vụ **remote** — provider host, kết nối qua network |
| **Stdio** | **Tiến trình local** chạy trên máy bạn (vd script Python) |

Quản lý: `/mcp` trong session → xem server nào connected, check status, tắt cái không cần.

## Scope server (phạm vi)

| Scope | Phạm vi |
|-------|---------|
| **Local** | Chỉ project hiện tại, chỉ mình bạn |
| **User** | Mọi project của bạn |
| **Project** | File **`.mcp.json`** commit vào version control → cả team tự có **đúng cùng server** |

## Chi phí context (quan trọng)

MCP server **thêm tool definition vào context window — kể cả khi không dùng**. Nhiều server → ăn mòn context. Cách giảm:

- Chạy `/mcp` → tắt server không dùng.
- Tool có **CLI tương đương** (`gh` cho GitHub, `aws` cho AWS) → CLI **tiết kiệm context hơn** vì không thêm tool definition thường trực.
- Cân nhắc **Skill** thay thế: chỉ `name` + `description` nạp trước, nội dung đầy đủ nạp khi cần. Xem [[skills]].
- Tool MCP vượt **10% context window** → Claude Code tự chuyển **tool search mode** (khám phá tool theo nhu cầu) — nhưng **kém tin cậy hơn**.

## Recap

MCP nối Claude Code với tool + dữ liệu ngoài. Thêm bằng `claude mcp add`. Scope theo project qua `.mcp.json` cho team tự có. Theo dõi context, tắt server không dùng.

## 5 câu hỏi quan trọng

**1. MCP là gì và giải quyết vấn đề gì?**
Chuẩn mở kết nối Claude Code tới tool + nguồn dữ liệu ngoài (database, app, repo). Nhiều context nằm ngoài codebase — MCP bắc cầu. Claude tự biết khi nào dùng tool.

**2. "Tool" khác AI trả text thường ở chỗ nào?**
Tool cho agent khả năng **thực hiện hành động** (query Linear, tra doc) để hoàn thành task, thay vì chỉ trả về đoạn text.

**3. HTTP server và Stdio server khác nhau ra sao?**
**HTTP** cho dịch vụ **remote** (provider host, qua network). **Stdio** cho **tiến trình local** chạy trên máy bạn (vd script Python).

**4. Ba scope của MCP server?**
**Local** (chỉ project này, chỉ bạn) · **User** (mọi project của bạn) · **Project** (`.mcp.json` commit vào git → cả team tự có cùng server).

**5. MCP ảnh hưởng context thế nào, giảm ra sao?**
Mỗi server thêm tool definition vào context **dù không dùng**. Giảm: `/mcp` tắt server thừa; dùng CLI (`gh`, `aws`) thay vì MCP; dùng Skill; vượt 10% context → tự chuyển tool search mode (kém tin cậy hơn).
