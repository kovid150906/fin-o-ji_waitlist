#!/bin/bash

# GitHub Repository Setup Script for fin-o-ji Waitlist

echo "🚀 Setting up GitHub repository for fin-o-ji waitlist..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files to git..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "No changes to commit."
else
    echo "Committing changes..."
    git commit -m "feat: Complete fin-o-ji waitlist landing page

    - Modern Next.js 14 + Tailwind CSS implementation
    - Interactive animations and smooth transitions
    - Responsive mobile-first design
    - Functional waitlist form with validation
    - Company story and feature showcase
    - Custom CSS animations for enhanced UX
    - Professional README and documentation"
fi

# Set the correct remote
echo "Setting up GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/kovid150906/waitlist_fin-o-ji.git

# Rename branch to main
git branch -M main

echo "✅ Repository setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: waitlist_fin-o-ji"
echo "3. Description: Modern waitlist landing page for fin-o-ji - Your personal AI insurance advocate"
echo "4. Make it Public"
echo "5. Don't initialize with README (we already have one)"
echo "6. Click 'Create repository'"
echo ""
echo "🚀 Then run:"
echo "git push -u origin main"
echo ""
echo "🌐 Your repo will be available at:"
echo "https://github.com/kovid150906/waitlist_fin-o-ji"
