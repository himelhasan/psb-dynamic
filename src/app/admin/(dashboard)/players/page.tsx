import Link from "next/link";
import { listPlayers } from "@/lib/players";
import { DeleteButton } from "../DeleteButton";

export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  const players = await listPlayers();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
          Players
        </h1>
        <Link
          href="/admin/players/new"
          className="rounded-full bg-flag-red px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white hover:opacity-90 focus-ring"
        >
          + Add player
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="px-4 py-3 font-mono">{p.squadNumber ?? "—"}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 text-muted">{p.position ?? "—"}</td>
                <td className="px-4 py-3 text-muted capitalize">{p.tier}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/players/${p.id}`}
                      className="text-pitch-green hover:underline focus-ring"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      resource="players"
                      id={p.id}
                      label={p.name}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No players yet. Add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
