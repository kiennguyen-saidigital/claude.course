# Subagents

> **Ý chính:** Claude ủy thác (delegate) task cho **subagent** — mỗi subagent chạy trong **cửa sổ ngữ cảnh riêng biệt (isolated context window)**, làm việc song song, xong thì **chỉ trả về tóm tắt** cho main agent. Kết quả: bạn có câu trả lời mà **không phải chứa cả hành trình** đi tìm nó trong context chính.

## Cách hoạt động

Context window bị ngốn nhiều bởi tool call khám phá codebase, web search nghiên cứu... Những gì Claude phát hiện trong lúc khám phá **không phải lúc nào cũng liên quan** tới tính năng chính đang làm.

Subagent giải quyết chuyện này:

1. Claude spawn một subagent cho task kiểu "khám phá codebase này giúp tôi".
2. Subagent chạy **song song**, có **context window riêng**.
3. Làm hết phần việc nặng (exploration).
4. Xong → **tóm tắt phát hiện** và trả tóm tắt đó về cho Claude.

Main context chỉ nhận **kết quả**, không nhận rác dọc đường.

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

- **Persistent memory** — subagent giữ ký ức xuyên hội thoại. Hợp khi dùng nó lặp lại trên cùng project.
- **Preload skills** — thêm key `skill` và liệt kê tên skill. **Lưu ý:** khác với skill ở hội thoại chính, ở đây **toàn bộ skill được nạp vào context**.

## 5 ví dụ áp dụng vào dự án Hybris (SAP Commerce Cloud)

Điểm chung: task **đọc nhiều, trả về ít**.

### 1. Dò chuỗi override của một type

Hybris trải một type qua nhiều extension. Hỏi "field `code` của `Product` bị extend ở đâu?" → subagent grep hết `*-items.xml`, trả bảng:

```
custom-core/resources/custom-core-items.xml:142   <attribute qualifier="code">
custombackoffice/.../custombackoffice-items.xml:88 <attribute qualifier="code"> (redeclare)
```

Main context nhận 5 dòng thay vì 12 file XML.

### 2. Truy vết bean override trong Spring XML

Câu hỏi kinh điển: "`defaultProductFacade` bị ai ghi đè?" Subagent quét `*-spring.xml` + `*-backoffice-spring.xml` qua mọi extension, trả về id bean + `alias` + `parent`. Không lôi cả nghìn dòng XML vào context chính.

### 3. Map luồng Controller → Facade → Service → DAO

Trước khi sửa một endpoint OCC v2, cần biết cả chuỗi. Subagent lần từ `@RequestMapping` xuống `FlexibleSearchQuery` cuối cùng, trả file:line từng tầng + tên Populator/Converter dính vào. Task khám phá thuần — đúng thứ subagent sinh ra để làm.

### 4. Audit diff trước khi push

Subagent review riêng, tiêu chí Hybris: `@Transactional` sai tầng, `ModelService.save()` trong vòng lặp (N+1), FlexibleSearch nối chuỗi (SQL injection), Populator ném NPE khi source field null, entity leak ra DTO. Trả danh sách một dòng/lỗi. Context chính không phải chứa cả diff.

### 5. Sinh Populator/Converter + ImpEx theo khuôn có sẵn

Việc cơ học, khuôn rõ: thêm attribute mới vào `items.xml` → cần Populator, đăng ký bean, ImpEx sample data, unit test. Subagent đọc 1-2 Populator hiện có để bắt style, viết file mới, trả diff. Scope giới hạn 1-2 file.

### Khi nào KHÔNG dùng subagent

- Task cần lái từng bước (debug lỗi runtime khó, thiết kế data model mới). Subagent trả tóm tắt → **mất chi tiết trung gian** bạn cần để quyết định.
- **Build Hybris chậm.** Đừng để subagent chạy `ant all`. Cho nó tool `Read`/`Grep`/`Glob` thôi, build tự làm ở main.

## Recap

Giữ context window sạch là một trong những cách tốt nhất để làm việc hiệu quả với Claude Code. Subagent chạy nền, gánh phần việc nặng, và **chỉ trả câu trả lời** về main context.

Muốn sâu hơn: khóa [Introduction to Subagents](https://anthropic.skilljar.com/introduction-to-subagents).

## 5 câu hỏi quan trọng

**1. Subagent là gì và lợi ích chính?**
Agent con Claude spawn ra để làm một task, chạy **song song** với **context window riêng biệt**. Lợi ích: quản lý context — main context không bị rác từ quá trình khám phá.

**2. Subagent trả về cái gì cho main agent?**
**Chỉ bản tóm tắt (summary)** phát hiện của nó — không phải toàn bộ tool call, file đã đọc, hay web search dọc đường.

**3. Loại task nào hợp giao cho subagent?**
Task nặng về khám phá mà bạn chỉ cần **kết quả cuối** — vd "khám phá codebase này", nghiên cứu bằng web search.

**4. Subagent được định nghĩa và tạo ra thế nào?**
File **Markdown có YAML frontmatter**. Tạo nhanh: lệnh `/agents` → "Create new agent" → chọn scope, purpose, tools, color. Claude sinh `name`, `description`, `prompt`.

**5. Hai tùy biến nâng cao và cảnh báo đi kèm?**
**Persistent memory** (giữ ký ức xuyên hội thoại) và **preload skills** (key `skill` + tên skill). Cảnh báo: khác hội thoại chính, **toàn bộ skill bị nạp vào context** của subagent.