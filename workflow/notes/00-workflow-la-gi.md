# Workflow với AI là gì?

> **Ý chính:** Workflow (quy trình tự động) = **nhiều bước AI/tool nối lại thành một pipeline cố định**, chạy lặp lại không cần bạn ngồi gõ prompt từng bước. Khác với việc bạn mở Claude Code và tự tay làm từng tác vụ một, workflow **tự chạy từ đầu đến cuối** mỗi khi có trigger (ví dụ: "có topic mới" → tự ra video hoàn chỉnh).

## Vì sao cần workflow, dùng Claude Code không đủ sao?

Claude Code rất mạnh cho **một phiên làm việc có người lái** (bạn ra lệnh, Claude thực thi, bạn review). Nhưng khi tác vụ:

- **Lặp lại nhiều lần** (mỗi ngày ra 1 video mới),
- **Gọi nhiều dịch vụ khác nhau** (LLM viết script, TTS đọc giọng, model AI tạo hình/video, tool ghép file, API đăng lên TikTok/YouTube),
- **Cần chạy không cần người giám sát** (chạy đêm, chạy theo lịch, chạy khi có sự kiện),

thì bạn cần **đóng gói các bước đó thành một quy trình** — đây chính là workflow. Claude (hoặc LLM khác) chỉ là **một node** trong quy trình đó (thường là node viết script/ra quyết định), không phải toàn bộ quy trình.

## Ví dụ cụ thể: workflow tạo video ngắn

```
Trigger (có topic mới)
   │
   ▼
[1] LLM viết script  →  [2] TTS đọc giọng  →  [3] AI tạo video/hình từ prompt
   │                                                    │
   └──────────────────► [4] Ghép (assembly) ◄───────────┘
                               │
                               ▼
                     [5] Xuất file + đăng lên TikTok/YouTube
```

Mỗi bước `[1]`–`[5]` là một **node**: có input, có output, nối với node kế tiếp. Toàn bộ chuỗi này chạy tự động chỉ cần 1 trigger ban đầu (topic, lịch giờ, webhook...).

## Hai cách build workflow

| Cách | Công cụ | Đặc điểm |
|---|---|---|
| **No-code** | n8n, Zapier, Make | Kéo-thả node trên UI, cấu hình bằng form, ít/không code |
| **Code / agent** | Claude Code, Claude Agent SDK, Python script | Viết code điều phối (orchestration), gọi API trực tiếp, linh hoạt hơn nhưng cần biết code |

Khóa học này học **cả hai**, vì thực tế người làm AI workflow thường trộn cả hai: dùng n8n cho phần trigger/ghép nối dịch vụ, dùng code/Claude cho phần logic phức tạp (viết script, kiểm tra chất lượng output).

## So sánh nhanh: Claude Code session vs Workflow

| | Claude Code (1 phiên) | Workflow |
|---|---|---|
| Ai bấm nút | Bạn, mỗi lần | Trigger tự động (lịch, event, webhook) |
| Số bước | Bạn dẫn dắt từng bước | Cố định sẵn, chạy hết pipeline |
| Lặp lại | Phải mở lại, ra lệnh lại | Tự lặp lại vô hạn |
| Giám sát | Bạn theo dõi, approve từng action | Chạy không người, chỉ xem log/kết quả |
| Phù hợp | Việc một lần, cần tư duy linh hoạt | Việc lặp lại, quy trình đã rõ |

## Lộ trình bài học (theo đúng thứ tự node trong 1 workflow thật)

1. **[Kiến trúc pipeline video ngắn](01-kien-truc-pipeline-video.md)** — nhìn toàn cảnh các node và cách chúng nối nhau.
2. **[Hướng no-code: n8n](02-no-code-n8n.md)** — build bằng kéo-thả, case study repo free trên GitHub.
3. **[Hướng code: Claude Code / Agent SDK](03-code-claude-orchestration.md)** — build bằng code, case study repo free trên GitHub.
4. **[So sánh & chọn hướng](04-so-sanh-chon-huong.md)** — khi nào dùng no-code, khi nào dùng code.
5. **[Chi tiết từng node nội dung](05-node-noi-dung-chi-tiet.md)** — script, voice, visual, assembly: tool nào, free tier nào.
6. **[Thực hành: chạy thử 1 workflow free](../exercises/01-chay-thu-short-video-maker.md)** — tự tay dựng và chạy end-to-end.

## 5 câu hỏi quan trọng

**1. Workflow khác gì so với dùng Claude Code bình thường?**
Workflow là chuỗi bước cố định, tự chạy lặp lại theo trigger, không cần người ngồi ra lệnh từng bước. Claude Code (1 phiên) cần bạn dẫn dắt và approve từng action.

**2. Trong workflow tạo video ngắn, LLM (Claude) đóng vai gì?**
Thường chỉ là **một node** (ví dụ viết script, viết prompt cho AI tạo hình/video), không phải toàn bộ pipeline — các node khác (TTS, video gen, ghép file, đăng bài) là dịch vụ/tool riêng.

**3. Hai cách chính để build workflow là gì?**
No-code (n8n, Zapier, Make — kéo-thả node) và code/agent (Claude Code, Agent SDK, script Python/Node — viết code điều phối).

**4. Node là gì trong workflow?**
Một bước có input và output, nối với node kế tiếp. Ví dụ: node "viết script" nhận topic, trả về văn bản; node đó nối sang node "TTS" nhận văn bản, trả về file âm thanh.

**5. Khi nào nên build workflow thay vì làm tay qua Claude Code?**
Khi tác vụ lặp lại nhiều lần, cần gọi nhiều dịch vụ khác nhau, và cần chạy tự động không cần người giám sát liên tục.
