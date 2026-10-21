# ⚔️ Dự Án: Thất Nghiệp Đại Tội

> Quy trình phân công công việc, mời thành viên và cấu hình Cloudflare: [TEAM_GUIDE.md](TEAM_GUIDE.md).

## 👥 Danh Sách 7 Thành Viên & Thư Mục CV

- [Trang chủ nhóm & Cổng hồ sơ](index.html)
- [Danh sách chi tiết thành viên](members/index.html) · [Nguồn và commit nhập](members/SOURCES.md)

| STT | Thành viên | Thư mục CV riêng | Trạng thái |
|---|---|---|---|
| 01 | Nguyễn Đắc Hoàng | `members/nguyen-dac-hoang/` | [Xem CV](members/nguyen-dac-hoang/index.html) |
| 02 | Hoàng Bắc | `members/hoang-bac/` | [Xem CV](members/hoang-bac/index.html) |
| 03 | Lường Thị Hạnh | `members/luong-thi-hanh/` | [Xem CV](members/luong-thi-hanh/index.html) |
| 04 | Dương Tuấn Hoàng | `members/duong-tuan-hoang/` | [Xem CV](members/duong-tuan-hoang/index.html) |
| 05 | Nguyễn Huy Hoàng | `members/nguyen-huy-hoang/` | [Xem CV](members/nguyen-huy-hoang/index.html) |
| 06 | Nông Lâm Ngọc Sơn | `members/nong-lam-ngoc-son/` | [Xem CV](members/nong-lam-ngoc-son/index.html) |
| 07 | Vi Anh Quân | `members/vi-anh-quan/` | [Xem CV](members/vi-anh-quan/index.html) |

> **Quy tắc làm việc:** Mỗi thành viên sở hữu một thư mục riêng biệt trong `members/` để tự quản lý file `index.html`, `style.css` và tài nguyên cá nhân, hoàn toàn không bị xung đột mã nguồn khi commit và tạo Pull Request.

---

## 🌟 Tính Năng Nổi Bật

- 🌐 **Cổng hồ sơ nhóm hiện đại**: Trang chủ tổng hợp cả 7 thành viên, hỗ trợ tìm kiếm theo tên và lọc theo trạng thái hồ sơ.
- 📂 **Phân tách thư mục độc lập**: Mỗi thành viên một khu vực riêng (`members/[tên-thành-viên]/`) chứa file `index.html` của riêng mình.
- 🎨 **Giao diện chuẩn thiết kế gốc**: Phối màu đất ấm thanh lịch (TopCV warm style), bố cục cân đối, hiển thị rõ ràng thông tin học vấn, kỹ năng, dự án.
- 🖨️ **Chuẩn in A4 / Xuất PDF**: Đã cấu hình bộ quy tắc `@media print` giúp xuất ra file PDF A4 hoàn chỉnh không bị vỡ bố cục hay tràn trang.
- ✎ **Chỉnh sửa nhanh (Quick Edit)**: Nhấp nút **Chỉnh sửa nhanh** để chỉnh sửa trực tiếp nội dung văn bản trên trình duyệt.

---

## 📁 Cấu Trúc Thư Mục

```text
├── index.html                  # Cổng thông tin & danh mục hồ sơ nhóm
├── style.css                   # Giao diện trang chủ (Dark & Warm modern style)
├── script.js                   # Xử lý tìm kiếm và lọc thành viên
├── members/                    # Thư mục khu vực thành viên
│   ├── index.html              # Trang danh mục thành viên
│   ├── members.css             # Giao diện danh mục
│   ├── nguyen-dac-hoang/       # Không gian CV riêng của Nguyễn Đắc Hoàng
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── avatar.jpg
│   ├── hoang-bac/              # Không gian CV riêng của Hoàng Bắc
│   │   ├── index.html
│   │   ├── style.css
│   │   └── avatar.jpg
│   ├── luong-thi-hanh/         # Không gian CV riêng của Lương Thị Hạnh
│   ├── duong-tuan-hoang/       # Không gian CV riêng của Dương Tuấn Hoàng
│   ├── nguyen-huy-hoang/       # Không gian CV riêng của Nguyễn Huy Hoàng
│   ├── nong-lam-ngoc-son/      # Không gian CV riêng của Nông Lâm Ngọc Sơn
│   └── vi-anh-quan/            # Không gian CV riêng của Vi Anh Quân
├── assets/                     # Tài nguyên dùng chung
├── start.bat                   # File khởi chạy dự án nhanh bằng 1 click
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## ⚡ Khởi Chạy Nhanh Dự Án (1-Click)

Bạn chỉ cần **nhấp đúp chuột vào file `start.bat`** trong thư mục gốc của dự án:
- Tự động bật máy chủ cục bộ và mở ngay trang web trên trình duyệt mặc định (`http://localhost:8080`).
- Nếu máy tính chưa cài Python, file sẽ tự động mở trực tiếp `index.html` để xem ngay lập tức.


## 🚀 Triển Khai Lên Web (Deployment)

### 1. Triển khai qua Cloudflare Pages (Miễn phí, tốc độ cao)
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Chọn tab **Pages** > **Connect to Git**.
3. Chọn repository: `hoang-nguyen05/That-Nghiep-Dai-Toi`.
4. Cấu hình build:
   - **Project name**: `that-nghiep-dai-toi` (Link: `https://that-nghiep-dai-toi.pages.dev`)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: (Để trống)
   - **Build output directory**: `.` (hoặc `./`)
5. Nhấn **Save and Deploy**.

### 2. Triển khai qua GitHub Pages
Đã được kích hoạt tại:
🔗 **[https://hoang-nguyen05.github.io/That-Nghiep-Dai-Toi/](https://hoang-nguyen05.github.io/That-Nghiep-Dai-Toi/)**

---

## 👥 Quản Lý Nhóm 7 Người (Thất Nghiệp Đại Tội)
- **GitHub Project Board #1**: [https://github.com/users/hoang-nguyen05/projects/1/settings](https://github.com/users/hoang-nguyen05/projects/1/settings)
- Thêm 7 thành viên vào làm cộng tác viên trực tiếp của repository tại:
  [https://github.com/hoang-nguyen05/That-Nghiep-Dai-Toi/settings/access](https://github.com/hoang-nguyen05/That-Nghiep-Dai-Toi/settings/access)
