import { notFound } from "next/navigation";
import { getMatch } from "@/lib/matches";
import { MatchForm } from "../MatchForm";

export const dynamic = "force-dynamic";

export default async function EditMatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = await getMatch(Number(id));
  if (!match) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight">
        Edit match
      </h1>
      <MatchForm match={match} />
    </div>
  );
}
