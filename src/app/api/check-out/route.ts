import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "").trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ message: "valid email required" }, { status: 400 });

    const participant = await prisma.participant.findUnique({ where: { email } });
    if (!participant) return NextResponse.json({ message: "participant not found" }, { status: 404 });

    const open = await prisma.participantSession.findFirst({
      where: { participant_id: participant.id, check_out_time: null },
      orderBy: { id: "desc" }
    });

    if (!open) {
      // Parity: still redirect to success with message in Laravel; we just return ok
      return NextResponse.json({ ok: true, note: "no active session" });
    }

    await prisma.participantSession.update({
      where: { id: open.id },
      data: { check_out_time: new Date() }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
