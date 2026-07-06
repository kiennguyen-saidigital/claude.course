# Sử dụng Connectors trong Claude

> **Ý chính:** Connector (bộ kết nối) biến Claude từ trợ lý thành người cộng tác *có thông tin* — cho Claude truy cập chính công cụ, dữ liệu và ngữ cảnh bạn dùng hằng ngày. Không phải bắt đầu mỗi chat từ con số 0; Claude làm việc trực tiếp với thông tin thật của bạn.

## Connector là gì?

Cho Claude **đọc thông tin** và **thực hiện hành động** thay bạn. Tùy connector và quyền (permission) bạn cấp, Claude có thể: tìm file, lấy tài liệu, phân tích dữ liệu, tạo nội dung mới, cập nhật bản ghi (record), chạy tác vụ — tất cả từ trong cuộc trò chuyện.

### MCP — nền tảng của connector

**Model Context Protocol (MCP)** là thứ vận hành connector. Ví như **"USB-C cho AI"** — chuẩn chung để Claude kết nối nhiều ứng dụng khác nhau qua một giao diện thống nhất. Chuẩn mở (open standard) → developer xây connector cho bất kỳ công cụ nào, hoạt động liền mạch với Claude.

### 2 loại connector

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Web connectors** | Nối Claude tới dịch vụ đám mây (cloud). | Google Drive, Notion, Slack, Asana |
| **Desktop extensions** | Chạy cục bộ (local) qua app Claude Desktop; truy cập file local + ứng dụng native. | file local, browser control, Figma |

## Tìm và kết nối công cụ

Anthropic có thư mục connector đề xuất tại **`claude.ai/directory`**, 2 tab:
- **Web:** dịch vụ đám mây (Gmail, Notion, Slack, Asana, Linear, Stripe...).
- **Desktop extensions:** công cụ local qua Claude Desktop app.

Cũng có thể bấm nút **+** góc dưới trái cửa sổ chat → chọn **Connectors**.

### Kết nối một web connector (5 bước)

1. **Tìm connector:** vào `claude.ai/directory` hoặc `+` > Connectors trong chat.
2. **Click Connect** connector muốn thêm.
3. **Authenticate:** chuyển tới trang đăng nhập dịch vụ, đăng nhập bằng tài khoản sẵn có.
4. **Cấp quyền (grant permissions):** xem quyền Claude yêu cầu rồi cho phép.
5. **Test:** quay lại Claude thử "Bạn truy cập được [tên công cụ] không?"

Sau khi nối, Claude tìm/đọc và (đôi khi) thực hiện hành động trong dịch vụ đó — tùy quyền đã cấp.

### Cài Desktop extension

Cần app **Claude Desktop** (không phải web). Cho Claude tương tác với ứng dụng local, file system, tính năng native macOS/Windows.
1. Tải + cài Claude Desktop app.
2. Mở app → **Settings > Extensions**.
3. Duyệt extension → **Install**.
4. Làm theo bước cài riêng của extension.

## Dùng connector trong công việc

| Nhóm | Công cụ | Ví dụ câu lệnh |
|------|---------|----------------|
| **Quản lý dự án** | Asana, Linear, Jira | "Task ưu tiên cao nào đến hạn tuần này?" / "Tạo task review ngân sách Q4." |
| **Giao tiếp** | Slack, Gmail | "Tìm email thread bàn về hợp đồng nhà cung cấp." / "Soạn trả lời tin mới nhất ở #marketing." |
| **Tài liệu** | Notion, Google Drive, Confluence | "Tìm brand voice guidelines." / "Tóm tắt meeting notes tuần trước." |
| **Công cụ kinh doanh** | Stripe, PayPal, Salesforce | "Xu hướng doanh thu quý vừa rồi?" / "Liệt kê giao dịch trên $1,000." |

## Bảo mật và quyền

Kết nối = cấp quyền **đọc** — và đôi khi **sửa** — dữ liệu trong dịch vụ. Điểm quan trọng:

- **Scoped access:** quyền chỉ giới hạn ở thứ connector cần; bật/tắt từng quyền trong menu mỗi ứng dụng.
- **Claude thấy đúng thứ bạn thấy:** chỉ truy cập được dữ liệu bạn có quyền. Nối email công việc của bạn *không* cho Claude vào hộp thư CEO — chỉ hộp của bạn.
- **Thu hồi bất cứ lúc nào (revocable):** ngắt kết nối qua Settings của Claude hoặc phần bảo mật của dịch vụ.
- **Cẩn trọng nguồn:** giống Skills, có thể tìm/xây connector tùy chỉnh — chỉ cài từ nguồn tin cậy.

## 5 câu hỏi quan trọng

**1. Connector giúp gì khác với chat thường?**
Cho Claude truy cập trực tiếp công cụ/dữ liệu bạn dùng hằng ngày — đọc thông tin và thực hiện hành động thay bạn, thay vì bắt đầu mỗi chat từ con số 0.

**2. MCP là gì và tại sao ví như "USB-C cho AI"?**
Model Context Protocol — chuẩn mở vận hành connector. Như USB-C: một giao diện thống nhất để Claude nối nhiều ứng dụng khác nhau; developer xây connector cho bất kỳ công cụ nào và chạy liền mạch.

**3. Hai loại connector khác nhau ra sao?**
Web connectors nối dịch vụ đám mây (Google Drive, Slack...) qua web. Desktop extensions chạy local qua app Claude Desktop, truy cập file local + ứng dụng native.

**4. "Claude thấy đúng thứ bạn thấy" nghĩa là gì?**
Claude chỉ truy cập được dữ liệu bạn có quyền. Nối email của bạn không cho Claude vào hộp thư người khác (vd CEO) — chỉ dữ liệu của chính bạn.

**5. Kiểm soát quyền và ngắt kết nối thế nào?**
Quyền có phạm vi hẹp (scoped), bật/tắt từng cái trong menu ứng dụng. Thu hồi bất cứ lúc nào qua Settings của Claude hoặc phần bảo mật của dịch vụ. Chỉ cài connector từ nguồn tin cậy.