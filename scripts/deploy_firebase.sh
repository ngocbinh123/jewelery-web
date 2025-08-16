#!/bin/bash

# Ngọc Hải Đường - Firebase Deployment Script
# This script automates the deployment process to Firebase Hosting

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="jewelery-web"
FIREBASE_PROJECT_ID="jewelery-web-51890"
BUILD_DIR="build"
DEPLOY_URL="https://jewelery-web-51890.web.app"

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

# Function to check Firebase login status
check_firebase_login() {
    log "Checking Firebase login status..."
    
    if ! firebase projects:list >/dev/null 2>&1; then
        warning "Not logged in to Firebase. Please login first."
        firebase login
    else
        success "Firebase login verified"
    fi
}

# Function to install dependencies
install_dependencies() {
    log "Installing dependencies..."
    
    if [ ! -d "node_modules" ]; then
        npm install
        success "Dependencies installed"
    else
        log "Dependencies already installed, checking for updates..."
        npm install
        success "Dependencies updated"
    fi
}

# Function to run tests
run_tests() {
    log "Running tests..."
    
    if npm test -- --watchAll=false --passWithNoTests; then
        success "All tests passed"
    else
        warning "Some tests failed, but continuing with deployment..."
    fi
}

# Function to build the project
build_project() {
    log "Building project for production..."
    
    # Clean previous build
    if [ -d "$BUILD_DIR" ]; then
        log "Cleaning previous build..."
        rm -rf "$BUILD_DIR"
    fi
    
    # Build the project
    if npm run build; then
        success "Project built successfully"
        
        # Check build size
        BUILD_SIZE=$(du -sh "$BUILD_DIR" | cut -f1)
        log "Build size: $BUILD_SIZE"
    else
        error "Build failed"
        exit 1
    fi
}

# Function to deploy to Firebase
deploy_to_firebase() {
    log "Deploying to Firebase..."
    
    # Check if we're deploying to the correct project
    CURRENT_PROJECT=$(firebase use --json | grep -o '"current":"[^"]*"' | cut -d'"' -f4)
    
    if [ "$CURRENT_PROJECT" != "$FIREBASE_PROJECT_ID" ]; then
        warning "Current Firebase project is $CURRENT_PROJECT, switching to $FIREBASE_PROJECT_ID"
        firebase use "$FIREBASE_PROJECT_ID"
    fi
    
    # Deploy to Firebase
    if firebase deploy --only hosting; then
        success "Deployment successful!"
        log "Your website is now live at: $DEPLOY_URL"
    else
        error "Deployment failed"
        exit 1
    fi
}

# Function to verify deployment
verify_deployment() {
    log "Verifying deployment..."
    
    # Wait a moment for deployment to propagate
    sleep 5
    
    # Check if the website is accessible
    if curl -s -f "$DEPLOY_URL" >/dev/null; then
        success "Website is accessible at $DEPLOY_URL"
    else
        warning "Website might not be accessible yet. Please check manually."
    fi
}

# Function to show deployment info
show_deployment_info() {
    echo ""
    echo "🎉 Deployment Summary:"
    echo "======================"
    echo "Project: $PROJECT_NAME"
    echo "Firebase Project ID: $FIREBASE_PROJECT_ID"
    echo "Live URL: $DEPLOY_URL"
    echo "Firebase Console: https://console.firebase.google.com/project/$FIREBASE_PROJECT_ID/overview"
    echo ""
    echo "📊 Next Steps:"
    echo "- Check Firebase Console for analytics"
    echo "- Monitor website performance"
    echo "- Set up custom domain if needed"
    echo ""
}

# Function to show help
show_help() {
    echo "Ngọc Hải Đường - Firebase Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help          Show this help message"
    echo "  -s, --skip-tests    Skip running tests"
    echo "  -f, --force         Force deployment without confirmation"
    echo "  -c, --check-only    Only check prerequisites and login status"
    echo "  -b, --build-only    Only build the project (no deployment)"
    echo ""
    echo "Examples:"
    echo "  $0                  # Full deployment with tests"
    echo "  $0 --skip-tests     # Deploy without running tests"
    echo "  $0 --check-only     # Only check prerequisites"
    echo "  $0 --build-only     # Only build the project"
    echo ""
}

# Main deployment function
main_deployment() {
    echo "🚀 Starting Firebase deployment for $PROJECT_NAME"
    echo "=================================================="
    
    check_prerequisites
    check_firebase_login
    install_dependencies
    
    if [ "$SKIP_TESTS" != "true" ]; then
        run_tests
    fi
    
    build_project
    deploy_to_firebase
    verify_deployment
    show_deployment_info
}

# Parse command line arguments
SKIP_TESTS=false
FORCE=false
CHECK_ONLY=false
BUILD_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -s|--skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -c|--check-only)
            CHECK_ONLY=true
            shift
            ;;
        -b|--build-only)
            BUILD_ONLY=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Execute based on options
if [ "$CHECK_ONLY" = "true" ]; then
    check_prerequisites
    check_firebase_login
    success "Prerequisites check completed"
elif [ "$BUILD_ONLY" = "true" ]; then
    check_prerequisites
    install_dependencies
    build_project
    success "Build completed"
else
    # Full deployment
    if [ "$FORCE" != "true" ]; then
        echo ""
        echo -e "${YELLOW}Are you sure you want to deploy to Firebase? (y/N)${NC}"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            log "Deployment cancelled"
            exit 0
        fi
    fi
    
    main_deployment
fi

success "Script completed successfully!"
