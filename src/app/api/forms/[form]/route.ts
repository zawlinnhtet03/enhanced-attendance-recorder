import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { defaultExtraFields, FormKey } from "@/lib/formConfig";

function toFormKey(v: string): FormKey | null {
  if (v === "CHECK_IN" || v === "CHECK_OUT" || v === "ONLY_CHECK_OUT") return v;
  return null;
}

export async function GET(_req: NextRequest, { params }: { params: { form: string } }) {
  const key = toFormKey(params.form.toString());
  if (!key) return NextResponse.json({ message: "invalid form" }, { status: 400 });
  const config = await prisma.formConfig.findUnique({ where: { form: key } }).catch(() => null);
  const fields = config?.fields ?? defaultExtraFields(key);
  return NextResponse.json({ form: key, fields });
}
