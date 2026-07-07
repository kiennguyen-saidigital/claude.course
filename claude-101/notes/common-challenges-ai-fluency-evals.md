# Khắc phục sự cố, AI Fluency & Evals

> **Ý chính:** Câu trả lời đầu của Claude hiếm khi hoàn hảo — đó là chuyện bình thường. Coi prompt đầu là **khởi đầu cuộc trò chuyện (iteration mindset)**, không phải yêu cầu một phát ăn ngay. Khi gặp lỗi thường gặp, có kỹ thuật sửa cụ thể. **AI Fluency** = năng lực cộng tác hiệu quả với AI (khung 4D). **Evals** = cách nhẹ nhàng để tự kiểm chứng Claude có làm tốt task của riêng bạn không.

## Các lỗi thường gặp & cách sửa

| Vấn đề | Nguyên nhân | Cách sửa |
|--------|-------------|----------|
| **Trả lời quá chung chung (generic)** | Prompt thiếu ngữ cảnh về tình huống cụ thể | Thêm chi tiết về đối tượng (audience), vai trò (role), ràng buộc (constraints). Vd thay "Viết email báo trễ dự án" → "Viết email cho khách hàng doanh nghiệp báo tích hợp phần mềm trễ 2 tuần; đây là lần trễ thứ hai; giọng chuyên nghiệp nhưng có lời xin lỗi." |
| **Quá dài / quá ngắn** | Claude đang đoán độ dài phù hợp | Nói rõ: "tóm tắt 2 đoạn", "dưới 100 từ", hoặc "phân tích đầy đủ, không giới hạn độ dài". |
| **Không đúng định dạng (format)** | Claude hiểu *cái gì* nhưng không rõ *trình bày thế nào* | **Show, don't tell** — đưa ví dụ mẫu định dạng, hoặc mô tả cấu trúc: "dùng bullet, mỗi mục có tiêu đề in đậm". |
| **Thông tin nghe chắc nịch nhưng sai** | Claude đôi khi tạo thông tin hợp lý nhưng sai, nhất là dữ kiện cụ thể / chủ đề ngách | Việc quan trọng: **tự kiểm chứng (verify)** dữ kiện độc lập. Yêu cầu Claude trích nguồn (cite sources) hoặc nêu mức độ tự tin. Bật **web search** để neo câu trả lời vào thông tin hiện tại. |
| **Giọng điệu (tone) không hợp** | Claude mặc định giọng hữu ích + chuyên nghiệp | Mô tả tone bằng lời thường: "thân thiện hơn", "trang trọng, có uy quyền". Đưa ví dụ văn phong bạn muốn. |

## Iteration mindset (tư duy lặp)

Prompt đầu là **điểm xuất phát**, không phải kết quả cuối. User giỏi làm việc với Claude:

- **Coi bản nháp đầu là điểm khởi đầu** — đọc kết quả, xác định cái gì được / chưa được, rồi tinh chỉnh.
- **Góp ý cụ thể** — "ngắn hơn đi" thì ổn, nhưng "cắt 2 đoạn đầu, làm phần kết thiên về hành động hơn" thì tốt hơn nhiều.
- **Biết khi nào làm lại từ đầu** — nếu cuộc trò chuyện đã lạc hướng, mở chat mới với prompt rõ hơn có khi nhanh hơn là cố lái lại.

## AI Fluency là gì?

**AI Fluency** = khả năng cộng tác hiệu quả với công cụ AI — không chỉ biết bấm nút nào, mà có **phán đoán (judgment)** dùng AI tốt trong nhiều tình huống khác nhau.

**Khung 4D** (do GS. Rick Dakan — Ringling College và GS. Joseph Feller — University College Cork nghiên cứu) gồm 4 năng lực cốt lõi:

| Năng lực | Nghĩa |
|----------|-------|
| **Delegation** (Ủy thác) | Quyết việc nào người làm, việc nào AI làm, chia task thế nào. Hiểu mục tiêu + khả năng AI để chọn cách cộng tác chiến lược. |
| **Description** (Mô tả) | Giao tiếp hiệu quả với AI: định nghĩa rõ output, dẫn dắt quá trình, chỉ định hành vi mong muốn. |
| **Discernment** (Phân định) | Đánh giá kết quả AI một cách phê phán: chất lượng, độ chính xác, độ phù hợp, chỗ nào cần cải thiện. |
| **Diligence** (Cẩn trọng) | Dùng AI có trách nhiệm & đạo đức: chọn lựa có suy nghĩ, minh bạch (transparency), chịu trách nhiệm (accountability) cho việc có AI hỗ trợ. |

> Khung prompt ở Lesson 2 (dựng bối cảnh, định nghĩa task, đặt quy tắc) chính là **Description**. Kỹ thuật khắc phục sự cố ở trên dựa vào **Discernment** và **Diligence**. Có khóa **AI Fluency** miễn phí đi sâu cả 4 năng lực.

## Evals — đánh giá Claude cho workflow của bạn

**Evals** (evaluations) = cách có hệ thống để kiểm tra Claude làm tốt tới đâu trên các loại task quan trọng với bạn. Đây là ứng dụng cụ thể của **Discernment**.

**Vì sao cần?** Công việc của bạn là độc nhất. Claude có thể xuất sắc viết copy marketing nhưng cần hướng dẫn thêm cho tài liệu kỹ thuật trong domain riêng của bạn. Chạy eval đơn giản giúp:

- Hiểu Claude tạo giá trị nhiều nhất ở đâu trong workflow.
- Nhận diện task cần bạn cấp thêm ngữ cảnh / ví dụ.
- Xây niềm tin vào output cho task lặp lại.

### Cách eval đơn giản (không cần hạ tầng phức tạp)

1. **Thu thập ví dụ** — gom 5–10 mẫu task bạn hay làm (email đã viết, báo cáo, phân tích đã làm).
2. **Viết prompt thử** — prompt tạo ra output tương tự, kèm ngữ cảnh bạn thường có khi làm việc đó.
3. **So sánh output** — chạy prompt, đối chiếu với mẫu của bạn. Tự hỏi:
   - Claude có nắm đúng thông tin cốt lõi không?
   - Tone và văn phong có phù hợp không?
   - Thiếu gì / cải thiện được gì?
4. **Tinh chỉnh** — điều chỉnh prompt, thêm ví dụ cho Claude thấy "tốt trông thế nào", hoặc xác định chỗ bắt buộc con người review.

**Ví dụ với dữ liệu:** lấy dataset bạn đã tự phân tích tay → nhờ Claude phân tích lại → so kết quả. Chú ý mẫu (pattern): có khi Claude ra đúng số nhưng bỏ sót xu hướng tổng thể → tinh chỉnh prompt cho phù hợp.

## Bước kế tiếp

Lesson sau: khám phá app **Claude desktop** với 3 chế độ tương tác — **Chat, Cowork, Code**.

## 5 câu hỏi quan trọng

**1. "Iteration mindset" là gì và vì sao quan trọng?**
Coi prompt đầu là khởi đầu cuộc trò chuyện, không phải yêu cầu một phát ăn ngay. Bản nháp đầu là điểm xuất phát — đọc, đánh giá, góp ý cụ thể, tinh chỉnh; biết khi nào nên mở chat mới thay vì cố lái lại.

**2. Khi Claude trả lời quá chung chung (generic), sửa thế nào?**
Thêm ngữ cảnh cụ thể: đối tượng (audience), vai trò (role), ràng buộc (constraints). Prompt càng chi tiết về tình huống thì output càng đúng ý.

**3. Làm sao xử lý thông tin nghe chắc nịch nhưng sai (hallucination)?**
Với việc quan trọng: tự kiểm chứng dữ kiện độc lập, yêu cầu Claude trích nguồn (cite sources) hoặc nêu mức tự tin, bật web search để neo vào thông tin hiện tại.

**4. Khung 4D của AI Fluency gồm gì?**
**Delegation** (chia việc người/AI), **Description** (giao tiếp rõ với AI), **Discernment** (đánh giá phê phán output), **Diligence** (dùng AI có trách nhiệm, minh bạch, chịu trách nhiệm).

**5. Eval là gì và làm cách đơn giản thế nào?**
Eval = cách có hệ thống kiểm tra Claude làm tốt tới đâu trên task của bạn. Cách nhẹ: thu 5–10 ví dụ thật → viết prompt thử → so output với mẫu của mình → tinh chỉnh prompt/thêm ví dụ. Giúp xây trực giác Claude hợp với task nào và chỗ nào cần con người review.
