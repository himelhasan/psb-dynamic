import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool, db } from "./index";
import { adminUsers, players, matches } from "./schema";

export async function initDatabase() {
  console.log("[db/init] Running table creation and seed...");

  // Create tables idempotently - safe to run on every boot
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(64) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS matches (
      id SERIAL PRIMARY KEY,
      opponent TEXT NOT NULL,
      competition TEXT,
      venue TEXT,
      match_date TIMESTAMP NOT NULL,
      status VARCHAR(16) DEFAULT 'upcoming' NOT NULL,
      psb_score INTEGER,
      opponent_score INTEGER,
      scorers TEXT,
      recap TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      squad_number VARCHAR(8),
      position TEXT,
      tier VARCHAR(16) DEFAULT 'bench' NOT NULL,
      photo_url TEXT,
      bio TEXT,
      joined_year INTEGER,
      sort_order INTEGER DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  console.log("[db/init] Tables verified/created.");

  // Seed admin user (idempotent via onConflictDoNothing)
  const username = process.env.SEED_ADMIN_USERNAME ?? "admin";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "changeme";
  const passwordHash = await bcrypt.hash(password, 10);

  await db
    .insert(adminUsers)
    .values({ username, passwordHash })
    .onConflictDoNothing({ target: adminUsers.username });

  // Seed sample players only if the table is empty
  const existingPlayers = await db.select().from(players);
  if (existingPlayers.length === 0) {
    await db.insert(players).values([
      { name: "Rokibul", squadNumber: "00", position: "GK / CB",  tier: "starter", sortOrder: 1 },
      { name: "Himel",   squadNumber: "11", position: "GK / CDM", tier: "starter", sortOrder: 2 },
      { name: "Sujon",   squadNumber: "12", position: "CB",       tier: "starter", sortOrder: 3 },
    ]);
    console.log("[db/init] Seeded sample players.");
  }

  // Seed sample matches only if the table is empty
  const existingMatches = await db.select().from(matches);
  if (existingMatches.length === 0) {
    await db.insert(matches).values([
      {
        opponent: "Kadamtoli United",
        competition: "Friendly",
        venue: "Donia Ground",
        matchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "upcoming",
      },
      {
        opponent: "Jatrabari FC",
        competition: "League",
        venue: "Home",
        matchDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: "completed",
        psbScore: 3,
        opponentScore: 1,
        scorers: "Himel, Omi, Sohan",
      },
    ]);
    console.log("[db/init] Seeded sample matches.");
  }

  console.log("[db/init] Done.");
  return { success: true };
}