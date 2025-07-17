# GitHub Upload Commands
# Run these commands after creating your repository on GitHub

# Add your GitHub repository as remote origin
git remote add origin https://github.com/Utpal-Kalita/taskmate-ai.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git branch -M main
git push -u origin main

# If you encounter authentication issues, you may need to:
# 1. Use a Personal Access Token instead of password
# 2. Or use GitHub Desktop
# 3. Or configure SSH keys
