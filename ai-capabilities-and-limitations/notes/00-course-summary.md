# Tóm tắt khóa học: AI Capabilities and Limitations

> Nguồn (source): https://anthropic.skilljar.com/ai-capabilities-and-limitations
> Đây là file tổng quan. Mỗi bài có note riêng (`01-...md`, `02-...md`, ...).
> Bài 1 đã đối chiếu với nội dung gốc (đã login). Các bài còn lại dưới đây dựa trên
> dàn ý + kiến thức nền, sẽ cập nhật khi học tới.

## Danh sách bài học (lesson URLs)

| # | Bài | Note | URL |
|---|-----|------|-----|
| 1 | Intro to AI Capabilities and Limitations | [01-intro.md](01-intro.md) ✅ | .../456128 |
| 2 | What We Mean by AI | [02-what-we-mean-by-ai.md](02-what-we-mean-by-ai.md) ✅ | .../456427 |
| 3 | How AI Gets Its Character | — | .../456439 |
| 4 | Next Token Prediction | — | .../456447 |
| 5 | Next Token Prediction — Try it out | — | .../456450 |
| 6 | Knowledge | — | .../456452 |
| 7 | Knowledge — Try it out | — | .../456454 |
| 8 | Working Memory | — | .../456455 |
| 9 | Working Memory — Try it out | — | .../457834 |
| 10 | Steerability | — | .../456457 |
| 11 | Steerability — Try it out | — | .../456460 |
| 12 | When Properties Collide | — | .../456459 |
| 13 | Next Steps | — | .../456461 |
| 14 | Course Quiz | — | .../456462 |

> URL đầy đủ: `https://anthropic.skilljar.com/ai-capabilities-and-limitations/<id>`

## Khóa học nói về gì

Khóa nhập môn (beginner) giải thích **cách các hệ AI sinh nội dung (generative AI)
hoạt động** và **giới hạn (limitations)** của chúng. Khóa tập trung vào "tính chất
của máy" (machine properties) — tức máy nó như thế nào. Đây là khóa đồng hành với
khóa **4D Framework**, vốn tập trung vào kỹ năng con người.

**Học xong bạn có thể:**
- Nhận ra khi nào AI cho ra kết quả bất ngờ hoặc sai.
- Đặt một tác vụ lên trục giữa **khả năng (capability) và giới hạn (limitation)**.
- Chọn đúng cách khắc phục cho từng loại vấn đề.

## Cấu trúc khóa (6 phần)

### 1. Getting Started (Bắt đầu)
- **Intro** — khóa học là gì và vì sao bạn nên học.
- **What We Mean by AI** — "AI" ở đây nghĩa là gì: một mô hình ngôn ngữ lớn
  (large language model — LLM) viết ra văn bản, không phải một bộ óc vạn năng.
- **How AI Gets Its Character** — "tính cách" của mô hình đến từ đâu: dữ liệu huấn
  luyện (training data — pretraining) + tinh chỉnh (fine-tuning / RLHF) + lời nhắc
  hệ thống (system prompt).

### 2. Next Token Prediction (Dự đoán token kế tiếp)
**Cơ chế cốt lõi.** Một LLM hoạt động bằng cách đoán **token kế tiếp** (next token —
một mẩu chữ) có xác suất (probability) cao nhất, dựa trên văn bản đã có. Mọi câu trả
lời là một chuỗi các lần đoán nối tiếp nhau.
- Hệ quả: mô hình không "tra cứu sự thật". Nó ghép một chuỗi nghe có vẻ đúng, nên có
  thể **bịa ra (hallucinate)** trong khi vẫn nói rất chắc chắn.
- Có bài thực hành "Try it out".

### 3. Knowledge (Kiến thức)
Kiến thức của mô hình bị **đóng băng ở thời điểm huấn luyện** (knowledge cutoff).
- Mạnh ở: sự thật phổ biến, kiến thức nền rộng.
- Yếu ở: sự kiện mới, dữ liệu hiếm hoặc riêng tư, chi tiết chính xác (số liệu, trích dẫn).
- Cách khắc phục: cung cấp ngữ cảnh; dùng tìm kiếm (search) / RAG cho thông tin mới.
- Có bài thực hành "Try it out".

### 4. Working Memory (Bộ nhớ làm việc)
Mô hình chỉ "nhớ" những gì nằm trong **cửa sổ ngữ cảnh (context window)** của lượt
hiện tại.
- Không có bộ nhớ bền (lasting memory) giữa các phiên — trừ khi bạn đưa lại vào ngữ cảnh.
- Ngữ cảnh quá dài có thể khiến nó bỏ sót thông tin ở giữa ("lost in the middle").
- Cách khắc phục: đưa phần quan trọng vào lời nhắc (prompt); tóm tắt; trình bày có
  cấu trúc rõ ràng.
- Có bài thực hành "Try it out".

### 5. Steerability (Khả năng điều hướng)
Mức độ bạn **lái (steer)** được hành vi của mô hình qua hướng dẫn (lời nhắc, system
prompt, ví dụ mẫu).
- Mạnh ở: đổi giọng văn (tone), định dạng (format), vai trò (role), tuân theo ràng buộc.
- Bị hạn chế khi: các hướng dẫn mâu thuẫn nhau hoặc quá phức tạp — mô hình bị lệch.
- Cách khắc phục: hướng dẫn rõ ràng; cho ví dụ mẫu (few-shot); chia yêu cầu lớn thành
  các bước nhỏ.
- Có bài thực hành "Try it out".

### 6. Conclusion & Assessment (Kết luận & Đánh giá)
- **When Properties Collide** — các tính chất trên tương tác với nhau. Vấn đề thực tế
  thường là tổ hợp (vd: thiếu kiến thức + ngữ cảnh dài → bịa nhiều hơn).
- **Next Steps** — học gì tiếp theo.
- **Course Quiz** — bài kiểm tra cuối khóa.

## 4 tính chất cốt lõi cần nhớ

| Tính chất | Là gì | Rủi ro chính | Cách xử lý |
|-----------|-------|--------------|------------|
| Dự đoán token kế tiếp (next token prediction) | Ghép văn bản theo từng token dựa trên xác suất | Bịa ra (hallucination) | Cấp ngữ cảnh, kiểm chứng |
| Kiến thức (knowledge) | Đóng băng lúc huấn luyện | Lỗi thời, sai số liệu | RAG, tìm kiếm, đưa nguồn |
| Bộ nhớ làm việc (working memory) | Chỉ nhớ trong cửa sổ ngữ cảnh | Quên / lạc thông tin | Đưa vào prompt, tóm tắt |
| Khả năng điều hướng (steerability) | Lái được hành vi qua hướng dẫn | Lệch khi lệnh mâu thuẫn | Prompt rõ, few-shot, chia nhỏ |
