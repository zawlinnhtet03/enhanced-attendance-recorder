"use client";

import FormEditor from "@/components/admin/FormEditor";

export default function DashboardCheckInPage() {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <a href="/dashboard" className="inline-flex items-center gap-2 text-sm text-brand-700 hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M15 18l-6-6 6-6"/></svg>
        Back to Dashboard
      </a>
      <div>
        <h1 className="text-2xl font-semibold">Check-in Form Settings</h1>
        <p className="text-gray-600">Customize dynamic fields shown to attendees on the Check-in form.</p>
      </div>
      <FormEditor form="CHECK_IN" />
    </section>
  );
}
