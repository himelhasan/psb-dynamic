#!/bin/bash

# PSB GitHub Push Script
# Run this from the psb/ directory

set -e  # Exit on error

echo "🚀 PSB GitHub Push Setup"
echo "========================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "✅ Initializing git repository..."
    git init
else
    echo "✅ Git already initialized"
fi

# Check for uncommitted changes
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "✅ Git repository found"
else
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Add all files
echo "📝 Adding all files..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "⚠️  No changes to commit"
else
    echo "✅ Files staged for commit"
    git commit -m "Initial commit: PSB website with Next.js, PostgreSQL, admin dashboard"
fi

# Prompt for GitHub URL
echo ""
echo "📌 GitHub Repository Setup"
echo "=========================="
echo ""
echo "You need your GitHub repository URL."
echo "Go to https://github.com/new to create one first."
echo ""
read -p "Enter your GitHub repository URL (e.g., https://github.com/YOUR-USERNAME/psb.git): " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

# Remove existing remote if it exists
if git remote | grep -q "^origin$"; then
    echo "🔄 Updating existing remote..."
    git remote set-url origin "$GITHUB_URL"
else
    echo "➕ Adding remote..."
    git remote add origin "$GITHUB_URL"
fi

# Ensure we're on the main branch
echo "🌿 Switching to main branch..."
git branch -M main

# Push to GitHub
echo ""
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Success! Your repository is live at:"
echo "   $GITHUB_URL"
echo ""
echo "📋 Next steps:"
echo "   1. Go to https://github.com/YOUR-USERNAME/psb"
echo "   2. Follow DEPLOY.md to set up on Render"
echo ""
