# PSB — Polashpur Soccer Boys

A modern, data-driven website for the Polashpur Soccer Boys football club. Built with Next.js, PostgreSQL, and Drizzle ORM. Includes a public-facing squad and matchday section, plus a fully featured admin dashboard for managing players, fixtures, and results.

## Features

### Public Site

- **Hero section** — striking introduction with call-to-action
- **Club story** — about PSB with live stats (squad count, starting XI)
- **Fixtures & results** — upcoming matches and completed results with scorers
- **Squad grid** — all players organized into starters and bench, with photos and positions
- **Responsive design** — optimized for mobile, tablet, desktop
- **Data-driven** — every squad member and match pulls live from the database; no redeploy needed to update content

### Admin Dashboard

- **Login** — secure session-based authentication via JWT cookies
- **Players** — add/edit/delete players; set squad number, position, tier (starter/bench), photo URL, joined year, bio
- **Matches** — add/edit/delete fixtures; mark as completed and enter scorers + results
- **Overview** — quick stats: player count, upcoming, and completed matches

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js Route Handlers (`/api/*`)
- **Database**: PostgreSQL (managed on Render) + Drizzle ORM
- **Auth**: JWT (jose) + bcrypt, middleware-gated `/admin/*` routes
- **Hosting**: Render (Web Service + Postgres)

## Design

- **Palette**: Dark pitch at night (#0c0f0b) with red (#e2372f, Bangladesh flag) and pitch green (#2f8f4e) accents
- **Typography**: Oswald (display) + Inter (body) + JetBrains Mono (data)
- **Marquee ticker**: Scrolling PSB tagline beneath the nav
- **Grayscale player cards**: Hover to reveal color photo

## Setup & Development

### 1. Clone & Install

```bash
git clone <repo-url>
cd psb
npm install
```

### 2. Local Database

Set up a local PostgreSQL database (or use Docker):

```bash
docker run --name psb-postgres \
  -e POSTGRES_USER=himel \
  -e POSTGRES_PASSWORD=localpass \
  -e POSTGRES_DB=psb \
  -p 5432:5432 \
  -d postgres:16
```

### 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your local database connection string:

```env
DATABASE_URL="postgresql://himel:localpass@localhost:5432/psb"
AUTH_SECRET="your-random-secret-here-use-openssl-rand-base64-32"
SEED_ADMIN_USERNAME="admin"
SEED_ADMIN_PASSWORD="changeme"
NODE_ENV="development"
```

Generate a secure `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 4. Database Migrations

Generate and run migrations (creates tables):

```bash
npm run db:generate
npm run db:migrate
```

### 5. Seed Initial Data

Populate the database with the admin user and sample players/matches:

```bash
npm run seed
```

You'll see:

```
Admin user ready: admin / changeme (change this password!)
Seeded sample players.
Seeded sample matches.
```

### 6. Run Locally

```bash
npm run dev
```

Open http://localhost:3000:

- **Public site**: `/` — squad, fixtures, results
- **Admin login**: `/admin/login` → username `admin` / password `changeme`
- **Dashboard**: `/admin` — manage everything

---

## Deployment to Render

### Step 1: Create a PostgreSQL Database on Render

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **New** → **PostgreSQL**
3. Name it (e.g., `psb-postgres`)
4. Choose region nearest to Bangladesh (or your preference)
5. Leave other settings default
6. Click **Create Database**
7. Once created, copy the **connection string** (looks like `postgresql://user:pass@...`)

### Step 2: Create a Web Service on Render

1. Click **New** → **Web Service**
2. **Connect your repository**
   - If already connected, select the PSB repo
   - If not, paste the Git URL and authorize
3. **Name**: `psb` (or similar)
4. **Environment**: Node
5. **Region**: (match your Postgres region if possible)
6. **Branch**: `main` (or your default)
7. **Build command**: `npm run build`
8. **Start command**: `next start`
9. Don't create yet — scroll down to **Environment Variables**

### Step 3: Add Environment Variables

Click **Advanced** (if not visible) and add these environment variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste the PostgreSQL connection string from Step 1 |
| `AUTH_SECRET` | Generate with `openssl rand -base64 32` (use a new one for production) |
| `SEED_ADMIN_USERNAME` | `admin` (or your chosen username) |
| `SEED_ADMIN_PASSWORD` | A strong password — change it immediately after first login |
| `NODE_ENV` | `production` |

**Important**: After deployment, you **must** change the admin password in the dashboard. The seed password is only for initial setup.

### Step 4: Deploy

1. Click **Create Web Service**
2. Render will start building (watch the logs)
3. Once deployed, click the service URL to visit your live site

### Step 5: Seed the Database

After the first deployment, you need to run the seed script on Render. Use the **Shell** tab in your Render dashboard:

1. Click your PSB web service
2. Click the **Shell** tab
3. Run:

```bash
npm run seed
```

You'll see:

```
Admin user ready: admin / <your-password> (change this password!)
Seeded sample players.
Seeded sample matches.
```

4. Navigate to https://your-psb-url.onrender.com/admin/login
5. Log in with `admin` / your seed password
6. **Change the password immediately** by editing the admin user (or manually via SQL if needed)

### Step 6: Redeploy if Needed

If you push changes to your repo, Render automatically redeploys. To manually trigger:

1. Go to your web service
2. Click **Manual Deploy** → **Deploy Latest Commit**

---

## File Structure

```
psb/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes (REST endpoints)
│   │   │   ├── players/
│   │   │   ├── matches/
│   │   │   └── auth/
│   │   ├── admin/
│   │   │   ├── login/              # Login page (unprotected)
│   │   │   └── (dashboard)/        # Dashboard routes (protected by middleware)
│   │   │       ├── players/
│   │   │       ├── matches/
│   │   │       └── page.tsx        # Overview
│   │   ├── layout.tsx              # Root layout with fonts
│   │   ├── page.tsx                # Public home page
│   │   └── globals.css             # Global styles & design tokens
│   ├── components/                 # Reusable React components
│   │   ├── Nav.tsx
│   │   ├── Marquee.tsx
│   │   ├── PlayerCard.tsx
│   │   └── MatchCard.tsx
│   ├── db/
│   │   ├── index.ts                # Drizzle client + pool
│   │   ├── schema.ts               # Table definitions
│   │   └── seed.ts                 # Seed script (admin user + sample data)
│   ├── lib/
│   │   ├── auth.ts                 # Session / JWT helpers
│   │   ├── players.ts              # Player queries
│   │   └── matches.ts              # Match queries
│   └── middleware.ts               # Auth middleware for /admin/*
├── drizzle/                        # Auto-generated migrations (don't edit)
├── public/                         # Static assets (placeholder)
├── .env.example                    # Environment template
├── drizzle.config.ts              # Drizzle config
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## Common Tasks

### Add a New Player

1. Go to `/admin/players`
2. Click **+ Add player**
3. Fill in the form:
   - **Name** ✓ required
   - Squad number (e.g., `11`)
   - Position (e.g., `GK / CDM`)
   - Tier: "Starting lineup" or "Reserves & bench"
   - Photo URL (optional, e.g., `https://...` — currently local file uploads not supported; host images on R2/S3 and paste the URL)
   - Bio, joined year (optional)
4. Click **Add player**
5. The homepage updates instantly

### Record a Match Result

1. Go to `/admin/matches`
2. Click on the match to edit it (or **+ Add match** to create a new one)
3. Change **Status** from "Upcoming" to "Completed"
4. Enter **PSB score** and **Opponent score**
5. Add **Scorers** (comma-separated names, e.g., `Himel, Omi, Sohan`)
6. Optionally add a **Recap**
7. Click **Save changes**
8. The homepage results section updates instantly

### Photo Uploads

Currently, player photos are added via URL. For persistent photo storage on Render (which has ephemeral disks), consider:

- **Cloudflare R2** (Render already uses it for og-images): set up a bucket, get a public URL, paste into the player form
- **AWS S3** or another S3-compatible service
- **GitHub**: store images in a separate repo, use raw GitHub URLs

A future enhancement could add a photo upload UI that pushes to R2.

---

## Troubleshooting

### "DATABASE_URL is not set"

Make sure you've added `DATABASE_URL` to your `.env.local` (local) or Render environment variables (production).

### "Schema out of date"

If you change `src/db/schema.ts`, regenerate migrations:

```bash
npm run db:generate
npm run db:migrate
```

### Middleware redirects to login on every page

Check that your JWT is being set correctly. Verify:

1. `AUTH_SECRET` is set and is the same value everywhere
2. The cookie name in `src/lib/auth.ts` matches the one in `src/middleware.ts` (both use `psb_admin_session`)
3. Node.js can read the `.env*` files (local dev) or environment variables (Render)

### Render deployment times out

- Check that your database connection string is correct (with SSL on production)
- Verify migrations ran: use the Shell to run `npm run db:migrate` manually
- Check logs for any SQL errors

---

## Next Steps & Enhancements

- **Photo uploads**: add a file-upload input that pushes to Cloudflare R2 / S3
- **Change admin password**: add a settings page in the dashboard
- **Match lineup**: add a "team sheet" field with starting XI for each match
- **Player stats**: track goals, appearances, positions across seasons
- **Social links**: embed Instagram/Facebook feed
- **Public API**: expose player and match data as JSON for mobile apps

---

## License

Built for PSB. See individual copyright notices in code headers.

---

## Support

For questions about the build or deployment:
- Check the Render docs: [render.com/docs](https://render.com/docs)
- Drizzle guide: [drizzle.team](https://orm.drizzle.team)
- Next.js guide: [nextjs.org/docs](https://nextjs.org/docs)
