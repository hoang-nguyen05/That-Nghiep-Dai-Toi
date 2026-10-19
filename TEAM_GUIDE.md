# Quy trình làm việc cho nhóm 7 người

Website giữ nguyên giao diện hiện có. GitHub Project dùng để phân công công việc, Cloudflare Pages dùng để công khai website.

## Khi thành viên tham gia

1. Lấy username GitHub của bạn đó.
2. Chủ repo vào [Collaborators](https://github.com/hoang-nguyen05/That-Nghiep-Dai-Toi/settings/access) → Add people. Thành viên chấp nhận lời mời để có quyền cập nhật mã nguồn.
3. Vào [Project → Manage access](https://github.com/users/hoang-nguyen05/projects/1/settings/access), thêm bạn đó với quyền **Write** để cập nhật bảng. Quyền Project và repo được quản lý riêng.
4. Mở issue của phần việc tương ứng, chọn **Assignees** và gán bạn đó. Các mục TV01–TV07 là phân công mẫu, nhóm có thể đổi theo yêu cầu môn học.

## Phân công mẫu

| Vị trí | Phần việc |
|---|---|
| TV01 | Điều phối, tích hợp, triển khai Cloudflare |
| TV02 | Nội dung và cấu trúc HTML |
| TV03 | Giao diện CSS desktop |
| TV04 | Responsive và khả năng truy cập |
| TV05 | Tương tác JavaScript |
| TV06 | Kiểm thử và PDF A4 |
| TV07 | Tài liệu và báo cáo nhóm |

Các issue có tiêu chí hoàn thành. Chỉ gán tài khoản đã thực sự tham gia; không tạo danh tính giả cho vị trí trống.

## Luồng làm việc

1. Nhận issue, đổi trạng thái **Todo → In progress**.
2. Tạo nhánh riêng từ `main`, ví dụ `feature/responsive`, tránh cùng sửa `main` trực tiếp.
3. Sửa và chạy thử bằng `python -m http.server 8080`, mở `http://localhost:8080`.
4. Push nhánh và tạo Pull Request về `main`. Trong mô tả ghi `Closes #số-issue` nếu PR hoàn thành issue đó.
5. Chủ nhóm xem thay đổi và kiểm tra website trước khi merge.
6. Sau khi merge, xác nhận triển khai Cloudflare thành công rồi đổi trạng thái **Done**. Nếu một issue còn nhiều PR thì chỉ đóng sau khi xong toàn bộ.

## Cấu hình Cloudflare Pages

- Repository: `hoang-nguyen05/That-Nghiep-Dai-Toi`.
- Production branch: `main`.
- Framework preset: `None`.
- Build command: để trống.
- Build output directory: `.`.
- Root directory: thư mục gốc.

Kết nối Git giúp Cloudflare triển khai khi nhánh production có commit mới. Dùng URL thực tế Cloudflare cung cấp. Thành viên chỉ cần quyền repo để gửi thay đổi; không cần chia sẻ mật khẩu Cloudflare.

## Lưu ý chức năng hiện có

Chỉnh sửa nhanh và tải ảnh chỉ cập nhật bản xem trong trình duyệt, không tự lưu vào repository. Muốn thay đổi website công khai, sửa file nguồn rồi commit; muốn giữ bản đang xem, dùng In / Lưu PDF.
