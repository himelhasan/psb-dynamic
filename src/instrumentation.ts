// src/instrumentation.ts
// This file is loaded by Next.js once on server startup (both dev and production).
// We use it to ensure the database tables exist and are seeded before any request is served.

export async function register() {
  // Only run on the Node.js runtime (not edge/browser)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initDatabase } = await import("./db/init");
    try {
      await initDatabase();
    } catch (err) {
      console.error("[instrumentation] Database init failed:", err);
      // Do not throw - allow the server to start even if DB is temporarily unreachable
    }
  }
}