"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/#club", label: "Club" },
  { href: "/#squad", label: "Squad" },
  { href: "/#matches", label: "Matches" },
  { href: "/#contact", label: "Contact" },
  { href: "/calculator", label: "Calculator" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/#top" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="PSB"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="font-display text-xl tracking-widest font-bold">PSB</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Follow CTA */}
        <a
          href="https://www.facebook.com/psb.bd"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border border-foreground px-4 py-2 hover:bg-foreground hover:text-black transition"
        >
          Follow
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-between w-6 h-4 bg-transparent border-none cursor-pointer z-[100]"
          aria-label="Toggle Navigation"
        >
          <span
            className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-2xl font-display tracking-widest">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="hover:text-accent transition uppercase"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.facebook.com/psb.bd"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.2em] border border-foreground px-8 py-3 hover:bg-foreground hover:text-black transition"
          >
            Follow
          </a>
        </nav>
      </div>
    </header>
  );
}
