import Link from "next/link";

const links = [
  { href: "#club", label: "Club" },
  { href: "#matches", label: "Matches" },
  { href: "#squad", label: "Squad" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="#top"
          className="font-display text-xl font-bold tracking-wide focus-ring"
        >
          PSB
        </Link>
        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors hover:text-ink focus-ring"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="https://www.facebook.com/psb.bd"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-flag-red hover:text-flag-red focus-ring"
        >
          Follow
        </a>
      </nav>
    </header>
  );
}
