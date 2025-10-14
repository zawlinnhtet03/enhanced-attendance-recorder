"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/login", { method: "POST", body: formData });
    setLoading(false);
    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get("next") || "/dashboard";
      window.location.href = next;
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Invalid credentials");
    }
  }

  return (
    <section className="mx-auto max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-gray-600">Use your credentials to access the dashboard.</p>
      </div>
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" name="email" required />
        </div>
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <input className="input pr-10" type={showPw ? "text" : "password"} name="password" required />
            <button
              type="button"
              aria-label={showPw ? "Hide password" : "Show password"}
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-600 hover:bg-gray-100"
            >
              {showPw ? (
                // Eye-off icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M3 3l18 18"/>
                  <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58"/>
                  <path d="M16.24 16.24A10.94 10.94 0 0 1 12 18c-5 0-9-4-10-6  .58-1.16 1.52-2.27 2.68-3.24"/>
                  <path d="M9.88 5.1A10.94 10.94 0 0 1 12 5c5 0 9 4 10 6-.36.72-.86 1.45-1.5 2.14"/>
                </svg>
              ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="pt-2">
          <button className="btn w-full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
      <p className="mt-3 text-center text-xs text-gray-500">Demo uses env vars ADMIN_EMAIL and ADMIN_PASSWORD.</p>
    </section>
  );
}
