# Chọn đúng model

**Ý chính:** Mỗi Claude model có đánh đổi (trade-off) khác nhau giữa **chất lượng, tốc độ,
và chi phí**. Chọn sai tốn tiền hoặc output kém. Nguyên tắc vàng: **chọn model rẻ nhất mà
output vẫn đủ tốt để bạn dám ship**.

## Các tầng model (model tiers)

Chọn bằng tham số `model` trong API call. Hiện có 4 tầng, từ mạnh-đắt xuống nhanh-rẻ:

| Tầng | Đặc điểm | Dùng cho |
|------|----------|----------|
| **Fable** | Mạnh nhất, ngồi **trên** Opus. Đắt hơn Opus đáng kể. | Việc khó nhất, khi capability thêm đáng đồng tiền. |
| **Opus** | Mạnh nhất trong 3 dòng lõi (core), nhưng chậm nhất + đắt nhất. | Suy luận sâu (deep reasoning), phân tích phức tạp, coding nhiều bước, viết tinh tế. |
| **Sonnet** | Điểm ngọt (sweet spot): cân bằng thông minh / tốc độ / chi phí. | Phần lớn việc production hằng ngày. |
| **Haiku** | Nhanh nhất, rẻ nhất. Tối ưu tốc độ + chi phí, không tối đa thông minh. | Việc volume lớn, độ khó thấp: phân loại (classification), trích xuất (extraction), định tuyến (routing). |

> Lưu ý: lúc quay khóa học, Fable chưa GA (generally available) nên video không có. Model ID
> hiện tại: Fable `claude-fable-5`, Opus `claude-opus-4-8`, Sonnet `claude-sonnet-4-6`,
> Haiku `claude-haiku-4-5`.

## Dựng eval đơn giản trước khi viết production

Trước khi viết code production, dựng một **evaluation (eval)** đơn giản:

- Lấy **20–30 ví dụ input đại diện** từ chính workload thật của bạn.
- Chạy qua từng model, chấm điểm theo tiêu chí "output thế nào là tốt" cho use case của bạn.
- Không cần đồ nghề phức tạp — 20-30 ví dụ là đủ để bắt đầu.

**Cách leo tầng (work up the tiers):**

1. Chạy ví dụ qua **Haiku** trước. Chất lượng đạt → xong, tiết kiệm khối tiền.
2. Không đạt → bước lên **Sonnet**.
3. Chỉ với tới **Opus** khi task thực sự cần.

## So sánh các tầng cạnh nhau

Gửi **cùng một prompt** qua cả ba model, xem độ trễ (latency) và số token:

```python
models = ["claude-haiku-4-5", "claude-sonnet-4-6", "claude-opus-4-8"]

for model in models:
    response = client.messages.create(
        model=model,
        max_tokens=300,
        messages=[{"role": "user", "content": prompt}],
    )
    print(model, response.usage)
```

Hai điểm cần để ý:

- Vòng lặp chỉ đổi field `model` mỗi request. Cùng prompt, cùng max_tokens — **chỉ model đổi**.
- **`response.usage`** trả về số token input và output thẳng từ API — đây chính là cái hóa
  đơn (bill) của bạn tính theo.

Kết quả: Opus lâu nhất, output bóng bẩy nhất — nhưng với một định nghĩa 2 câu thì độ bóng
bẩy đó **phí**. Sonnet gọn hơn chút. Haiku trả lời thường **dưới 1 giây**, 2 câu rất ổn.

Cốt lõi: **model đúng = model rẻ nhất mà output bạn thật sự dám ship.** Định nghĩa đơn giản
→ Haiku thừa sức. Soạn văn bản pháp lý (regulatory) → chạy cùng eval đó, chắc sẽ dừng ở Opus.
Hình dạng eval luôn giống nhau.

## Định tuyến việc khác nhau tới model khác nhau (routing)

App thật thường **route** loại việc khác nhau tới model khác nhau **trong cùng một endpoint**.
Ví dụ dashboard vận hành có route xử lý tài liệu:

- Mọi file vào → phân loại bằng **Haiku**.
- Bản cập nhật cho khách (client update) → soạn nháp bằng **Sonnet**.
- Chỉ hồ sơ thầu (RFP response) → mới dùng **Opus**.

Một hàng đợi (queue), ba model, chọn theo từng task.

## Tóm tắt (Recap)

- Ba tầng lõi: **Opus** cho việc khó, **Sonnet** cho việc hằng ngày, **Haiku** cho volume.
  (Fable ngồi trên Opus cho việc khó nhất.)
- Dựng **eval đơn giản** — 20-30 ví dụ đại diện từ workload thật — **trước** khi viết production.
- Chạy eval từ **Haiku leo lên**, dừng ở model rẻ nhất mà output bạn dám ship.
- **`response.usage`** báo số token input/output — cơ sở tính bill.
- Production: **route** task khác nhau tới model khác nhau trong cùng endpoint, đừng dùng một
  model cho mọi thứ.

## 5 câu hỏi quan trọng

**1. Nguyên tắc vàng khi chọn model là gì?**
Chọn **model rẻ nhất mà output vẫn đủ tốt để bạn dám ship**. Không mặc định lấy model mạnh
nhất (tốn tiền) hay rẻ nhất (output kém) — cân theo chất lượng thực tế cần.

**2. Bốn tầng model và mỗi tầng dùng cho gì?**
- **Fable**: mạnh nhất, trên Opus, đắt nhất → việc khó nhất.
- **Opus**: mạnh nhất trong 3 dòng lõi, chậm/đắt → deep reasoning, phân tích phức tạp, coding nhiều bước.
- **Sonnet**: cân bằng → phần lớn việc production.
- **Haiku**: nhanh/rẻ nhất → classification, extraction, routing (volume lớn, độ khó thấp).

**3. Quy trình dựng eval và cách leo tầng?**
Lấy 20-30 ví dụ đại diện từ workload thật, chấm theo tiêu chí "tốt" của use case. Chạy từ
**Haiku** trước → không đạt thì lên **Sonnet** → chỉ tới **Opus** khi cần. Dừng ở tầng rẻ
nhất đạt yêu cầu.

**4. `response.usage` cho biết gì và vì sao quan trọng?**
Trả về số **token input và output** thực tế từ API — chính là cái mà hóa đơn tính theo. Nó
cho bạn đo chi phí thật của từng model khi so sánh eval, thay vì đoán.

**5. "Routing" trong production nghĩa là gì?**
Trong **cùng một endpoint**, định tuyến mỗi loại task tới model phù hợp: việc đơn giản/volume
lớn → Haiku, việc thường → Sonnet, việc khó → Opus. Không dùng một model cho tất cả — tối ưu
cả chi phí lẫn chất lượng theo từng task.