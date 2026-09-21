@echo off
chcp 65001 > nul
echo =======================================================
echo  GNU Pioneers - GitHub (psbpsb117/AI-Platform) Push
echo =======================================================
echo.

set GIT_PATH="C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"

cd /d "C:\Users\Administrator\.gemini\antigravity\scratch\gnu-pioneers-hub"

echo [1/3] Git 상태 확인 중...
%GIT_PATH% status

echo.
echo [2/3] 원격 저장소: https://github.com/psbpsb117/AI-Platform.git
echo.
echo [3/3] GitHub로 푸시를 진행합니다...
echo (GitHub 로그인 창 또는 브라우저 인증 창이 뜨면 승인해주세요)
echo.

%GIT_PATH% push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo =======================================================
    echo  성공! https://github.com/psbpsb117/AI-Platform 에
    echo  모든 파일이 성공적으로 푸시되었습니다!
    echo =======================================================
) else (
    echo [안내] 푸시가 완료되지 않았습니다. GitHub 권한 인증을 확인해주세요.
)

pause
