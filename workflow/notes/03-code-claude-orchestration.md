# Hướng Code: build workflow bằng Claude Code / Agent SDK

> **Ý chính:** Thay vì kéo-thả node trên UI (n8n), bạn **viết code điều phối (orchestration code)** gọi lần lượt các API (LLM → TTS → video gen → ffmpeg). Claude Code giúp bạn *viết* code pipeline này; **Claude Agent SDK** hoặc **MCP server** giúp pipeline đó *tự* dùng Claude như một bước trong quy trình.

## Khác gì với dùng Claude Code 1 phiên (bài 00)?

- Bài 00 nói: Claude Code 1 phiên = bạn ngồi ra lệnh từng bước.
- Ở đây: bạn dùng Claude Code để **viết ra một script/server** — chạy xong thì script đó tự lặp lại pipeline **không cần bạn ngồi gõ prompt nữa**. Claude Code là "người viết workflow", không phải "người chạy workflow" mỗi lần.

## 3 cách tiếp cận code phổ biến

### A. Script thuần (Python/Node) gọi API tuần tự
Gọi Claude API viết script → gọi TTS API → gọi video-gen API → gọi FFmpeg (subprocess) → xong. Đơn giản, dễ hiểu nhất, không cần framework.

### B. MCP server — bắc cầu giữa Claude và tool tạo video
**[short-video-maker](https://github.com/gyoridavid/short-video-maker)** — dựng REST API + **MCP server** để tạo video TikTok/Reels/Shorts. Vì là MCP, bạn **nối trực tiếp vào Claude Code hoặc Claude Desktop** như một MCP server bình thường (giống các MCP bạn đã học ở Claude Code 101) — gõ "tạo video ngắn về X" trong Claude Code, Claude tự gọi tool MCP đó để render video. Đây là cầu nối tự nhiên nhất cho người đã quen Claude Code + MCP.

### C. Claude Code Skills/Plugin chuyên cho video
- **[Claude-AI-Video-Producer-Plugin](https://github.com/danielrosehill/Claude-AI-Video-Producer-Plugin)** — plugin cho Claude Code dẫn dắt toàn bộ project video: brief → chọn model → character sheet → script → storyboard → pipeline generate → ghép → export. Claude Code đóng vai "đạo diễn" gọi các bước.
- **[claude-code-video-toolkit](https://github.com/digitalsamba/claude-code-video-toolkit)** — bộ skill + MCP server + tool cho Claude Code dựng video bằng **Remotion** (video dựng bằng React/code, không cần AI generate hình), voiceover ElevenLabs/Qwen3-TTS, xử lý FFmpeg.
- **[video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)** — skill cho Claude Code/Codex làm video sản phẩm (product video) bằng Remotion, có sẵn 152 "shot recipe" + 209 motion preview.

## So sánh nhanh 2 kiểu "code route"

| | AI-generated visual (Kling/Runway/Sora) | Code-rendered visual (Remotion) |
|---|---|---|
| Hình ảnh | Model AI tạo mới mỗi lần | Dựng từ template/animation code sẵn |
| Tốn phí | Trả theo API call (có free tier giới hạn) | Chỉ tốn compute (render local, free) |
| Kiểm soát | Khó đoán chính xác output | Kiểm soát pixel-perfect |
| Phù hợp | Video "sáng tạo", nội dung đa dạng | Product demo, giải thích, nhất quán brand |

## Vì sao biết Claude Code là lợi thế ở hướng này?

- Bạn đã quen đọc/sửa codebase, chạy terminal, cài MCP server — đúng kỹ năng cần để setup `short-video-maker` hay `claude-code-video-toolkit`.
- Agent Skills (đã học) chính là cách Claude Code "biết" cách dùng Remotion/FFmpeg đúng quy trình — `video-shotcraft` và `claude-code-video-toolkit` là 2 ví dụ Skill thực tế áp dụng cho video.

## 5 câu hỏi quan trọng

**1. Dùng Claude Code để "viết workflow" khác gì dùng Claude Code để "chạy workflow"?**
Viết workflow: Claude Code tạo ra script/server chạy pipeline, sau đó pipeline tự lặp lại không cần bạn gõ prompt nữa. Chạy 1 phiên: bạn ngồi ra lệnh từng bước mỗi lần.

**2. MCP server giúp gì trong việc build workflow video?**
Bắc cầu để Claude Code/Claude Desktop gọi trực tiếp tool tạo video (ví dụ `short-video-maker`) như một MCP server bình thường — gõ yêu cầu, Claude tự gọi tool render video, không cần tự viết lại logic gọi API.

**3. Khác biệt chính giữa AI-generated visual và code-rendered visual (Remotion)?**
AI-generated (Kling/Runway) tạo hình mới mỗi lần, tốn phí API, khó đoán output chính xác. Code-rendered (Remotion) dựng từ template/code, chỉ tốn compute, kiểm soát pixel-perfect — phù hợp video có cấu trúc lặp (product demo).

**4. claude-code-video-toolkit và video-shotcraft có điểm gì chung?**
Cả hai là Agent Skill cho Claude Code, dùng Remotion (video bằng code/React) thay vì AI generate hình, kèm sẵn template/recipe để Claude theo đúng quy trình dựng video.

**5. Vì sao người đã học Claude Code 101 (MCP, Skills) có lợi thế ở hướng code này?**
Vì các repo case study (short-video-maker, claude-code-video-toolkit) đúng là MCP server và Agent Skill — kỹ năng cài MCP, đọc/dùng Skill đã học trước đó áp dụng trực tiếp, không cần học lại từ đầu.
