@echo off
chcp 65001 >nul
title Dự Án Thất Nghiệp Đại Tội
cd /d "%~dp0"

echo ======================================================
echo    DỰ ÁN: THẤT NGHIỆP ĐẠI TỘI - 7 THÀNH VIÊN
echo ======================================================
echo.

where python >nul 2>&1
if %errorlevel% equ 0 (
    echo [+] Đang mở trình duyệt tại: http://localhost:8080
    start "" http://localhost:8080
    echo [+] Máy chủ Web đang chạy trên cổng 8080...
    echo [*] Nhấn Ctrl + C hoặc đóng cửa sổ này để tắt máy chủ.
    echo ------------------------------------------------------
    python -m http.server 8080
    if %errorlevel% neq 0 (
        echo [!] Cổng 8080 đang bận, tự động chuyển sang cổng 3000...
        start "" http://localhost:3000
        python -m http.server 3000
    )
) else (
    echo [!] Không tìm thấy Python trên hệ thống.
    echo [+] Đang mở trực tiếp trang web trên trình duyệt mặc định...
    start "" index.html
    echo [*] Đã mở trang web thành công!
)
