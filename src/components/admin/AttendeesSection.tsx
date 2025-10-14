"use client";

import { useMemo } from "react";

type Participant = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string | null;
  extra_fields?: Record<string, any> | null;
  sessions?: Array<{
    id: number;
    check_in_time: string | null;
    check_out_time: string | null;
  }>;
};

type Props = {
  title: string;
  filenameKey: string; // used in CSV filename
  status: string; // Completed | Only Check-in | Only Check-out
  data: Participant[];
};

export default function AttendeesSection({ title, filenameKey, status, data }: Props) {
  const { rows, extraKeys } = useMemo(() => {
    const dtf = new Intl.DateTimeFormat(undefined, {
      timeZone: "Asia/Macau",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const fmt = (d: string | null) => {
      if (!d) return "-";
      try {
        return dtf.format(new Date(d));
      } catch {
        return "-";
      }
    };
    const keys = new Set<string>();
    const rows = (data || []).map((p) => {
      const s = (p.sessions || []).slice().sort((a, b) => (a.id > b.id ? -1 : 1))[0];
      const ef = p.extra_fields && typeof p.extra_fields === "object" ? p.extra_fields : {};
      Object.keys(ef || {}).forEach((k) => keys.add(k));
      return {
        id: `${status}-${p.id}`,
        first_name: p.first_name,
        last_name: p.last_name,
        email: p.email,
        phone_number: p.phone_number || "-",
        status,
        check_in_time: fmt(s?.check_in_time ?? null),
        check_out_time: fmt(s?.check_out_time ?? null),
        extra: ef as Record<string, any>,
      };
    });
    return { rows, extraKeys: Array.from(keys).sort() };
  }, [data, status]);

  function displayVal(v: any): string {
    if (v === null || v === undefined) return "";
    if (Array.isArray(v)) return v.map((x) => displayVal(x)).join(", ");
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }

  async function downloadExcel() {
    try {
      const XLSX: any = await import("xlsx");
      if (!XLSX || !XLSX.utils) {
        throw new Error("xlsx module did not load correctly");
      }
      const header = [
        "First Name",
        "Last Name",
        "Email",
        "Phone Number",
        "Status",
        "Check-in Time",
        "Check-out Time",
        ...extraKeys,
      ];
      const aoa: any[][] = [header];
      rows.forEach((r) => {
        const base = [
          r.first_name,
          r.last_name,
          r.email,
          r.phone_number,
          r.status,
          r.check_in_time,
          r.check_out_time,
        ];
        const extras = extraKeys.map((k) => displayVal((r.extra || {})[k]));
        aoa.push([...base, ...extras]);
      });
      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, title.slice(0, 31) || "Sheet1");
      XLSX.writeFile(wb, `attendees_${filenameKey}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (e) {
      alert("Excel export requires the 'xlsx' package. Please install it: npm i xlsx\n\n" + (e as Error).message);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{title}</h2>
        <button type="button" className="btn" onClick={downloadExcel}>Download</button>
      </div>
      <div className="rounded-lg border overflow-x-auto overflow-y-hidden" style={{ WebkitOverflowScrolling: "touch", maxWidth: "100%" }}>
          <table className="min-w-max whitespace-nowrap">
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="px-3 py-2">First Name</th>
              <th className="px-3 py-2">Last Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone Number</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Check-in Time</th>
              <th className="px-3 py-2">Check-out Time</th>
              {extraKeys.map((k) => (
                <th key={k} className="px-3 py-2">{k}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7 + extraKeys.length} className="px-3 py-6 text-center text-gray-500">No attendees</td>
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
                  {extraKeys.map((k) => (
                    <td key={k} className="px-3 py-2">{displayVal((r.extra || {})[k])}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          </table>
      </div>
    </div>
  );
}
