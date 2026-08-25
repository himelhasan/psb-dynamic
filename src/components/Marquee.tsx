export function Marquee() {
  const items = [
    "PSB · BANGLADESH",
    "MATCHDAY EVERY SATURDAY",
    "POLASHPUR PRIDE",
    "SINCE DAY ONE",
  ];

  return (
    <div className="border-y border-border py-5 md:py-6 overflow-hidden bg-card">
      <div className="flex w-max marquee-track font-display text-3xl md:text-5xl tracking-wide uppercase">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12 shrink-0 whitespace-nowrap"
            aria-hidden={copy === 1}
          >
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-8 md:gap-12">
                <span>{item}</span>
                <span className="text-accent">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
