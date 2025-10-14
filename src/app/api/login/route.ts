import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "").trim();

  const envEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD || "";

  if (!envEmail || !envPassword) {
    return NextResponse.json({ message: "Admin credentials not configured" }, { status: 500 });
  }

  if (email === envEmail && password === envPassword) {
    await createSession({ email });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
