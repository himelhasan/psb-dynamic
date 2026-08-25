"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Player } from "@/db/schema";

export function PlayerForm({ player }: { player?: Player }) {
  const router = useRouter();
  const isEdit = Boolean(player);
  const [form, setForm] = useState({
    name: player?.name ?? "",
    squadNumber: player?.squadNumber ?? "",
    position: player?.position ?? "",
    tier: player?.tier ?? "bench",
    photoUrl: player?.photoUrl ?? "",
    bio: player?.bio ?? "",
    joinedYear: player?.joinedYear?.toString() ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      name: form.name,
      squadNumber: form.squadNumber || null,
      position: form.position || null,
      tier: form.tier,
      photoUrl: form.photoUrl || null,
      bio: form.bio || null,
      joinedYear: form.joinedYear ? Number(form.joinedYear) : null,
    };

    const res = await fetch(
      isEdit ? `/api/players/${player!.id}` : "/api/players",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (res.ok) {
      router.push("/admin/players");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 max-w-lg space-y-4 rounded-lg border border-line bg-surface p-6"
    >
      <label className="block text-sm text-muted">
        Name *
        <input
          required
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm text-muted">
          Squad number
          <input
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
            value={form.squadNumber}
            onChange={(e) => update("squadNumber", e.target.value)}
            placeholder="e.g. 11"
          />
        </label>
        <label className="block text-sm text-muted">
          Position
          <input
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
            value={form.position}
            onChange={(e) => update("position", e.target.value)}
            placeholder="e.g. GK / CDM"
          />
        </label>
      </div>

      <label className="block text-sm text-muted">
        Tier
        <select
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.tier}
          onChange={(e) => update("tier", e.target.value)}
        >
          <option value="starter">Starting lineup</option>
          <option value="bench">Reserves &amp; bench</option>
        </select>
      </label>

      <label className="block text-sm text-muted">
        Photo URL
        <input
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.photoUrl}
          onChange={(e) => update("photoUrl", e.target.value)}
          placeholder="https://…"
        />
      </label>

      <label className="block text-sm text-muted">
        Joined year
        <input
          type="number"
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.joinedYear}
          onChange={(e) => update("joinedYear", e.target.value)}
        />
      </label>

      <label className="block text-sm text-muted">
        Bio
        <textarea
          rows={3}
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />
      </label>

      {error && (
        <p className="text-sm text-flag-red" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-flag-red px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white hover:opacity-90 disabled:opacity-50 focus-ring"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Add player"}
        </button>
      </div>
    </form>
  );
}
