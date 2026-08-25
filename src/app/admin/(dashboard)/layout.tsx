import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/players", label: "Players" },
  { href: "/admin/matches", label: "Matches" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="mx-auto flex max-w-6xl gap-8 px-5 py-8">
        <aside className="w-48 shrink-0">
          <p className="font-display text-lg font-bold uppercase tracking-tight">
            PSB
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Dashboard
          </p>
          <nav className="mt-8 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:bg-surface hover:text-ink focus-ring"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <LogoutButton />
          </div>
          <Link
            href="/"
            className="mt-4 block font-mono text-[11px] uppercase tracking-widest text-muted hover:text-ink focus-ring"
          >
            ← View site
          </Link>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
