# Firebase Deployment Guide

## 🚀 Quick Deployment

Your website is now live at: **https://jewelery-web-51890.web.app**

## 📋 Deployment Steps

### 1. Prerequisites
- Node.js (v18 or higher)
- Firebase CLI installed globally
- Firebase project created

### 2. Build the Project
```bash
npm run build
```

### 3. Deploy to Firebase
```bash
npm run deploy
```

Or manually:
```bash
firebase deploy --only hosting
```

## 🔧 Firebase Configuration

### Current Setup
- **Project ID**: jewelery-web-51890
- **Hosting URL**: https://jewelery-web-51890.web.app
- **Firebase Console**: https://console.firebase.google.com/project/jewelery-web-51890/overview

### Configuration Files
- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Project association
- `src/firebase/config.js` - Firebase SDK configuration

## 📊 Monitoring

### Firebase Console
- **Analytics**: Track user behavior and page views
- **Hosting**: Monitor deployment status and performance
- **Performance**: Check website loading times

### Custom Domain (Optional)
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        channelId: live
        projectId: jewelery-web-51890
```

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   npm run build
   # Check for compilation errors
   ```

2. **Deployment Fails**
   ```bash
   firebase logout
   firebase login
   firebase deploy --only hosting
   ```

3. **Analytics Not Working**
   - Check browser console for errors
   - Verify Firebase config in `src/firebase/config.js`

### Useful Commands

```bash
# Check Firebase status
firebase projects:list

# View deployment history
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:revert

# Test locally
firebase serve
```

## 📈 Performance Optimization

### Build Optimization
- Code splitting implemented
- Lazy loading for components
- Optimized images and assets

### Firebase Hosting Features
- Global CDN
- Automatic HTTPS
- Custom headers for caching
- SPA routing support

## 🔒 Security

### HTTPS
- Automatically enabled on Firebase Hosting
- No additional configuration needed

### Environment Variables
- Firebase config is public (safe for client-side)
- Sensitive data should use environment variables

## 📞 Support

For deployment issues:
1. Check Firebase Console logs
2. Review build output
3. Contact Firebase support if needed

---

**Live Website**: https://jewelery-web-51890.web.app
**Firebase Console**: https://console.firebase.google.com/project/jewelery-web-51890/overview
