import { db } from "@/db";
import { matches, NewMatch } from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";

export async function listUpcomingMatches() {
  return db
    .select()
    .from(matches)
    .where(eq(matches.status, "upcoming"))
    .orderBy(asc(matches.matchDate));
}

export async function listCompletedMatches() {
  return db
    .select()
    .from(matches)
    .where(eq(matches.status, "completed"))
    .orderBy(desc(matches.matchDate));
}

export async function listAllMatches() {
  return db.select().from(matches).orderBy(desc(matches.matchDate));
}

export async function getMatch(id: number) {
  const rows = await db.select().from(matches).where(eq(matches.id, id));
  return rows[0] ?? null;
}

export async function createMatch(data: NewMatch) {
  const rows = await db.insert(matches).values(data).returning();
  return rows[0];
}

export async function updateMatch(id: number, data: Partial<NewMatch>) {
  const rows = await db
    .update(matches)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(matches.id, id))
    .returning();
  return rows[0] ?? null;
}

export async function deleteMatch(id: number) {
  await db.delete(matches).where(eq(matches.id, id));
}
