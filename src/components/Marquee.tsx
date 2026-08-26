export function Marquee() {
  const items = [
    "PSB · BANGLADESH",
    "MATCHDAY EVERY SATURDAY",
    "POLASHPUR PRIDE",
    "SINCE DAY ONE",
  ];

  return (
    <div className="relative border-y border-border/80 py-5 md:py-6 overflow-hidden bg-card/90">
      <div className="flex w-max marquee-track font-display text-3xl md:text-5xl tracking-wider uppercase text-foreground">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center gap-8 md:gap-14 pr-8 md:pr-14 shrink-0 whitespace-nowrap"
            aria-hidden={copy === 1}
          >
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-8 md:gap-14">
                <span className="hover:text-flag-red transition-colors cursor-default">
                  {item}
                </span>
                <span className="text-flag-red text-red-glow">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
