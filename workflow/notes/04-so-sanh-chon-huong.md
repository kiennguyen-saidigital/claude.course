# So sánh & chọn hướng: no-code (n8n) hay code (Claude)?

> **Ý chính:** Không phải chọn 1 trong 2 — **chọn theo từng node**, không phải theo cả pipeline. Node nào chỉ "gọi API theo form, ít logic" → no-code. Node nào "cần quyết định, xử lý lỗi thông minh, tuỳ biến sâu" → code.

## Bảng quyết định theo node

| Node | Ưu tiên no-code khi | Ưu tiên code khi |
|---|---|---|
| Trigger | Chỉ cần cron/webhook đơn giản | Trigger phức tạp (điều kiện nhiều tầng) |
| Script (LLM) | Prompt cố định, ít thay đổi | Cần retry/validate output, multi-turn, tool use |
| Voice (TTS) | Chỉ cần gọi API, nhận file về | Cần xử lý giọng theo ngữ cảnh/cảm xúc phức tạp |
| Visual/Video Gen | Gọi API model có sẵn, nhận video về | Cần dựng bằng Remotion (code-rendered), kiểm soát pixel-perfect |
| Assembly | Dùng Creatomate (API ghép no-code) | Cần FFmpeg tuỳ biến sâu (overlay, transition riêng) |
| Publish | API đăng bài đơn giản | Logic đăng nhiều nền tảng, A/B test caption |

## Checklist tự hỏi khi chọn

1. **Node này có thay đổi logic thường xuyên không?** Thường xuyên → code (dễ version control bằng git, dễ test).
2. **Node này cần debug sâu khi lỗi không?** Cần → code (full stack trace, log chi tiết hơn UI n8n).
3. **Node này chỉ là "nối API A sang API B"?** Đúng → no-code đủ, không cần code.
4. **Bạn có cần non-dev trong team chỉnh sửa workflow không?** Có → ưu tiên no-code (họ sửa form, không cần đọc code).

## Mô hình lai (hybrid) — thực tế hay dùng nhất

```
n8n (trigger + orchestration tổng) 
   │
   ├──► gọi Claude Agent SDK / MCP server (node Script — logic phức tạp)
   │
   ├──► gọi API TTS, Video Gen trực tiếp (node đơn giản)
   │
   └──► Code node (FFmpeg custom) nếu Creatomate không đủ linh hoạt
```

n8n đóng vai "khung xương" (trigger, lịch, nối dây), còn phần cần trí tuệ/logic phức tạp **giao cho Claude** qua MCP hoặc gọi Agent SDK như một HTTP node bình thường.

## Gợi ý cho người mới bắt đầu (bạn, sau khóa này)

- **Bắt đầu bằng no-code (n8n)** để nhìn rõ shape workflow — import 1 trong 3 repo ở [bài 02](02-no-code-n8n.md), chạy thử, sửa dần.
- **Chuyển dần node Script/logic phức tạp sang code** khi thấy no-code không đủ linh hoạt — dùng kỹ năng Claude Code sẵn có.
- Không cần "chọn phe" — mục tiêu là pipeline chạy đúng, không phải chứng minh code hay no-code hơn.

## 5 câu hỏi quan trọng

**1. Nguyên tắc chọn no-code hay code là gì?**
Chọn theo từng node, không theo cả pipeline — node đơn giản (gọi API theo form) dùng no-code, node cần logic/debug sâu dùng code.

**2. Khi nào nên ưu tiên code cho 1 node?**
Khi node đó thay đổi logic thường xuyên, cần debug sâu, hoặc cần retry/validate output phức tạp (ví dụ LLM trả output sai format phải tự sửa).

**3. Mô hình hybrid phổ biến hoạt động thế nào?**
n8n làm khung xương (trigger, lịch, nối dây các node đơn giản), còn node cần trí tuệ/logic phức tạp (ví dụ viết script) giao cho Claude qua MCP server hoặc gọi Agent SDK như 1 HTTP node.

**4. Vì sao nên bắt đầu học bằng no-code dù mục tiêu cuối là dùng code?**
Vì no-code (n8n) cho thấy rõ shape/kiến trúc workflow trên UI, giúp hình dung toàn cảnh trước khi tự code chi tiết từng phần.

**5. Có cần chọn hẳn 1 phe (100% no-code hoặc 100% code) không?**
Không — thực tế hay dùng mô hình lai, mục tiêu là pipeline chạy đúng và dễ maintain, không phải chứng minh cách nào "hơn".
