import Link from "next/link";
import { listPlayers } from "@/lib/players";
import { listUpcomingMatches, listCompletedMatches } from "@/lib/matches";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [players, upcoming, completed] = await Promise.all([
    listPlayers(),
    listUpcomingMatches(),
    listCompletedMatches(),
  ]);

  const stats = [
    { label: "Players", value: players.length, href: "/admin/players" },
    { label: "Upcoming matches", value: upcoming.length, href: "/admin/matches" },
    { label: "Completed matches", value: completed.length, href: "/admin/matches" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
        Overview
      </h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-line bg-surface p-5 transition-colors hover:border-flag-red focus-ring"
          >
            <p className="font-mono text-3xl font-bold">{s.value}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
              {s.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
