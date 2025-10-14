import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const cookieName = "session";

function getSecret() {
  const secret = process.env.COOKIE_SECRET;
  if (!secret || secret.length < 32) throw new Error("COOKIE_SECRET must be set and 32+ chars");
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: { email: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const c = cookies();
  c.set({
    name: cookieName,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  cookies().set({ name: cookieName, value: "", maxAge: 0, path: "/" });
}

export async function getSession() {
  const token = cookies().get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { email?: string };
  } catch {
    return null;
  }
}

export async function requireSession() {
  const s = await getSession();
  return Boolean(s?.email);
}
