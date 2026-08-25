import type { Match } from "@/db/schema";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function MatchCard({ match }: { match: Match }) {
  const isCompleted = match.status === "completed";
  const win =
    isCompleted &&
    match.psbScore != null &&
    match.opponentScore != null &&
    match.psbScore > match.opponentScore;
  const loss =
    isCompleted &&
    match.psbScore != null &&
    match.opponentScore != null &&
    match.psbScore < match.opponentScore;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-4 last:border-b-0">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {match.competition || "Friendly"} · {formatDate(match.matchDate)}
          {match.venue ? ` · ${match.venue}` : ""}
        </p>
        <p className="mt-1 font-display text-lg font-semibold uppercase tracking-wide">
          PSB <span className="text-muted">vs</span> {match.opponent}
        </p>
        {isCompleted && match.scorers && (
          <p className="mt-1 text-sm text-muted">Scorers: {match.scorers}</p>
        )}
      </div>

      {isCompleted ? (
        <div
          className={`shrink-0 rounded-md border px-3 py-2 text-center font-mono text-xl font-bold ${
            win
              ? "border-pitch-green text-pitch-green"
              : loss
              ? "border-flag-red text-flag-red"
              : "border-line text-muted"
          }`}
        >
          {match.psbScore ?? "–"}
          <span className="mx-1 text-sm text-muted">:</span>
          {match.opponentScore ?? "–"}
        </div>
      ) : (
        <div className="shrink-0 rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted">
          Upcoming
        </div>
      )}
    </div>
  );
}
