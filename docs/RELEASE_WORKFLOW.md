# Release Workflow Documentation

This document describes the complete release workflow for the Ngọc Hải Đường jewelry website.

## 🎯 Overview

Our release workflow follows a structured approach with proper branch naming, changelog generation, and automated deployment to Firebase Hosting.

## 📋 Release Branch Naming Convention

**Format:** `release/v{YYMMDD_HHMM}`

**Examples:**
- `release/v240815_1430` (August 15, 2024 at 14:30)
- `release/v240816_0915` (August 16, 2024 at 09:15)

## 🚀 Release Workflow Options

### 1. Complete Release Workflow (Recommended)

This is the most comprehensive option that handles everything automatically:

```bash
# Complete workflow: branch creation + deployment + tagging
npm run release:workflow

# Or directly
./scripts/release_workflow.sh
```

**What it does:**
1. ✅ Creates release branch from master
2. ✅ Generates changelog from git commits
3. ✅ Updates package.json version
4. ✅ Builds and deploys to Firebase
5. ✅ Creates and pushes git tag

### 2. Step-by-Step Release Process

If you prefer more control, you can use individual scripts:

```bash
# Step 1: Create release branch and changelog
npm run release

# Step 2: Deploy to Firebase
npm run deploy:script

# Step 3: Create git tag (on release branch)
npm run release:tag
```

### 3. Manual Release Process

For complete manual control:

```bash
# 1. Create release branch
./scripts/create_release.sh

# 2. Deploy to Firebase
./scripts/deploy_firebase.sh

# 3. Create git tag
./scripts/create_tag.sh
```

## 📝 Commit Message Convention

For proper changelog generation, use these commit message prefixes:

### Features
- `feat:` - New features
- `feature:` - New features
- `add:` - Adding new functionality
- `new:` - New additions

### Improvements
- `improve:` - Improvements to existing features
- `enhance:` - Enhancements
- `update:` - Updates to existing code
- `refactor:` - Code refactoring

### Bug Fixes
- `fix:` - Bug fixes
- `bugfix:` - Bug fixes
- `patch:` - Small fixes

### Documentation
- `docs:` - Documentation changes
- `documentation:` - Documentation updates

**Examples:**
```bash
git commit -m "feat: add new jade bracelet product"
git commit -m "fix: resolve image loading issue"
git commit -m "docs: update deployment instructions"
git commit -m "improve: optimize product filtering"
```

## 🔧 Script Options

### Release Creation Script

```bash
./scripts/create_release.sh [OPTIONS]

Options:
  -h, --help          Show help message
  -f, --force         Force creation without confirmation
  -n, --name NAME     Custom release branch name (format: vYYMMDD_HHMM)

Examples:
  ./scripts/create_release.sh                    # Auto-generated name
  ./scripts/create_release.sh --name v240815_1430  # Custom name
  ./scripts/create_release.sh --force            # No confirmation
```

### Release Workflow Script

```bash
./scripts/release_workflow.sh [OPTIONS]

Options:
  -h, --help          Show help message
  -f, --force         Force workflow without confirmation
  -n, --name NAME     Custom release branch name
  -s, --skip-deploy   Skip deployment step
  -t, --skip-tag      Skip tag creation step

Examples:
  ./scripts/release_workflow.sh                  # Complete workflow
  ./scripts/release_workflow.sh --skip-deploy    # Skip deployment
  ./scripts/release_workflow.sh --name v240815_1430  # Custom name
```

### Tag Creation Script

```bash
./scripts/create_tag.sh [OPTIONS]

Options:
  -h, --help          Show help message
  -f, --force         Force creation without confirmation
  -t, --tag TAG       Custom tag name
  -m, --message MSG   Custom tag message

Examples:
  ./scripts/create_tag.sh                        # Auto-generated tag
  ./scripts/create_tag.sh --tag v1.0.1          # Custom tag
  ./scripts/create_tag.sh --message "Release v1.0.1"  # Custom message
```

## 📊 Changelog Generation

The release scripts automatically generate changelogs based on git commits since the last tag.

### Changelog Structure

```markdown
# Changelog for Release v240815_1430

**Release Date:** 2024-08-15 14:30:00  
**Branch:** release/v240815_1430  
**Previous Tag:** v1.0.240815.1430

## 🚀 What's New

### Features
- feat: add new jade bracelet product
- add: implement advanced filtering

### Improvements
- improve: optimize product loading
- refactor: clean up component structure

### Bug Fixes
- fix: resolve image loading issue
- patch: fix navigation bug

### Documentation
- docs: update deployment guide

## 📋 All Changes

```
abc1234 - John Doe, 2 hours ago : feat: add new jade bracelet product
def5678 - Jane Smith, 1 hour ago : fix: resolve image loading issue
```

## 🔧 Technical Details

- **Commit Range:** v1.0.240815.1430..HEAD
- **Total Commits:** 15
- **Files Changed:** 23
```

## 🏷️ Tag Naming Convention

**Format:** `v1.0.{YYMMDD}.{HHMM}`

**Examples:**
- `v1.0.240815.1430` (from release/v240815_1430)
- `v1.0.240816.0915` (from release/v240816_0915)

## 📦 Package.json Version Updates

The release scripts automatically update the package.json version:

```json
{
  "version": "1.0.240815.1430"
}
```

## 🚀 Deployment Process

### Automatic Deployment (via workflow script)

1. **Build Process:**
   - Install dependencies (`npm install`)
   - Build for production (`npm run build`)
   - Verify build success

2. **Firebase Deployment:**
   - Deploy to Firebase Hosting
   - Verify deployment success
   - Provide live URL

### Manual Deployment

```bash
# Build and deploy
npm run deploy:script

# Or step by step
npm run build
firebase deploy --only hosting
```

## 🔍 Verification Steps

After each release, verify:

1. **Release Branch:**
   ```bash
   git branch --show-current  # Should show release/vYYMMDD_HHMM
   ```

2. **Changelog:**
   ```bash
   cat docs/CHANGELOG_release_vYYMMDD_HHMM.md
   ```

3. **Package Version:**
   ```bash
   cat package.json | grep version
   ```

4. **Live Website:**
   - Visit: https://jewelery-web-51890.web.app
   - Test all functionality
   - Verify new features

5. **Git Tag:**
   ```bash
   git tag --list | tail -5
   git show v1.0.YYMMDD.HHMM
   ```

## 🛠️ Troubleshooting

### Common Issues

1. **Uncommitted Changes:**
   ```bash
   git status
   git add .
   git commit -m "feat: prepare for release"
   ```

2. **Not on Master Branch:**
   ```bash
   git checkout master
   git pull origin master
   ```

3. **Firebase Login Issues:**
   ```bash
   firebase logout
   firebase login
   ```

4. **Build Failures:**
   ```bash
   npm install
   npm run build
   # Check for compilation errors
   ```

5. **Tag Already Exists:**
   ```bash
   git tag --list | grep v1.0.YYMMDD.HHMM
   # Use different timestamp or delete existing tag
   ```

### Error Messages

- ❌ **"Not in a git repository"** - Run from project root
- ❌ **"Uncommitted changes"** - Commit or stash changes first
- ❌ **"Tag already exists"** - Use different timestamp
- ❌ **"Build failed"** - Check for compilation errors
- ❌ **"Deployment failed"** - Check Firebase project permissions

## 📋 Best Practices

### Before Release

1. **Ensure Clean Working Directory:**
   ```bash
   git status
   git add .
   git commit -m "feat: final changes before release"
   ```

2. **Test Thoroughly:**
   ```bash
   npm start
   # Test all functionality locally
   ```

3. **Update Documentation:**
   - Update README if needed
   - Update deployment guides

### During Release

1. **Use Descriptive Commit Messages:**
   ```bash
   git commit -m "feat: add new jade bracelet collection"
   git commit -m "fix: resolve product image loading issue"
   ```

2. **Review Changelog:**
   - Check generated changelog
   - Verify all changes are captured

3. **Test Deployment:**
   - Verify live website functionality
   - Test all user flows

### After Release

1. **Merge to Master:**
   ```bash
   git checkout master
   git merge release/vYYMMDD_HHMM
   git push origin master
   ```

2. **Clean Up:**
   ```bash
   git branch -d release/vYYMMDD_HHMM
   git push origin --delete release/vYYMMDD_HHMM
   ```

3. **Update Documentation:**
   - Update release notes
   - Update deployment status

## 📞 Support

For release workflow issues:

1. Check the troubleshooting section above
2. Review script help: `./scripts/release_workflow.sh --help`
3. Check Firebase Console for deployment status
4. Verify git repository status

---

**Live Website:** https://jewelery-web-51890.web.app  
**Firebase Console:** https://console.firebase.google.com/project/jewelery-web-51890/overview
