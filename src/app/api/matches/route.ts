import { NextRequest, NextResponse } from "next/server";
import { listAllMatches, createMatch } from "@/lib/matches";
import { getSession } from "@/lib/auth";

export async function GET() {
  const data = await listAllMatches();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.opponent || !body.matchDate) {
    return NextResponse.json(
      { error: "opponent and matchDate are required" },
      { status: 400 }
    );
  }

  const match = await createMatch({
    opponent: body.opponent,
    competition: body.competition ?? null,
    venue: body.venue ?? null,
    matchDate: new Date(body.matchDate),
    status: body.status ?? "upcoming",
    psbScore: body.psbScore ?? null,
    opponentScore: body.opponentScore ?? null,
    scorers: body.scorers ?? null,
    recap: body.recap ?? null,
  });

  return NextResponse.json(match, { status: 201 });
}
