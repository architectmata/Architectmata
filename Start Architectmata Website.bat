@echo off
setlocal
cd /d "%~dp0"
set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "FALLBACK_NODE=%LOCALAPPDATA%\OpenAI\Codex\runtimes\cua_node\1b23c930bdf84ed6\bin\node.exe"
set "LOG_FILE=%~dp0website-server.log"

echo Architectmata website launcher > "%LOG_FILE%"
echo Folder: %CD% >> "%LOG_FILE%"

if not exist "%NODE_EXE%" (
  if exist "%FALLBACK_NODE%" (
    set "NODE_EXE=%FALLBACK_NODE%"
  )
)

if not exist "%NODE_EXE%" (
  echo Could not find Node, so the website cannot start.
  echo Tried:
  echo %USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe
  echo %FALLBACK_NODE%
  echo Node not found >> "%LOG_FILE%"
  pause
  exit /b 1
)

if not exist "node_modules\next\dist\bin\next" (
  echo Could not find the website dependencies.
  echo Missing: node_modules\next\dist\bin\next
  echo Missing Next dependency >> "%LOG_FILE%"
  pause
  exit /b 1
)

echo Node: %NODE_EXE% >> "%LOG_FILE%"
echo Starting Architectmata at http://localhost:3000
echo If localhost does not open, use http://127.0.0.1:3000
echo Keep this window open while you preview the website.
echo.
echo Waiting for the "Ready" message...
echo.
start "" "http://127.0.0.1:3000"
"%NODE_EXE%" node_modules\next\dist\bin\next start -H 127.0.0.1 -p 3000
echo.
echo The website server has stopped. If you see this message, the page will not open.
echo Exit code: %ERRORLEVEL% >> "%LOG_FILE%"
pause
