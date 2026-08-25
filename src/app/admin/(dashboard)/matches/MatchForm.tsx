"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Match } from "@/db/schema";

function toDateTimeLocal(d?: Date | null) {
  if (!d) return "";
  const date = new Date(d);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export function MatchForm({ match }: { match?: Match }) {
  const router = useRouter();
  const isEdit = Boolean(match);
  const [form, setForm] = useState({
    opponent: match?.opponent ?? "",
    competition: match?.competition ?? "",
    venue: match?.venue ?? "",
    matchDate: toDateTimeLocal(match?.matchDate),
    status: match?.status ?? "upcoming",
    psbScore: match?.psbScore?.toString() ?? "",
    opponentScore: match?.opponentScore?.toString() ?? "",
    scorers: match?.scorers ?? "",
    recap: match?.recap ?? "",
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
      opponent: form.opponent,
      competition: form.competition || null,
      venue: form.venue || null,
      matchDate: form.matchDate ? new Date(form.matchDate).toISOString() : null,
      status: form.status,
      psbScore: form.psbScore ? Number(form.psbScore) : null,
      opponentScore: form.opponentScore ? Number(form.opponentScore) : null,
      scorers: form.scorers || null,
      recap: form.recap || null,
    };

    const res = await fetch(
      isEdit ? `/api/matches/${match!.id}` : "/api/matches",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setSaving(false);

    if (res.ok) {
      router.push("/admin/matches");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
    }
  }

  const isCompleted = form.status === "completed";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 max-w-lg space-y-4 rounded-lg border border-line bg-surface p-6"
    >
      <label className="block text-sm text-muted">
        Opponent *
        <input
          required
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.opponent}
          onChange={(e) => update("opponent", e.target.value)}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm text-muted">
          Competition
          <input
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
            value={form.competition}
            onChange={(e) => update("competition", e.target.value)}
            placeholder="Friendly, League…"
          />
        </label>
        <label className="block text-sm text-muted">
          Venue
          <input
            className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
            value={form.venue}
            onChange={(e) => update("venue", e.target.value)}
          />
        </label>
      </div>

      <label className="block text-sm text-muted">
        Date &amp; time *
        <input
          required
          type="datetime-local"
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.matchDate}
          onChange={(e) => update("matchDate", e.target.value)}
        />
      </label>

      <label className="block text-sm text-muted">
        Status
        <select
          className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
          value={form.status}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      {isCompleted && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm text-muted">
              PSB score
              <input
                type="number"
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
                value={form.psbScore}
                onChange={(e) => update("psbScore", e.target.value)}
              />
            </label>
            <label className="block text-sm text-muted">
              Opponent score
              <input
                type="number"
                className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
                value={form.opponentScore}
                onChange={(e) => update("opponentScore", e.target.value)}
              />
            </label>
          </div>
          <label className="block text-sm text-muted">
            Scorers
            <input
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
              value={form.scorers}
              onChange={(e) => update("scorers", e.target.value)}
              placeholder="Comma separated names"
            />
          </label>
          <label className="block text-sm text-muted">
            Recap
            <textarea
              rows={3}
              className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2 text-ink focus-ring"
              value={form.recap}
              onChange={(e) => update("recap", e.target.value)}
            />
          </label>
        </>
      )}

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
          {saving ? "Saving…" : isEdit ? "Save changes" : "Add match"}
        </button>
      </div>
    </form>
  );
}
