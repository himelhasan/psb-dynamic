import { NextRequest, NextResponse } from "next/server";
import { listPlayers, createPlayer } from "@/lib/players";
import { getSession } from "@/lib/auth";

export async function GET() {
  const data = await listPlayers();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const player = await createPlayer({
    name: body.name,
    squadNumber: body.squadNumber ?? null,
    position: body.position ?? null,
    tier: body.tier ?? "bench",
    photoUrl: body.photoUrl ?? null,
    bio: body.bio ?? null,
    joinedYear: body.joinedYear ?? null,
    sortOrder: body.sortOrder ?? 0,
  });

  return NextResponse.json(player, { status: 201 });
}
