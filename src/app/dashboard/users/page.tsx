async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/admin/users`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

import AttendeesSection from "@/components/admin/AttendeesSection";

export default async function DashboardUsersPage() {
  const { completedSessions, pendingSessions, onlyCheckOutParticipants } = await getData();
  return (
    <section className="space-y-8">
      <header>
        <a href="/dashboard" className="mb-2 inline-flex items-center gap-2 text-sm text-brand-700 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Dashboard
        </a>
        <h1 className="text-2xl font-semibold">Attendees</h1>
        <p className="text-gray-600">Completed, pending and only-check-out participants.</p>
      </header>

      <div className="space-y-6">
        <div className="card p-5">
          <AttendeesSection title="Completed" filenameKey="completed" status="Completed" data={completedSessions} />
        </div>
        <div className="card p-5">
          <AttendeesSection title="Only Check-in" filenameKey="only_check_in" status="Only Check-in" data={pendingSessions} />
        </div>
        <div className="card p-5">
          <AttendeesSection title="Only Check-out" filenameKey="only_check_out" status="Only Check-out" data={onlyCheckOutParticipants} />
        </div>
      </div>
    </section>
  );
}
