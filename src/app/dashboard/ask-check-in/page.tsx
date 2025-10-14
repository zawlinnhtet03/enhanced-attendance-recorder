"use client";

import { useState } from "react";

export default function DashboardAskCheckInPage() {
  const [status, setStatus] = useState("yes");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "yes") {
      window.location.href = "/dashboard/check-out";
    } else {
      window.location.href = "/only-check-out"; // mirrors legacy flow if needed
    }
  }

  return (
    <section className="mx-auto max-w-xl">
      <a href="/dashboard" className="mb-4 inline-flex items-center gap-2 text-sm text-brand-700 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M15 18l-6-6 6-6"/></svg>
        Back to Dashboard
      </a>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Have you already checked in?</h1>
        <p className="text-gray-600">Choose the option that describes your current status.</p>
      </div>
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              className="h-4 w-4"
              type="radio"
              name="check_in_status"
              value="yes"
              checked={status === "yes"}
              onChange={() => setStatus("yes")}
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              className="h-4 w-4"
              type="radio"
              name="check_in_status"
              value="no"
              checked={status === "no"}
              onChange={() => setStatus("no")}
            />
            <span>No</span>
          </label>
        </div>
        <div className="pt-2">
          <button className="btn" type="submit">Continue</button>
        </div>
      </form>
    </section>
  );
}
