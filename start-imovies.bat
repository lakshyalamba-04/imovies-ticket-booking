@echo off
title IMovies - Movie Ticket Booking Made Simple
color 0A
echo ===================================================================
echo   🎬 IMOVIES - FULL STACK MERN MOVIE TICKET BOOKING APPLICATION
echo ===================================================================
echo.
set "PATH=C:\Users\laksh\nodejs;%PATH%"
cd /d "%~dp0"

echo [1/2] Launching IMovies Node.js/Express & React server on Port 5000...
start "IMovies Backend & Frontend (Port 5000)" cmd /k "cd /d "%~dp0" && set PATH=C:\Users\laksh\nodejs;%PATH% && node server/index.js"

echo.
echo Waiting 3 seconds for server to initialize...
timeout /t 3 /nobreak >nul

echo.
echo [2/2] Launching Cloudflare Edge Tunnel for Public Demo URL...
echo The public HTTPS demo link will appear below:
echo ===================================================================
"C:\Users\laksh\nodejs\cloudflared.exe" tunnel --url http://127.0.0.1:5000

pause
