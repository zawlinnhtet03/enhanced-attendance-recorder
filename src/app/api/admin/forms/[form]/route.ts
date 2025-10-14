import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FormKey } from "@/lib/formConfig";
import { requireSession } from "@/lib/auth";

function toFormKey(v: string): FormKey | null {
  if (v === "CHECK_IN" || v === "CHECK_OUT" || v === "ONLY_CHECK_OUT") return v;
  return null;
}

export async function POST(req: NextRequest, { params }: { params: { form: string } }) {
  const authed = await requireSession();
  if (!authed) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const key = toFormKey(params.form.toString());
  if (!key) return NextResponse.json({ message: "invalid form" }, { status: 400 });

  try {
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.fields)) {
      return NextResponse.json({ message: "fields array required" }, { status: 400 });
    }

    const saved = await prisma.formConfig.upsert({
      where: { form: key },
      update: { fields: body.fields },
      create: { form: key, fields: body.fields },
    });

    return NextResponse.json({ ok: true, config: saved });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
