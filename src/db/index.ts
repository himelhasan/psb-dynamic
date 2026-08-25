import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/psb";

// Render's managed Postgres needs SSL once deployed; local dev usually doesn't.
const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production" && process.env.DATABASE_URL
      ? { rejectUnauthorized: false }
      : false,
});

export const db = drizzle(pool, { schema });
