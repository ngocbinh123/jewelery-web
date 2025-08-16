# Deployment Scripts

This folder contains automated deployment scripts for the Ngọc Hải Đường jewelry website.

## 📁 Files

- `deploy_firebase.sh` - Unix/Linux/macOS deployment script
- `deploy_firebase.bat` - Windows deployment script
- `create_release.sh` - Release branch creation script
- `create_tag.sh` - Git tag creation script
- `release_workflow.sh` - Complete release workflow script
- `README.md` - This file

## 🚀 Quick Start

### Unix/Linux/macOS
```bash
# Full deployment
./scripts/deploy_firebase.sh

# Or using npm script
npm run deploy:script
```

### Windows
```cmd
# Full deployment
scripts\deploy_firebase.bat

# Or using npm script
npm run deploy:script:win
```

## 📋 Script Options

### Unix/Linux/macOS Script Options

```bash
# Show help
./scripts/deploy_firebase.sh --help

# Full deployment with tests
./scripts/deploy_firebase.sh

# Deploy without running tests
./scripts/deploy_firebase.sh --skip-tests

# Force deployment without confirmation
./scripts/deploy_firebase.sh --force

# Only check prerequisites and login status
./scripts/deploy_firebase.sh --check-only

# Only build the project (no deployment)
./scripts/deploy_firebase.sh --build-only
```

### NPM Script Commands

```bash
# Deployment Scripts
npm run deploy:script      # Unix/Linux/macOS deployment
npm run deploy:script:win  # Windows deployment
npm run deploy:check       # Check prerequisites only
npm run deploy:build       # Build only
npm run deploy             # Simple deployment

# Release Scripts
npm run release            # Create release branch and changelog
npm run release:workflow   # Complete release workflow
npm run release:tag        # Create git tag
npm run release:force      # Force release creation
npm run release:workflow:force  # Force complete workflow
```

## 🔧 What the Scripts Do

### Deployment Scripts
#### Prerequisites Check
- ✅ Node.js installation
- ✅ npm installation
- ✅ Firebase CLI installation
- ✅ Firebase login status

#### Build Process
- 📦 Install/update dependencies
- 🧪 Run tests (optional)
- 🔨 Build project for production
- 🧹 Clean previous builds

#### Deployment
- 🚀 Deploy to Firebase Hosting
- ✅ Verify deployment
- 📊 Show deployment summary

### Release Scripts
#### Release Creation
- 🔍 Git status verification
- 🔄 Switch to master branch
- 📥 Pull latest changes
- 🌿 Create release branch with timestamp
- 📝 Generate changelog from git commits
- 📦 Update package.json version
- 💾 Commit and push changes

#### Tag Creation
- 🏷️ Generate tag name from release branch
- 📋 Create tag with changelog content
- 🚀 Push tag to remote repository

#### Complete Workflow
- 🔄 Combines all release steps
- 🚀 Automatic deployment
- 🏷️ Automatic tagging
- 📊 Comprehensive summary

## 🌟 Features

### Deployment Scripts
#### Unix/Linux/macOS Script
- 🎨 **Colored output** for better readability
- ⚠️ **Error handling** with proper exit codes
- 🔍 **Prerequisites validation**
- 📝 **Detailed logging** with timestamps
- 🛡️ **Safety confirmations**
- 🔧 **Multiple deployment options**

#### Windows Script
- ✅ **Simple and straightforward**
- 🔍 **Basic error checking**
- 📦 **Automatic dependency management**
- 🚀 **One-click deployment**

### Release Scripts
#### Release Creation
- 🌿 **Automatic branch naming** (release/vYYMMDD_HHMM)
- 📝 **Changelog generation** from git commits
- 📦 **Package.json version updates**
- 🔍 **Git status validation**
- 🛡️ **Safety confirmations**

#### Tag Creation
- 🏷️ **Automatic tag naming** (v1.0.YYMMDD.HHMM)
- 📋 **Changelog integration** in tag messages
- 🔍 **Tag existence validation**
- 🚀 **Automatic tag pushing**

#### Complete Workflow
- 🔄 **End-to-end automation**
- 🚀 **One-command release process**
- 📊 **Comprehensive reporting**
- 🛡️ **Error handling and rollback**

## 📊 Output Examples

### Successful Deployment
```
🚀 Starting Firebase deployment for jewelery-web
==================================================
[2024-01-15 10:30:00] Checking prerequisites...
✅ All prerequisites are satisfied
[2024-01-15 10:30:01] Checking Firebase login status...
✅ Firebase login verified
[2024-01-15 10:30:02] Installing dependencies...
✅ Dependencies updated
[2024-01-15 10:30:05] Building project for production...
✅ Project built successfully
[2024-01-15 10:30:08] Build size: 2.1M
[2024-01-15 10:30:09] Deploying to Firebase...
✅ Deployment successful!
[2024-01-15 10:30:12] Your website is now live at: https://jewelery-web-51890.web.app

🎉 Deployment Summary:
======================
Project: jewelery-web
Firebase Project ID: jewelery-web-51890
Live URL: https://jewelery-web-51890.web.app
Firebase Console: https://console.firebase.google.com/project/jewelery-web-51890/overview

📊 Next Steps:
- Check Firebase Console for analytics
- Monitor website performance
- Set up custom domain if needed

✅ Script completed successfully!
```

## 🛠️ Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   chmod +x scripts/deploy_firebase.sh
   ```

2. **Firebase CLI Not Found**
   ```bash
   npm install -g firebase-tools
   ```

3. **Not Logged In**
   ```bash
   firebase login
   ```

4. **Build Fails**
   - Check for compilation errors
   - Verify all dependencies are installed
   - Check Node.js version compatibility

### Error Messages

- ❌ **Node.js is not installed** - Install Node.js from nodejs.org
- ❌ **npm is not installed** - Install npm with Node.js
- ⚠️ **Firebase CLI is not installed** - Script will auto-install
- ❌ **Build failed** - Check console for specific errors
- ❌ **Deployment failed** - Check Firebase project permissions

## 🔒 Security Notes

- Scripts use your local Firebase authentication
- No sensitive data is stored in scripts
- Firebase config is public (safe for client-side)
- Always review deployment before confirming

## 📞 Support

For script issues:
1. Check the error messages above
2. Verify Firebase project permissions
3. Ensure all prerequisites are met
4. Check Firebase Console for deployment status

---

**Live Website**: https://jewelery-web-51890.web.app
**Firebase Console**: https://console.firebase.google.com/project/jewelery-web-51890/overview
