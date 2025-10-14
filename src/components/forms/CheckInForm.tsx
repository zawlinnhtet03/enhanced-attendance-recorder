"use client";

import { useState } from "react";

export default function CheckInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/check-in", { method: "POST", body: formData });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/check-in-success";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Failed to check in");
    }
  }

  return (
    <>
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
        <div>
          <label className="label">Organization</label>
          <input className="input" name="organization" maxLength={255} />
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Is Nuclear Medicine Member</label>
            <select className="input" name="is_nuclear_medicine_member" required>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="label">Is Medical Specialist Member</label>
            <select className="input" name="is_medical_specialist_member" required>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Occupation Category</label>
            <input className="input" name="occupation_category" />
          </div>
          <div>
            <label className="label">License Number</label>
            <input className="input" name="license_number" />
          </div>
        </div>
        <div>
          <label className="label">Work Registration Number</label>
          <input className="input" name="work_registration_number" />
        </div>
        <div className="pt-2">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
