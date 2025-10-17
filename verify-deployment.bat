@echo off
echo ========================================
echo    Portfolio Deployment Verification
echo ========================================
echo.

echo Checking essential files...
echo.

REM Check main files
if exist "netlify-portfolio.html" (
    echo ✓ netlify-portfolio.html - Main portfolio page
) else (
    echo ✗ netlify-portfolio.html - MISSING!
)

if exist "css\netlify-style.css" (
    echo ✓ css\netlify-style.css - Styling
) else (
    echo ✗ css\netlify-style.css - MISSING!
)

if exist "js\netlify-portfolio.js" (
    echo ✓ js\netlify-portfolio.js - Functionality
) else (
    echo ✗ js\netlify-portfolio.js - MISSING!
)

if exist "netlify.toml" (
    echo ✓ netlify.toml - Netlify configuration
) else (
    echo ✗ netlify.toml - MISSING!
)

echo.
echo Checking video folders...
echo.

REM Check video folders
if exist "videos\Sora" (
    echo ✓ videos\Sora - Sora AI videos
) else (
    echo ✗ videos\Sora - MISSING!
)

if exist "videos\Veo3" (
    echo ✓ videos\Veo3 - Veo3 AI videos
) else (
    echo ✗ videos\Veo3 - MISSING!
)

if exist "videos\ChatGPT" (
    echo ✓ videos\ChatGPT - ChatGPT videos
) else (
    echo ✗ videos\ChatGPT - MISSING!
)

if exist "videos\Gemini" (
    echo ✓ videos\Gemini - Gemini videos
) else (
    echo ✗ videos\Gemini - MISSING!
)

if exist "videos\Other" (
    echo ✓ videos\Other - Other AI platforms
) else (
    echo ✗ videos\Other - MISSING!
)

echo.
echo Checking documentation...
echo.

if exist "README.md" (
    echo ✓ README.md - Documentation
) else (
    echo ✗ README.md - MISSING!
)

if exist "DEPLOYMENT_GUIDE.md" (
    echo ✓ DEPLOYMENT_GUIDE.md - Deployment guide
) else (
    echo ✗ DEPLOYMENT_GUIDE.md - MISSING!
)

echo.
echo ========================================
echo    Verification Complete
echo ========================================
echo.
echo If all items show ✓, your portfolio is ready for deployment!
echo.
echo To deploy:
echo 1. Run deploy-to-netlify.bat
echo 2. Upload the zip file to Netlify
echo 3. Your portfolio will be live!
echo.
pause
