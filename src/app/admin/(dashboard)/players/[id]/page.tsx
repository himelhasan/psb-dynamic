import { notFound } from "next/navigation";
import { getPlayer } from "@/lib/players";
import { PlayerForm } from "../PlayerForm";

export const dynamic = "force-dynamic";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getPlayer(Number(id));
  if (!player) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
        Edit player
      </h1>
      <PlayerForm player={player} />
    </div>
  );
}
