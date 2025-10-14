"use client";

import { useEffect, useState } from "react";
import type { DynamicField } from "@/lib/formConfig";

export default function OnlyCheckOutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extras, setExtras] = useState<DynamicField[]>([]);

  useEffect(() => {
    fetch("/api/forms/ONLY_CHECK_OUT")
      .then((r) => r.json())
      .then((res) => setExtras(Array.isArray(res.fields) ? res.fields : []))
      .catch(() => setExtras([]));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/only-check-out", { method: "POST", body: formData });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/only-check-out-success";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Failed to submit");
    }
  }

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold">Only Check Out</h1>
      {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">First Name</label>
            <input className="input" name="first_name" required maxLength={255} />
          </div>
          <div>
            <label className="label">Last Name</label>
            <input className="input" name="last_name" required maxLength={255} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" name="email" required />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input className="input" name="phone_number" />
          </div>
        </div>

        {extras.length > 0 && (
          <div className="space-y-4">
            {extras.map((f) => (
              <div key={f.name}>
                <label className="label">{f.label}</label>
                {f.type === "select" ? (
                  <select className="input" name={f.name} required={Boolean(f.required)}>
                    {(f.options || []).map((opt) => (
                      <option key={opt} value={opt === "Yes" ? "true" : opt === "No" ? "false" : opt}>{opt}</option>
                    ))}
                  </select>
                ) : f.type === "radio" ? (
                  <div className="flex flex-wrap gap-4">
                    {(f.options || []).map((opt) => {
                      const val = opt === "Yes" ? "true" : opt === "No" ? "false" : opt;
                      const id = `${f.name}-${String(opt).toLowerCase().replace(/\s+/g, '-')}`;
                      return (
                        <label key={opt} htmlFor={id} className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input id={id} type="radio" name={f.name} value={val} required={Boolean(f.required)} className="h-4 w-4" />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : f.type === "checkbox" ? (
                  <div className="flex flex-col gap-2">
                    {(f.options || []).map((opt) => {
                      const val = opt === "Yes" ? "true" : opt === "No" ? "false" : opt;
                      const id = `${f.name}-${String(opt).toLowerCase().replace(/\s+/g, '-')}`;
                      return (
                        <label key={opt} htmlFor={id} className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input id={id} type="checkbox" name={f.name} value={val} className="h-4 w-4" />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    className="input"
                    name={f.name}
                    placeholder={f.placeholder}
                    required={Boolean(f.required)}
                    type={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "text"}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="pt-2">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}
