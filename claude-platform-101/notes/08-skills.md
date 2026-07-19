# Skills

**Ý chính:** Skill = folder chứa instruction + script + resource, Claude load **động** khi cần để
làm tốt việc chuyên biệt. Cốt lõi là file `SKILL.md` — bạn upload 1 lần, gắn vào bất kỳ
`messages.create` call nào. Bạn đang **dạy** Claude cách bạn làm 1 việc cụ thể (format status
report, checklist review, release note) — Claude đọc Skill, làm theo quy trình, ra output đúng
"khuôn" bạn muốn.

> ⚠️ **Lesson này có phần lỗi thời** — xem mục "Cập nhật" cuối note trước khi copy code chạy
> thật.

## Skill vs. Tool

Hai thứ giải quyết vấn đề khác nhau:

- **Tool** = kết nối Claude với dữ liệu/hành động. "Tra section code này", "gửi email này" —
  Claude gọi tool, thứ khác chạy.
- **Skill** = dạy Claude 1 **quy trình**. "Tạo daily status report theo template này" — là 1
  playbook Claude đọc và làm theo, đôi khi nghĩa là tự chạy script đi kèm.

Cách nhớ đơn giản: **tool = Claude làm được gì**, **Skill = bạn muốn làm theo cách nào**.

**Điểm quan trọng khác:** Skill **không load full vào context lúc khởi động**. Ban đầu chỉ load
`name` + `description`. Khi agent quyết định Skill đó liên quan tới task, nó mới load full Skill
vào context. Giữ context gọn dù có nhiều Skill khả dụng.

## Upload 1 Skill

Upload 1 lần vào workspace, sau đó reference bằng ID. Có thể upload trực tiếp trên Claude
Platform hoặc bằng code:

```python
skill = client.beta.skills.create(
    display_title="Status Report Generator",
    files=files_from_dir("status-report-skill"),  # folder chứa SKILL.md
)

print(skill.id)  # dùng ID này cho các request sau
```

Ví dụ: cần 1 status report generator. Toàn bộ quy tắc "báo cáo tốt là gì" (section, tone, cách
tóm tắt, cách xử lý blocker) nằm sẵn trong Skill đã đóng gói trước. Activity log chỉ là 1 string
truyền vào lúc gọi request.

## Gắn Skill vào request

Skill gắn qua **`container` config** — mảng `skills` bên trong `container`, mỗi entry nêu
`skill_id` + `version`.

```python
response = client.beta.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=4096,
    betas=["skills-2025-10-02", "code-execution-2025-08-25"],
    container={
        "skills": [
            {
                "type": "custom",
                "skill_id": skill.id,
                "version": "latest",
            }
        ]
    },
    tools=[
        {
            "type": "code_execution_20250825",
            "name": "code_execution",
        }
    ],
    messages=[
        {
            "role": "user",
            "content": f"Generate the daily status report from this activity log:\n\n{activity_log}",
        }
    ],
)
```

**3 điểm cần để ý:**

- Gọi `client.beta.messages.create` (không phải bản thường) + truyền beta header — Skills hiện
  vẫn là **beta feature**.
- `container.skills` là nơi gắn Skill — là 1 **list**, nên layer được nhiều Skill trong 1 call.
- Code execution cũng bật kèm — Skill hay đi cùng code execution vì quy trình Skill có thể cần
  làm việc thật (chạy script trong terminal).

**Chạy thử:** output là status report format đúng y như Skill quy định — section, tone, cách xử
lý blocker, tất cả từ file `SKILL.md` đã upload. User prompt chỉ 1 dòng; quy trình nằm trong
Skill.

## Vì sao quan trọng trong production

Cách 1 team chuẩn hoá output toàn bộ feature. Với endpoint daily status report này, mọi PM nhận
cùng structure, cùng tone, cùng section, cùng thứ tự — không ai phải copy-paste template vào
prompt.

## Tóm tắt (Recap)

- Skill đóng gói quy trình của bạn. File `SKILL.md` (+ script/resource) dạy Claude cách bạn muốn
  việc đó được làm.
- Tool vs Skill: tool = Claude **làm được gì**; Skill = **cách** bạn muốn nó làm.
- Skill load **tiệm tiến (progressive)**: chỉ `name`+`description` lúc khởi động; full Skill load
  vào context khi agent quyết định dùng nó.
- Upload 1 lần bằng `client.beta.skills.create`, gắn bằng `container.skills` trên bất kỳ
  `messages.create` — là list nên layer nhiều Skill được.
- Kết hợp code execution khi quy trình Skill cần làm việc thật.
- Dùng Skill khi **cách làm** quan trọng ngang **việc làm**.

## Cập nhật (lesson dùng version cũ)

Đối chiếu với tài liệu API hiện tại (2026), lesson này có 2 chỗ lỗi thời — vẫn đúng khái niệm,
nhưng code mẫu nếu copy chạy nguyên xi sẽ dùng version cũ:

- **`code_execution_20250825` → nên dùng `code_execution_20260521`.** Type name của code
  execution tool đã tăng version. Beta header đi kèm (`code-execution-2025-08-25`) thì **không
  đổi** — vẫn giữ nguyên dù tool type đã lên version mới. Tức là: giữ `betas=["skills-2025-10-02",
  "code-execution-2025-08-25"]`, chỉ đổi `"type": "code_execution_20250825"` thành
  `"type": "code_execution_20260521"`.
- **`model="claude-sonnet-4-5"` → model này vẫn hoạt động (status Active/legacy) nhưng không còn
  là bản mới nhất.** Model Sonnet hiện tại là `claude-sonnet-5`; nếu cần model mạnh nhất tier
  Opus thì `claude-opus-4-8`. Xem `claude-platform-101/notes/03-choosing-the-right-model.md` (nếu
  có) hoặc hỏi lại khi cần bảng model mới nhất.

`skills-2025-10-02` (beta header cho Skills API) và cấu trúc `container.skills` (`type: "custom"`,
`skill_id`, `version`) **vẫn đúng, không đổi**.

## 5 câu hỏi quan trọng

**1. Skill khác tool ở điểm cốt lõi nào?**
Tool = kết nối Claude với dữ liệu/hành động bên ngoài — "Claude làm được gì". Skill = dạy Claude
1 quy trình cụ thể (format, tone, cách xử lý) — "bạn muốn nó làm theo cách nào". Tool chạy hành
động; Skill là playbook Claude đọc và làm theo.

**2. Skill load vào context theo cơ chế nào, vì sao thiết kế vậy?**
Load **tiệm tiến (progressive)**: lúc khởi động chỉ load `name` + `description` của Skill, không
load full nội dung. Khi agent xác định Skill đó liên quan tới task hiện tại, mới load full Skill
vào context. Thiết kế vậy để context gọn dù workspace có nhiều Skill khả dụng cùng lúc.

**3. Gắn Skill vào 1 request bằng cách nào, field nào chứa nó?**
Qua `container.skills` — 1 **mảng**, mỗi phần tử có `type: "custom"`, `skill_id`, `version`.
Vì là mảng nên gắn được nhiều Skill trong cùng 1 call (layer nhiều quy trình chồng lên nhau).

**4. Vì sao Skill hay đi kèm code execution tool?**
Vì quy trình trong Skill nhiều khi cần **làm việc thật** — chạy script, xử lý file, tính toán —
không chỉ sinh text. Code execution cho Claude môi trường sandbox để tự chạy phần việc đó theo
đúng quy trình Skill mô tả.

**5. Vì sao phải gọi `client.beta.messages.create` thay vì bản thường khi dùng Skill?**
Vì Skills (tính tới lesson này) vẫn là **beta feature** — cần truyền beta header
(`skills-2025-10-02`, và `code-execution-2025-08-25` nếu dùng kèm code execution) qua endpoint
`beta.messages.create`, endpoint thường không nhận các beta header này.
