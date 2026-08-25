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
      // Starting Lineup
      { name: "Rokibul", squadNumber: "00", position: "GK / CB", tier: "starter", photoUrl: "/players/Rokibul.jpg", sortOrder: 1 },
      { name: "Himel", squadNumber: "11", position: "GK / CDM", tier: "starter", photoUrl: "/players/Himel.jpg", sortOrder: 2 },
      { name: "Sujon", squadNumber: "12", position: "CB", tier: "starter", photoUrl: "/players/sujon.jpg", sortOrder: 3 },
      { name: "Nakib", squadNumber: "09", position: "CB / CDM", tier: "starter", photoUrl: "/players/nakib.jpg", sortOrder: 4 },
      { name: "Sakib", squadNumber: "05", position: "CB / RW", tier: "starter", photoUrl: "/players/Sakib.jpg", sortOrder: 5 },
      { name: "Tasbih", squadNumber: "10", position: "CM", tier: "starter", photoUrl: "/players/tasbih.webp", sortOrder: 6 },
      { name: "Rabbi", squadNumber: "90", position: "CAM", tier: "starter", photoUrl: "/players/Rabbi.jpg", sortOrder: 7 },
      { name: "Omar", squadNumber: "96", position: "CAM", tier: "starter", photoUrl: "/players/Omar.jpg", sortOrder: 8 },
      { name: "Sohan", squadNumber: "14", position: "CAM / ST", tier: "starter", photoUrl: "/players/Sohan.jpg", sortOrder: 9 },
      { name: "Moshiur", squadNumber: "10", position: "LW / CM", tier: "starter", photoUrl: "/players/Moshiur.jpg", sortOrder: 10 },
      { name: "Omi", squadNumber: "10", position: "FW", tier: "starter", photoUrl: "/players/omi.jpg", sortOrder: 11 },

      // Reserves & Bench
      { name: "Naeem", squadNumber: "11", position: "GK / CB", tier: "bench", sortOrder: 12 },
      { name: "Childhood", squadNumber: "69", position: "GK / CB", tier: "bench", sortOrder: 13 },
      { name: "Sowad", squadNumber: "04", position: "CB", tier: "bench", sortOrder: 14 },
      { name: "Saif", squadNumber: "07", position: "CB", tier: "bench", sortOrder: 15 },
      { name: "Akash", squadNumber: "07", position: "CB", tier: "bench", sortOrder: 16 },
      { name: "Shushmoy", squadNumber: "23", position: "CB", tier: "bench", sortOrder: 17 },
      { name: "Shoron", squadNumber: "25", position: "CB", tier: "bench", sortOrder: 18 },
      { name: "Aminul", squadNumber: "97", position: "CB", tier: "bench", sortOrder: 19 },
      { name: "Jisan", squadNumber: "04", position: "CDM", tier: "bench", sortOrder: 20 },
      { name: "Ayon", squadNumber: "06", position: "CM", tier: "bench", sortOrder: 21 },
      { name: "Kayum", squadNumber: "07", position: "CM", tier: "bench", sortOrder: 22 },
      { name: "Parvej", squadNumber: "08", position: "CM", tier: "bench", sortOrder: 23 },
      { name: "Tiash", squadNumber: "28", position: "CM", tier: "bench", sortOrder: 24 },
      { name: "Noor", squadNumber: "77", position: "CM", tier: "bench", sortOrder: 25 },
      { name: "Oliul", squadNumber: "01", position: "CAM", tier: "bench", sortOrder: 26 },
      { name: "Mojumdar", squadNumber: "01", position: "CAM", tier: "bench", sortOrder: 27 },
      { name: "Maz", squadNumber: "18", position: "FW", tier: "bench", sortOrder: 28 },
      { name: "Shawon", squadNumber: "10", position: "ST", tier: "bench", sortOrder: 29 },
      { name: "Oporichita", squadNumber: "07", position: "—", tier: "bench", sortOrder: 30 },
      { name: "Shova", squadNumber: "10", position: "Player", tier: "bench", sortOrder: 31 },
      { name: "Mizan", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 32 },
      { name: "Masud", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 33 },
      { name: "Kabbo", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 34 },
      { name: "Shaon", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 35 },
      { name: "GK Hridoy", squadNumber: "—", position: "GK", tier: "bench", sortOrder: 36 },
      { name: "GK Sumo", squadNumber: "—", position: "GK", tier: "bench", sortOrder: 37 },
      { name: "Utsho", squadNumber: "—", position: "GK", tier: "bench", sortOrder: 38 },
      { name: "Shaishab", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 39 },
      { name: "Robin", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 40 },
      { name: "Sajjad", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 41 },
      { name: "Tanzil", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 42 },
      { name: "Rokib", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 43 },
      { name: "Nahid", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 44 },
      { name: "Roni", squadNumber: "—", position: "Player", tier: "bench", sortOrder: 45 }
    ]);
    console.log("[db/init] Seeded full sample players.");
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