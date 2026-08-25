@echo off
REM PSB GitHub Push Script (Windows)
REM Run this from the psb\ directory

echo.
echo 🚀 PSB GitHub Push Setup
echo ========================
echo.

REM Check if git is initialized
if not exist .git (
    echo ✅ Initializing git repository...
    git init
) else (
    echo ✅ Git already initialized
)

REM Add all files
echo 📝 Adding all files...
git add .

REM Commit
echo ✅ Files staged for commit
git commit -m "Initial commit: PSB website with Next.js, PostgreSQL, admin dashboard"

REM Prompt for GitHub URL
echo.
echo 📌 GitHub Repository Setup
echo ==========================
echo.
echo You need your GitHub repository URL.
echo Go to https://github.com/new to create one first.
echo.
set /p GITHUB_URL="Enter your GitHub repository URL (e.g., https://github.com/YOUR-USERNAME/psb.git): "

if "%GITHUB_URL%"=="" (
    echo ❌ No URL provided. Exiting.
    exit /b 1
)

REM Remove existing remote if it exists
git remote remove origin 2>nul

REM Add remote
echo ➕ Adding remote...
git remote add origin %GITHUB_URL%

REM Ensure main branch
echo 🌿 Switching to main branch...
git branch -M main

REM Push to GitHub
echo.
echo ⬆️  Pushing to GitHub...
echo (You may be prompted for your GitHub credentials)
echo.
git push -u origin main

echo.
echo ✅ Success! Your repository is live at:
echo    %GITHUB_URL%
echo.
echo 📋 Next steps:
echo    1. Go to https://github.com/YOUR-USERNAME/psb
echo    2. Follow DEPLOY.md to set up on Render
echo.
pause
