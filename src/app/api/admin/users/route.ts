import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Completed: sessions having both check_in_time and check_out_time
    const completedSessions = await prisma.participant.findMany({
      where: {
        sessions: {
          some: {
            NOT: { check_in_time: null },
            AND: [{ NOT: { check_out_time: null } }],
          },
        },
      },
      include: { sessions: true },
    });

    // Pending: sessions where check_out_time is null (checked-in but not out)
    const pendingSessions = await prisma.participant.findMany({
      where: {
        sessions: {
          some: {
            check_out_time: null,
          },
        },
      },
      include: { sessions: true },
    });

    // Only check-out: sessions where check_out_time not null and check_in_time null
    const onlyCheckOutParticipants = await prisma.participant.findMany({
      where: {
        sessions: {
          some: {
            NOT: { check_out_time: null },
            AND: [{ check_in_time: null }],
          },
        },
      },
      include: { sessions: true },
    });

    return NextResponse.json(
      { completedSessions, pendingSessions, onlyCheckOutParticipants },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
