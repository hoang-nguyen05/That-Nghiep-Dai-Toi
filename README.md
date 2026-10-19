# ⚔️ Dự Án: Thất Nghiệp Đại Tội

> Quy trình phân công công việc, mời thành viên và cấu hình Cloudflare: [TEAM_GUIDE.md](TEAM_GUIDE.md).

> Trang web CV cá nhân & đồ án nhóm **Thất Nghiệp Đại Tội** (Team 7 thành viên) được xây dựng bằng **HTML5, CSS3 và JavaScript thuần (Vanilla)**, tối ưu hiển thị trên mọi thiết bị và hỗ trợ in/xuất PDF chuẩn khổ **A4**.

---

## 🌟 Tính Năng Nổi Bật

- 🎨 **Giao diện chuẩn thiết kế gốc**: Phối màu đất ấm thanh lịch (TopCV warm style), bố cục 2 cột cân đối, hiển thị thông tin học vấn, kỹ năng, dự án và kinh nghiệm rõ ràng.
- 🖨️ **Chuẩn in A4 / Xuất PDF**: Đã cấu hình bộ quy tắc `@media print` giúp xuất ra file PDF A4 hoàn chỉnh không bị vỡ bố cục hay tràn trang.
- ✎ **Chỉnh sửa nhanh (Quick Edit)**: Nhấp nút **Chỉnh sửa nhanh** để chỉnh sửa trực tiếp nội dung văn bản trên trình duyệt.
- 📋 **Sao chép liên hệ**: Nhấp để copy nhanh số điện thoại, email và thông tin liên hệ.
- 🖼️ **Khung avatar linh hoạt**: Để trống avatar trắng tinh gọn hoặc nhấp trực tiếp vào khung avatar để tải ảnh mới lên xem trước.

---

## 📁 Cấu Trúc Thư Mục

```text
├── index.html       # File HTML chứa cấu trúc và nội dung CV
├── style.css        # Định dạng giao diện, hiệu ứng và print styles
├── script.js        # Script xử lý tương tác (In PDF, sửa nhanh, copy, tải ảnh)
├── assets/          # Thư mục chứa hình ảnh tài nguyên
│   └── avatar.jpg
└── README.md        # Tài liệu hướng dẫn dự án
```

---

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
