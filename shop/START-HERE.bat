@echo off
title Amptek Shop - Local Server
cd /d "%~dp0"
echo.
echo  ========================================
echo   Amptek Shop - Starting local server
echo  ========================================
echo.

REM Node.js (recommended)
where node >nul 2>&1
if %errorlevel%==0 (
  echo Using Node.js...
  start "" cmd /c "timeout /t 2 >nul && start http://localhost:8080/index.html"
  npx --yes serve -l 8080 .
  goto :end
)

REM Python via py launcher (Windows)
where py >nul 2>&1
if %errorlevel%==0 (
  echo Using Python...
  start "" cmd /c "timeout /t 2 >nul && start http://localhost:8080/index.html"
  py -3 -m http.server 8080
  goto :end
)

REM Python direct
where python >nul 2>&1
if %errorlevel%==0 (
  echo Using Python...
  start "" cmd /c "timeout /t 2 >nul && start http://localhost:8080/index.html"
  python -m http.server 8080
  goto :end
)

echo  No Node.js or Python found.
echo  Opening index.html directly (some features may be limited).
echo  Install Node.js from https://nodejs.org for best results.
echo.
start "" "%~dp0index.html"
pause

:end
