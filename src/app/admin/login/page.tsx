"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-5 text-ink">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-line bg-surface p-8"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          PSB Dashboard
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">
          Sign in
        </h1>

        <label className="mt-6 block text-sm text-muted">
          Username
          <input
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="mt-4 block text-sm text-muted">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p className="mt-4 text-sm text-flag-red" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-flag-red py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50 focus-ring"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
