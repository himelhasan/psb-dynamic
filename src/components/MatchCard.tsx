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
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-5 last:border-b-0 group">
      <div>
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-flag-red" />
          <span>{match.competition || "Friendly"}</span>
          <span>·</span>
          <span>{formatDate(match.matchDate)}</span>
          {match.venue ? (
            <>
              <span>·</span>
              <span>{match.venue}</span>
            </>
          ) : null}
        </div>
        <p className="mt-1.5 font-display text-2xl font-bold uppercase tracking-wide text-foreground group-hover:text-white transition-colors">
          <span className="text-flag-red font-extrabold">PSB</span>{" "}
          <span className="text-muted font-normal text-lg">vs</span>{" "}
          <span>{match.opponent}</span>
        </p>
        {isCompleted && match.scorers && (
          <p className="mt-1 text-xs text-muted font-medium">
            <span className="text-flag-red font-bold uppercase tracking-wider text-[10px]">
              Scorers:
            </span>{" "}
            {match.scorers}
          </p>
        )}
      </div>

      {isCompleted ? (
        <div
          className={`shrink-0 rounded px-4 py-2 text-center font-mono text-2xl font-bold border transition-all ${
            win
              ? "border-flag-red/80 bg-flag-red/10 text-white shadow-[0_0_15px_rgba(226,55,47,0.3)]"
              : loss
              ? "border-white/20 bg-white/5 text-muted"
              : "border-border text-foreground"
          }`}
        >
          <span className={win ? "text-flag-red font-black" : ""}>
            {match.psbScore ?? "–"}
          </span>
          <span className="mx-1.5 text-sm text-muted">:</span>
          <span>{match.opponentScore ?? "–"}</span>
        </div>
      ) : (
        <div className="shrink-0 flex items-center gap-2 rounded border border-flag-red/30 bg-flag-red/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-flag-red font-bold">
          <span className="h-2 w-2 rounded-full bg-flag-red animate-pulse shadow-[0_0_8px_rgba(226,55,47,0.9)]" />
          <span>Upcoming</span>
        </div>
      )}
    </div>
  );
}
