"use client";

import { useMemo } from "react";

type Participant = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string | null;
  sessions?: Array<{
    id: number;
    check_in_time: string | null;
    check_out_time: string | null;
  }>;
};

type Props = {
  completedSessions: Participant[];
  pendingSessions: Participant[];
  onlyCheckOutParticipants: Participant[];
};

export default function AttendeesTable({ completedSessions, pendingSessions, onlyCheckOutParticipants }: Props) {
  const rows = useMemo(() => {
    const fmt = (d: string | null) => (d ? new Date(d).toLocaleString() : "-");

    const mapWith = (list: Participant[], status: string) =>
      list.map((p) => {
        // pick most recent session if exists
        const s = (p.sessions || []).slice().sort((a, b) => (a.id > b.id ? -1 : 1))[0];
        return {
          id: `${status}-${p.id}`,
          first_name: p.first_name,
          last_name: p.last_name,
          email: p.email,
          phone_number: p.phone_number || "-",
          status,
          check_in_time: fmt(s?.check_in_time ?? null),
          check_out_time: fmt(s?.check_out_time ?? null),
        };
      });

    const all = [
      ...mapWith(completedSessions || [], "Completed"),
      ...mapWith(pendingSessions || [], "Pending"),
      ...mapWith(onlyCheckOutParticipants || [], "Only Check-out"),
    ];

    // de-duplicate by composite key email+status+times to avoid duplicates if a participant appears in multiple lists
    const seen = new Set<string>();
    return all.filter((r) => {
      const key = `${r.email}|${r.status}|${r.check_in_time}|${r.check_out_time}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [completedSessions, pendingSessions, onlyCheckOutParticipants]);

  function downloadCSV() {
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Status",
      "Check-in Time",
      "Check-out Time",
    ];
    const lines = [headers.join(",")];
    rows.forEach((r) => {
      const vals = [
        r.first_name,
        r.last_name,
        r.email,
        r.phone_number,
        r.status,
        r.check_in_time,
        r.check_out_time,
      ];
      // naive CSV escaping for commas and quotes
      const line = vals
        .map((v) => {
          const s = String(v ?? "");
          if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
          return s;
        })
        .join(",");
      lines.push(line);
    });
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendees_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Attendees</h2>
        <button type="button" className="btn" onClick={downloadCSV}>Download Excel (CSV)</button>
      </div>
      <div className="overflow-auto rounded-lg border">
        <table className="min-w-[800px] w-full">
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="px-3 py-2">First Name</th>
              <th className="px-3 py-2">Last Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone Number</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Check-in Time</th>
              <th className="px-3 py-2">Check-out Time</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-gray-500">No attendees</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2">{r.first_name}</td>
                  <td className="px-3 py-2">{r.last_name}</td>
                  <td className="px-3 py-2">{r.email}</td>
                  <td className="px-3 py-2">{r.phone_number}</td>
                  <td className="px-3 py-2">{r.status}</td>
                  <td className="px-3 py-2">{r.check_in_time}</td>
                  <td className="px-3 py-2">{r.check_out_time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
