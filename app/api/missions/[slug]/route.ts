import { NextResponse } from "next/server";
import { getMissionWithCms, getNextMissionWithCms } from "@/lib/server/missions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const mission = await getMissionWithCms(slug);
  if (!mission) return NextResponse.json({ error: "Mission not found" }, { status: 404 });

  const nextMission = await getNextMissionWithCms(slug);
  return NextResponse.json({ mission, nextMission });
}