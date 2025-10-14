"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader({ sessionEmail }: { sessionEmail: string | null }) {
  const pathname = usePathname();
  const publicRoutes = new Set([
    "/check-in-form",
    "/check-out-form",
    "/ask-check-in",
    "/only-check-out",
    "/check-in-success",
    "/check-out-success",
    "/only-check-out-success",
  ]);
  const isPublicAttendeePage = publicRoutes.has(pathname || "");

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container flex h-14 items-center justify-between">
        {isPublicAttendeePage ? (
          <span className="font-semibold text-brand-700">Attendance Recorder</span>
        ) : (
          <Link href="/" className="font-semibold text-brand-700">Attendance Recorder</Link>
        )}
        {!isPublicAttendeePage && (
          sessionEmail ? (
            <nav className="flex items-center gap-4 text-sm text-gray-700">
              <Link className="hover:text-brand-700" href="/dashboard">Dashboard</Link>
              <form action="/api/logout" method="post">
                <button className="hover:text-brand-700" type="submit">Logout</button>
              </form>
            </nav>
          ) : (
            <nav className="flex items-center gap-6 text-sm text-gray-700">
              <a className="hover:text-brand-700" href="#features">Features</a>
              <a className="hover:text-brand-700" href="#pricing">Pricing</a>
              <a className="hover:text-brand-700" href="#about">About</a>
              <a className="hover:text-brand-700" href="#contact">Contact</a>
              <div className="ml-2 flex items-center gap-3">
                <Link className="rounded-md px-3 py-1.5 hover:bg-gray-100" href="/login">Log In</Link>
                <Link className="rounded-md bg-brand px-3 py-1.5 text-white hover:bg-brand-700" href="/login">Sign Up</Link>
              </div>
            </nav>
          )
        )}
      </div>
    </header>
  );
}
