"use client";

import { useState } from "react";

export default function CheckOutFormPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/check-out", { method: "POST", body: formData });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/check-out-success";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Failed to check out");
    }
  }

  return (
    <section className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-semibold">Check Out</h1>
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" name="email" required />
        </div>
        <div className="pt-2">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
