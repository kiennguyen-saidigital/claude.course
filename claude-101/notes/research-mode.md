# Research mode trong Claude

> **Ý chính:** Research biến Claude từ trợ lý hội thoại thành **điều tra viên hệ thống (systematic investigator)**. Thay vì một lần tìm kiếm, Claude hoạt động **agentic** — chạy nhiều lượt tìm nối tiếp nhau, tự quyết tìm gì tiếp theo dựa trên cái đã thấy. Trả về **báo cáo đầy đủ có trích nguồn (citations)** trong 5–45 phút — việc thường tốn hàng giờ làm tay.

## Research là gì?

Tính năng nâng cao biến Claude thành điều tra viên hệ thống. Bật Research → Claude không chỉ trả lời mà **khám phá câu hỏi từ nhiều góc**, tổng hợp thông tin từ web và các integration đã kết nối.

Coi như có trợ lý nghiên cứu giỏi dành hàng giờ thu thập, đối chiếu nguồn (cross-reference), viết báo cáo đầy đủ — nhưng xong trong vài phút.

Hợp khi cần **hơn một câu trả lời nhanh**: cần hiểu sâu, kéo thông tin từ nhiều nguồn, so sánh nhiều góc nhìn, tổng hợp thành insight hành động được.

## 4 điểm cốt lõi

- **Agentic, đa lượt:** nhiều lượt tìm xây trên nhau, tự xác định tìm gì tiếp — không cần chỉ đạo từng bước.
- **Nhanh:** phần lớn báo cáo xong 5–15 phút; phức tạp tới 45 phút.
- **Extended thinking tự bật cùng Research:** vừa lập kế hoạch cẩn thận vừa thu thập đầy đủ, chia yêu cầu phức tạp thành phần nhỏ.
- **Citations dễ kiểm chứng:** mọi khẳng định link về nguồn → tin tưởng + tự verify nhanh.

## Khi nào dùng Research?

**Dùng Research khi cần:**
- Báo cáo tổng hợp từ **nhiều nguồn**.
- Phân tích sâu across web + integration (vd Google Workspace).
- Điều tra kỹ vốn tốn hàng giờ làm tay.
- Phân tích so sánh (đối thủ, nhà cung cấp).
- Báo cáo có nguồn verify được.

Lý tưởng cho: phân tích thị trường + nghiên cứu cạnh tranh, lập kế hoạch dự án phức tạp (offsite, ra mắt sản phẩm), tổng hợp từ email/calendar/tài liệu, viết tài liệu kỹ thuật từ nhiều nguồn, chuẩn bị briefing cần thông tin mới + đã xác minh.

### Khi nào KHÔNG dùng — chọn cái khác

| Dùng thay thế | Khi nào |
|---|---|
| **Web search** | Cần 1 sự kiện cụ thể nhanh (giá cổ phiếu, địa chỉ); chỉ cần 1–2 nguồn; tốc độ quan trọng hơn độ đầy đủ. |
| **Extended thinking** | Suy luận sâu vấn đề phức tạp **không cần thông tin ngoài**; toán, debug code, phân tích logic; đáp án đến từ lập luận chứ không từ thu thập. |
| **Enterprise search** | Câu trả lời từ kiến thức **nội bộ** (docs, Slack, email, ghi chú họp); onboarding tìm cách công ty xử lý việc gì; câu hỏi riêng của công ty, không phải web công khai. |

## Research hoạt động thế nào — 4 bước

1. **Lập kế hoạch** — bật Research → extended thinking tự kích hoạt. Claude chia nhỏ yêu cầu, xác định cần thông tin gì, lên kế hoạch điều tra các góc.
2. **Nhiều lượt tìm** — không phải một lần, mà nhiều lượt xây trên nhau; tự quyết tìm gì tiếp dựa trên cái đã thấy, theo đuổi manh mối, lấp chỗ trống.
3. **Tổng hợp** — sau khi thu thập từ nhiều nguồn (web + integration như Gmail, Google Calendar, Google Drive), gom thành báo cáo có tổ chức.
4. **Trích nguồn** — mọi khẳng định link về nguồn để verify + đào sâu.

## Dùng thực tế

1. Click nút **+** góc dưới trái khung chat.
2. Chọn **Research** — sáng lên khi active.
3. Nhập prompt → submit.
4. Claude chạy nền, hiện chỉ báo tiến độ khi tìm + phân tích.

**Quan trọng:** **Web search phải bật** để Research chạy. Bật từ cùng menu **+**.

## Mẹo viết prompt Research tốt

Research tốn 5–45 phút → đầu tư viết prompt đáng giá:

- **Cụ thể về mục tiêu.** Đừng "Kể về thị trường EV" → thử "Phân tích thị trường pin xe điện — xác định người chơi chính, xu hướng công nghệ, thách thức chuỗi cung ứng ảnh hưởng quyết định đầu tư."
- **Chỉ định cấu trúc / phần muốn có.** Claude tổ chức kết quả theo cấu trúc bạn cho. Vd: "So sánh địa điểm offsite gồm: vị trí + tiếp cận, không gian họp + tiện nghi, catering, giá."
- **Thêm ràng buộc liên quan.** Ngân sách, timeline, yêu cầu địa lý → giúp Claude tập trung vào lựa chọn phù hợp.
- **Nhờ Claude tinh chỉnh prompt.** Chưa biết đặt câu hỏi sao → nhờ Claude viết prompt Research tốt hơn trước khi bật.

## Kết hợp với integration

Có Google Workspace / integration khác → Research mạnh hơn: Claude kéo context từ email, calendar, tài liệu song song với web.

Ví dụ:
- "Tóm tắt thảo luận về Project X across email + Slack, rồi nghiên cứu best practice ngành cho việc tương tự."
- "Xem lịch tuần tới của tôi và nghiên cứu từng công ty tôi sắp gặp."
- "Tìm mọi tài liệu nội bộ về chiến lược giá và so với cách đối thủ định vị."

Steer Claude bằng: "Kéo context liên quan từ Google Drive tôi" hoặc "Gồm insight từ email gần đây về chủ đề này."

**Pro tip:** Tắt web search để **nghiên cứu chỉ nội bộ** across tool đã kết nối — hợp câu hỏi như "Team bàn gì về ra mắt Q3 across Slack + Docs?"

## 5 câu hỏi quan trọng

**1. Research khác một lần web search thường ở đâu?**
Research hoạt động agentic đa lượt: chạy nhiều lượt tìm xây trên nhau, tự quyết tìm gì tiếp dựa trên cái đã thấy, khám phá nhiều góc, rồi tổng hợp thành báo cáo có trích nguồn. Web search chỉ một lượt, 1–2 nguồn.

**2. Extended thinking liên quan gì tới Research?**
Bật Research → extended thinking tự kích hoạt. Cho phép Claude vừa lập kế hoạch cẩn thận vừa thu thập đầy đủ, chia yêu cầu phức tạp thành phần quản lý được.

**3. Khi nào nên chọn Enterprise search thay vì Research?**
Khi câu trả lời đến từ kiến thức nội bộ tổ chức (docs, Slack, email, ghi chú họp), khi onboarding tìm cách công ty xử lý việc gì, hoặc câu hỏi riêng công ty chứ không phải web công khai.

**4. Điều kiện bắt buộc để Research chạy là gì?**
Web search phải bật (từ cùng menu +). Có thể tắt web search để nghiên cứu chỉ nội bộ across integration đã kết nối.

**5. Prompt Research tốt cần gì?**
Cụ thể về mục tiêu, chỉ định cấu trúc/phần muốn có, thêm ràng buộc (ngân sách, timeline, địa lý). Nếu bí, nhờ chính Claude tinh chỉnh prompt trước khi bật.