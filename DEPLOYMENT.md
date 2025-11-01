# 🚀 Deployment Guide for BTQ Companion v8

This guide will walk you through deploying your BTQ Companion to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- The btq-companion-v8 folder downloaded and extracted

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Repository settings:
   - **Name**: `btq-companion-v8` (or any name you prefer)
   - **Description**: "Beat to Quarters v8 Naval Wargaming Companion"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

### Step 2: Push Code to GitHub

Open terminal/command prompt in the btq-companion-v8 folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: BTQ Companion v8"

# Rename branch to main
git branch -M main

# Add your GitHub repository as remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/btq-companion-v8.git

# Push to GitHub
git push -u origin main
```

**Note**: Replace `YOUR-USERNAME` with your GitHub username

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab near the top)
3. Scroll down to **Pages** in the left sidebar
4. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: Select `gh-pages` and `/ (root)`
   - Click **Save**

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (green checkmark) - usually takes 1-2 minutes
4. Once complete, go back to Settings → Pages
5. You'll see a message: "Your site is live at https://YOUR-USERNAME.github.io/btq-companion-v8/"

### Step 5: Access Your App

Visit: `https://YOUR-USERNAME.github.io/btq-companion-v8/`

🎉 **Your BTQ Companion is now live!**

## Making Updates

After making changes to your app:

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Actions will automatically rebuild and redeploy your app!

## Troubleshooting

### Issue: Workflow Fails

**Solution**: Check the Actions tab for error details. Common issues:
- npm install failures: Check package.json
- Build errors: Check console for syntax errors
- Permission errors: Check repository Settings → Actions → Workflow permissions

### Issue: Page Shows 404

**Solutions**:
1. Wait a few minutes after first deployment
2. Check that `base: '/btq-companion-v8/'` in vite.config.js matches your repository name
3. Verify GitHub Pages is set to deploy from `gh-pages` branch

### Issue: Blank Page

**Solutions**:
1. Open browser console (F12) to see errors
2. Verify the `base` path in vite.config.js
3. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Changes Not Appearing

**Solutions**:
1. Check Actions tab to verify workflow completed
2. Clear browser cache
3. Wait a few minutes for GitHub CDN to update

## Custom Domain (Optional)

To use a custom domain like `btq.yourdomain.com`:

1. Add a `CNAME` file to the `public/` folder containing your domain:
   ```
   btq.yourdomain.com
   ```

2. In your domain registrar, add a CNAME record:
   - **Type**: CNAME
   - **Name**: btq
   - **Value**: YOUR-USERNAME.github.io

3. In GitHub repository Settings → Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Local Development

```bash
# Install dependencies
npm install

# Run dev server (with hot reload)
npm run dev
# Opens at http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Repository Structure

```
btq-companion-v8/
├── .github/
│   └── workflows/
│       └── deploy.yml    ← Automatic deployment
├── src/
│   ├── App.jsx          ← Main application
│   ├── main.jsx         ← React entry
│   └── index.css        ← Styles
├── public/              ← Static assets
├── .gitignore           ← Git ignore rules
├── index.html           ← HTML entry point
├── package.json         ← Dependencies
├── vite.config.js       ← Build configuration
├── tailwind.config.js   ← Styling configuration
└── README.md            ← Documentation
```

## GitHub Actions Workflow

The `.github/workflows/deploy.yml` file automatically:
1. Runs on every push to `main` branch
2. Installs dependencies
3. Builds the production version
4. Deploys to `gh-pages` branch
5. GitHub Pages serves from `gh-pages` branch

## Security Notes

- Never commit sensitive data (API keys, passwords)
- The repository must be public for free GitHub Pages
- For private repositories, GitHub Pages requires a paid plan

## Need Help?

- Check GitHub's [Pages documentation](https://docs.github.com/en/pages)
- Review [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
- Open an issue in your repository

---

**Happy Sailing!** ⚓
