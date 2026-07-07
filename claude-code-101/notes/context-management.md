# Quản lý ngữ cảnh (Context Management)

> **Ý chính:** Context là **bộ nhớ làm việc** của Claude — mọi file đọc, lệnh chạy, tin nhắn gửi đều chiếm chỗ trong **cửa sổ ngữ cảnh (context window)**. Không gian hữu hạn → phải tối ưu. Công cụ chính: `/compact` (tóm tắt, giữ ký ức), `/clear` (xóa sạch, làm lại), `/context` (kiểm tra tình trạng), và **CLAUDE.md** (ký ức xuyên session).

## Context window là gì?

Lượng không gian Claude giữ được trong bộ nhớ. Mỗi lần bạn nhập prompt, Claude đọc file, chạy tool call, hoặc nhận kết quả tool call — đều **thêm vào context window**. Không gian hữu hạn → tối ưu cách dùng là quan trọng.

## Chuyện gì xảy ra khi context đầy?

Gần chạm giới hạn → context window **tự nén (compact)**. Compaction tóm tắt chi tiết quan trọng và bỏ kết quả tool call không cần thiết để giải phóng chỗ. **Lưu ý:** quá trình này **có thể mất chi tiết**.

## Các lệnh

| Lệnh | Tác dụng |
|------|----------|
| `/compact` | Nén thủ công mọi thứ tới thời điểm đó. Giải phóng chỗ **nhưng vẫn giữ ký ức** việc đã làm. |
| `/clear` | Xóa **sạch hoàn toàn** — bắt đầu lại, không nhớ session trước. |
| `/context` | Xem tổng quan kích thước context, danh mục nào chiếm nhiều chỗ, kèm biểu đồ trực quan. |

## Khi nào dùng cái nào

- **`/compact`** — khi đang làm **một tính năng cụ thể**, sắp chạm giới hạn nhưng cần tiếp tục. Giữ context liên quan tới tính năng hiện tại.
- **`/clear`** — khi bắt đầu **tính năng mới**. Tránh hội thoại cũ gây thiên kiến (bias) cho việc mới. Thứ muốn Claude nhớ **xuyên session** → bỏ vào **CLAUDE.md** để nó khỏi phải khám phá lại từ đầu.

## Mẹo tiết kiệm context

- **Cụ thể (be specific).** Prompt mơ hồ trông có vẻ nhỏ nhưng tốn context hơn về lâu dài: thiếu chỉ dẫn rõ, Claude buộc phải khám phá codebase nhiều hơn và tự suy luận — tốn chỗ hơn nhiều so với prompt chi tiết.
- **Quản lý MCP server.** MCP server mặc định **nạp toàn bộ tool vào context**, kể cả khi không dùng. Server không liên quan project hiện tại → nên tắt. Cân nhắc dùng **Skills** — hoạt động giống MCP server nhưng **không nạp hết vào context** từ đầu.
- **Dùng subagent.** Subagent chạy song song với main agent nhưng có **context window riêng biệt**. Với task chỉ cần câu trả lời — vd "endpoint xác thực nằm ở đâu?" — subagent làm việc rồi **chỉ trả về tóm tắt** cho main agent, giữ context chính sạch.

## Recap

Quản lý context trong Claude Code là then chốt. `/compact` tóm tắt session dài, `/clear` bắt đầu mới. Để dùng context hiệu quả: **prompt cụ thể**, **kiểm tra thứ đang ngốn context** (`/context`), và **dùng subagent** ủy thác task chỉ cần kết quả.

## 5 câu hỏi quan trọng

**1. Context window là gì và cái gì làm nó đầy?**
Bộ nhớ làm việc của Claude — không gian hữu hạn. Mỗi prompt, file đọc, tool call, và kết quả tool call đều thêm vào. Đầy thì phải tối ưu.

**2. Compaction làm gì và rủi ro là gì?**
Tự động khi gần giới hạn: tóm tắt chi tiết quan trọng, bỏ kết quả tool call thừa để giải phóng chỗ. Rủi ro: **có thể mất chi tiết**.

**3. `/compact` khác `/clear` thế nào?**
`/compact` nén nhưng **giữ ký ức** — dùng khi tiếp tục cùng một tính năng. `/clear` **xóa sạch** — dùng khi bắt đầu tính năng mới, tránh bias từ hội thoại cũ.

**4. Muốn Claude nhớ xuyên session thì làm gì?**
Bỏ vào file **CLAUDE.md** để nó khỏi phải khám phá lại từ đầu mỗi session.

**5. Ba cách tiết kiệm context space?**
Prompt **cụ thể** (mơ hồ tốn context hơn vì Claude phải tự khám phá); **quản lý MCP server** (tắt cái không dùng, hoặc dùng Skills không nạp hết); **dùng subagent** (context riêng, chỉ trả tóm tắt về main agent).
