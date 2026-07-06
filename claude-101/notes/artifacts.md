# Sử dụng Artifacts trong Claude

> **Ý chính:** Artifact là kết quả độc lập, tương tác được (standalone, interactive output) mà Claude tạo trong một cửa sổ riêng bên cạnh cuộc trò chuyện. Thay vì nhận khối code/text dài chôn trong chat, bạn thấy nội dung được render và sẵn sàng dùng — website chạy được, biểu đồ tương tác, tài liệu tải về ngay.

## Artifact là gì?

Nội dung được tách ra cửa sổ riêng (bên phải chat), render sẵn để xem và dùng. Claude **tự động** tạo artifact khi nội dung đạt tiêu chí:

- **Đáng kể và độc lập (self-contained)** — thường trên 15 dòng.
- Là thứ bạn muốn **sửa, lặp lại (iterate), tái dùng (reuse)**.
- Nội dung phức tạp, **đứng độc lập** không cần ngữ cảnh chat xung quanh.
- Thứ bạn muốn **tham chiếu hoặc dùng lại sau này**.

## Các loại Artifact phổ biến

| Loại | Dùng cho |
|------|----------|
| **Documents** (markdown, text, Word, PDF, PowerPoint, Excel) | Nội dung nhiều chữ cần export/sửa tiếp: ghi chú họp, báo cáo, kế hoạch, blog. |
| **Code snippets** (mọi ngôn ngữ) | Code chạy được — xem, copy, tải về dùng trong dự án. |
| **HTML pages** | Trang web hoàn chỉnh (HTML+CSS+JS một file): landing page, form, demo, prototype. |
| **SVG images** | Ảnh vector co giãn: logo, icon, minh họa. Render trực tiếp trong cửa sổ. |
| **Mermaid diagrams** | Flowchart, sequence diagram, Gantt, sơ đồ tổ chức. Mô tả quan hệ → Claude vẽ. |
| **React components** | UI tương tác thật (có logic): máy tính, dashboard, game, data visualization. Không chỉ mockup. |

## Tạo Artifact đầu tiên

Chỉ cần **mô tả thứ bạn muốn**, Claude tự quyết định có tạo artifact không. Ví dụ:

- "Tạo flowchart cho quy trình onboarding khách hàng." *(Lưu ý: Claude giờ có thể vẽ diagram dạng HTML qua Imagine, ngoài artifact dạng code.)*
- "Xây dashboard tương tác cho nhập chi phí hàng tháng và xem breakdown."
- "Thiết kế landing page cho app năng suất, có hero section + danh sách tính năng."
- "Viết template project brief tôi dùng lại được."

Nếu Claude không tự tạo mà bạn muốn có → nói thẳng: **"Create this as an artifact"** / "Show me this in an artifact."

Khi artifact hiện ra (cửa sổ bên phải), bạn có thể:
- **Xem các định dạng:** chuyển giữa preview (hình thức) và code bên dưới.
- **Copy** nội dung.
- **Download** thành file.
- **View code** — xem chính xác Claude tạo gì.

## Chia sẻ và xuất bản (publish)

- **Copy / Download:** dùng cá nhân hoặc chia sẻ kênh khác — nút ở góc dưới phải cửa sổ artifact.
- **Chia sẻ trong tổ chức (Claude for Work):** Team & Enterprise chia sẻ nội bộ; cần xác thực team để truy cập, không ra ngoài tổ chức.
- **Publish công khai (Free, Pro, Max):** ai có link đều xem được. Khi publish:
  - Chỉ **phiên bản được chọn** thành công khai — **chat vẫn riêng tư**.
  - Ai cũng xem/tương tác được, **không cần tài khoản Claude**.
  - Người khác có thể **"remix"** — mở artifact trong chat của họ để sửa và phát triển tiếp.
  - Nút "Share"/"Publish" ở góc trên phải. **Gỡ công khai (unpublish)** bất cứ lúc nào.
  - Artifact đã publish **không bị search engine index** — không hiện trên Google.

## Mẹo dùng hiệu quả

- **Nói cụ thể:** "Build a budget tracker" ổn, nhưng "budget tracker theo tháng, nhập chi phí theo category, xem pie chart, cảnh báo khi vượt ngân sách" tốt hơn nhiều.
- **Mô tả người dùng cuối (end user):** "Flowchart cho nhân viên mới" khác "flowchart cho đội engineering" → thiết kế khác nhau.
- **Lặp từng bước (iterate incrementally):** thêm một tính năng / đổi một thứ mỗi lần → dễ soi cái gì chạy, bắt lỗi sớm.
- **Yêu cầu artifact khi cần:** nếu Claude trả lời trong chat thay vì tạo artifact → "Please create that as an artifact."

## 5 câu hỏi quan trọng

**1. Artifact là gì và khác gì với trả lời trong chat?**
Artifact là output độc lập, tương tác được, hiện trong cửa sổ riêng bên cạnh chat — render sẵn để dùng. Trả lời thường là khối text/code nằm trong dòng chat.

**2. Claude tự tạo artifact khi nào?**
Khi nội dung đáng kể và độc lập (thường >15 dòng), là thứ bạn muốn sửa/tái dùng, phức tạp đứng độc lập, hoặc muốn tham chiếu lại sau.

**3. Kể 3 loại artifact và công dụng.**
Documents (text nhiều, export/sửa), HTML pages (trang web hoàn chỉnh), React components (UI tương tác có logic thật). *(Còn: code snippets, SVG images, Mermaid diagrams.)*

**4. Publish công khai khác chia sẻ nội bộ ở điểm nào?**
Publish (Free/Pro/Max): ai có link đều xem, không cần tài khoản, chỉ phiên bản chọn thành công khai (chat vẫn riêng tư), có thể remix. Chia sẻ nội bộ (Claude for Work): chỉ trong tổ chức, cần xác thực team.

**5. "Remix" một artifact nghĩa là gì?**
Người khác mở artifact đã publish trong chat Claude của họ để sửa và phát triển tiếp từ nền của bạn.