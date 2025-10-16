import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.email) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "invalid id" }, { status: 400 });

  const body = await req.json().catch(() => null as any);
  if (!body || typeof body !== "object") return NextResponse.json({ message: "invalid body" }, { status: 400 });

  const data: any = {};
  if (typeof body.first_name === "string") data.first_name = body.first_name.trim();
  if (typeof body.last_name === "string") data.last_name = body.last_name.trim();
  if (typeof body.email === "string") data.email = body.email.trim().toLowerCase();
  if (body.phone_number === null || typeof body.phone_number === "string") data.phone_number = body.phone_number?.trim() || null;
  if (body.extra_fields && typeof body.extra_fields === "object") data.extra_fields = body.extra_fields;

  if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return NextResponse.json({ message: "invalid email" }, { status: 400 });
  }

  try {
    const updated = await prisma.participant.update({ where: { id }, data });
    return NextResponse.json({ ok: true, participant: updated });
  } catch (e: any) {
    return NextResponse.json({ message: "update failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session?.email) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const id = Number(params.id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "invalid id" }, { status: 400 });

  try {
    await prisma.participant.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: "delete failed" }, { status: 500 });
  }
}
