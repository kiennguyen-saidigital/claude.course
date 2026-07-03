# Bài 2: What We Mean by AI

> Nguồn (source): https://anthropic.skilljar.com/ai-capabilities-and-limitations/456427
> Phần "Getting started" — thời lượng ~20 phút (có video 4 phút).

## Học xong bài này bạn sẽ

- Phân biệt **AI sinh nội dung (generative AI)** với loại AI phân loại/dự đoán
  (classification & prediction) bạn gặp hằng ngày.
- Hiểu các tính chất của generative AI nằm trên một **dải liên tục (continuum)** từ
  khả năng (capability) đến giới hạn (limitation).
- Xem trước 4 tính chất cốt lõi sẽ học sâu: next token prediction, knowledge, working
  memory, steerability.

## Generative AI là gì

Phần lớn AI trên thế giới **không phải** generative: bộ lọc spam (spam filter), gợi ý
(recommendation), phát hiện gian lận (fraud detection) — chúng **phân loại / xếp hạng**
nội dung có sẵn.

Khóa này nói về loại AI **sinh ra nội dung mới**: mô hình văn bản dựa trên kiến trúc
**transformer**, tạo nội dung **từng token một (one token at a time)**.

→ Điểm mấu chốt: **generative = tạo mới**, khác với **classification = sắp xếp/phân loại cái có sẵn**.

## Khung 4 tính chất (Capabilities & Limitations Framework)

4 tính chất quyết định AI làm được / không làm được gì cho bạn. Mỗi tính chất nằm trên
một **phổ (spectrum)**: càng lệch về phải (LIMITATION) thì càng phải **kiểm chứng
(verify)** và bù trừ (compensate).

| Tính chất | Câu hỏi cốt lõi | Mạnh (CAPABILITY) | Yếu (LIMITATION) |
|-----------|-----------------|-------------------|------------------|
| **Next Token Prediction** | Câu trả lời của AI từ đâu ra? | Lối mòn quen thuộc: tóm tắt, đổi định dạng, giải thích khái niệm phổ biến | Vùng mới lạ, mẫu thưa thớt; "đúng thật vs nghe có vẻ đúng" (true vs sounds true) |
| **Knowledge** | AI thật sự biết gì? | Phổ biến, mới-trong-lúc-train, nhất quán: chủ đề chính thống, ngôn ngữ phổ biến | Hiếm, sau mốc cutoff, ngách, địa phương, hoặc còn tranh cãi |
| **Working Memory** | Hiện AI đang chú ý vào cái gì? | Tài liệu vừa đủ, phiên hiện tại, bạn cấp ngữ cảnh liên quan | Tài liệu/hội thoại rất dài, kỳ vọng nhớ xuyên phiên ("vách đá" — the cliff) |
| **Steerability** | Mình kiểm soát được bao nhiêu? | Lệnh ngắn, cụ thể, kiểm chứng được ("trả lời dạng bảng", "dưới 100 từ") | Chuỗi suy luận dài, yêu cầu trừu tượng, đòi độ chính xác bẩm sinh |

## Key takeaways (điểm cốt lõi)

- **Generative AI tạo nội dung mới**, không phải phân loại nội dung có sẵn.
- AI **không đồng đều** — không phải lúc nào cũng giỏi, cũng không phải lúc nào cũng dở.
  Nó mạnh/yếu theo **4 trục đoán trước được**: next token prediction, knowledge, working
  memory, steerability.
- Mỗi tính chất là một **continuum**. Cùng một cơ chế vừa cho bạn khả năng, vừa tạo ra
  giới hạn (hai mặt của một đồng xu).
- **Niềm tin có hiệu chỉnh (calibrated trust)** = đặt tác vụ của bạn đúng vị trí trên
  phổ, chứ không phải tin/không tin AI một cách toàn bộ.

## Bài tập (exercise): Generative or Not?

1. **Liệt kê 5 tính năng có AI** bạn đã dùng tuần này (rộng tay: autocomplete, gắn thẻ
   ảnh, lọc spam, chatbot, dịch, gợi ý sản phẩm, trợ lý giọng nói).
2. **Mỗi cái tự phán**: nó *tạo nội dung mới*, hay đang *sắp xếp/xếp hạng/phân loại* cái có sẵn?
3. **Đưa danh sách cho AI kiểm tra**. Cái nào sai/không chắc → nhờ giải thích phân biệt
   trong 1 câu. Rồi hỏi: "Trong 5 cái này, cái nào dễ có kiểu lỗi mà khóa học này giúp tôi hiểu nhất?"
4. **Quay lại danh sách tác vụ ở Bài 1.** Mỗi tác vụ gắn nhãn câu hỏi tính chất hợp nhất:
   - Câu trả lời từ đâu? → Next Token Prediction
   - Nó biết gì? → Knowledge
   - Nó đang chú ý cái gì? → Working Memory
   - Mình kiểm soát bao nhiêu? → Steerability

> Không cần đúng. Bạn đang tạo **dự đoán (predictions)** để kiểm chứng qua 4 bài tới.

## Câu hỏi tự ngẫm (reflection)

- Phân biệt generative/classification có làm bạn nghĩ khác về công cụ nào đang dùng không?
- Có tác vụ nào thấy thuộc về **hơn một** tính chất không?

## Tiếp theo

Trước khi đào sâu 4 tính chất, dành 1 bài cho việc **AI có "tính cách" như thế nào**:
vì sao nó lịch sự, hữu ích, trung thực; vì sao đôi khi đồng ý quá dễ; vì sao từ chối
vài việc. Quá trình "nhào nặn" đó để lại dấu vết trên mọi thứ phía sau. → Bài *How AI
Gets Its Character*.

## 5 câu hỏi quan trọng (tự kiểm tra)

**1. Generative AI khác AI phân loại (classification) ở chỗ nào?**
Generative AI **tạo nội dung mới** từng token một (transformer). AI phân loại thì
**sắp xếp/xếp hạng/gán nhãn** nội dung có sẵn (spam filter, recommendation, fraud
detection). Phần lớn AI trên đời là loại phân loại, không phải generative.

**2. "Continuum / spectrum" của một tính chất nghĩa là gì?**
Mỗi tính chất chạy từ **khả năng (capability)** đến **giới hạn (limitation)**. **Cùng
một cơ chế** vừa tạo điểm mạnh vừa tạo điểm yếu — không tách rời được. Càng lệch về phía
limitation, càng phải kiểm chứng.

**3. Bốn câu hỏi cốt lõi ứng với 4 tính chất là gì?**
- Câu trả lời từ đâu ra? → **Next Token Prediction**
- AI thật sự biết gì? → **Knowledge**
- AI đang chú ý vào gì? → **Working Memory**
- Mình kiểm soát bao nhiêu? → **Steerability**

**4. "Calibrated trust" (niềm tin có hiệu chỉnh) là gì?**
Là **định vị tác vụ trên phổ** rồi tin ở mức phù hợp, thay vì tin/không tin AI một cách
toàn bộ. AI không đồng đều giỏi hay đồng đều dở → phải xét theo từng trục.

**5. Khi nào một tính chất nghiêng về phía "limitation" (cần cảnh giác)?**
- Next Token Prediction: vùng mới lạ, mẫu thưa, "nghe đúng" nhưng chưa chắc đúng.
- Knowledge: chủ đề hiếm, sau mốc cutoff, ngách, địa phương, tranh cãi.
- Working Memory: tài liệu/hội thoại rất dài, kỳ vọng nhớ xuyên phiên.
- Steerability: lệnh trừu tượng, chuỗi suy luận dài, đòi độ chính xác cao.

## Tài nguyên

- Video: "What we mean by generative AI" (YouTube, 4 phút) — https://www.youtube.com/watch?v=AiiiyYiEJa4
- License: CC BY-NC-SA 4.0.
