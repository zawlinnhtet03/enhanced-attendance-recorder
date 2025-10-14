import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CORE_FIELD_NAMES } from "@/lib/formConfig";
import { Prisma } from "@prisma/client";

function toBoolean(val: FormDataEntryValue | null): boolean | null {
  if (val === null) return null;
  const s = String(val).toLowerCase();
  if (s === "true" || s === "1" || s === "yes") return true;
  if (s === "false" || s === "0" || s === "no") return false;
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const first_name = String(form.get("first_name") || "").trim();
    const last_name = String(form.get("last_name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const phone_number = (form.get("phone_number")?.toString() || "").trim() || null;

    if (!first_name || !last_name) return NextResponse.json({ message: "first_name and last_name are required" }, { status: 400 });
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ message: "valid email required" }, { status: 400 });
    if (phone_number && !/^\+?[0-9]{7,15}$/.test(phone_number)) return NextResponse.json({ message: "invalid phone number" }, { status: 400 });

    const existing = await prisma.participant.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ message: "email already registered" }, { status: 409 });

    // Collect values per key to support checkbox groups
    const collected = new Map<string, string[]>();
    for (const [k, v] of form.entries()) {
      if (CORE_FIELD_NAMES.has(k)) continue;
      const val = typeof v === "string" ? v : String(v);
      collected.set(k, [...(collected.get(k) || []), val]);
    }

    const extra: Record<string, any> = {};
    for (const [k, values] of collected.entries()) {
      if (values.length > 1) {
        extra[k] = values.map((val) => {
          const b = toBoolean(val);
          return b !== null ? b : val.trim();
        });
      } else {
        const val = values[0];
        const b = toBoolean(val);
        extra[k] = b !== null ? b : val.trim();
      }
    }

    const participant = await prisma.participant.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        extra_fields: (Object.keys(extra).length ? (extra as Prisma.InputJsonValue) : undefined),
      }
    });

    await prisma.participantSession.create({
      data: {
        participant_id: participant.id,
        check_out_time: new Date(),
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
