# Skills trong Claude

> **Ý chính:** Skill là **gói chuyên môn (expertise package)** — thư mục chứa hướng dẫn (instructions), script và tài nguyên mà Claude *nạp động (load dynamically)* khi gặp task phù hợp. Dạy Claude làm một loại việc cụ thể theo cách lặp lại được, nhất quán mỗi lần. **Projects lưu kiến thức, Skills thực thi quy trình.**

## Skill là gì?

Thư mục gồm instructions + script + tài nguyên, Claude tự nạp khi liên quan. Coi như *gói chuyên môn* dạy Claude cách hoàn thành một task cụ thể theo cách lặp lại được.

Bạn đã dùng Skill mà không biết: mọi lần Claude tạo file **Excel, PowerPoint, Word, PDF** đều do Skill chạy nền. Nhưng Skill vượt xa tạo tài liệu — Skill tùy chỉnh có thể mã hóa (codify) cả một workflow: phân tích chênh lệch quý (quarterly variance), review giọng thương hiệu (brand voice), checklist tuân thủ (compliance)... để Claude luôn theo đúng các bước nghiêm ngặt.

## 2 loại Skill

| Loại | Ai tạo | Cách dùng |
|------|--------|-----------|
| **Anthropic Skills** | Anthropic tạo + bảo trì | Có sẵn cho *mọi* user trả phí. Tạo file Excel/Word/PowerPoint/PDF nâng cao. Claude tự gọi khi liên quan — không cần làm gì. |
| **Custom Skills** | Bạn hoặc tổ chức tạo | Cho workflow chuyên biệt, task theo domain. Vd: áp brand guidelines vào slide, cấu trúc ghi chú họp theo format riêng, chạy quy trình phân tích dữ liệu của tổ chức. |

## Bật Skills

Skill hiện là **feature preview** cho plan **Pro, Max, Team, Enterprise** (Free chỉ đọc hiểu, không thực hành).

Điều kiện: phải bật **Code execution and file creation** — Skill cần môi trường sandbox an toàn của Claude để chạy.

Các bước:
1. Settings → **Capabilities**.
2. Bật **Code execution and file creation**.
3. Cuộn tới mục **Skills**.
4. Bật/tắt từng skill tùy nhu cầu.

- **Enterprise:** Owner phải bật cả Code execution + Skills trong Admin settings trước, rồi thành viên mới truy cập được.
- **Team:** preview bật sẵn ở cấp tổ chức.

## Dùng Skills thực tế

Điểm hay: **bạn thường không cần nghĩ tới Skill** — Claude tự chọn dựa trên yêu cầu. Ví dụ prompt kích hoạt Skill:

- "Tạo file Excel theo dõi chi phí hàng tháng, có công thức tính tổng."
- "Biến ghi chú họp này thành bài PowerPoint."
- "Tạo báo cáo PDF tóm tắt dữ liệu này."
- "Xây mô hình tài chính Excel có phân tích kịch bản (scenario analysis)."

Khi Claude dùng Skill, bạn thấy nó nhắc trong chuỗi suy nghĩ (chain of thought). Kết quả là file tải về được (lưu máy hoặc Google Drive).

### Làm việc trên file có sẵn

Cùng khả năng này cho phép Claude làm việc với **file của bạn** (trong môi trường cô lập) để tạo phiên bản mới. Upload slide, spreadsheet, hợp đồng (`.xlsx`, `.pptx`, `.docx`, `.pdf`) → Claude tạo slide, phân tích, thêm gợi ý chỉnh sửa (redline).

- **Lưu ý:** trong Chat, Claude tạo *bản mới* của tài liệu, **không sửa trực tiếp** bản gốc.
- Cần cấp quyền nguồn dữ liệu ngoài: bật **Allow limited network access** khi được hỏi.

## An toàn (security)

Vì Skill có thể chứa **code chạy được**, dùng cẩn thận:

- Chỉ cài Custom Skill từ **nguồn tin cậy**.
- Anthropic Skills đã được Anthropic kiểm thử + bảo trì.
- Custom Skill bạn upload là **riêng tư** cho tài khoản cá nhân.
- Cài Skill từ nguồn ngoài → **review nội dung trước** để hiểu nó làm gì.

## Tạo Custom Skill

Sức mạnh thật của Skill nằm ở việc tự tạo. Cách dễ nhất: **trò chuyện với chính Claude** — không cần viết code hay tạo file thủ công.

5 bước tạo qua hội thoại:
1. **Mở chat mới, nói bạn muốn gì** — vd "Tôi muốn tạo skill viết quarterly business review."
2. **Trả lời câu hỏi của Claude** — Claude phỏng vấn về workflow: skill làm gì? output tốt trông thế nào? khi nào dùng?
3. **Upload tài liệu tham khảo** nếu có — template, style guide, brand asset, ví dụ mẫu.
4. **Lưu skill** — Claude tạo file skill có cấu trúc chuẩn, bạn chỉ cần lưu.
5. **Xem skill** — tab **Customize** ở sidebar trái liệt kê mọi skill; sửa thủ công hoặc bằng chat.

Skill custom hiện cùng danh sách với Anthropic Skills. Từ đó Claude tự gọi khi gặp task liên quan — không cần trigger thủ công. Muốn cải thiện thì bảo Claude sửa, nó cập nhật file cho bạn.

## Skills vs. Projects

Cả hai đều cấp thêm context cho Claude, nhưng khác vai trò: **Projects lưu kiến thức (what), Skills thực thi quy trình (how).**

| | **Projects** | **Skills** |
|---|---|---|
| **Mục đích** | Lưu kiến thức Claude tham chiếu | Định nghĩa quy trình Claude thực thi |
| **Hợp cho** | Context dài hạn, tài liệu tham khảo, cộng tác nhóm | Workflow lặp lại, task nhiều bước, phương pháp nhất quán |
| **Ví dụ** | Customer hub, research buddy, feedback generator | Guideline quy trình (brand/legal), viết blog, tạo PDF |
| **Tồn tại** | Kiến thức có ở *mọi* chat trong Project | Instructions áp dụng khi skill được gọi |

Hai cái **bổ trợ nhau**: một skill có thể tham chiếu kiến thức trong project — vd skill "customer call prep" lấy hồ sơ khách từ knowledge base của project. Project cho *cái gì* (thông tin), skill cho *cách làm* (quy trình).

## 5 câu hỏi quan trọng

**1. Skill là gì?**
Thư mục chứa instructions, script và tài nguyên mà Claude nạp động khi gặp task phù hợp. Là gói chuyên môn (expertise package) dạy Claude làm một loại việc theo cách lặp lại, nhất quán.

**2. Hai loại Skill khác nhau thế nào?**
**Anthropic Skills** do Anthropic tạo + bảo trì, có sẵn cho mọi user trả phí, Claude tự gọi (vd tạo Excel/Word/PPT/PDF). **Custom Skills** do bạn/tổ chức tạo cho workflow chuyên biệt, riêng tư với tài khoản.

**3. Cần điều kiện gì để bật Skills?**
Plan Pro/Max/Team/Enterprise (feature preview) và phải bật **Code execution and file creation** — vì Skill chạy trong sandbox an toàn của Claude.

**4. Vì sao phải cẩn thận về security với Skill?**
Skill có thể chứa code chạy được. Chỉ cài Custom Skill từ nguồn tin cậy, review nội dung trước khi dùng. Anthropic Skills đã được kiểm thử; Custom Skill bạn upload là riêng tư.

**5. Skills khác Projects ở điểm nào?**
Projects **lưu kiến thức** (what) — tài liệu tham khảo dùng across chat. Skills **thực thi quy trình** (how) — các bước, thứ tự thao tác, phương pháp làm nhất quán mỗi lần. Bổ trợ nhau: skill có thể lấy kiến thức từ project.