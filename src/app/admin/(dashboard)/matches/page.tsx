import Link from "next/link";
import { listAllMatches } from "@/lib/matches";
import { DeleteButton } from "../DeleteButton";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function MatchesPage() {
  const matches = await listAllMatches();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
          Matches
        </h1>
        <Link
          href="/admin/matches/new"
          className="rounded-full bg-flag-red px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white hover:opacity-90 focus-ring"
        >
          + Add match
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Opponent</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((m) => (
              <tr key={m.id} className="border-t border-line">
                <td className="px-4 py-3 text-muted">
                  {formatDate(m.matchDate)}
                </td>
                <td className="px-4 py-3">{m.opponent}</td>
                <td className="px-4 py-3 capitalize text-muted">{m.status}</td>
                <td className="px-4 py-3 font-mono">
                  {m.status === "completed"
                    ? `${m.psbScore ?? "–"} : ${m.opponentScore ?? "–"}`
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/matches/${m.id}`}
                      className="text-pitch-green hover:underline focus-ring"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      resource="matches"
                      id={m.id}
                      label={`vs ${m.opponent}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {matches.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No matches yet. Add your first fixture.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
