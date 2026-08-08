@echo off
setlocal

cd /d "%~dp0"

echo Staging the current replacement website...
git add -A
if errorlevel 1 goto :error

git diff --cached --quiet
if not errorlevel 1 (
    echo No changes to commit. Pushing main to GitHub...
    git push origin main
    if errorlevel 1 goto :error
    goto :success
)

set "commit_message=Update replacement website"
if not "%~1"=="" set "commit_message=%~1"

echo Committing changes...
git commit -m "%commit_message%"
if errorlevel 1 goto :error

echo Pushing to architectmata/Architectmata...
git push origin main
if errorlevel 1 goto :error

:success
echo.
echo Done.
pause
exit /b 0

:error
echo.
echo Push failed. Review the Git output above and try again.
pause
exit /b 1
