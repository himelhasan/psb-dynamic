import { NextRequest, NextResponse } from "next/server";
import { getPlayer, updatePlayer, deletePlayer } from "@/lib/players";
import { getSession } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const player = await getPlayer(Number(id));
  if (!player) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(player);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const updated = await updatePlayer(Number(id), body);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deletePlayer(Number(id));
  return NextResponse.json({ ok: true });
}
