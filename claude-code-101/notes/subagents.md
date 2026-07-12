# Subagents

> **Ý chính:** Claude ủy thác (delegate) task cho **subagent** — chạy song song trong **cửa sổ ngữ cảnh riêng biệt (isolated context window)**, xong thì **chỉ trả về tóm tắt** cho main agent.

## Cách hoạt động

**Vấn đề:** tool call khám phá codebase / web search ngốn context, mà phần lớn phát hiện dọc đường không liên quan tới tính năng đang làm.

**Cách chữa:** Claude spawn subagent → subagent chạy **song song**, **context riêng**, gánh phần nặng (exploration) → xong **chỉ trả tóm tắt** về main.

## Tự tạo subagent

Subagent định nghĩa bằng file **Markdown + YAML frontmatter**. Cách dễ nhất: để Claude sinh giúp.

```
/agents
```

Rồi chọn **"Create new agent"**. Các bước:

- Chọn **scope** (phạm vi) của agent.
- Định nghĩa **purpose** (mục đích).
- Chọn **tools** agent được phép dùng.
- Chọn cả **color** cho nó.

Claude sinh ra `name`, `description`, và `prompt` cho subagent. Phần `description` cũng **báo cho Claude biết khi nào nên gọi** subagent này, dựa trên prompt bạn đưa.

## Tùy biến thêm

- **Ký ức bền (persistent memory)** — subagent giữ ký ức xuyên hội thoại. Hợp khi dùng nó lặp lại trên cùng project.
- **Nạp sẵn skill (preload skills)** — thêm key `skill` và liệt kê tên skill. **Lưu ý:** khác với skill ở hội thoại chính, ở đây **toàn bộ skill được nạp vào context**.

## Khi nào dùng / KHÔNG dùng

> **Luật quyết định (decision rule):** *Việc trung gian có quan trọng không?*
> **Không** (chỉ cần kết quả cuối) → giao subagent. **Có** (cần thấy + phản ứng dọc đường) → giữ ở main thread.

Nói cách khác: subagent hợp khi **khám phá tách rời khỏi thực thi**. Nếu mỗi bước phụ thuộc phát hiện của bước trước → để ở main.

### ✅ 3 ca dùng subagent

| Ca | Vì sao |
|---|---|
| **Research / exploration** | Ca kinh điển. Vd "auth hoạt động thế nào?" — subagent đọc hàng chục file, lần theo call chain, main chỉ nhận `JWT validate ở middleware/auth.js:42, gọi từ route/api.js`. Rác khám phá ở lại context subagent. |
| **Code review** | Claude review tốt hơn **khi code trông như người khác viết**. Nếu chính main thread vừa viết feature đó qua nhiều turn → nó review yếu, không nhìn được bằng mắt mới. Reviewer subagent chạy `git diff` trong context sạch, không có lịch sử code được viết ra sao. Bonus: nhét tiêu chí review riêng của team vào system prompt nó → cả team review đồng nhất. |
| **Cần custom system prompt** | System prompt mặc định của Claude Code thiên **ngắn gọn, hướng code**. Không hợp mọi việc. Vd **copywriting subagent** (giọng văn, đối tượng, style cho landing page/email — khác hẳn văn kỹ thuật cô đọng); **styling subagent** (trỏ vào file design system → nạp sẵn color variable, spacing, component pattern trước khi viết CSS). |

### ❌ 3 anti-pattern

| Anti-pattern | Vì sao hỏng |
|---|---|
| **"Expert" persona** | "Bạn là chuyên gia Python/Kubernetes" → **vô giá trị**. Claude đã có sẵn kiến thức đó. Không có gì subagent "chuyên gia" làm được mà main thread không làm được. |
| **Pipeline tuần tự** | Vd 3 agent: reproduce bug → debug → fix. Pipeline chỉ chạy được khi các bước **thật sự độc lập**. Fix bug thì **luôn** phụ thuộc phát hiện bước trước → **thông tin rơi rụng** ở chỗ bàn giao giữa các agent. |
| **Test runner** | Test fail thì bạn cần **full output** để chẩn đoán. Subagent trả về "tests failed" → bạn phải viết thêm script debug để moi lại chi tiết vốn đã hiện sẵn nếu chạy trực tiếp. Đo đạc cho thấy đây là pattern **tệ nhất** trong mọi cấu hình. |

Chi phí launch subagent (mất tầm nhìn vào việc nó làm + phát hiện bị nén thành summary) **chỉ đáng** khi subagent làm được thứ main thread không làm được.

### Ghi chú riêng Hybris

Build Hybris chậm → đừng để subagent chạy `ant all`. Cho nó `Read`/`Grep`/`Glob` thôi, build tự làm ở main.

## Áp dụng vào Hybris (SAP Commerce Cloud)

| Task | Subagent làm | Trả về |
|---|---|---|
| Dò chuỗi override của một type | grep `*-items.xml` mọi extension | bảng `file:line` + qualifier |
| Truy vết bean override | quét `*-spring.xml`, `*-backoffice-spring.xml` | bean id + `alias` + `parent` |
| Map Controller → Facade → Service → DAO | lần từ `@RequestMapping` xuống `FlexibleSearchQuery` | `file:line` từng tầng + Populator/Converter |
| Audit diff trước khi push | review `git diff` theo tiêu chí Hybris (*) | 1 dòng / lỗi |
| Sinh Populator/Converter + ImpEx | đọc 1-2 Populator có sẵn để bắt style | diff 1-2 file |

(*) Tiêu chí Hybris: `@Transactional` sai tầng · `ModelService.save()` trong vòng lặp (N+1) · FlexibleSearch nối chuỗi (SQL injection) · Populator ném NPE khi source field null · entity leak ra DTO.

## Bốn pattern làm subagent hiệu quả

Subagent cấu hình dở sẽ **đi lạc**, **chạy lê thê**, hoặc trả output **main không dùng được**. Bốn thứ sửa: description · output format · báo cáo trở ngại · giới hạn tool.

> **name + description của mọi subagent được nhét vào system prompt của main agent.**
> Nó vừa quyết *khi nào* gọi subagent, vừa là hướng dẫn để main **tự viết input prompt** giao task.

### 1. Description định hình input prompt

Description chung chung → main agent viết prompt mơ hồ kiểu "dùng get diff tìm thay đổi hiện tại". Subagent phải tự đoán file nào quan trọng.

Thêm vào description câu kiểu *"Bạn phải nói chính xác cho agent những file nào cần review"* → main agent sẽ viết input prompt cụ thể, **liệt kê đúng file** cần review. Mẹo này áp dụng cho mọi loại subagent (vd thêm *"trả về nguồn có thể trích dẫn"* vào subagent web search).

### 2. Định dạng output — cải tiến quan trọng nhất

Nó làm 2 việc:

- Tạo **điểm dừng tự nhiên** — điền hết mỗi mục là subagent biết xong.
- Chặn **chạy quá lâu** — không có output rõ, subagent không biết bao giờ đủ, chạy lê thê.

Ví dụ format cho subagent code review:

```
1. Summary: tổng quan ngắn gọn đã review gì + đánh giá chung
2. Critical Issues: lỗ hổng bảo mật, rủi ro toàn vẹn dữ liệu, lỗi logic phải sửa ngay
3. Major Issues: vấn đề chất lượng, lệch kiến trúc, lo ngại hiệu năng lớn
4. Minor Issues: style, thiếu docs, tối ưu nhỏ
5. Recommendations: gợi ý cải thiện, cơ hội refactor, best practice
6. Approval Status: nêu rõ code sẵn sàng merge/deploy hay cần sửa
```

### 3. Báo cáo trở ngại (Obstacles)

Subagent tìm ra **cách lách (workaround)** trong lúc làm (fix lỗi dependency, command cần flag đặc biệt...) → những chi tiết đó **phải nằm trong summary** trả về. Không có → main thread phải **tự khám phá lại**, tốn thời gian + token.

Cách lấy: **hỏi thẳng trong output format**. Thêm mục:

```
7. Obstacles Encountered: báo mọi trở ngại gặp phải — setup issue, workaround
   phát hiện, quirk môi trường, command cần flag/config đặc biệt, dependency/import
   gây lỗi.
```

### 4. Giới hạn tool access

Chỉ đưa tool subagent thực sự cần → **chặn side effect ngoài ý muốn** + **vai trò rõ ràng** khi có nhiều subagent.

| Loại subagent | Tool cần |
|---|---|
| Research / read-only | `Glob`, `Grep`, `Read` — không sửa được file |
| Code reviewer | thêm `Bash` (chạy `git diff`), vẫn **không** `Edit`/`Write` |
| Styling / sửa code | mới cho `Edit`, `Write` — vì việc của nó là đổi code |

Muốn sâu hơn: khóa [Introduction to Subagents](https://anthropic.skilljar.com/introduction-to-subagents).

## 5 câu hỏi quan trọng

**1. Subagent là gì và lợi ích chính?**
Agent con Claude spawn ra để làm một task, chạy **song song** với **context window riêng biệt**, xong **chỉ trả về bản tóm tắt (summary)** — không phải toàn bộ tool call, file đã đọc, web search dọc đường. Lợi ích: main context không bị rác từ quá trình khám phá.

**2. Luật quyết định dùng subagent hay không là gì? 3 ca nên dùng?**
Hỏi: ***việc trung gian có quan trọng không?*** Không → giao subagent. Có (cần thấy + phản ứng dọc đường) → giữ ở main. 3 ca nên dùng: **research/exploration**, **code review** (Claude review tốt hơn khi code trông như người khác viết), **task cần custom system prompt** (copywriting, styling).

**3. Ba anti-pattern của subagent? Vì sao hỏng?**
(a) **"Expert" persona** — Claude đã có sẵn kiến thức, không thêm năng lực gì. (b) **Pipeline tuần tự** (reproduce → debug → fix) — các bước phụ thuộc nhau nên **thông tin rơi rụng ở chỗ bàn giao**. (c) **Test runner** — trả "tests failed" mà **giấu mất full output** bạn cần để chẩn đoán; đo đạc cho thấy đây là pattern tệ nhất.

**4. Cải tiến đơn lẻ quan trọng nhất cho subagent là gì? Vì sao? Nên thêm mục nào vào đó?**
Định nghĩa **output format** trong system prompt. Vì nó tạo **điểm dừng tự nhiên** (điền hết mục là xong) và **chặn subagent chạy quá lâu** (không có output rõ thì không biết bao giờ đủ). Thêm mục **`Obstacles Encountered`** để main **khỏi khám phá lại** workaround → đỡ thời gian + token.

**5. `description` làm 2 việc gì? Vì sao phải giới hạn tool?**
Description: (a) quyết **khi nào** main gọi subagent — vì name + description được nhét vào system prompt của main; (b) làm hướng dẫn để main **tự viết input prompt** giao task. Giới hạn tool để **chặn side effect** + vai trò rõ: read-only (`Glob`/`Grep`/`Read`) cho research, thêm `Bash` cho reviewer, `Edit`/`Write` chỉ cho agent sửa code.
