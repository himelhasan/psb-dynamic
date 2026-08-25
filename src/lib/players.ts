import { db } from "@/db";
import { players, NewPlayer } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function listPlayers() {
  return db.select().from(players).orderBy(asc(players.sortOrder));
}

export async function getPlayer(id: number) {
  const rows = await db.select().from(players).where(eq(players.id, id));
  return rows[0] ?? null;
}

export async function createPlayer(data: NewPlayer) {
  const rows = await db.insert(players).values(data).returning();
  return rows[0];
}

export async function updatePlayer(id: number, data: Partial<NewPlayer>) {
  const rows = await db
    .update(players)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(players.id, id))
    .returning();
  return rows[0] ?? null;
}

export async function deletePlayer(id: number) {
  await db.delete(players).where(eq(players.id, id));
}
