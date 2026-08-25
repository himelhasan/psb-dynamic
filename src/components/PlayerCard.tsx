import Image from "next/image";
import type { Player } from "@/db/schema";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-2">
        {player.photoUrl ? (
          <Image
            src={player.photoUrl}
            alt={player.name}
            fill
            sizes="(min-width: 1024px) 20vw, 45vw"
            className="object-cover object-top grayscale transition-all duration-300 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-4xl text-line">
            {player.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-lg font-bold text-flag-red">
              {player.squadNumber ?? "—"}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {player.position ?? ""}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-3 py-2.5">
        <p className="font-display text-sm font-semibold uppercase tracking-wide">
          {player.name}
        </p>
      </div>
    </div>
  );
}
