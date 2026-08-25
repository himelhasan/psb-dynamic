import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Marquee } from "@/components/Marquee";
import { PlayerCard } from "@/components/PlayerCard";
import { MatchCard } from "@/components/MatchCard";
import { listPlayers } from "@/lib/players";
import { listUpcomingMatches, listCompletedMatches } from "@/lib/matches";

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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />

      {/* Hero Section */}
      <section id="top" className="relative min-h-screen flex items-end pt-16">
        <Image
          src="/hero.jpg"
          alt="PSB Action"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />

        <div className="relative max-w-[1400px] mx-auto px-6 pb-16 md:pb-24 w-full z-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted mb-6">
            <span className="h-px w-10 bg-accent" />
            Est. Polashpur · Bangladesh · 2013
          </div>
          <h1 className="font-display text-[16vw] md:text-[11vw] font-bold uppercase leading-[0.85] tracking-tight">
            POLASHPUR <br />
            <span className="text-stroke">SOCCER</span> BOYS
          </h1>
          <div className="mt-8 grid md:grid-cols-3 gap-8 items-end">
            <p className="md:col-span-2 text-lg md:text-xl text-muted max-w-2xl">
              Eleven brothers. One badge. Football the way it was meant to be
              played — loud, local, and absolutely fearless.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/8801516150533?text=Salam!%20We%20want%20to%20challenge%20PSB%20to%20a%20match!"
                target="_blank"
                rel="noreferrer"
                className="bg-foreground text-black px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition"
              >
                Challenge Us
              </a>
              <a
                href="#club"
                className="border border-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-black transition"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee />

      {/* 01 — The Club */}
      <section id="club" className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
              01 — The Club
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-none font-bold uppercase">
              FROM <br />
              THE STREETS <br />
              OF <span className="text-accent">POLASHPUR</span>.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-muted text-lg">
            <p className="text-foreground text-xl font-medium">
              PSB isn&apos;t a franchise. It&apos;s a neighbourhood that decided to
              play.
            </p>
            <p>
              Polashpur Soccer Boys (PSB) is a local football club based in
              Polashpur, Kadamtoli, Donia, Dhaka-1236, Bangladesh. Founded in
              2013, PSB started as a small group of passionate football lovers
              and has grown into a strong and united team over the years.
            </p>
            <p>
              Our journey began with core members: Iftekhar Azad Omi, Tahsin
              Nakib, Himel Hasan, Sajjad Hasan Rabbi, Islam Sowad, Naimul Islam
              Riyadh, and Sohan Ariful Islam Shusmoy.
            </p>
            <p>
              As time passed, the team expanded with dedicated players: Tanzil,
              Moshiur, Shaishab, Ayon, Omar, Rokib, Kayum, Parvej, Tiash, Akash,
              Oliul, Sakib, Saif, Aminul, Nahid, Jisan, Naeem, Shawon, Roni,
              Mojumdar, Mizan, Masud, Kabbo, Shaon, GK Hridoy, and GK Sumo.
              <br />
              <br />
              We play for passion, unity, and the love of the game. PSB is more
              than a team — it’s a brotherhood built on trust, effort, and
              consistency.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <div className="font-display text-5xl md:text-6xl text-foreground font-bold">
                  {starters.length || 11}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted mt-1">
                  Starters
                </div>
              </div>
              <div>
                <div className="font-display text-5xl md:text-6xl text-foreground font-bold">
                  {players.length || 33}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted mt-1">
                  Squad
                </div>
              </div>
              <div>
                <div className="font-display text-5xl md:text-6xl text-foreground font-bold">
                  1
                </div>
                <div className="text-xs uppercase tracking-widest text-muted mt-1">
                  Family
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Collage / Gallery Section */}
      <section className="grid md:grid-cols-3 gap-1 bg-border">
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src="/gallery-1.jpg"
            alt="PSB Team"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src="/gallery-2.jpg"
            alt="PSB Action"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative w-full h-[50vh] md:h-[60vh]">
          <Image
            src="/gallery-3.jpg"
            alt="PSB Brothers"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* 02 — Matchday / Fixtures & Results */}
      <section id="matches" className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
            02 — Matchday
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-none font-bold uppercase">
            FIXTURES &amp; RESULTS
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-pitch-green font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-pitch-green rounded-full" />
              Upcoming Fixtures
            </h3>
            <div className="rounded-lg border border-border bg-card px-4">
              {upcoming.length > 0 ? (
                upcoming.map((m) => <MatchCard key={m.id} match={m} />)
              ) : (
                <p className="py-8 text-sm text-muted">
                  No fixtures scheduled yet. Check back soon.
                </p>
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-flag-red font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-flag-red rounded-full" />
              Recent Results
            </h3>
            <div className="rounded-lg border border-border bg-card px-4">
              {completed.length > 0 ? (
                completed.map((m) => <MatchCard key={m.id} match={m} />)
              ) : (
                <p className="py-8 text-sm text-muted">
                  No match results recorded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Squad Section */}
      <section id="squad" className="bg-card border-y border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <div className="mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">
              03 — Squad
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-none font-bold uppercase">
              THE BROTHERS
            </h2>
          </div>

          {/* Starting XI */}
          {starters.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xs uppercase tracking-[0.2em] text-accent/80 font-bold mb-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full" />
                Starting Lineup
              </h3>
              <div className="player-grid">
                {starters.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            </div>
          )}

          {/* Reserves & Bench */}
          {bench.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted/80 font-bold mb-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-muted/50 rounded-full" />
                Reserves &amp; Bench
              </h3>
              <div className="bench-grid">
                {bench.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            </div>
          )}

          {players.length === 0 && (
            <p className="text-sm text-muted">
              Squad list coming soon.
            </p>
          )}
        </div>
      </section>

      {/* 04 — Join Us */}
      <section id="contact" className="relative py-32 text-center overflow-hidden">
        <Image
          src="/gallery-3.jpg"
          alt="Contact Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/80" />

        <div className="relative max-w-[1400px] mx-auto px-6 z-10">
          <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6">
            04 — Join Us
          </div>
          <h2 className="font-display text-6xl md:text-9xl leading-[0.9] font-bold uppercase">
            WEAR <br />
            THE <span className="text-accent">BADGE</span>.
          </h2>
          <p className="text-muted max-w-xl mx-auto mt-8 text-lg">
            Trials, training, supporter chants — everything happens on our page.
            Come say salam.
          </p>
          <a
            href="https://www.facebook.com/psb.bd"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mt-10 bg-foreground text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition"
          >
            facebook.com/psb.bd <span>→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="PSB"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <div>
              <div className="font-display text-lg tracking-widest font-bold">PSB</div>
              <div className="text-xs uppercase tracking-widest text-muted">
                Polashpur Soccer Boys
              </div>
            </div>
          </div>
          <div className="text-xs uppercase tracking-widest text-muted">
            © {new Date().getFullYear()} PSB · Polashpur, Bangladesh
          </div>
        </div>
      </footer>
    </div>
  );
}
