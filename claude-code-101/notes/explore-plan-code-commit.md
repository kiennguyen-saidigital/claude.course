# Workflow: Explore → Plan → Code → Commit

> **Ý chính:** Nếu chỉ nhớ một điều từ khóa học, hãy nhớ workflow này: **Explore, Plan, Code, Commit**. Thiếu nó, hầu hết người dùng nhảy thẳng vào bảo Claude viết code — dẫn tới phải chỉnh sửa (course-correct) nhiều hơn về sau.

## Explore & Plan

Cách nhanh nhất cho 2 bước đầu: **Plan Mode**. Trong plan mode, Claude **không sửa file** — chỉ đọc file để gom thông tin về cách triển khai.

Vào plan mode: nhấn **Shift + Tab** tới khi thấy "Plan Mode" dưới ô nhập. Rồi viết prompt kiểu:

> "Cần thêm chuyển đổi WebP vào pipeline upload ảnh. Tìm chỗ nào trong pipeline nên làm việc đó, có cần dependency mới không, và cách tiếp cận thế nào."

Claude sẽ đọc file liên quan, chạy vài web search, và đưa ra **kế hoạch hành động**. Xem lại, quyết có đạt tiêu chí không. Chưa đạt → bảo nó sửa vùng cụ thể.

> Đây là **chỗ tốt nhất để course-correct** vì chưa viết dòng code nào. Cũng có thể chạy **explore subagent** ngoài plan mode nếu chỉ muốn tóm tắt codebase mà không định thay đổi gì sau đó.

## Code

Kế hoạch ổn → chọn **"approve"** để Claude làm theo danh sách. Chọn cho Claude tự động chấp nhận sửa file (auto-accept) hay hỏi mỗi lần.

Claude cố tự troubleshoot trước khi coi kế hoạch "xong", nhưng đôi lúc bạn cần nhảy vào. Lợi ích của Plan Mode: sau khi thực thi, bạn còn giữ **ngữ cảnh về cách đi tới kết quả** — giúp định hướng quyết định kế tiếp của Claude.

Vài mẹo cho giai đoạn code mượt hơn:

- **Định nghĩa tiêu chí thành công (success criteria).** Để Claude tự tin vào kết quả, nó cần rõ "đúng" trông thế nào. Nói rõ điều này trong kế hoạch.
- **Thêm công cụ (tools).** Tool giúp Claude đạt mục tiêu, bớt qua lại. Vd làm web UI → cài **Claude in Chrome extension** để Claude Code điều khiển tab trình duyệt, test UI trực tiếp.
- **Kèm bộ test (test suite).** Cho Claude bộ test để liên tục kiểm chứng. Claude còn viết test hộ được. Trước khi giao, đảm bảo test là **nguồn chân lý đáng tin (source of truth)** để tránh false positive.

> **Mẹo nhanh:** Nếu Claude cứ vấp cùng một lỗi, bảo nó **lưu giải pháp vào file CLAUDE.md**.

## Commit

Sau khi tự test và hài lòng → push code. Trước khi commit:

- Chạy **subagent code reviewer** soi lại việc mình làm. Subagent có **góc nhìn tươi mới (fresh eyes)** — không mang thiên kiến (bias) mà main agent tích trong session.
- Rồi bảo Claude tạo **commit message theo văn phong của bạn**. Lặp lại chu trình.

## Recap

Để dùng Claude Code hiệu quả, theo workflow **Explore → Plan → Code → Commit**:

- **Explore** — cấp cho Claude ngữ cảnh liên quan tới project.
- **Plan** — tạo kế hoạch hành động, dùng làm thước đo thành công.
- **Code** — qua lại giữa bạn và Claude trước khi chốt kết quả cuối.
- **Commit** — review và push code, sẵn sàng cho tính năng kế.

## 5 câu hỏi quan trọng

**1. Workflow cốt lõi của khóa là gì và vì sao quan trọng?**
**Explore → Plan → Code → Commit.** Không có nó, người dùng nhảy thẳng vào viết code và phải course-correct nhiều hơn về sau.

**2. Plan Mode làm gì và vào bằng cách nào?**
Claude **chỉ đọc file, không sửa** — gom thông tin để lập kế hoạch triển khai. Vào bằng cách nhấn **Shift + Tab** tới khi thấy "Plan Mode". Đây là chỗ tốt nhất để course-correct vì chưa viết code.

**3. Ba mẹo giúp giai đoạn Code mượt hơn?**
Định nghĩa **success criteria** rõ ràng; **thêm tools** (vd Claude in Chrome để test UI); kèm **test suite** đáng tin làm nguồn chân lý (tránh false positive).

**4. Làm gì khi Claude cứ vấp cùng một lỗi?**
Bảo nó **lưu giải pháp vào file CLAUDE.md** để không lặp lại lỗi đó.

**5. Vì sao dùng subagent code reviewer trước khi commit?**
Subagent có **góc nhìn tươi mới (fresh eyes)**, không mang thiên kiến mà main agent tích trong session — bắt lỗi tốt hơn. Sau đó Claude tạo commit message theo văn phong của bạn.
