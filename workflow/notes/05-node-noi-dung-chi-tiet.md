# Chi tiết từng node nội dung: tool nào, free tier nào?

> **Ý chính:** Tổng hợp tool thực tế cho từng node (Script, Voice, Visual/Video, Assembly), kèm phương án **free/chạy local** để thực hành không tốn tiền trước khi trả phí tool trả tiền.

## Node Script (LLM)

| Tool | Free? | Ghi chú |
|---|---|---|
| Claude API | Free tier giới hạn, trả phí theo token | Chất lượng script tốt, theo đúng format yêu cầu (JSON scene list...) |
| Groq (Llama) | Free tier rộng, tốc độ rất nhanh | Dùng trong repo `myVideoGenerator` |
| Ollama (LLaMA local) | 100% free, chạy máy mình | Dùng trong `Autotube` — không cần internet/API key |

**Mẹo:** bắt LLM trả output dạng JSON có cấu trúc (scene, duration, voice line, visual prompt) để node sau (Voice, Visual) parse tự động — không trả văn xuôi tự do.

## Node Voice (TTS)

| Tool | Free? | Ghi chú |
|---|---|---|
| ElevenLabs | Free tier giới hạn ký tự/tháng | Giọng tự nhiên nhất, dùng nhiều trong case study bài 02/03 |
| edge-tts | 100% free (dùng giọng Microsoft Edge) | Chất lượng ổn, không giới hạn, dùng trong `Autotube`/`claude-code-video-toolkit` |
| Qwen3-TTS | Free (open-source) | Dùng trong `claude-code-video-toolkit` |

## Node Visual/Video Gen

| Tool | Free? | Ghi chú |
|---|---|---|
| Kling | Free tier giới hạn credit | Dùng trong `myVideoGenerator` |
| Runway | Free tier giới hạn | Dùng trong `n8n-AI-Animal-VideoGen` |
| Remotion (code-rendered) | 100% free (chỉ tốn compute) | Không phải "AI gen" — dựng video bằng React/code + template, dùng trong `claude-code-video-toolkit`, `video-shotcraft` |

**Lưu ý:** nếu chưa muốn tốn tiền AI video-gen, bắt đầu bằng **slideshow ảnh** (AI tạo ảnh tĩnh, rẻ hơn nhiều) hoặc **Remotion** (không cần AI gen hình) — đúng cách `Autotube` và `claude-code-video-toolkit` làm.

## Node Assembly (ghép)

| Tool | Free? | Ghi chú |
|---|---|---|
| FFmpeg | 100% free, mã nguồn mở | Ghép audio + video/ảnh, thêm phụ đề, transition — cần biết command/code |
| Creatomate | Free tier giới hạn render/tháng | API ghép no-code, phù hợp n8n |
| Remotion | 100% free | Ghép ngay trong lúc render (code), không cần bước riêng |

## Thứ tự học gợi ý (từ rẻ nhất lên)

1. Script: Ollama local (free) → Claude API (khi cần chất lượng cao hơn)
2. Voice: edge-tts (free) → ElevenLabs (khi cần giọng tự nhiên hơn)
3. Visual: Remotion/slideshow ảnh (free) → Kling/Runway (khi cần video AI-gen thật)
4. Assembly: FFmpeg (free, code) → Creatomate (khi muốn no-code)

Đi theo thứ tự này, bạn build được **toàn bộ pipeline với $0** trước, sau đó nâng cấp dần từng node sang tool trả phí khi thấy cần chất lượng cao hơn.

## 5 câu hỏi quan trọng

**1. Vì sao nên bắt LLM trả output dạng JSON có cấu trúc ở node Script?**
Để node sau (Voice, Visual) parse tự động từng scene/voice-line/visual-prompt — không phải tự tay tách văn xuôi tự do, giảm lỗi khi pipeline chạy tự động.

**2. edge-tts khác ElevenLabs ở điểm nào?**
edge-tts 100% free, không giới hạn, chất lượng ổn (dùng giọng Microsoft Edge). ElevenLabs giọng tự nhiên hơn nhưng free tier giới hạn ký tự/tháng, dùng nhiều thì phải trả phí.

**3. Remotion khác Kling/Runway ở bản chất nào?**
Remotion dựng video bằng code/React + template có sẵn (không phải AI tạo hình mới), 100% free chỉ tốn compute. Kling/Runway dùng AI generate hình/video mới từ prompt, tốn phí API theo credit.

**4. Thứ tự học/build pipeline với chi phí thấp nhất là gì?**
Script: Ollama local → Voice: edge-tts → Visual: Remotion/slideshow ảnh → Assembly: FFmpeg — toàn bộ free, sau đó nâng cấp dần từng node sang tool trả phí khi cần chất lượng cao hơn.

**5. Vì sao nên build pipeline free trước khi dùng tool trả phí?**
Để thực hành và debug toàn bộ kiến trúc pipeline mà không tốn tiền, chỉ nâng cấp node nào thực sự cần chất lượng cao hơn sau khi đã hiểu rõ cách node đó hoạt động.
