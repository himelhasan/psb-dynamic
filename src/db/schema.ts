import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * A player in the club. `squadNumber` and `position` are display fields.
 * `tier` controls where the player shows up on the public squad page.
 */
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  squadNumber: varchar("squad_number", { length: 8 }), // text, not int: club uses values like "—"
  position: text("position"), // e.g. "GK / CDM"
  tier: varchar("tier", { length: 16 }).notNull().default("bench"), // "starter" | "bench"
  photoUrl: text("photo_url"),
  bio: text("bio"),
  joinedYear: integer("joined_year"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * A single fixture. If `status` is "completed", the result fields are shown;
 * otherwise it renders as an upcoming match.
 */
export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  opponent: text("opponent").notNull(),
  competition: text("competition"), // e.g. "Friendly", "League"
  venue: text("venue"),
  matchDate: timestamp("match_date").notNull(),
  status: varchar("status", { length: 16 }).notNull().default("upcoming"), // "upcoming" | "completed"
  psbScore: integer("psb_score"),
  opponentScore: integer("opponent_score"),
  scorers: text("scorers"), // free text, comma separated names (kept simple on purpose)
  recap: text("recap"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/** Dashboard login. Seed one row via the seed script — no public signup. */
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;
export type Match = typeof matches.$inferSelect;
export type NewMatch = typeof matches.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
