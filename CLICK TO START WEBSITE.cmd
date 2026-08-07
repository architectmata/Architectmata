@echo off
setlocal
cd /d "%~dp0"
set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "FALLBACK_NODE=%LOCALAPPDATA%\OpenAI\Codex\runtimes\cua_node\1b23c930bdf84ed6\bin\node.exe"

if not exist "%NODE_EXE%" (
  if exist "%FALLBACK_NODE%" (
    set "NODE_EXE=%FALLBACK_NODE%"
  )
)

if not exist "%NODE_EXE%" (
  echo Could not find Node, so the website cannot start.
  pause
  exit /b 1
)

if not exist "node_modules\next\dist\bin\next" (
  echo Could not find the website dependencies.
  pause
  exit /b 1
)

echo Starting Architectmata...
echo.
echo When you see "Ready", open:
echo http://127.0.0.1:3000
echo.
echo Keep this window open while viewing the website.
echo.
"%NODE_EXE%" node_modules\next\dist\bin\next start -H 127.0.0.1 -p 3000
echo.
echo The website stopped.
pause
