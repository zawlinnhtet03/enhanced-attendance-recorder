import { headers } from "next/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function getData() {
  const h = headers();
  const res = await fetch(`/api/admin/users`, {
    cache: "no-store",
    headers: { cookie: cookies().toString() },
  });
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session?.email) redirect("/login?next=/admin/users");
  const { completedSessions, pendingSessions, onlyCheckOutParticipants } = await getData();
  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Admin Users</h1>
        <p className="text-gray-600">Completed, pending and only-check-out participants.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-5">
          <h2 className="mb-3 font-medium">Completed Sessions</h2>
          <ul className="space-y-2 text-sm">
            {completedSessions?.length ? (
              completedSessions.map((p: any) => (
                <li key={p.id} className="border-b pb-2 last:border-b-0">
                  <div className="font-medium">{p.first_name} {p.last_name}</div>
                  <div className="text-gray-600">{p.email}</div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No completed sessions</li>
            )}
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 font-medium">Pending Sessions (Checked-in, not out)</h2>
          <ul className="space-y-2 text-sm">
            {pendingSessions?.length ? (
              pendingSessions.map((p: any) => (
                <li key={p.id} className="border-b pb-2 last:border-b-0">
                  <div className="font-medium">{p.first_name} {p.last_name}</div>
                  <div className="text-gray-600">{p.email}</div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No pending sessions</li>
            )}
          </ul>
        </div>
        <div className="card p-5">
          <h2 className="mb-3 font-medium">Only Check-out Participants</h2>
          <ul className="space-y-2 text-sm">
            {onlyCheckOutParticipants?.length ? (
              onlyCheckOutParticipants.map((p: any) => (
                <li key={p.id} className="border-b pb-2 last:border-b-0">
                  <div className="font-medium">{p.first_name} {p.last_name}</div>
                  <div className="text-gray-600">{p.email}</div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No only-check-out participants</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
