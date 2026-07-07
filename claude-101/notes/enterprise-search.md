# Enterprise Search trong Claude

> **Ý chính:** Enterprise Search thêm mục **"Ask {Tên Tổ Chức}"** vào sidebar — như một **Project dựng sẵn cho cả tổ chức**, kho kiến thức công ty đã nạp sẵn. Đặt câu hỏi → Claude tìm across mọi công cụ đã kết nối (SharePoint, Slack, Gmail, Google Drive...), tổng hợp thành một câu trả lời và **luôn trích nguồn (cite sources)**.

## Enterprise Search là gì?

Mục **"Ask {Your Org Name}"** trong sidebar, chuyên cho việc **tìm + tổng hợp (synthesize)** kiến thức nằm rải rác across công cụ và nguồn dữ liệu công ty. Coi như một Project dựng sẵn cho toàn tổ chức — kho kiến thức đã nạp, vào là hỏi ngay, nhận câu trả lời có ngữ cảnh (context-aware).

Khác chat thường có connector: Enterprise Search **chuyên cho thu thập thông tin (information gathering)**, dùng custom instructions do đội Anthropic cấu hình sẵn.

## Hỏi được gì?

Giá trị nhất cho câu hỏi **spanning nhiều nguồn** hoặc cần tổng hợp thông tin across tổ chức:

- **Bắt kịp tình hình (getting up to speed):** "Hôm qua tôi nghỉ, có gì xảy ra?" · "Tóm tắt cập nhật tuần qua" · "Project Platform đang vướng gì?"
- **Chính sách + quy trình:** "Chính sách làm việc từ xa là gì?" · "Nộp báo cáo chi phí thế nào?" · "Quy trình xin nghỉ phép?"
- **Nghiên cứu + phân tích:** "Vì sao khách chọn đối thủ?" · "Tóm tắt thảo luận roadmap Q4" · "Tìm thông tin về quy trình onboarding khách."
- **Onboarding người mới:** "Hệ thống authentication hoạt động sao?" · "Hỏi ai về hệ thống billing?" · "Team engineering dùng tool gì để deploy?"
- **Theo dõi hiệu suất + dự án:** "Tìm tài liệu về chiến dịch marketing" · "Quyết định chính từ họp leadership tuần trước?" · "Tóm tắt đóng góp cho initiative Infrastructure."

Khi hỏi, Claude tìm across mọi tool đã kết nối → tổng hợp thành câu trả lời thống nhất, kèm nguồn để xem đầy đủ ngữ cảnh.

## Thiết lập — 2 bước

Setup gồm 2 bước: **admin cấu hình cho tổ chức** trước, rồi **user tự xác thực (authenticate)** bằng tài khoản cá nhân.

### Cho Admin (Owner)

Project Enterprise Search bật sẵn mặc định cho mọi tổ chức Team/Enterprise, nhưng Owner phải setup ban đầu trước:

1. Click **"Ask Your Org"** ở sidebar trái.
2. **"Set up for your org"** (hoặc "Disable" để tắt).
3. **Kết nối công cụ tổ chức.** Bắt buộc chọn connector cho **Documents** (Google Drive / SharePoint) và **Chat** (Slack / Microsoft Teams). **Email** khuyến nghị nhưng tùy chọn.
4. **"+ Add more"** thêm tool khác nếu cần.
5. **Tùy chỉnh tên project** — tên nhập sẽ hiện là "Ask [Tên]" ở sidebar mọi người.
6. Thêm mô tả → **"Finish set up"**.

Xong → project khả dụng cho mọi thành viên tổ chức.

### Cho User

Sau khi admin setup, bạn thấy project **"Ask {Org Name}"** được đánh sao (starred) ở sidebar:

1. Click project ở sidebar.
2. Theo luồng onboarding hướng dẫn để kết nối dịch vụ khuyến nghị.
3. **Xác thực (authenticate)** từng dịch vụ muốn tìm (Slack, Google, Microsoft 365...).
4. Bắt đầu hỏi về kiến thức tổ chức.

**Càng nhiều connector → kết quả càng đầy đủ.** Thêm connector sau qua nút "Connect" trong mục Instructions của project.

## Nhiều dữ liệu vậy — có an toàn không?

Có.

- Enterprise Search **chỉ hiện thứ bạn đã có quyền truy cập** trong công cụ gốc (permissions được tôn trọng).
- Cuộc trò chuyện **riêng tư (private)**.
- Dữ liệu kết nối **không bị index hay lưu tách riêng**.

## 5 câu hỏi quan trọng

**1. Enterprise Search là gì?**
Mục "Ask {Tên Tổ Chức}" ở sidebar — như Project dựng sẵn cho cả tổ chức với kho kiến thức đã nạp. Tìm + tổng hợp thông tin across các tool công ty đã kết nối, luôn trích nguồn.

**2. Khác gì chat thường có connector?**
Enterprise Search chuyên cho thu thập thông tin (information gathering), dùng custom instructions do đội Anthropic cấu hình sẵn, và là Project chung cho cả tổ chức chứ không phải chat lẻ.

**3. Loại câu hỏi nào hợp nhất?**
Câu hỏi spanning nhiều nguồn, cần tổng hợp across tổ chức: bắt kịp tình hình, chính sách/quy trình, nghiên cứu/phân tích, onboarding người mới, theo dõi dự án.

**4. Quy trình setup gồm mấy bước?**
2 bước: Admin (Owner) cấu hình connector cho tổ chức trước (bắt buộc Documents + Chat, Email tùy chọn), rồi từng user tự xác thực bằng tài khoản cá nhân.

**5. Dữ liệu có an toàn không?**
Có. Chỉ hiện thứ bạn đã có quyền truy cập trong tool gốc; hội thoại riêng tư; dữ liệu kết nối không bị index hay lưu tách riêng.