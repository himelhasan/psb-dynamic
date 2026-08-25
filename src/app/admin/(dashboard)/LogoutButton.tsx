"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-md border border-line px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-flag-red hover:text-flag-red focus-ring"
    >
      Log out
    </button>
  );
}
