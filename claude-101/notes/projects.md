# Sử dụng Projects trong Claude

> **Ý chính:** Project là không gian làm việc riêng (self-contained workspace) có bộ nhớ, lịch sử chat, kho kiến thức (knowledge base) và hướng dẫn tùy chỉnh (instructions) riêng. Dùng cho công việc lặp lại, dài hạn — không phải câu hỏi một lần.

## Project là gì?

Một môi trường chuyên biệt cho một luồng công việc (work stream) cụ thể. Mỗi Project gồm 4 thành phần riêng:

- **Bộ nhớ + lịch sử chat (chat history):** mọi cuộc trò chuyện trong Project gom lại một chỗ.
- **Kho kiến thức (knowledge base):** tài liệu bạn tải lên để Claude tham chiếu ở *mọi* chat trong Project — không phải upload lại mỗi lần.
- **Hướng dẫn (project instructions):** quy định cách Claude hành xử, áp dụng cho tất cả chat.
- **Chia sẻ (sharing):** với Claude for Work, nhiều người dùng chung một context.

## Khi nào dùng Project?

Dùng khi công việc **liên tục (ongoing)**, không phải hỏi một lần. Dấu hiệu:

- Có **tài liệu tham khảo dùng đi dùng lại** (ghi chú họp, báo cáo, dữ liệu cũ...).
- Có **yêu cầu nhất quán** về cách Claude trả lời (luôn trang trọng, luôn trích nguồn, luôn theo template).
- Cần **cộng tác nhóm (team collaboration)** trên cùng nền tảng chung.

## 3 bước tạo Project

**Bước 1 — Tạo Project:**
- Sidebar trái → "Projects", hoặc vào `claude.ai/projects`.
- "+ New Project" ở góc trên phải.
- Đặt tên mô tả rõ (vd "Q4 Marketing Campaign").
- Thêm mô tả ngắn (Claude *không* đọc mô tả này — chỉ để bạn và đồng đội hiểu mục đích).
- Chọn quyền riêng tư (private) hoặc chia sẻ với tổ chức.

**Bước 2 — Viết Instructions:**
Instructions tốt nên có:
- **Bối cảnh (context):** "Project này để tạo nội dung marketing cho sản phẩm B2B."
- **Quy trình (process):** "Trước tiên nghĩ cấu trúc blog, sau đó viết bản nháp."
- **Giọng điệu (tone/style):** "Chuyên nghiệp nhưng gần gũi, tránh thuật ngữ."
- **Yêu cầu cụ thể:** "Luôn có call-to-action ở cuối."
- Có thể dùng để **tự động hóa workflow:** "Khi tôi upload transcript họp, tạo bản tóm tắt theo template này." → coi instructions như *lập trình* hành vi Claude.
- Nhấn "Save instructions". Áp dụng cho mọi chat, kết hợp với user preferences + styles.

**Bước 3 — Xây kho kiến thức (knowledge base):**
- Menu files bên phải → nút "+".
- Định dạng: PDF, DOCX, CSV, TXT, HTML... hoặc kết nối Google Drive.
- Nên upload: tài liệu tham khảo (brand guidelines, style guide, template), tài liệu nền (báo cáo nghiên cứu, ghi chú họp), ví dụ mẫu, tài liệu kỹ thuật.
- **Pro tip:** đặt tên file mô tả rõ. Claude dùng tên file để tìm đúng thông tin → `Q4-2024-Brand-Guidelines.pdf` tốt hơn `document1.pdf`.

## Xử lý kho kiến thức lớn — RAG

Khi knowledge base gần chạm giới hạn context window, Claude tự bật **RAG (Retrieval Augmented Generation)**:

- Không nạp toàn bộ nội dung vào bộ nhớ một lần.
- Thay vào đó **tìm và lấy ra phần liên quan nhất** cho từng câu hỏi.
- Tăng dung lượng Project **tới 10 lần** mà vẫn giữ chất lượng.
- Có chỉ báo trực quan (visual indicator) khi RAG bật; trải nghiệm không đổi.

## Cộng tác (Claude for Work: Team & Enterprise)

**3 mức quyền (permission levels):**

| Mức | Quyền |
|-----|-------|
| **Can view** | Xem nội dung, dùng kiến thức, chat — không sửa được (read-only + thảo luận). |
| **Can edit** | Toàn quyền: sửa instructions, cập nhật kiến thức, quản lý thành viên. |
| **Owner** | Kiểm soát tất cả, gồm ai được thấy Project. |

**Chia sẻ:** mở Project → nút "Share project" → thêm người qua tên/email (hoặc dán danh sách email hàng loạt), hoặc chia sẻ với "Everyone at [tổ chức]". Người nhận thấy trong tab "Shared with me".

## Ví dụ Project

- **Ra mắt sản phẩm Q4:** specs, phân tích đối thủ, ghi chú messaging.
- **Hỗ trợ nghiên cứu:** review cạnh tranh, dữ liệu user research, phản hồi khách.
- **Hub tài khoản khách hàng:** brand guidelines, deliverable cũ, lịch sử liên lạc.
- **Không gian tổ chức sự kiện:** hợp đồng địa điểm, bio diễn giả, dữ liệu người tham dự.
- **Tạo mô tả công việc (job description):** JD cũ, team charter, yêu cầu headcount.

## Best practices

- **Bắt đầu hẹp, mở rộng sau** — một use case cụ thể, không gom mọi thứ vào một Project.
- **Giữ kho kiến thức mới** — tài liệu cũ → câu trả lời cũ. Rà soát định kỳ.
- **Viết instructions rõ ràng** — mơ hồ → kết quả thiếu nhất quán.
- **Đặt tên tài liệu mô tả** + gom file liên quan. Claude dùng tên file và vị trí gần nhau để hiểu quan hệ giữa tài liệu.
- **Tham chiếu tài liệu theo tên** khi hỏi: "Dựa trên báo cáo Q3, top mối lo của khách là gì?"

## 5 câu hỏi quan trọng

**1. Project khác chat thường ở điểm nào?**
Project là workspace riêng có bộ nhớ, lịch sử chat, knowledge base và instructions riêng — áp dụng cho *mọi* chat trong Project. Chat thường không có context bền vững giữa các cuộc trò chuyện.

**2. Khi nào nên tạo Project thay vì hỏi trực tiếp?**
Khi công việc liên tục (ongoing): có tài liệu tham khảo dùng lại nhiều lần, yêu cầu trả lời nhất quán, hoặc cần cộng tác nhóm trên cùng context.

**3. Project instructions dùng để làm gì?**
Quy định cách Claude hành xử ở mọi chat: bối cảnh, quy trình, giọng điệu, yêu cầu cụ thể. Còn dùng để tự động hóa workflow (vd upload transcript → tự tóm tắt theo template).

**4. RAG (Retrieval Augmented Generation) là gì và khi nào bật?**
Khi knowledge base gần chạm giới hạn context window, Claude tự bật RAG: chỉ tìm và lấy phần tài liệu liên quan nhất thay vì nạp toàn bộ. Tăng dung lượng tới 10 lần, giữ nguyên chất lượng.

**5. Ba mức quyền khi chia sẻ Project là gì?**
**Can view** (xem + chat, không sửa), **Can edit** (toàn quyền sửa nội dung + quản lý thành viên), **Owner** (kiểm soát tất cả gồm quyền hiển thị).