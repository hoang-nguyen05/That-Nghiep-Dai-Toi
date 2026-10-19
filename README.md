# Thất Nghiệp Đại Tội

Website CV của nhóm 7 thành viên, dùng HTML, CSS và JavaScript thuần.

- [Website GitHub Pages](https://hoang-nguyen05.github.io/That-Nghiep-Dai-Toi/)
- [Bảng GitHub Project #1](https://github.com/users/hoang-nguyen05/projects/1)
- CV Nguyễn Đắc Hoàng: `hoang.html`; 6 hồ sơ còn lại chờ thành viên cung cấp.

## Thêm thành viên và CV

1. Chủ repo vào [Repository → Settings → Collaborators](https://github.com/hoang-nguyen05/That-Nghiep-Dai-Toi/settings/access), chọn **Add people**, nhập username GitHub. Thành viên cần chấp nhận lời mời.
2. Nếu cần sửa bảng công việc, thêm người đó tại [Project → Settings → Manage access](https://github.com/users/hoang-nguyen05/projects/1/settings/access), cấp **Write**. Quyền repo và Project được quản lý riêng.
3. Thành viên tạo nhánh riêng, sao chép `cv-template.html` thành file ở thư mục gốc, ví dụ `lan.html`. Có thể dùng CV HTML tự thiết kế, miễn mở được bằng liên kết tương đối.
4. Điền nội dung và ảnh của mình. Mỗi người sửa file riêng để tránh xung đột. Với ảnh, dùng thư mục `assets/ten-thanh-vien/` và đường dẫn tương đối.
5. Thay một ô chờ trong `members.json` bằng tên, vai trò, chữ viết tắt và đường dẫn file:

   ```json
   {"name":"Tên thành viên","role":"Lập trình viên web","url":"lan.html","initials":"L"}
   ```

   Giữ đủ 7 phần tử, dùng tên file không dấu, không khoảng trắng. Để `url: null` khi hồ sơ chưa sẵn sàng.
6. Push nhánh, tạo Pull Request, chủ repo kiểm tra rồi merge vào `main`. Website cập nhật theo cấu hình hosting đã kết nối.

**Chỉnh sửa nhanh và tải ảnh trên trang CV chỉ thay đổi bản xem trong trình duyệt, không lưu vào GitHub.** Muốn cập nhật công khai, sửa file nguồn và commit. Có thể dùng In / Lưu PDF để giữ bản đang xem.

## Chạy thử trên máy

Trong thư mục repo chạy `python -m http.server 8080`, mở `http://localhost:8080`.
Không mở `index.html` bằng `file://` vì danh sách được đọc qua `fetch`.

## Cloudflare Pages

Chủ tài khoản cần kết nối GitHub với Cloudflare một lần:

1. Vào [Cloudflare Dashboard](https://dash.cloudflare.com/), chọn **Workers & Pages → Create application → Pages → Connect to Git** (tên mục có thể thay đổi theo giao diện).
2. Kết nối GitHub và chọn repository `hoang-nguyen05/That-Nghiep-Dai-Toi`.
3. Cấu hình **Production branch: main**, **Framework preset: None**, **Build command: để trống**, **Build output directory: .**, **Root directory: để trống**.
4. Chọn **Save and Deploy**. Dùng URL `pages.dev` thực tế Cloudflare trả về; tên miền mong muốn có thể đã có người dùng.
5. Sau khi kết nối Git, mỗi lần merge vào `main`, Cloudflare tự triển khai lại. Không cần mời thành viên vào Cloudflare để họ cập nhật CV qua repo.

GitHub Pages hiện dùng nhánh `main`, thư mục `/`. Liên kết nội bộ là đường dẫn tương đối nên hỗ trợ cả tên miền gốc Cloudflare và thư mục con GitHub Pages.

## GitHub Project

GitHub Project theo dõi công việc; website CV được triển khai từ repository.
Nếu dùng CLI để cấu hình bảng, cần cấp quyền một lần: `gh auth refresh -s project`.
Liên kết repo vào bảng hiện có: `gh project link 1 --owner hoang-nguyen05 --repo hoang-nguyen05/That-Nghiep-Dai-Toi`.

Gợi ý trạng thái: **Todo → In Progress → Done**. Mỗi người có thể nhận issue CV sau khi tham gia. Không cần thêm người chưa có username.

## Cấu trúc

- `index.html`: trang chung.
- `team.css`, `team.js`: giao diện và danh sách nhóm.
- `members.json`: 7 ô thành viên.
- `hoang.html`: CV hiện có.
- `cv-template.html`: mẫu trống cho thành viên mới.
- `style.css`, `script.js`: giao diện và tương tác CV.
- `assets/`: ảnh của từng thành viên.
