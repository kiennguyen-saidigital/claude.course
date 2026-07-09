# Skills (Kỹ năng)

> **Ý chính:** Skill là **file Markdown dạy Claude Code cách làm một việc cụ thể — viết một lần, dùng mãi**. Mỗi skill nằm trong file `SKILL.md` có `name` và `description` ở frontmatter. Khác CLAUDE.md (nạp vào **mọi** hội thoại) và slash command (phải gõ tay), skill **tự kích hoạt (load on demand)** khi Claude thấy request khớp với `description`.

## Vấn đề nó giải quyết

Bạn cứ lặp lại cùng một hướng dẫn: mỗi lần review PR lại tả cách muốn feedback trình bày, mỗi commit lại nhắc format ưa thích. Skill viết knowledge đó **một lần**, Claude tự áp dụng khi gặp lại tình huống.

> Quy tắc ngón tay cái: **nếu bạn thấy mình giải thích cùng một thứ cho Claude nhiều lần → đó là một skill đang chờ được viết.**

## Cách hoạt động

- Skill là **thư mục hướng dẫn + tài nguyên** Claude Code tự khám phá được. Mỗi skill = một file `SKILL.md`.
- `description` là thứ Claude dùng để **quyết định có dùng skill không**. Claude đọc request của bạn → so với **description của mọi skill** → kích hoạt cái nào khớp.
- **Nạp theo nhu cầu (load on demand):** ban đầu Claude chỉ nạp `name` + `description`, nên skill **không chiếm hết cửa sổ ngữ cảnh (context window)**. Nội dung đầy đủ chỉ nạp khi thật sự cần.

Frontmatter mẫu:

```markdown
---
name: pr-review
description: Reviews pull requests for code quality. Use when reviewing PRs or checking code changes.
---
```

Dưới frontmatter là hướng dẫn thực sự — checklist review, format ưa thích, v.v.

## Skill sống ở đâu

| Loại | Vị trí | Dành cho ai |
|------|--------|-------------|
| **Personal (cá nhân)** | `~/.claude/skills` (Windows: `C:/Users/<user>/.claude/skills`) | Chỉ bạn, **theo bạn qua mọi project** — style commit, format tài liệu, cách giải thích code |
| **Project (dự án)** | `.claude/skills` ở gốc repo | **Cả team** — ai clone repo cũng có; commit vào version control. Vd chuẩn code của công ty, brand guidelines |

## Skills vs. CLAUDE.md vs. Slash command

| | Khi nào nạp | Kích hoạt |
|---|---|---|
| **CLAUDE.md** | **Mọi** hội thoại | Tự động, luôn luôn |
| **Skill** | Chỉ khi request khớp `description` | **Tự động, theo tình huống** |
| **Slash command** | Chỉ khi bạn **gõ tay** `/tên` | Thủ công |

- Muốn Claude **luôn** dùng TypeScript strict mode → cho vào **CLAUDE.md**.
- Checklist review PR → làm **skill**: không chiếm context khi bạn đang debug, chỉ nạp khi bạn xin review.
- Khi Claude khớp một skill với request, bạn **thấy nó nạp trong terminal**.

## Khi nào dùng skill

Skill hợp nhất với **kiến thức chuyên biệt cho task cụ thể**:

- Chuẩn code review của team
- Format commit message ưa thích
- Brand guidelines của tổ chức
- Template tài liệu cho từng loại doc
- Checklist debug cho framework cụ thể

---

## Tạo skill đầu tiên (thực hành)

Ví dụ: skill **personal** dạy Claude viết PR description theo format cố định — dùng được ở mọi project.

**Bước 1 — Tạo thư mục** (tên thư mục = tên skill):

```bash
mkdir -p ~/.claude/skills/pr-description
```

**Bước 2 — Tạo `SKILL.md`** bên trong. File có 2 phần, ngăn bởi dấu gạch frontmatter:

```markdown
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:

## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
```

- `name` → định danh skill.
- `description` → **tiêu chí khớp (matching criteria)**: bảo Claude khi nào dùng.
- Mọi thứ sau bộ gạch thứ hai → **hướng dẫn** Claude làm theo khi skill kích hoạt.

**Bước 3 — Test:** Claude Code nạp skill **lúc khởi động**, nên **restart session** sau khi tạo. Kiểm tra skill có trong danh sách available skills, rồi thử: "write a PR description for my changes."

## Cơ chế khớp skill (matching)

1. Lúc khởi động, Claude Code quét **4 vị trí** skill nhưng **chỉ nạp `name` + `description`**, không nạp nội dung đầy đủ.
2. Khi bạn gửi request, Claude **so sánh ngữ nghĩa (semantic matching)** message với description của mọi skill. Vd "explain what this function does" khớp skill mô tả "explain code with visual diagrams" vì **ý định trùng nhau**.
3. Tìm thấy khớp → Claude **hỏi xác nhận** trước khi nạp nội dung đầy đủ. Bước này giữ bạn biết context nào đang được kéo vào.
4. Xác nhận xong → Claude đọc trọn `SKILL.md` và làm theo.

## Thứ tự ưu tiên khi trùng tên (priority hierarchy)

Trùng tên → cái ưu tiên cao thắng:

| Ưu tiên | Loại | Vị trí |
|---------|------|--------|
| 1 (cao nhất) | **Enterprise** | Managed settings của tổ chức |
| 2 | **Personal** | `~/.claude/skills` |
| 3 | **Project** | `.claude/skills` trong repo |
| 4 (thấp nhất) | **Plugins** | Plugin đã cài |

Cho phép tổ chức **ép chuẩn** qua enterprise skill mà cá nhân vẫn tùy biến được. Vd công ty có enterprise `code-review`, bạn tạo personal `code-review` cùng tên → **bản enterprise thắng**.

> Tránh xung đột: **đặt tên mô tả rõ**. Đừng dùng `review` chung chung — dùng `frontend-review`, `backend-review`.

## Cập nhật & xóa skill

- **Sửa:** edit file `SKILL.md`.
- **Xóa:** xóa thư mục skill.
- **Luôn restart Claude Code** sau mọi thay đổi để có hiệu lực.

---

## Cấu hình nâng cao & Skill nhiều file

Skill cơ bản chỉ cần `name` + `description`. Nhưng vài kỹ thuật nâng cao làm skill mạnh hơn nhiều.

### Các trường metadata (frontmatter)

Chuẩn mở agent skills hỗ trợ nhiều trường trong frontmatter `SKILL.md` — 2 bắt buộc, còn lại tùy chọn:

| Trường | Bắt buộc? | Vai trò |
|--------|-----------|---------|
| `name` | ✅ | Định danh skill. Chỉ chữ thường, số, gạch nối. Tối đa **64 ký tự**. Nên trùng tên thư mục. |
| `description` | ✅ | Bảo Claude **khi nào dùng**. Tối đa **1.024 ký tự**. Trường **quan trọng nhất** — Claude dùng nó để khớp. |
| `allowed-tools` | ⬜ | Giới hạn tool Claude được dùng khi skill active. |
| `model` | ⬜ | Chỉ định model Claude cho skill. |

### Viết description hiệu quả

Phải **rõ ràng**. Nói "job là giúp về docs" thì Claude không biết làm gì — như người vậy. Description tốt trả lời 2 câu:

1. **Skill làm gì?**
2. **Khi nào Claude nên dùng?**

Skill không kích hoạt đúng lúc mong đợi → **thêm keyword khớp cách bạn thực sự diễn đạt** request. Ngôn ngữ trong description quyết định khớp.

### Giới hạn tool bằng `allowed-tools`

Muốn skill **chỉ đọc, không sửa** file — hợp cho workflow nhạy cảm bảo mật, task read-only, hoặc cần rào chắn (guardrails):

```markdown
---
name: codebase-onboarding
description: Helps new developers understand the system works.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---
```

Khi active, Claude **chỉ dùng được** các tool đó, không hỏi quyền — không edit, không write. Bỏ `allowed-tools` → không giới hạn, dùng permission model bình thường.

### Progressive disclosure (bộc lộ dần)

Skill **dùng chung context window** với hội thoại. Kích hoạt skill → nạp trọn `SKILL.md` vào context. Nhồi mọi thứ vào 1 file 2.000 dòng: tốn context + khó bảo trì.

Giải: giữ **hướng dẫn cốt lõi** trong `SKILL.md`, đẩy tài liệu chi tiết ra **file riêng** mà Claude chỉ đọc **khi cần**. Cấu trúc thư mục skill gợi ý:

- `scripts/` — code chạy được
- `references/` — tài liệu bổ sung
- `assets/` — ảnh, template, data

Trong `SKILL.md` link tới file phụ kèm hướng dẫn **khi nào nạp**. Vd Claude đọc `architecture-guide.md` chỉ khi ai hỏi về thiết kế hệ thống; hỏi chỗ thêm component thì không nạp. Như **mục lục** trong context thay vì cả cuốn sách.

> Quy tắc: giữ `SKILL.md` **dưới 500 dòng**. Vượt → tách ra file reference.

### Dùng script hiệu quả

Script trong thư mục skill **chạy mà không nạp nội dung vào context** — chỉ **output tốn token**. Chỉ thị then chốt trong `SKILL.md`: bảo Claude **chạy** script, **đừng đọc** nó. Hợp cho:

- Kiểm tra môi trường (validation)
- Biến đổi dữ liệu cần nhất quán
- Thao tác đáng tin hơn khi là code đã test, thay vì code sinh ra tại chỗ

---

## Skills vs. các cách tùy chỉnh khác

Claude Code có nhiều công cụ tùy chỉnh. Chọn sai → phức tạp thừa. Mỗi cái giải một loại vấn đề — **kết hợp**, đừng nhồi mọi thứ vào skill.

| Công cụ | Kích hoạt kiểu gì | Dùng cho |
|---------|-------------------|----------|
| **CLAUDE.md** | Nạp vào **mọi** hội thoại (always-on) | Chuẩn project luôn áp dụng: strict mode, style, ràng buộc "không đổi DB schema" |
| **Skills** | **Theo request** — khớp `description` thì nạp | Chuyên môn theo task, kiến thức chỉ thỉnh thoảng cần, quy trình chi tiết |
| **Subagents** | Chạy trong **context tách biệt** | Giao việc: nhận task, làm độc lập, trả kết quả; cần tool access khác / cần cô lập |
| **Hooks** | **Theo sự kiện (event-driven)** — file save, tool call | Thao tác tự động mỗi lần save, validate trước tool call, side effect |
| **MCP servers** | Cung cấp **tool + tích hợp ngoài** | Kết nối hệ thống ngoài — nhóm khác hẳn skill |

Phân biệt cốt lõi:

- **CLAUDE.md vs Skill:** always-on vs theo nhu cầu. Checklist review PR không cần ở trong context khi đang viết code mới.
- **Skill vs Subagent:** skill **thêm kiến thức vào hội thoại hiện tại**; subagent **chạy context riêng, cô lập**.
- **Skill vs Hook:** hook **theo sự kiện** (Claude làm gì → hook chạy); skill **theo request** (bạn hỏi gì → skill kích hoạt).

**Setup điển hình:** CLAUDE.md (chuẩn always-on) + Skills (chuyên môn theo task) + Hooks (tự động theo sự kiện) + Subagents (việc giao, cô lập) + MCP (tool ngoài). Mỗi cái lo phần của nó; dùng nhiều cái cùng lúc được.

---

## Chia sẻ skill trong team & tổ chức

Skill có giá trị hơn nhiều khi **chia sẻ**: cả team review PR cùng chuẩn → nhất quán. 3 cách phân phối:

| Cách | Cơ chế | Hợp cho |
|------|--------|---------|
| **Commit vào repo** | Đặt ở `.claude/skills`, ai clone repo là có — không cần cài thêm. Push update → mọi người `pull` là nhận | Chuẩn code team, workflow riêng project, skill tham chiếu cấu trúc codebase |
| **Plugins** | Đóng gói skill (mỗi skill 1 thư mục + `SKILL.md`), phân phối qua **marketplace** để người ngoài team cài | Skill **không quá riêng project**, dùng được cho cộng đồng rộng |
| **Enterprise managed settings** | Admin deploy toàn tổ chức, **ưu tiên cao nhất** (đè personal/project/plugin cùng tên) | Chuẩn **bắt buộc**: bảo mật, tuân thủ (compliance), coding practice phải nhất quán |

Thư mục `.claude` chứa agents, hooks, skills, settings — tất cả version-controlled, chia sẻ qua Git bình thường.

`strictKnownMarketplaces` trong managed settings kiểm soát nguồn cài plugin:

```json
"strictKnownMarketplaces": [
  { "source": "github", "repo": "acme-corp/approved-plugins" },
  { "source": "npm", "package": "@acme-corp/compliance-plugins" }
]
```

## Skill & Subagent (điểm bất ngờ)

**Subagent KHÔNG tự thấy skill của bạn.** Giao task cho subagent → nó bắt đầu với context sạch, mới tinh.

- **Built-in agent** (Explorer, Plan, Verify) → **không truy cập skill được** hoàn toàn.
- **Custom subagent** bạn định nghĩa → dùng skill được, **nhưng chỉ khi liệt kê rõ**.
- Skill nạp **lúc subagent khởi động**, không theo nhu cầu như hội thoại chính.

Tạo custom subagent có skill: thêm file agent markdown trong `.claude/agents` (hoặc lệnh `/agents` tạo tương tác). Frontmatter có trường `skills`:

```markdown
---
name: frontend-security-accessibility-reviewer
description: "Use this agent when you need to review frontend code for accessibility..."
tools: Bash, Glob, Grep, Read, WebFetch, WebSearch, Skill...
model: sonnet
color: blue
skills: accessibility-audit, performance-check
---
```

Đảm bảo skill tồn tại trong `.claude/skills` trước, rồi tạo subagent mới hoặc thêm trường `skills` vào agent có sẵn. Hợp khi: giao việc cô lập với chuyên môn riêng; subagent khác cần skill khác (frontend vs backend reviewer); ép chuẩn trong việc giao mà không dựa vào prompt.

---

## Troubleshooting (sửa lỗi skill)

Skill hỏng thường rơi vào vài nhóm dự đoán được. Bắt đầu bằng **validator**, rồi theo triệu chứng.

**Skills validator** — chạy đầu tiên. Cài dễ nhất qua `uv`. Vào thư mục skill (hoặc chạy từ đâu cũng được) → validator bắt lỗi **cấu trúc** trước khi tốn giờ debug chỗ khác.

| Triệu chứng | Nguyên nhân | Sửa |
|-------------|-------------|-----|
| **Không kích hoạt** (skill có, pass validation) | Gần như luôn do **`description`** — không đủ trùng ngữ nghĩa với request | Thêm trigger phrase khớp cách bạn thực nói. Test biến thể: "profile this", "why is this slow?", "make this faster" — biến thể nào fail thì thêm keyword đó |
| **Không load** (không hiện khi hỏi "what skills available") | Sai cấu trúc | `SKILL.md` phải **trong thư mục có tên**, không để ở gốc `skills/`. Tên file **đúng chính xác `SKILL.md`** (SKILL hoa, md thường). Chạy `claude --debug` xem lỗi load |
| **Sai skill được dùng** | Các `description` **quá giống nhau** | Làm description **phân biệt rõ**, càng cụ thể càng tránh xung đột |
| **Skill bị che (shadowed)** | Skill khác **cùng tên, ưu tiên cao hơn** (enterprise) đè | Đổi tên skill cho khác (dễ nhất), hoặc bàn với admin về enterprise skill |
| **Plugin skill không hiện** | Cache cũ / sai cấu trúc plugin | Clear cache → restart Claude Code → cài lại. Vẫn thiếu → chạy validator kiểm cấu trúc |
| **Lỗi runtime** (load được, chạy fail) | Thiếu dependency / quyền / path | Cài dependency (ghi vào description để Claude biết cần gì); `chmod +x` cho script; **dùng forward slash `/` mọi nơi, kể cả Windows** |

**Checklist nhanh:**
- Không trigger? → cải thiện description, thêm trigger phrase.
- Không load? → check path, tên file, YAML syntax.
- Sai skill? → description phân biệt rõ hơn.
- Bị che? → check priority hierarchy, đổi tên.
- Plugin thiếu? → clear cache, cài lại.
- Runtime fail? → check dependency, quyền, path.

> Nguồn skill tốt nhất = **pain point thật**: bắt đầu từ hướng dẫn bạn lặp lại nhiều nhất.

## 5 câu hỏi quan trọng

**1. Skill là gì và cấu trúc ra sao?**
Thư mục chứa file `SKILL.md`: frontmatter có `name` + `description`, dưới đó là hướng dẫn. Dạy Claude làm một task — viết một lần, tự áp dụng khi gặp lại.

**2. Claude quyết định dùng skill nào bằng cách nào?**
Lúc khởi động chỉ nạp `name` + `description`. Khi có request, Claude **so sánh ngữ nghĩa (semantic matching)** message với description mọi skill, khớp thì hỏi xác nhận rồi nạp trọn nội dung.

**3. Skill khác CLAUDE.md và slash command chỗ nào?**
CLAUDE.md nạp vào **mọi** hội thoại. Slash command phải **gõ tay**. Skill **tự nạp theo nhu cầu** khi tình huống khớp — không chiếm context khi không cần.

**4. Thứ tự ưu tiên khi trùng tên skill?**
**Enterprise → Personal → Project → Plugins** (cao xuống thấp). Cùng tên → Enterprise thắng. Tránh xung đột bằng tên mô tả rõ (`frontend-review` thay vì `review`).

**5. Sau khi tạo/sửa/xóa skill phải làm gì?**
**Restart Claude Code** — skill chỉ nạp lúc khởi động, nên thay đổi mới có hiệu lực sau khi khởi động lại. Sửa = edit `SKILL.md`; xóa = xóa thư mục.

**6. Trường metadata nào bắt buộc, và trường nào quan trọng nhất?**
Bắt buộc: **`name`** + **`description`**. `description` **quan trọng nhất** vì Claude dùng nó để khớp request (tối đa 1.024 ký tự). Tùy chọn: `allowed-tools`, `model`.

**7. `allowed-tools` để làm gì?**
Giới hạn tool Claude được dùng khi skill active. Vd `Read, Grep, Glob, Bash` → chỉ đọc, không edit/write. Hợp cho workflow read-only hoặc nhạy cảm bảo mật. Bỏ trống → không giới hạn.

**8. Progressive disclosure là gì và quy tắc kích thước SKILL.md?**
Giữ hướng dẫn cốt lõi trong `SKILL.md`, đẩy chi tiết ra file riêng (`references/`, `scripts/`, `assets/`) mà Claude chỉ đọc **khi cần** → tiết kiệm context. Quy tắc: `SKILL.md` **dưới 500 dòng**.

**9. Vì sao dùng script trong skill lại tiết kiệm context?**
Script **chạy mà không nạp nội dung** vào context — chỉ **output tốn token**. Chỉ thị: bảo Claude **chạy** script, đừng **đọc**. Hợp cho validation, biến đổi dữ liệu, thao tác cần độ tin cậy của code đã test.

**10. Skill khác Subagent và Hook chỗ nào?**
Skill **thêm kiến thức vào hội thoại hiện tại**, kích hoạt **theo request**. Subagent **chạy context tách biệt, cô lập** — cho việc giao. Hook **theo sự kiện** (file save, tool call) — cho thao tác tự động. Kết hợp cùng CLAUDE.md (always-on) và MCP (tool ngoài).

**11. 3 cách chia sẻ skill khác nhau ra sao?**
**Commit vào repo** (`.claude/skills`) — cả team qua Git. **Plugins** — phân phối qua marketplace cho cộng đồng rộng. **Enterprise managed settings** — deploy toàn tổ chức, ưu tiên cao nhất, cho chuẩn bắt buộc/compliance.

**12. Subagent có tự dùng skill của bạn không?**
**Không.** Built-in agent (Explorer, Plan, Verify) **không truy cập skill được**. Custom subagent dùng được **nhưng phải liệt kê rõ** trong trường `skills` ở frontmatter (file trong `.claude/agents`). Skill nạp lúc subagent khởi động.

**13. Skill không kích hoạt thì sửa ở đâu trước?**
Gần như luôn do **`description`** — thiếu trùng ngữ nghĩa với request. Thêm trigger phrase khớp cách bạn thực nói, test nhiều biến thể, biến thể nào fail thì thêm keyword đó. (Chạy **validator** trước tiên để loại lỗi cấu trúc.)

**14. Skill không load — check gì?**
`SKILL.md` phải nằm **trong thư mục có tên** (không ở gốc `skills/`), tên file **đúng chính xác `SKILL.md`**. Chạy `claude --debug` xem lỗi. Runtime fail → check dependency, `chmod +x` script, dùng **forward slash `/`** mọi nơi kể cả Windows.
