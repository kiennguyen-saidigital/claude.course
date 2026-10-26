# Thực hành: chạy thử workflow free end-to-end (short-video-maker + MCP)

> Mục tiêu: tự tay dựng và chạy 1 pipeline tạo video ngắn, thấy rõ 5 node đã học ([bài 01](../notes/01-kien-truc-pipeline-video.md)) hoạt động thật. Chọn [short-video-maker](https://github.com/gyoridavid/short-video-maker) vì nó là **MCP server** — nối trực tiếp vào Claude Code, đúng kỹ năng bạn đã có từ Claude Code 101.

## Bước 1 — Clone & đọc README

```bash
git clone https://github.com/gyoridavid/short-video-maker.git
cd short-video-maker
```

Đọc README: xác định repo cần API key gì (thường cần ít nhất 1 key cho TTS hoặc video source — kiểm tra phần "Configuration"/"Environment Variables").

## Bước 2 — Map code với 5 node đã học

Trước khi chạy, mở source code và tự trả lời (ghi ra giấy/note, không cần hỏi ai):

- File/module nào đóng vai **node Script**? (nhận topic → trả script)
- File/module nào đóng vai **node Voice** (TTS)?
- File/module nào đóng vai **node Visual** (lấy clip/ảnh nền)?
- File/module nào đóng vai **node Assembly** (ghép bằng FFmpeg/Remotion)?

Đây là bước quan trọng nhất — nếu map được, bạn đã hiểu kiến trúc thật, không chỉ chạy theo hướng dẫn.

## Bước 3 — Chạy local (REST API)

Theo README, chạy server (thường `npm install && npm start` hoặc Docker). Gọi thử REST endpoint tạo video với 1 topic đơn giản, chờ video xuất ra.

## Bước 4 — Nối vào Claude Code qua MCP

Thêm `short-video-maker` như MCP server trong Claude Code (dùng kỹ năng MCP đã học ở Claude Code 101 — config trong settings MCP server, trỏ tới server vừa chạy ở bước 3).

Sau khi nối xong, mở Claude Code, gõ thẳng:

```
Tạo 1 video ngắn giải thích "workflow là gì" bằng tool MCP short-video-maker
```

Quan sát Claude tự gọi tool MCP, truyền script/prompt, nhận video về — đây chính là pipeline chạy **qua Claude Code**, không cần bạn gọi API tay.

## Bước 5 — So sánh với n8n (tùy chọn, nếu muốn thấy rõ khác biệt)

Nếu còn thời gian, thử import 1 workflow n8n từ [bài 02](../notes/02-no-code-n8n.md) (ví dụ `myVideoGenerator`) và chạy song song. Tự rút ra:

- Cách nào setup nhanh hơn?
- Cách nào dễ sửa logic Script hơn?
- Cách nào dễ debug khi lỗi hơn?

## Kết quả mong đợi

- Có 1 video ngắn (vài giây) xuất ra từ cả 2 cách.
- Tự vẽ lại được sơ đồ 5 node ứng với code thật (không chỉ sơ đồ lý thuyết ở bài 01).
- Biết chỗ nào cần sửa nếu muốn đổi topic, đổi giọng, đổi độ dài video.
