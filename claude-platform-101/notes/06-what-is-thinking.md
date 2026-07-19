# Thinking (extended thinking) là gì

**Ý chính:** Một số việc cần hơn là trả lời ngay. **Extended thinking** cho Claude "suy nghĩ"
từng bước trước khi trả lời — và phần suy nghĩ đó **hiển thị được**, không bị giấu.

## Failure mode cần tránh

Hỏi model câu hỏi nhiều bước, bắt trả lời ngay lập tức → model có thể trả lời sai mà vẫn tự tin.
Ví dụ: câu hỏi táo nhiều bước, model trả lời ngay "6.5 quả táo" — sai nhưng chắc nịch. Extended
thinking giải quyết đúng lớp lỗi này.

## Extended thinking là gì

Cho Claude suy luận từng bước trước khi ra câu trả lời cuối. Khi bật, Claude sinh ra **reasoning
token nội bộ** (thường gọi **chain of thought**) rồi mới đưa câu trả lời. Phần reasoning **không
bị ẩn** — bạn thấy nó trong response, song song với text cuối.

## Adaptive thinking trên Opus 4.7

Với Opus 4.7, thinking là **adaptive**: không chọn token budget cố định — chỉ bật lên, Claude tự
quyết định *khi nào* cần nghĩ và *nghĩ bao nhiêu*.

Điều khiển độ sâu bằng tham số **`effort`**. Điểm dễ nhầm: `effort` nằm **trong `output_config`**,
không nằm cạnh block `thinking`. Các mức:

- `low`
- `medium`
- `high` (mặc định)
- `xhigh` (extra high)
- `max`

## Khi nào dùng, khi nào bỏ qua

**Dùng cho:**
- Toán và logic nhiều bước
- Debug code
- Phân tích quy định (regulatory analysis)
- Bất cứ gì có trade-off hoặc so sánh nhiều lựa chọn

**Bỏ qua** cho: classification đơn giản, extraction, việc lặp khuôn mẫu (boilerplate). Ở mấy việc
này, bật thinking chỉ tốn thêm latency + cost, không cải thiện kết quả.

## Ví dụ chạy thật

Agent loop với 1 tool thời tiết, nhờ Claude lên kế hoạch road trip từ San Francisco — 2 điểm
dừng, cân nhắc thời tiết và thời gian lái xe. Đây là trade-off thật, đúng loại câu hỏi thinking
phát huy tác dụng.

```python
import anthropic

client = anthropic.Anthropic()

weather_tool = {
    "name": "get_weather",
    "description": "Get the current weather for a city.",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {"type": "string", "description": "City name"}
        },
        "required": ["city"],
    },
}

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=16000,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},  # low | medium | high | xhigh | max
    tools=[weather_tool],
    messages=[
        {
            "role": "user",
            "content": "Plan a road trip out of San Francisco with two stops, "
                       "weighing weather and drive time.",
        }
    ],
)
```

Chạy lên, output "thú vị" hơn bình thường: có **thinking block** (Claude cân nhắc trade-off), rồi
**tool call** để check từng thành phố, cuối cùng là **text block** chứa đề xuất thật. Reasoning
hiện ra rõ ràng — đó chính là mục đích.

## Vì sao quan trọng trong production

Trong app thật, đây là ranh giới giữa agent chỉ tìm từng lỗi riêng lẻ vs agent **kết nối các
lỗi lại với nhau**. Ví dụ compliance review app: bật adaptive thinking cho auto-review call giúp
agent suy luận **xuyên suốt các phần** của report — bắt được kiểu lỗi như spec wind load ở
section 3 mâu thuẫn với spec vật liệu ở chỗ khác trong tài liệu.

## Tóm tắt (Recap)

- Extended thinking cho Claude không gian suy luận trước khi trả lời, và reasoning đó **hiển thị
  được** trong response.
- Với Opus 4.7, bật bằng `thinking: {"type": "adaptive"}` — không cần token budget, Claude tự
  quyết khi nào và nghĩ bao nhiêu.
- Chỉnh độ sâu bằng `effort` **bên trong `output_config`**: `low`, `medium`, `high` (mặc định),
  `xhigh`, hoặc `max`.
- Dùng cho bài toán khó, nhiều trade-off. Bỏ qua với bài đơn giản — ở đó nó chỉ tốn latency và
  token.

## 5 câu hỏi quan trọng

**1. Extended thinking giải quyết failure mode nào?**
Model trả lời **sai mà vẫn tự tin (confidently wrong)** với câu hỏi nhiều bước khi buộc trả lời
ngay lập tức, không có không gian suy luận. Extended thinking cho Claude "nghĩ" qua từng bước
trước khi chốt câu trả lời.

**2. Reasoning (chain of thought) trong extended thinking có bị ẩn không?**
Không. Reasoning token hiện **rõ trong response**, song song với text block chứa câu trả lời
cuối — đây chính là điểm mấu chốt của tính năng, không phải hộp đen.

**3. Adaptive thinking trên Opus 4.7 khác gì so với cách cũ (token budget cố định)?**
Không cần chọn `budget_tokens` cố định. Chỉ bật `thinking: {"type": "adaptive"}`, Claude tự quyết
định thời điểm cần nghĩ và mức độ nghĩ bao nhiêu, tuỳ độ khó của task.

**4. Tham số `effort` nằm ở đâu trong request, và có mấy mức?**
Nằm **trong `output_config`** (không phải cạnh `thinking`). 5 mức: `low`, `medium`, `high`
(mặc định), `xhigh`, `max` — điều khiển độ sâu suy luận.

**5. Khi nào nên bật thinking, khi nào nên bỏ qua?**
Bật cho: toán/logic nhiều bước, debug code, phân tích quy định, bài có trade-off/so sánh lựa
chọn. Bỏ qua cho: classification đơn giản, extraction, việc lặp khuôn mẫu — ở đó thinking chỉ
tăng latency và cost mà không cải thiện chất lượng.
