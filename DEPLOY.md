# PSB Deployment Checklist

## Before You Deploy

- [ ] **Read the README** → full setup and Render deployment guide
- [ ] **Have a GitHub account** → you'll need to push this code to a repo for Render to access
- [ ] **Have a Render account** → free tier works for starting out

## Local Development (Optional but Recommended)

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env.local

# 3. Edit .env.local with your local Postgres connection
# Example: postgresql://user:password@localhost:5432/psb

# 4. Generate migrations (creates schema)
npm run db:generate
npm run db:migrate

# 5. Seed the database (admin user + sample data)
npm run seed

# 6. Start dev server
npm run dev

# Open http://localhost:3000
# Login at /admin/login with admin / changeme
```

## Deploy to Render (Production)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial PSB site commit"
git remote add origin https://github.com/<your-username>/psb.git
git push -u origin main
```

### Step 2: Create Postgres on Render

1. Log into [dashboard.render.com](https://dashboard.render.com)
2. Click **New** → **PostgreSQL**
3. **Name**: `psb-postgres` (or your choice)
4. **Region**: choose closest to you
5. Click **Create Database**
6. **Copy the connection string** (you'll need this in Step 4)

### Step 3: Create Web Service on Render

1. Click **New** → **Web Service**
2. **Connect repository** → select your PSB repo
3. Fill in:
   - **Name**: `psb`
   - **Environment**: Node
   - **Build command**: `npm run build`
   - **Start command**: `next start`

### Step 4: Add Environment Variables

**Before clicking "Create Web Service"**, scroll to **Environment Variables** and add:

```
DATABASE_URL = <paste your Postgres connection string from Step 2>
AUTH_SECRET = <generate with: openssl rand -base64 32>
SEED_ADMIN_USERNAME = admin
SEED_ADMIN_PASSWORD = <your-strong-password>
NODE_ENV = production
```

Then click **Create Web Service**.

Render will build and deploy. Once live, note your URL (e.g., `psb-xxx.onrender.com`).

### Step 5: Seed the Database

After deploy completes:

1. Go to your Render web service
2. Click the **Shell** tab
3. Run: `npm run seed`
4. You should see confirmation messages

### Step 6: Test

- Visit `https://psb-xxx.onrender.com` → see the public site
- Visit `https://psb-xxx.onrender.com/admin/login` → log in with `admin` / your seed password
- Go to `/admin` and add a player or match to test

### Step 7: Change Admin Password

**Important**: The seed password is only for setup. You must change it:

1. Modify the password in your database (SQL) or
2. Add a settings page to the dashboard (future enhancement)

For now, you can manually update it via SQL in Render's Postgres dashboard.

---

## What's Included

✅ Next.js 16 app with TypeScript  
✅ PostgreSQL + Drizzle ORM  
✅ Admin dashboard (login, players, matches)  
✅ Public site (home, fixtures, squad grid)  
✅ JWT-based session auth  
✅ Fully responsive design  
✅ README with full setup guide  

---

## After Launch

### Customization

- **Colors**: edit `src/app/globals.css` (CSS variables)
- **Club info**: edit `src/app/page.tsx` hardcoded text
- **Fonts**: already using Oswald + Inter + JetBrains Mono (edit in `src/app/layout.tsx`)

### Common Tasks

- **Add players**: `/admin/players` → + Add player
- **Add matches**: `/admin/matches` → + Add match
- **Mark match complete**: edit match, change status, enter score + scorers
- **Update photos**: use external URLs (R2/S3) or GitHub raw URLs

### Enhancements

- Photo upload UI (integrates with R2/S3)
- Change password form in dashboard
- Match lineups / starting XI
- Player stats (goals, appearances)
- Public API for mobile apps

---

## Troubleshooting

**"Unauthorized" when accessing `/admin/players`**
- Check that you're logged in (session cookie set)
- Try `/admin/login` first

**"Database connection error"**
- Verify `DATABASE_URL` is correct and matches your Postgres instance
- Check that SSL is enabled in production (Render handles this)

**Migrations not applied**
- Use Render Shell to manually run: `npm run db:migrate`
- Check logs for SQL errors

---

## Support Links

- Render docs: https://render.com/docs
- Next.js docs: https://nextjs.org/docs
- Drizzle ORM: https://orm.drizzle.team

---

## Questions?

Feel free to reach out or check the full README.md for more details.

Good luck, PSB! ⚽🇧🇩
