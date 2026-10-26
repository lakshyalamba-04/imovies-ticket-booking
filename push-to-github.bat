@echo off
title Push IMovies to GitHub
color 0B
echo ===================================================================
echo   🚀 AUTOMATED GITHUB REPOSITORY CREATOR & PUSHER
echo ===================================================================
echo.
set "PATH=C:\Users\laksh\gh\bin;C:\Users\laksh\MinGit\cmd;%PATH%"
cd /d "%~dp0"

echo [1/2] Checking GitHub login...
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Opening GitHub authorization in your browser...
    echo (Press Enter in your browser when prompted to approve access)
    echo.
    gh auth login --web --git-protocol https -h github.com
)

echo.
echo [2/2] Creating public repository on GitHub and pushing all files...
gh repo create imovies-ticket-booking --public --source=. --remote=origin --push

echo.
echo ===================================================================
echo   ✅ ALL DONE! Your repository has been created and pushed!
echo   Opening repository in your browser...
echo ===================================================================
gh browse
echo.
pause
