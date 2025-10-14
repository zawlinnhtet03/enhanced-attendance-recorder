"use client";

import { useState } from "react";

export default function AskCheckInPage() {
  const [status, setStatus] = useState("yes");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "yes") {
      window.location.href = "/check-out-form";
    } else {
      window.location.href = "/only-check-out";
    }
  }

  return (
    <section className="mx-auto max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold">Have you already checked in?</h1>
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
