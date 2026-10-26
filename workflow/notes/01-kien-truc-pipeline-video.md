# Kiến trúc pipeline tạo video ngắn bằng AI

> **Ý chính:** Mọi workflow tạo video ngắn bằng AI (TikTok/Reels/Shorts) — dù build bằng n8n hay bằng code — đều có chung **5 node cốt lõi**: Trigger → Script (LLM) → Voice (TTS) → Visual/Video gen → Assembly → Publish. Hiểu rõ 5 node này trước khi chọn công cụ.

## Sơ đồ tổng quan

```
┌─────────┐   ┌───────────┐   ┌──────────┐   ┌──────────────┐   ┌───────────┐   ┌─────────┐
│ Trigger │ → │  Script   │ → │  Voice   │ → │ Visual/Video │ → │ Assembly  │ → │ Publish │
│         │   │  (LLM)    │   │  (TTS)   │   │     Gen      │   │ (ghép)    │   │         │
└─────────┘   └───────────┘   └──────────┘   └──────────────┘   └───────────┘   └─────────┘
```

## Chi tiết từng node

### 1. Trigger — cái gì khởi động pipeline?
- Lịch giờ (cron: "9h sáng mỗi ngày")
- Topic mới nhập vào (form, Airtable, Google Sheet)
- Webhook (có event từ app khác)

### 2. Script (LLM) — viết nội dung
- Input: topic/chủ đề
- Output: script lời đọc + mô tả hình ảnh cho từng cảnh (scene description/prompt)
- Model: Claude, GPT, Groq (Llama), DeepSeek... — đây là node dùng LLM nhiều nhất

### 3. Voice (TTS) — đọc giọng
- Input: script văn bản
- Output: file audio (.mp3/.wav)
- Tool: ElevenLabs, edge-tts (free), Qwen3-TTS

### 4. Visual/Video Gen — tạo hình ảnh/video
- Input: scene description (prompt) từ node Script
- Output: clip video hoặc ảnh từng cảnh
- Tool: Kling, Runway, Luma, Sora, Veo — hoặc dựng bằng code (Remotion) nếu không cần AI-generated visual mà dùng template/animation có sẵn

### 5. Assembly — ghép lại
- Input: audio + video/ảnh từng cảnh + (phụ đề, nhạc nền)
- Output: 1 file video hoàn chỉnh
- Tool: FFmpeg (code), Creatomate (API ghép no-code), Remotion (code, React-based)

### 6. Publish (tùy chọn, mở rộng)
- Đăng tự động lên TikTok/YouTube Shorts qua API

## Vì sao tách node quan trọng?

Tách rõ 5 node giúp:
- **Debug dễ** — lỗi ở đâu (script sai, giọng đọc lỗi, video gen fail) biết ngay node nào.
- **Đổi tool dễ** — không hài lòng ElevenLabs, đổi sang edge-tts mà không đụng node khác.
- **Chọn no-code/code theo từng node** — ví dụ: node Script dùng code (Claude Agent SDK) vì cần logic phức tạp, node Assembly dùng n8n + Creatomate vì chỉ cần gọi API đơn giản.

## 5 câu hỏi quan trọng

**1. 5 node cốt lõi của pipeline tạo video ngắn là gì?**
Trigger → Script (LLM) → Voice (TTS) → Visual/Video Gen → Assembly. Publish là node mở rộng tùy chọn.

**2. Node Script nhận input gì, trả output gì?**
Nhận topic/chủ đề, trả về script lời đọc + mô tả hình ảnh (prompt) cho từng cảnh.

**3. Node Visual/Video Gen khác gì node Assembly?**
Visual/Video Gen tạo ra clip/ảnh từng cảnh riêng lẻ từ prompt (dùng model AI). Assembly ghép audio + các clip/ảnh đó lại thành 1 video hoàn chỉnh (dùng FFmpeg/Creatomate/Remotion).

**4. Vì sao nên tách rõ từng node thay vì làm 1 cục?**
Dễ debug (biết lỗi ở node nào), dễ đổi tool riêng từng node, và có thể chọn no-code hay code riêng cho từng node tùy độ phức tạp.

**5. Trigger có thể là gì?**
Lịch giờ (cron), dữ liệu mới nhập vào (form/Sheet/Airtable), hoặc webhook từ ứng dụng khác.
