import Image from "next/image";
import type { Player } from "@/db/schema";

export function PlayerCard({ player }: { player: Player }) {
  const isStarter = player.tier === "starter";

  if (!isStarter) {
    return (
      <div className="bench-card group">
        <div className="bench-card-number">
          {player.squadNumber || "—"}
        </div>
        <div className="bench-card-info">
          <div className="bench-card-position">
            {player.position || "Player"}
          </div>
          <div className="bench-card-name">{player.name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-card group">
      {player.photoUrl ? (
        <Image
          src={player.photoUrl}
          alt={player.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-card text-muted font-display text-6xl">
          {player.name.charAt(0)}
        </div>
      )}
      <div className="player-card-number">
        {player.squadNumber || "00"}
      </div>
      <div className="player-card-info">
        <div className="player-card-position">
          {player.position || "Squad"}
        </div>
        <div className="player-card-name">{player.name}</div>
      </div>
    </div>
  );
}
