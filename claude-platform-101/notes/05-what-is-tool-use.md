# Tool use là gì

**Ý chính:** Tool = 1 hàm bạn định nghĩa và mô tả cho Claude. Claude **quyết định** khi nào gọi,
nhưng **code của bạn** mới thực thi — Claude không bao giờ tự chạy tool.

## Tool là gì

Workflow thật của bạn dựa vào nhiều hệ thống khác — project management, database, file. Claude
không tự check được mấy thứ đó. Nó cần **tool**: cho Claude quyền truy cập dữ liệu/hành động bên
ngoài.

Flow:

1. Claude yêu cầu gọi tool.
2. Code của bạn thực thi hàm đó.
3. Kết quả gửi lại cho Claude, nó tiếp tục.

## Cấu tạo tool definition

Tool = JSON schema gồm 3 phần: **name**, **description**, **input schema**. Truyền vào request
qua mảng `tools`.

**Description là thứ Claude đọc để quyết định có gọi tool hay không.** Mô tả mơ hồ → tool use tệ
— đây là **lý do số 1** khiến agent gọi sai tool hoặc không gọi tool có sẵn. Viết cụ thể.

```json
{
  "name": "lookup_building_code",
  "description": "Look up a specific building code section by its identifier. Returns the full text of that code section.",
  "input_schema": {
    "type": "object",
    "properties": {
      "section": {
        "type": "string",
        "description": "The building code section to look up"
      }
    },
    "required": ["section"]
  }
}
```

**Ví dụ chạy:** gửi Claude 1 compliance report. Turn 1, Claude trả `stop_reason: "tool_use"` —
tín hiệu để mình chạy tool. Response chứa `tool_use` block (tên tool + input Claude muốn dùng).
Loop gọi `lookup_building_code` với param đó, đẩy kết quả lại dưới dạng `tool_result` (user
message chứa block `tool_result` gắn với `tool_use_id`). Claude tiếp tục — có thể gọi tool nhiều
lần tới khi đủ thông tin.

## Nhiều tool: để Claude tự chọn

Kịch bản: đóng gói đi Denver 3 ngày, cần cả thời tiết hôm nay **và** dự báo vài ngày tới. Khai 2
tool:

```javascript
const tools = [
  {
    name: "get_weather",
    description: "Get today's current weather for a city.",
    input_schema: {
      type: "object",
      properties: { city: { type: "string", description: "The city to check" } },
      required: ["city"],
    },
  },
  {
    name: "get_forecast",
    description: "Get the weather forecast for the next few days for a city.",
    input_schema: {
      type: "object",
      properties: { city: { type: "string", description: "The city to check" } },
      required: ["city"],
    },
  },
];
```

Loop giống hệt agent loop đã học. Điểm mới duy nhất: hàm `runTool` dispatch theo tên tool bằng
`switch` — chỗ code của bạn thật sự chạy.

```javascript
function runTool(name, input) {
  switch (name) {
    case "get_weather":
      return getWeather(input.city);
    case "get_forecast":
      return getForecast(input.city);
  }
}

while (true) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages,
    tools,
  });

  if (response.stop_reason !== "tool_use") {
    break; // Claude xong — đây là câu trả lời cuối
  }

  messages.push({ role: "assistant", content: response.content });

  const toolResults = response.content
    .filter((block) => block.type === "tool_use")
    .map((block) => ({
      type: "tool_result",
      tool_use_id: block.id,
      content: runTool(block.name, block.input),
    }));

  messages.push({ role: "user", content: toolResults });
}
```

Thêm tool thứ 3 → thêm vào mảng `tools` + thêm 1 `case` trong `switch`. Xong.

Chạy thử: Claude gọi `get_weather` rồi `get_forecast` — có khi cùng turn, có khi tách lượt. Rồi
trả lời: mặc nhiều lớp, hôm nay có tuyết rải rác, ấm dần trong tuần. Claude **đọc description**,
map câu hỏi ("hôm nay" / "vài ngày tới") vào đúng tool. Description tốt = tool use đúng.

## Tool runner: bỏ boilerplate

2 vấn đề với code viết tay ở trên:

1. Nhiều code cho 2 lookup đơn giản.
2. Viết JSON schema tay cho từng hàm — như viết code 2 lần.

**Tool runner** (có trong SDK TypeScript, Python, Ruby) giải quyết cả 2: lấy hàm thật của bạn, tự
đọc type + docstring để build schema, tự chạy toàn bộ vòng lặp tool_use/tool_result.

```typescript
// 2 lookup y hệt bên trên — chỉ là hàm TypeScript thường
function getWeather(city: string) {
  // ...lookup có sẵn
}

function getForecast(city: string) {
  // ...lookup có sẵn
}

const runner = client.beta.messages.toolRunner({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content:
        "I'm packing for a three-day trip to Denver. What's the weather today and over the next few days?",
    },
  ],
  tools: [getWeather, getForecast],
});

// Trả về assistant message cuối cùng sau khi hết vòng tool ping-pong
const finalMessage = await runner.untilDone();
```

Cùng kịch bản, code ít hơn hẳn: không `while`, không switch theo `stop_reason`, không tự đẩy
`tool_result` vào `messages` — runner lo hết. Không viết JSON schema. 2 hàm y hệt lookup viết tay
lúc nãy, chỉ là TypeScript thường. `runner.untilDone()` trả kết quả cuối khi mọi thứ đã "settle".

## Tool thật bọc code có sẵn

Thực tế, tool không phải data hardcode — chúng bọc quanh hàm **đã có sẵn** trong app. Ví dụ:
compliance review agent có tool chỉ là wrapper mỏng quanh `lookup_building_code` và
`search_building_code` (hàm đã tồn tại trong codebase). Dùng tool runner, truyền thẳng 2 hàm đó
vào — agent tự trích dẫn đúng section building code trong từng finding, không cần viết schema.

## Tóm tắt (Recap)

- Tool cho Claude quyền truy cập hệ thống của bạn. Bạn định nghĩa + expose; Claude quyết định
  khi nào gọi; code bạn thực thi.
- Tool = JSON schema với **name**, **description**, **input schema**, gửi trong mảng `tools`.
- Viết description cụ thể. Mơ hồ = lý do số 1 khiến agent gọi sai/không gọi tool.
- `stop_reason: "tool_use"` = tín hiệu chạy tool và đẩy kết quả lại dưới dạng `tool_result`.
- Nhiều tool → dispatch theo tên tool (switch). Thêm tool = thêm vào mảng + thêm 1 case.
- **Tool runner** (TypeScript/Python/Ruby) build schema từ hàm thật + tự chạy cả loop — hoặc bạn
  tự viết loop tay.
- Bạn tự thực thi, hoặc delegate cả loop. Xa nhất trên trục đó: **managed agent** — delegate cả
  agent cho Anthropic.

## 5 câu hỏi quan trọng

**1. Ai thực sự chạy tool — Claude hay code của bạn?**
Code của bạn. Claude chỉ **yêu cầu** gọi tool (trả `tool_use` block trong response); việc thực thi
hàm là code bạn viết, không phải Claude tự chạy.

**2. Tool definition gồm mấy phần, và phần nào quan trọng nhất để tool use đúng?**
3 phần: `name`, `description`, `input_schema`. **`description`** quan trọng nhất — đây là thứ
Claude đọc để quyết định gọi tool nào, khi nào. Description mơ hồ là nguyên nhân số 1 khiến agent
gọi sai hoặc bỏ sót tool có sẵn.

**3. `stop_reason: "tool_use"` báo hiệu điều gì, và bước tiếp theo trong loop là gì?**
Báo Claude muốn gọi 1 (hoặc nhiều) tool, chưa xong turn. Bước tiếp: lấy `tool_use` block(s) trong
`response.content`, chạy tool tương ứng, đẩy kết quả về dưới dạng `tool_result` (gắn đúng
`tool_use_id`) trong 1 user message, rồi gọi lại API.

**4. Muốn thêm tool thứ 3 vào ví dụ 2-tool weather, cần sửa gì?**
Hai chỗ: (1) thêm object tool mới vào mảng `tools`, (2) thêm 1 `case` tương ứng trong hàm
`runTool` (switch theo `name`). Không cần đổi gì khác trong vòng lặp.

**5. Tool runner khác gì so với viết loop tay, và có sẵn cho ngôn ngữ nào?**
Tool runner (TypeScript, Python, Ruby) nhận **hàm thật** (không cần viết JSON schema tay — tự
suy ra từ type/docstring) và tự chạy toàn bộ vòng lặp tool_use → thực thi → tool_result → lặp
lại, tới khi xong thì trả về qua `runner.untilDone()`. Viết loop tay thì phải tự quản `while`,
tự switch theo `stop_reason`, tự đẩy `tool_result` vào `messages` — cùng logic nhưng nhiều
boilerplate hơn.
