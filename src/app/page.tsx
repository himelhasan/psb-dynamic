import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { PlayerCard } from "@/components/PlayerCard";
import { MatchCard } from "@/components/MatchCard";
import { listPlayers } from "@/lib/players";
import { listUpcomingMatches, listCompletedMatches } from "@/lib/matches";

// This page reads from Postgres on every request — squad and fixtures
// update the moment someone edits them in /admin, no redeploy needed.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [players, upcoming, completed] = await Promise.all([
    listPlayers(),
    listUpcomingMatches(),
    listCompletedMatches(),
  ]);

  const starters = players.filter((p) => p.tier === "starter");
  const bench = players.filter((p) => p.tier !== "starter");

  return (
    <div id="top" className="min-h-screen bg-bg text-ink">
      <Nav />
      <Marquee text="PSB · BANGLADESH — MATCHDAY EVERY SATURDAY — POLASHPUR PRIDE — SINCE 2013" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-flag-red">
            Est. Polashpur · Bangladesh · 2013
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            Polashpur
            <br />
            <span className="text-pitch-green">Soccer</span> Boys
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted">
            Eleven brothers. One badge. Football the way it was meant to be
            played — loud, local, and absolutely fearless.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/8801516150533?text=Salam!%20We%20want%20to%20challenge%20PSB%20to%20a%20match!"
              className="rounded-full bg-flag-red px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 focus-ring"
            >
              Challenge Us
            </a>
            <a
              href="#club"
              className="rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-ink focus-ring"
            >
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Club */}
      <section id="club" className="border-b border-line px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            01 — The Club
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            From the streets of Polashpur.
          </h2>
          <p className="mt-6 max-w-2xl text-muted">
            PSB isn&apos;t a franchise. It&apos;s a neighbourhood that decided
            to play. Polashpur Soccer Boys is a local football club based in
            Polashpur, Kadamtoli, Donia, Dhaka-1236, Bangladesh. Founded in
            2013, PSB started as a small group of passionate football lovers
            and has grown into a strong and united team over the years — a
            brotherhood built on trust, effort, and consistency.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            <div>
              <p className="font-mono text-4xl font-bold text-flag-red">
                {starters.length || 11}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Starters
              </p>
            </div>
            <div>
              <p className="font-mono text-4xl font-bold text-pitch-green">
                {players.length || 33}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Squad
              </p>
            </div>
            <div>
              <p className="font-mono text-4xl font-bold">1</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Family
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matches */}
      <section id="matches" className="border-b border-line px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            02 — Matchday
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Fixtures &amp; results
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-pitch-green">
                Upcoming
              </h3>
              <div className="rounded-lg border border-line bg-surface px-4">
                {upcoming.length > 0 ? (
                  upcoming.map((m) => <MatchCard key={m.id} match={m} />)
                ) : (
                  <p className="py-6 text-sm text-muted">
                    No fixtures scheduled yet.
                  </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-flag-red">
                Results
              </h3>
              <div className="rounded-lg border border-line bg-surface px-4">
                {completed.length > 0 ? (
                  completed.map((m) => <MatchCard key={m.id} match={m} />)
                ) : (
                  <p className="py-6 text-sm text-muted">
                    No results recorded yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Squad */}
      <section id="squad" className="border-b border-line px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            03 — Squad
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            The Brothers
          </h2>

          {starters.length > 0 && (
            <>
              <h3 className="mt-10 mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                Starting Lineup
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {starters.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            </>
          )}

          {bench.length > 0 && (
            <>
              <h3 className="mt-12 mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                Reserves &amp; Bench
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {bench.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            </>
          )}

          {players.length === 0 && (
            <p className="mt-8 text-sm text-muted">
              Squad list coming soon — add players from the dashboard.
            </p>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-5 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          04 — Join Us
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          Wear the badge.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Trials, training, supporter chants — everything happens on our
          page. Come say salam.
        </p>
        <a
          href="https://www.facebook.com/psb.bd"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block font-mono text-sm uppercase tracking-widest text-flag-red hover:underline focus-ring"
        >
          facebook.com/psb.bd →
        </a>
      </section>

      <footer className="border-t border-line px-5 py-8 text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-wide">
          PSB — Polashpur Soccer Boys
        </p>
        <p className="mt-1 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} PSB · Polashpur, Bangladesh
        </p>
      </footer>
    </div>
  );
}
