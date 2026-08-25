"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({
  resource,
  id,
  label,
}: {
  resource: "players" | "matches";
  id: number;
  label: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${label}"? This can't be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) {
      router.refresh();
    } else {
      alert("Delete failed. Please try again.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="text-flag-red hover:underline disabled:opacity-50 focus-ring"
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
