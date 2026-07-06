# Bài: Other ways to work with Claude

> Nguồn (source): Anthropic Academy — AI Capabilities and Limitations.
> Thời lượng ~10 phút. Bài tổng quan sản phẩm (product overview) — không có khái niệm mới sâu.

## Học xong bài này bạn sẽ

- Biết **khi nào dùng** các sản phẩm Claude ngoài Claude.ai: Claude Code, Claude in
  Slack, Claude for Excel, Claude for PowerPoint, Claude for Chrome.

## Ý chính

Claude là một **trí tuệ (intelligence)**. Claude.ai chỉ là **một** cách dùng nó. Anthropic
đóng gói Claude vào nhiều công cụ chuyên biệt, "đến chỗ bạn đang làm việc" (meet you where
you work) — không bắt bạn chuyển sang giao diện khác.

## 5 công cụ và khi nào dùng

### 1. Claude Code — công cụ code kiểu agent (agentic coding)
Chạy trong terminal, IDE, browser, hoặc Slack. Hiểu codebase, chạy lệnh, làm trọn quy trình
dev bằng ngôn ngữ tự nhiên.
- Tả tính năng bằng tiếng Anh → Claude viết code, chạy test, tạo commit.
- Debug: dán lỗi (error message) → Claude phân tích codebase, tìm và sửa.
- Khám phá codebase lạ, hỏi các phần ghép với nhau ra sao.
- Tự động việc chán: sửa lint, giải quyết merge conflict, viết release notes.
- Thích làm trong terminal cạnh IDE sẵn có, không đổi giao diện.

### 2. Claude in Slack — cộng tác nhóm (team collaboration)
Tích hợp thẳng vào Slack; kéo ngữ cảnh Slack vào hội thoại Claude.
- Soạn trả lời, tóm tắt thread dài, mổ xẻ thảo luận phức tạp — không rời Slack.
- Chuẩn bị họp: gom hội thoại + tài liệu liên quan.
- Onboard team mới: đọc lịch sử channel để hiểu dự án.
- Giao việc code: tag **@Claude** → mở phiên Claude Code dùng ngữ cảnh xung quanh.
- Hỏi nhanh về xu hướng ngành, khái niệm kỹ thuật, thông tin công ty.

### 3. Claude for Excel — bảng tính (spreadsheet), qua sidebar
Phân tích, hiểu, sửa spreadsheet bằng hội thoại ngay trong Microsoft Excel.
- Hiểu công thức / luồng tính (calculation flow) xuyên nhiều tab.
- Đổi giả định/input mà **giữ nguyên phụ thuộc công thức** (formula dependencies).
- Debug lỗi `#REF!`, `#VALUE!`, tham chiếu vòng (circular reference) — truy về gốc, gợi ý sửa.
- Tạo bảng mới / điền template mà giữ đúng cấu trúc công thức.
- Dựng nhanh pivot table, chart.

### 4. Claude for PowerPoint — thuyết trình (presentation), qua sidebar
Soạn, sửa, sắp xếp lại slide bằng hội thoại; **giữ nguyên template và brand styling**.
- Biến outline/tài liệu/ghi chú → bản nháp deck đầu tiên, không dựng tay từng slide.
- Viết lại / rút gọn nội dung slide, thêm speaker notes, chỉnh tông giọng theo đối tượng.
- Tái cấu trúc deck: đổi thứ tự, tách slide dày, gộp slide trùng.
- Áp định dạng nhất quán toàn deck (title, bullet, layout).
- Gợi ý trực quan: layout / loại chart hợp với ý cần nói.

### 5. Claude for Chrome — trợ lý duyệt web, extension sidebar
Quan sát việc bạn đang làm và **hành động thẳng trong browser**.
- Tóm tắt bài báo, paper, trang web khi đang duyệt.
- Soạn trả lời email, quản lý inbox.
- Tự điền form lặp đi lặp lại.
- Test tính năng web / đi qua workflow nhiều bước không cần click tay.
- Giữ ngữ cảnh khi chuyển tab — kéo dữ liệu từ tool nội bộ, CRM, dashboard.

> **Lưu ý an toàn:** Claude for Chrome đang ở **research preview**. Chỉ nên dùng cho việc
> **rủi ro thấp trên trang tin cậy**. Extension hỏi phép trước hành động rủi ro cao (mua hàng,
> chia sẻ dữ liệu cá nhân). Một số nhóm site (dịch vụ tài chính, nội dung người lớn) bị chặn
> mặc định.

## Bảng tổng kết

| Công cụ | Hợp nhất cho | Chạy ở đâu |
|---------|--------------|------------|
| **Claude.ai** | Việc chung: research, viết, phân tích, tạo file | Web, desktop, mobile |
| **Claude Code** | Dev phần mềm, điều hướng codebase, git workflow | Terminal, IDE, browser |
| **Claude Cowork** | Việc nhiều bước phức tạp: research brief, tạo tài liệu, sắp file, phân tích dữ liệu | Desktop (mobile qua Dispatch) |
| **Claude / Claude Code in Slack** | Cộng tác nhóm, chuẩn bị họp, hỏi nhanh theo ngữ cảnh | Slack workspace |
| **Claude for Excel** | Phân tích bảng tính, mô hình tài chính, debug công thức | Excel sidebar |
| **Claude for PowerPoint** | Tạo slide, sửa presentation, định dạng & thiết kế | PowerPoint sidebar |
| **Claude for Chrome** | Research web, quản lý email, tự động browser | Chrome sidebar |

## Điểm cốt lõi (key takeaway)

Mỗi công cụ đưa **cùng một trí tuệ Claude** vào đúng môi trường bạn đang làm việc. Chọn công
cụ theo **nơi công việc đang diễn ra**, không phải theo "cái nào mạnh hơn".

## 5 câu hỏi quan trọng (tự kiểm tra)

**1. Nguyên tắc chung của bài này là gì?**
Claude là một trí tuệ; Claude.ai chỉ là một cửa vào. Các công cụ chuyên biệt "đến chỗ bạn làm
việc" (meet you where you work) — chọn công cụ theo **môi trường**, không theo sức mạnh.

**2. Claude Code chạy ở đâu và hợp việc gì?**
Terminal, IDE, browser, cả Slack. Hợp: viết tính năng từ mô tả tiếng Anh, debug từ error message,
khám phá codebase lạ, tự động lint/merge conflict/release notes, làm dev workflow + git.

**3. Điểm mạnh riêng của Claude for Excel và PowerPoint?**
Excel: hiểu/sửa công thức xuyên tab, giữ **formula dependencies**, debug `#REF!`/`#VALUE!`/circular
reference, dựng pivot & chart. PowerPoint: biến outline → deck nháp, **giữ nguyên template/brand
styling**, tái cấu trúc và định dạng nhất quán.

**4. Vì sao Claude for Chrome cần cẩn thận?**
Đang là **research preview**. Chỉ dùng việc rủi ro thấp trên trang tin cậy. Hỏi phép trước hành
động rủi ro cao (mua hàng, chia sẻ dữ liệu cá nhân); chặn mặc định site tài chính / người lớn.

**5. Trong Slack, giao việc code cho Claude thế nào?**
Tag **@Claude** trong bug report / thảo luận tính năng → mở phiên **Claude Code** dùng ngữ cảnh
xung quanh làm input.
