"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`grid min-h-[calc(100vh-3.5rem)] gap-6 overflow-x-hidden ${collapsed ? "grid-cols-[80px_1fr]" : "grid-cols-[260px_1fr]"}`}>
      <aside className="sticky top-0 h-[calc(100vh-3.5rem)] rounded-2xl border bg-white p-0 shadow-sm">
        <div className="flex items-center justify-end p-3">
          <button aria-label="Toggle sidebar" onClick={() => setCollapsed((v) => !v)} className="rounded-md border px-2 py-1 text-xs text-gray-700 hover:bg-gray-50">
            {collapsed ? 
              (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M10 6l6 6-6 6"/></svg>) :
              (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M14 6l-6 6 6 6"/></svg>)}
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-2 pb-3 text-sm">
          <a className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100" href="/dashboard">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </span>
            <span className={collapsed ? "hidden" : ""}>Dashboard</span>
          </a>

          <a className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100" href="/dashboard/users">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
              {/* Users group */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
                <path d="M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path d="M2 21a7 7 0 0 1 14 0"/>
                <path d="M14 21a5 5 0 0 1 10 0"/>
              </svg>
            </span>
            <span className={collapsed ? "hidden" : ""}>Attendees</span>
          </a>

          <a className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100" href="/dashboard/check-in">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
              {/* Log-in arrow into box */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3"/>
                <path d="M13 12H3"/>
                <path d="M8 7l-5 5 5 5"/>
              </svg>
            </span>
            <span className={collapsed ? "hidden" : ""}>Check In</span>
          </a>
          <a className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100" href="/dashboard/check-out">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
              {/* Log-out arrow from box */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 3H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12"/>
                <path d="M16 12H6"/>
                <path d="M11 7l5 5-5 5"/>
              </svg>
            </span>
            <span className={collapsed ? "hidden" : ""}>Check Out</span>
          </a>
          {/* <a className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100" href="/dashboard/ask-check-in">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 1 1 5.82 1c-.55 1-1.64 1.33-1.91 2.5"/>
                <path d="M12 17h.01"/>
              </svg>
            </span>
            <span className={collapsed ? "hidden" : ""}>Ask Check-in</span>
          </a> */}
          <a className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100" href="/dashboard/only-check-out">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
              {/* Clock + exit arrow */}
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="7"/>
                <path d="M12 7v5l3 2"/>
                <path d="M21 12h-4"/>
                <path d="M18 9l3 3-3 3"/>
              </svg>
            </span>
            <span className={collapsed ? "hidden" : ""}>Only Check Out</span>
          </a>
       
          <a className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-100" href="/dashboard/qr">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M3 14h7v7H3z"/><path d="M17 14h4v4h-4z"/><path d="M17 18h-3v3"/></svg>
            </span>
            <span className={collapsed ? "hidden" : ""}>QR Codes</span>
          </a>
        </nav>
        <div className="p-3">
          <form action="/api/logout" method="post">
            <button className="w-full inline-flex items-center gap-3 rounded-md border px-2 py-2 text-left text-sm hover:bg-gray-100" type="submit">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-aqua text-white shadow-sm">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <path d="M16 17l5-5-5-5"/>
                  <path d="M21 12H9"/>
                </svg>
              </span>
              <span className={collapsed ? "hidden" : ""}>Logout</span>
            </button>
          </form>
        </div>
      </aside>
      <section className="space-y-6 overflow-x-hidden">{children}</section>
    </div>
  );
}
