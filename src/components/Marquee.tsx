export function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-2.5">
      <div className="flex w-max marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-3 pr-3 font-mono text-xs font-medium tracking-widest text-muted uppercase"
            aria-hidden={copy === 1}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-3">
                {text}
                <span className="text-flag-red">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
