@echo off
echo ========================================
echo    EarnIn Portfolio Deployment Script
echo ========================================
echo.

echo Creating deployment package...
echo.

REM Create a clean deployment folder
if exist "deploy" rmdir /s /q "deploy"
mkdir "deploy"

REM Copy essential files
echo Copying portfolio files...
copy "netlify-portfolio.html" "deploy\"
copy "netlify.toml" "deploy\"
copy "README.md" "deploy\"
copy "DEPLOYMENT_GUIDE.md" "deploy\"

REM Copy CSS and JS folders
xcopy "css" "deploy\css\" /e /i /q
xcopy "js" "deploy\js\" /e /i /q

REM Copy videos folder structure
xcopy "videos" "deploy\videos\" /e /i /q

echo.
echo Creating deployment zip file...
cd deploy
powershell -command "Compress-Archive -Path * -DestinationPath ..\earnin-portfolio-deploy.zip -Force"
cd ..

echo.
echo ========================================
echo    Deployment Package Ready!
echo ========================================
echo.
echo Files created:
echo - earnin-portfolio-deploy.zip (ready for Netlify)
echo - deploy\ folder (for manual upload)
echo.
echo Next steps:
echo 1. Go to https://netlify.com
echo 2. Drag and drop earnin-portfolio-deploy.zip
echo 3. Your portfolio will be live in minutes!
echo.
echo Or use the deploy folder for Git integration.
echo.
pause
