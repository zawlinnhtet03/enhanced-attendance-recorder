import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

async function getAdminUsers() {
  const h = headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/admin/users`, { cache: "no-store" });
  if (!res.ok) return { completedSessions: [], pendingSessions: [], onlyCheckOutParticipants: [] };
  return res.json();
}

export default async function DashboardHomePage() {
  const session = await getSession();
  if (!session?.email) redirect("/login?next=/dashboard");
  const { completedSessions, pendingSessions, onlyCheckOutParticipants } = await getAdminUsers();
  const baseCounts = {
    completed: completedSessions?.length || 0,
    pending: pendingSessions?.length || 0,
    onlyCheckout: onlyCheckOutParticipants?.length || 0,
  };
  const counts = baseCounts;
  const total = counts.completed + counts.pending + counts.onlyCheckout;

  // Compute totals for bar chart from current counts
  const totalCheckIns = counts.completed + counts.pending;
  const totalCheckOuts = counts.completed + counts.onlyCheckout;

  return (
    <section className="space-y-8">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-brand to-aqua p-6 text-white shadow-sm">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="opacity-90">Manage attendance, participants, and QR tools.</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="feature-card">
          <div className="feature-title">Completed</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{counts.completed}</div>
          <p className="feature-desc">Fully checked-in and checked-out</p>
        </div>
        <div className="feature-card">
          <div className="feature-title">Pending</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{counts.pending}</div>
          <p className="feature-desc">Checked-in but not checked-out</p>
        </div>
        <div className="feature-card">
          <div className="feature-title">Only Check-out</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{counts.onlyCheckout}</div>
          <p className="feature-desc">Requested checkout without check-in</p>
        </div>
        <div className="feature-card">
          <div className="feature-title">Total Participants</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{total}</div>
          <p className="feature-desc">Sum of all tracked participants</p>
        </div>
      </div>

      {/* Pie charts (softer colors) */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Status Breakdown</h3>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <DoughnutChart
            labels={["Completed", "Pending", "Only Check‑out"]}
            data={[counts.completed, counts.pending, counts.onlyCheckout]}
            colors={["rgba(0,122,255,0.88)", "rgba(0,200,255,0.80)", "rgba(82,109,255,0.85)"]}
            cutout="68%"
            height={280}
          />
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Check-ins vs Check-outs</h3>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          <BarChart
            labels={["Check-ins", "Check-outs"]}
            datasets={[
              { label: "Count", data: [totalCheckIns, totalCheckOuts], color: "rgba(0,122,255,0.75)" },
            ]}
            height={280}
          />
        </div>
      </div>
    </section>
  );
}
