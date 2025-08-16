#!/bin/bash

# Ngọc Hải Đường - Complete Release Workflow Script
# This script handles the entire release process: branch creation, deployment, and tagging

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="jewelery-web"
MASTER_BRANCH="master"
RELEASE_PREFIX="release"

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    if ! command_exists git; then
        error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    if ! command_exists node; then
        error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command_exists npm; then
        error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command_exists firebase; then
        error "Firebase CLI is not installed. Installing now..."
        npm install -g firebase-tools
    fi
    
    success "All prerequisites are satisfied"
}

# Function to check git status
check_git_status() {
    log "Checking git status..."
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        error "Not in a git repository. Please run this script from the project root."
        exit 1
    fi
    
    # Check if we have uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        warning "You have uncommitted changes. Please commit or stash them first."
        echo "Uncommitted files:"
        git status --porcelain
        echo ""
        echo -e "${YELLOW}Do you want to continue anyway? (y/N)${NC}"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            log "Release workflow cancelled"
            exit 0
        fi
    fi
    
    success "Git status verified"
}

# Function to get current branch
get_current_branch() {
    git branch --show-current
}

# Function to switch to master branch
switch_to_master() {
    log "Switching to master branch..."
    
    current_branch=$(get_current_branch)
    if [ "$current_branch" != "$MASTER_BRANCH" ]; then
        git checkout "$MASTER_BRANCH"
        success "Switched to $MASTER_BRANCH branch"
    else
        success "Already on $MASTER_BRANCH branch"
    fi
}

# Function to pull latest changes
pull_latest_changes() {
    log "Pulling latest changes from remote..."
    
    if git pull origin "$MASTER_BRANCH"; then
        success "Latest changes pulled successfully"
    else
        error "Failed to pull latest changes"
        exit 1
    fi
}

# Function to generate release branch name
generate_release_branch_name() {
    local timestamp=$(date +'%y%m%d_%H%M')
    echo "${RELEASE_PREFIX}/v${timestamp}"
}

# Function to create release branch
create_release_branch() {
    local release_branch_name=$1
    
    log "Creating release branch: $release_branch_name"
    
    if git checkout -b "$release_branch_name"; then
        success "Release branch created: $release_branch_name"
        return 0
    else
        error "Failed to create release branch"
        return 1
    fi
}

# Function to get last tag
get_last_tag() {
    git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0"
}

# Function to generate changelog
generate_changelog() {
    local last_tag=$1
    local release_branch=$2
    
    log "Generating changelog from $last_tag to $release_branch..."
    
    # Create changelog directory if it doesn't exist
    mkdir -p docs
    
    # Generate changelog
    local changelog_file="docs/CHANGELOG_${release_branch//\//_}.md"
    
    cat > "$changelog_file" << EOF
# Changelog for Release ${release_branch//release\//}

**Release Date:** $(date +'%Y-%m-%d %H:%M:%S')  
**Branch:** $release_branch  
**Previous Tag:** $last_tag

## 🚀 What's New

### Features
$(git log --pretty=format:"- %s" --grep="^feat:" --grep="^feature:" --grep="^add:" --grep="^new:" "$last_tag"..HEAD 2>/dev/null || echo "- No new features")

### Improvements
$(git log --pretty=format:"- %s" --grep="^improve:" --grep="^enhance:" --grep="^update:" --grep="^refactor:" "$last_tag"..HEAD 2>/dev/null || echo "- No improvements")

### Bug Fixes
$(git log --pretty=format:"- %s" --grep="^fix:" --grep="^bugfix:" --grep="^patch:" "$last_tag"..HEAD 2>/dev/null || echo "- No bug fixes")

### Documentation
$(git log --pretty=format:"- %s" --grep="^docs:" --grep="^documentation:" "$last_tag"..HEAD 2>/dev/null || echo "- No documentation changes")

## 📋 All Changes

\`\`\`
$(git log --pretty=format:"%h - %an, %ar : %s" "$last_tag"..HEAD)
\`\`\`

## 🔧 Technical Details

- **Commit Range:** $last_tag..HEAD
- **Total Commits:** $(git rev-list --count "$last_tag"..HEAD)
- **Files Changed:** $(git diff --name-only "$last_tag"..HEAD | wc -l | tr -d ' ')

## 📦 Deployment

This release is ready for deployment to Firebase Hosting.

\`\`\`bash
# Deploy to Firebase
./scripts/deploy_firebase.sh
\`\`\`

## 🎯 Next Steps

1. Review the changes
2. Test the application
3. Deploy to staging if needed
4. Deploy to production
5. Create a git tag for this release

---
*Generated automatically on $(date)*
EOF

    success "Changelog generated: $changelog_file"
    echo "$changelog_file"
}

# Function to update package.json version
update_package_version() {
    local release_branch=$1
    
    log "Updating package.json version..."
    
    # Extract version from release branch name
    local version=$(echo "$release_branch" | sed 's/.*\/v//')
    local formatted_version="1.0.${version//_/.}"
    
    # Update package.json version
    if command_exists jq; then
        jq --arg version "$formatted_version" '.version = $version' package.json > package.json.tmp && mv package.json.tmp package.json
        success "Updated package.json version to $formatted_version"
    else
        warning "jq not found, skipping package.json version update"
        echo "Please manually update version in package.json to: $formatted_version"
    fi
}

# Function to commit changes
commit_changes() {
    local release_branch=$1
    local changelog_file=$2
    
    log "Committing release changes..."
    
    git add .
    git commit -m "chore: prepare release $release_branch

- Update package.json version
- Add changelog: $changelog_file
- Prepare for deployment"
    
    success "Changes committed to release branch"
}

# Function to push release branch
push_release_branch() {
    local release_branch=$1
    
    log "Pushing release branch to remote..."
    
    if git push -u origin "$release_branch"; then
        success "Release branch pushed to remote"
    else
        error "Failed to push release branch"
        exit 1
    fi
}

# Function to build and deploy
build_and_deploy() {
    local release_branch=$1
    
    log "Building and deploying release: $release_branch"
    
    # Install dependencies
    log "Installing dependencies..."
    npm install
    success "Dependencies installed"
    
    # Build the project
    log "Building project for production..."
    if npm run build; then
        success "Project built successfully"
    else
        error "Build failed"
        exit 1
    fi
    
    # Deploy to Firebase
    log "Deploying to Firebase..."
    if firebase deploy --only hosting; then
        success "Deployment successful!"
        log "Your website is now live at: https://jewelery-web-51890.web.app"
    else
        error "Deployment failed"
        exit 1
    fi
}

# Function to generate tag name
generate_tag_name() {
    local release_branch=$1
    
    # Extract version from release branch (e.g., release/v240815_1430 -> v1.0.240815.1430)
    local version=$(echo "$release_branch" | sed 's/.*\/v//')
    local formatted_version="v1.0.${version//_/.}"
    
    echo "$formatted_version"
}

# Function to create and push git tag
create_and_push_tag() {
    local release_branch=$1
    local changelog_file=$2
    
    log "Creating git tag for release..."
    
    # Generate tag name
    local tag_name=$(generate_tag_name "$release_branch")
    
    # Check if tag already exists
    if git rev-parse "$tag_name" >/dev/null 2>&1; then
        error "Tag $tag_name already exists"
        return 1
    fi
    
    # Create tag message
    local tag_message="Release $tag_name

$(head -20 "$changelog_file")

Generated on $(date)"
    
    # Create git tag
    if git tag -a "$tag_name" -m "$tag_message"; then
        success "Git tag created: $tag_name"
    else
        error "Failed to create git tag"
        return 1
    fi
    
    # Push git tag
    if git push origin "$tag_name"; then
        success "Git tag pushed to remote: $tag_name"
    else
        error "Failed to push git tag"
        return 1
    fi
    
    echo "$tag_name"
}

# Function to show release summary
show_release_summary() {
    local release_branch=$1
    local changelog_file=$2
    local last_tag=$3
    local tag_name=$4
    
    echo ""
    echo "🎉 Release Workflow Summary:"
    echo "============================"
    echo "Release Branch: $release_branch"
    echo "Previous Tag: $last_tag"
    echo "New Tag: $tag_name"
    echo "Changelog: $changelog_file"
    echo "Total Commits: $(git rev-list --count "$last_tag"..HEAD)"
    echo "Live URL: https://jewelery-web-51890.web.app"
    echo ""
    echo "📋 What was completed:"
    echo "1. ✅ Created release branch from master"
    echo "2. ✅ Generated changelog from git commits"
    echo "3. ✅ Updated package.json version"
    echo "4. ✅ Built and deployed to Firebase"
    echo "5. ✅ Created and pushed git tag"
    echo ""
}

# Function to show help
show_help() {
    echo "Ngọc Hải Đường - Complete Release Workflow Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help          Show this help message"
    echo "  -f, --force         Force workflow without confirmation"
    echo "  -n, --name NAME     Custom release branch name (format: vYYMMDD_HHMM)"
    echo "  -s, --skip-deploy   Skip deployment step"
    echo "  -t, --skip-tag      Skip tag creation step"
    echo ""
    echo "Examples:"
    echo "  $0                  # Complete release workflow"
    echo "  $0 --force          # Force workflow without confirmation"
    echo "  $0 --name v240815_1430  # Custom release name"
    echo "  $0 --skip-deploy    # Skip deployment step"
    echo ""
}

# Main release workflow function
main_release_workflow() {
    echo "🚀 Starting Complete Release Workflow for $PROJECT_NAME"
    echo "======================================================"
    
    # Check prerequisites
    check_prerequisites
    
    # Check git status
    check_git_status
    
    # Switch to master and pull latest changes
    switch_to_master
    pull_latest_changes
    
    # Generate release branch name
    local release_branch_name
    if [ -n "$CUSTOM_NAME" ]; then
        release_branch_name="${RELEASE_PREFIX}/v${CUSTOM_NAME}"
    else
        release_branch_name=$(generate_release_branch_name)
    fi
    
    # Get last tag
    local last_tag=$(get_last_tag)
    
    # Create release branch
    if ! create_release_branch "$release_branch_name"; then
        exit 1
    fi
    
    # Generate changelog
    local changelog_file=$(generate_changelog "$last_tag" "$release_branch_name")
    
    # Update package.json version
    update_package_version "$release_branch_name"
    
    # Commit changes
    commit_changes "$release_branch_name" "$changelog_file"
    
    # Push release branch
    push_release_branch "$release_branch_name"
    
    # Build and deploy (if not skipped)
    local tag_name=""
    if [ "$SKIP_DEPLOY" != "true" ]; then
        build_and_deploy "$release_branch_name"
        
        # Create and push tag (if not skipped)
        if [ "$SKIP_TAG" != "true" ]; then
            tag_name=$(create_and_push_tag "$release_branch_name" "$changelog_file")
        fi
    fi
    
    # Show summary
    show_release_summary "$release_branch_name" "$changelog_file" "$last_tag" "$tag_name"
}

# Parse command line arguments
FORCE=false
CUSTOM_NAME=""
SKIP_DEPLOY=false
SKIP_TAG=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -n|--name)
            CUSTOM_NAME="$2"
            shift 2
            ;;
        -s|--skip-deploy)
            SKIP_DEPLOY=true
            shift
            ;;
        -t|--skip-tag)
            SKIP_TAG=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute release workflow
if [ "$FORCE" != "true" ]; then
    echo ""
    echo -e "${YELLOW}Are you sure you want to start the complete release workflow? (y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log "Release workflow cancelled"
        exit 0
    fi
fi

main_release_workflow

success "Release workflow completed successfully!"
