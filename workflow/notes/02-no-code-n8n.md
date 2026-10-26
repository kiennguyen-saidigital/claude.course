# Hướng No-code: build workflow bằng n8n

> **Ý chính:** n8n là công cụ **node-based workflow automation** (giống Zapier/Make nhưng self-host được, free). Mỗi node trong pipeline (xem [bài 01](01-kien-truc-pipeline-video.md)) tương ứng 1 node n8n — bạn kéo-thả, nối dây, cấu hình API key, gần như không viết code.

## n8n hoạt động thế nào?

- Mở canvas, thêm **node** (mỗi node = 1 service: HTTP Request, OpenAI/Claude node, Webhook, Code node...).
- Nối node bằng "dây" — output node trước thành input node sau.
- Mỗi node có UI config riêng (nhập API key, chọn model, map field).
- Chạy thử từng node riêng (test), rồi chạy cả workflow, hoặc đặt trigger tự động (cron/webhook).

## Case study: repo free trên GitHub

Các repo này cho sẵn file workflow n8n (`.json`), import vào n8n là chạy được, sửa API key là xong — học nhanh nhất bằng cách đọc workflow người khác đã build.

### 1. [myVideoGenerator](https://github.com/adembtr/myVideoGenerator)
Pipeline: topic → **Groq** viết script → **Kling** tạo video → **ElevenLabs** đọc giọng → **Creatomate** ghép → đăng **TikTok/YouTube Shorts**. Map đúng 100% với 5 node đã học ở bài 01 — đọc workflow này để thấy từng node n8n tương ứng node nào.

### 2. [n8n-AI-Animal-VideoGen](https://github.com/slfagrouche/n8n-AI-Animal-VideoGen)
Input đơn giản hơn (chọn animal + style), dùng **DeepSeek** (script), **Runway** (video), **ElevenLabs** (voice). Tốt để thấy cách custom node Script khi muốn kiểm soát output chặt (không phải topic tự do mà chọn từ list).

### 3. [Autotube](https://github.com/Hritikraj8804/Autotube)
Docker-based, free hoàn toàn (dùng **Ollama/LLaMA** chạy local thay vì gọi API trả tiền) — slideshow ảnh thay vì video AI-gen, phù hợp nếu chưa muốn trả phí Kling/Runway.

## Vì sao học n8n hữu ích dù đã biết Claude Code?

- Claude Code giỏi về **code & file**, nhưng chưa quản lý tốt **trigger theo lịch** hay **kết nối nhiều API dạng visual** (không cần viết lại HTTP request mỗi lần).
- n8n cho bạn thấy **shape của workflow** (node nào nối node nào) rất rõ ràng trên UI — giúp hình dung kiến trúc trước khi tự code bằng Claude Agent SDK (bài 03).
- Nhiều team thực tế dùng **n8n cho phần orchestration/schedule**, còn **Claude Code cho phần dev/debug node phức tạp** — không phải chọn 1 trong 2 mà phối hợp.

## Hạn chế của no-code

- Logic phức tạp (retry thông minh, xử lý lỗi theo ngữ cảnh, tự sửa prompt khi output sai) viết trong n8n Code node vẫn phải viết JavaScript — không "zero-code" hoàn toàn.
- Debug sâu (ví dụ video gen trả lỗi lạ) khó hơn vì không có full control như code.
- Version control (git) cho workflow n8n kém hơn code thuần.

## 5 câu hỏi quan trọng

**1. n8n là loại công cụ gì?**
Node-based workflow automation (giống Zapier/Make), self-host được và free, cho phép kéo-thả nối node thay vì viết code.

**2. Vì sao nên đọc workflow n8n có sẵn (myVideoGenerator...) trước khi tự build?**
Vì file `.json` cho sẵn map rõ từng node (Groq/Kling/ElevenLabs/Creatomate) đúng với 5 node kiến trúc chuẩn — học nhanh hơn tự mò từ đầu.

**3. Autotube khác myVideoGenerator ở điểm nào?**
Autotube dùng Ollama/LLaMA chạy local (free hoàn toàn, không cần API trả tiền) và dùng slideshow ảnh thay vì video AI-gen như myVideoGenerator (dùng Kling).

**4. No-code (n8n) có hoàn toàn không cần code không?**
Không — logic phức tạp (retry, xử lý lỗi, tự sửa prompt) vẫn cần viết JavaScript trong Code node của n8n.

**5. Vì sao người biết Claude Code vẫn nên học n8n?**
n8n giúp hình dung rõ shape/kiến trúc workflow trên UI trước khi tự code bằng Claude Agent SDK; thực tế nhiều team dùng n8n cho schedule/orchestration và Claude Code cho phần dev/debug phức tạp — phối hợp cả hai.
