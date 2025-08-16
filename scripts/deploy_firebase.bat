@echo off
setlocal enabledelayedexpansion

REM Ngọc Hải Đường - Firebase Deployment Script (Windows)
REM This script automates the deployment process to Firebase Hosting

REM Configuration
set PROJECT_NAME=jewelery-web
set FIREBASE_PROJECT_ID=jewelery-web-51890
set BUILD_DIR=build
set DEPLOY_URL=https://jewelery-web-51890.web.app

echo 🚀 Starting Firebase deployment for %PROJECT_NAME%
echo ==================================================

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

REM Check if Firebase CLI is installed
where firebase >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Firebase CLI is not installed. Installing now...
    npm install -g firebase-tools
)

echo ✅ All prerequisites are satisfied

REM Install dependencies
echo 📦 Installing dependencies...
if not exist "node_modules" (
    npm install
    echo ✅ Dependencies installed
) else (
    echo 📦 Dependencies already installed, checking for updates...
    npm install
    echo ✅ Dependencies updated
)

REM Build the project
echo 🔨 Building project for production...

REM Clean previous build
if exist "%BUILD_DIR%" (
    echo 🧹 Cleaning previous build...
    rmdir /s /q "%BUILD_DIR%"
)

REM Build the project
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    exit /b 1
)

echo ✅ Project built successfully

REM Deploy to Firebase
echo 🚀 Deploying to Firebase...
firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo ❌ Deployment failed
    exit /b 1
)

echo ✅ Deployment successful!
echo 🌐 Your website is now live at: %DEPLOY_URL%

REM Show deployment info
echo.
echo 🎉 Deployment Summary:
echo ======================
echo Project: %PROJECT_NAME%
echo Firebase Project ID: %FIREBASE_PROJECT_ID%
echo Live URL: %DEPLOY_URL%
echo Firebase Console: https://console.firebase.google.com/project/%FIREBASE_PROJECT_ID%/overview
echo.
echo 📊 Next Steps:
echo - Check Firebase Console for analytics
echo - Monitor website performance
echo - Set up custom domain if needed
echo.

echo ✅ Script completed successfully!
pause
