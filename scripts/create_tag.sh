#!/bin/bash

# Ngọc Hải Đường - Git Tag Creation Script
# This script creates git tags with proper versioning

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="jewelery-web"

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

# Function to check git status
check_git_status() {
    log "Checking git status..."
    
    if ! command_exists git; then
        error "Git is not installed. Please install Git first."
        exit 1
    fi
    
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
        exit 1
    fi
    
    success "Git status verified"
}

# Function to get current branch
get_current_branch() {
    git branch --show-current
}

# Function to check if we're on a release branch
check_release_branch() {
    local current_branch=$(get_current_branch)
    
    if [[ "$current_branch" != release/* ]]; then
        error "Not on a release branch. Current branch: $current_branch"
        echo "Please switch to a release branch first."
        exit 1
    fi
    
    success "On release branch: $current_branch"
    echo "$current_branch"
}

# Function to generate tag name from release branch
generate_tag_name() {
    local release_branch=$1
    
    # Extract version from release branch (e.g., release/v240815_1430 -> v1.0.240815.1430)
    local version=$(echo "$release_branch" | sed 's/.*\/v//')
    local formatted_version="v1.0.${version//_/.}"
    
    echo "$formatted_version"
}

# Function to check if tag already exists
check_tag_exists() {
    local tag_name=$1
    
    if git rev-parse "$tag_name" >/dev/null 2>&1; then
        error "Tag $tag_name already exists"
        return 1
    fi
    
    return 0
}

# Function to get changelog content
get_changelog_content() {
    local release_branch=$1
    local changelog_file="docs/CHANGELOG_${release_branch//\//_}.md"
    
    if [ -f "$changelog_file" ]; then
        cat "$changelog_file"
    else
        echo "Changelog for release $release_branch"
        echo ""
        echo "Generated on $(date)"
    fi
}

# Function to create git tag
create_git_tag() {
    local tag_name=$1
    local release_branch=$2
    local message=$3
    
    log "Creating git tag: $tag_name"
    
    if git tag -a "$tag_name" -m "$message"; then
        success "Git tag created: $tag_name"
        return 0
    else
        error "Failed to create git tag"
        return 1
    fi
}

# Function to push git tag
push_git_tag() {
    local tag_name=$1
    
    log "Pushing git tag to remote..."
    
    if git push origin "$tag_name"; then
        success "Git tag pushed to remote: $tag_name"
        return 0
    else
        error "Failed to push git tag"
        return 1
    fi
}

# Function to show tag summary
show_tag_summary() {
    local tag_name=$1
    local release_branch=$2
    
    echo ""
    echo "🎉 Tag Summary:"
    echo "==============="
    echo "Tag Name: $tag_name"
    echo "Release Branch: $release_branch"
    echo "Commit Hash: $(git rev-parse HEAD)"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Verify the tag: git show $tag_name"
    echo "2. Deploy to production: ./scripts/deploy_firebase.sh"
    echo "3. Merge release branch to master when ready"
    echo "4. Delete release branch after successful deployment"
    echo ""
}

# Function to show help
show_help() {
    echo "Ngọc Hải Đường - Git Tag Creation Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help          Show this help message"
    echo "  -f, --force         Force creation without confirmation"
    echo "  -t, --tag TAG       Custom tag name (default: auto-generated)"
    echo "  -m, --message MSG   Custom tag message"
    echo ""
    echo "Examples:"
    echo "  $0                  # Create tag with auto-generated name"
    echo "  $0 --force          # Force creation without confirmation"
    echo "  $0 --tag v1.0.1     # Create tag with custom name"
    echo "  $0 --message 'Release v1.0.1'  # Create tag with custom message"
    echo ""
}

# Main tag creation function
main_tag_creation() {
    echo "🏷️  Creating Git Tag for $PROJECT_NAME"
    echo "======================================"
    
    # Check git status
    check_git_status
    
    # Check if we're on a release branch
    local release_branch=$(check_release_branch)
    
    # Generate tag name
    local tag_name
    if [ -n "$CUSTOM_TAG" ]; then
        tag_name="$CUSTOM_TAG"
    else
        tag_name=$(generate_tag_name "$release_branch")
    fi
    
    # Check if tag already exists
    if ! check_tag_exists "$tag_name"; then
        exit 1
    fi
    
    # Generate tag message
    local tag_message
    if [ -n "$CUSTOM_MESSAGE" ]; then
        tag_message="$CUSTOM_MESSAGE"
    else
        tag_message="Release $tag_name

$(get_changelog_content "$release_branch" | head -20)

Generated on $(date)"
    fi
    
    # Create git tag
    if ! create_git_tag "$tag_name" "$release_branch" "$tag_message"; then
        exit 1
    fi
    
    # Push git tag
    if ! push_git_tag "$tag_name"; then
        exit 1
    fi
    
    # Show summary
    show_tag_summary "$tag_name" "$release_branch"
}

# Parse command line arguments
FORCE=false
CUSTOM_TAG=""
CUSTOM_MESSAGE=""

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
        -t|--tag)
            CUSTOM_TAG="$2"
            shift 2
            ;;
        -m|--message)
            CUSTOM_MESSAGE="$2"
            shift 2
            ;;
        *)
            error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute tag creation
if [ "$FORCE" != "true" ]; then
    echo ""
    echo -e "${YELLOW}Are you sure you want to create a git tag? (y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        log "Tag creation cancelled"
        exit 0
    fi
fi

main_tag_creation

success "Tag creation completed successfully!"
