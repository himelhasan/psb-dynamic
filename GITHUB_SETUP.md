# Push to GitHub

There are two easy ways to push this code to GitHub:

## Option 1: Use the Push Script (Easiest)

### On Mac/Linux:
```bash
chmod +x push-to-github.sh
./push-to-github.sh
```

### On Windows:
Double-click `push-to-github.bat`

Both scripts will:
1. ✅ Initialize git (if needed)
2. ✅ Stage all files
3. ✅ Create initial commit
4. ✅ Ask for your GitHub URL
5. ✅ Push to GitHub

---

## Option 2: Manual Commands (If Scripts Don't Work)

### Step 1: Create a Repository on GitHub

1. Go to https://github.com/new
2. Name: `psb`
3. Description: "Polashpur Soccer Boys website"
4. Make it **Public** (so Render can access it)
5. **DO NOT** initialize with README
6. Click "Create repository"
7. Copy the HTTPS URL (e.g., `https://github.com/YOUR-USERNAME/psb.git`)

### Step 2: Run These Commands

Open Terminal/PowerShell in the `psb` folder and run:

```bash
git init
git add .
git commit -m "Initial commit: PSB website with Next.js, PostgreSQL, admin dashboard"
git remote add origin https://github.com/YOUR-USERNAME/psb.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Step 3: Verify It Worked

Go to: https://github.com/YOUR-USERNAME/psb

You should see all your code files!

---

## ✅ You're Done!

Your code is now on GitHub. Next:

1. Render will use this URL to deploy your site
2. Follow **DEPLOY.md** for the Render setup

---

## Troubleshooting

**"fatal: not a git repository"**
- Make sure you're in the `psb/` folder

**"fatal: destination path already exists"**
- You already have git initialized. Just run:
  ```bash
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR-USERNAME/psb.git
  git push -u origin main
  ```

**"Permission denied" (Mac/Linux)**
- Make the script executable first:
  ```bash
  chmod +x push-to-github.sh
  ./push-to-github.sh
  ```

**GitHub asks for credentials**
- Use your GitHub username and a **Personal Access Token** (not your password)
- Create one at: https://github.com/settings/tokens (select "repo" scope)

---

## Next: Deploy to Render

Once your code is on GitHub, follow **DEPLOY.md** to connect it to Render and go live!
