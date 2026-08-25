import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "./index";
import { adminUsers, players, matches } from "./schema";

async function main() {
  const username = process.env.SEED_ADMIN_USERNAME || "admin";
  const password = process.env.SEED_ADMIN_PASSWORD || "changeme";
  const passwordHash = await bcrypt.hash(password, 10);

  await db
    .insert(adminUsers)
    .values({ username, passwordHash })
    .onConflictDoNothing({ target: adminUsers.username });

  console.log(`Admin user ready: ${username} / ${password} (change this password!)`);

  const existingPlayers = await db.select().from(players);
  if (existingPlayers.length === 0) {
    await db.insert(players).values([
      {
        name: "Rokibul",
        squadNumber: "00",
        position: "GK / CB",
        tier: "starter",
        sortOrder: 1,
      },
      {
        name: "Himel",
        squadNumber: "11",
        position: "GK / CDM",
        tier: "starter",
        sortOrder: 2,
      },
      {
        name: "Sujon",
        squadNumber: "12",
        position: "CB",
        tier: "starter",
        sortOrder: 3,
      },
    ]);
    console.log("Seeded sample players.");
  }

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
    console.log("Seeded sample matches.");
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
