@echo off
setlocal
cd /d "%~dp0"
title That Nghiep Dai Toi - Local Server

echo ======================================================
echo    DU AN: THAT NGHIEP DAI TOI - 7 THANH VIEN
echo ======================================================
echo.

:: Kiem tra xem cong 8080 da duoc mo san chua (vi du chay nen)
netstat -ano | findstr /R /C:":8080 " >nul 2>&1
if %errorlevel% equ 0 (
    echo [+] May chu Web dang hoat dong tren cong 8080.
    echo [+] Dang mo trinh duyet tai: http://localhost:8080 ...
    start "" "http://localhost:8080"
    echo [*] Da mo website thanh cong tren trinh duyet!
    ping 127.0.0.1 -n 3 >nul
    exit /b 0
)

:: Kiem tra Python tren may
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Khong tim thay Python tren he thong.
    echo [+] Dang mo truc tiep giao dien website tren trinh duyet mac dinh...
    start "" "index.html"
    echo [*] Da mo thanh cong!
    ping 127.0.0.1 -n 3 >nul
    exit /b 0
)

:: Khoi dong may chu neu chua co
echo [+] Dang mo trinh duyet: http://localhost:8080 ...
start "" "http://localhost:8080"
echo [+] Dang khoi dong may chu Web tai cong 8080...
echo [*] Nhan Ctrl + C hoac dong cua so nay de dung may chu.
echo ------------------------------------------------------
python -m http.server 8080
if %errorlevel% neq 0 (
    echo.
    echo [!] Cong 8080 khong kha dung, chuyen sang cong 3000...
    start "" "http://localhost:3000"
    python -m http.server 3000
)

pause
