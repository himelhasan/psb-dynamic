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
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/85 border-b border-border shadow-2xl">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/#top" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded border border-white/10 group-hover:border-flag-red transition-colors">
            <Image
              src="/logo.png"
              alt="PSB"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display text-2xl tracking-widest font-bold text-foreground group-hover:text-flag-red transition-colors">
              PSB
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-flag-red shadow-[0_0_8px_rgba(226,55,47,0.9)]" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted hover:text-flag-red transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-flag-red after:transition-all"
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
          className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border border-white/20 px-5 py-2 rounded hover:border-flag-red hover:bg-flag-red hover:text-white hover:shadow-[0_0_20px_rgba(226,55,47,0.4)] transition-all"
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
              mobileOpen ? "translate-y-[7px] rotate-45 bg-flag-red" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45 bg-flag-red" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-3xl font-display tracking-widest">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-foreground hover:text-flag-red transition uppercase"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.facebook.com/psb.bd"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.2em] bg-flag-red text-white px-8 py-3 rounded hover:bg-red-600 shadow-[0_0_20px_rgba(226,55,47,0.5)] transition"
          >
            Follow on Facebook
          </a>
        </nav>
      </div>
    </header>
  );
}
