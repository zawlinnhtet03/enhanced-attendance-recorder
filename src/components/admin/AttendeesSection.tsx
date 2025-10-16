"use client";

import { useMemo, useState } from "react";
import { defaultExtraFields, type FormKey } from "@/lib/formConfig";

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
  const [editing, setEditing] = useState<null | {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    extra: Record<string, any>;
  }>(null);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
        participantId: p.id,
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

  const fieldMeta = useMemo(() => {
    const formKey: FormKey = status === "Only Check-out" ? "ONLY_CHECK_OUT" : "CHECK_IN";
    return defaultExtraFields(formKey);
  }, [status]);

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

  async function onDelete(id: number) {
    try {
      const res = await fetch(`/api/admin/participants/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      window.location.reload();
    } catch (e) {
      alert((e as Error).message || "Failed to delete");
    }
  }

  function openEdit(row: any) {
    setEditing({
      id: row.participantId,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      phone_number: row.phone_number === "-" ? null : row.phone_number,
      extra: { ...(row.extra || {}) },
    });
  }

  async function onSave() {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/participants/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: editing.first_name,
          last_name: editing.last_name,
          email: editing.email,
          phone_number: editing.phone_number,
          extra_fields: editing.extra,
        }),
      });
      if (!res.ok) throw new Error("update failed");
      window.location.reload();
    } catch (e) {
      alert((e as Error).message || "Failed to update");
    } finally {
      setSaving(false);
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
              <th className="px-3 py-2">Actions</th>
              {extraKeys.map((k) => (
                <th key={k} className="px-3 py-2">{k}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8 + extraKeys.length} className="px-3 py-6 text-center text-gray-500">No attendees</td>
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
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label="Edit"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-gray-50"
                        onClick={() => openEdit(r)}
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                          <path d="M12 20h9"/>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Delete"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-red-50 text-red-600"
                        onClick={() => setConfirmDeleteId(r.participantId)}
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                  {extraKeys.map((k) => (
                    <td key={k} className="px-3 py-2">{displayVal((r.extra || {})[k])}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-5 shadow">
            <h3 className="mb-4 text-lg font-medium">Edit Participant</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="space-y-1">
                <div className="text-sm text-gray-600">First Name</div>
                <input className="input" value={editing.first_name} onChange={(e) => setEditing({ ...editing, first_name: e.target.value })} />
              </label>
              <label className="space-y-1">
                <div className="text-sm text-gray-600">Last Name</div>
                <input className="input" value={editing.last_name} onChange={(e) => setEditing({ ...editing, last_name: e.target.value })} />
              </label>
              <label className="space-y-1 md:col-span-2">
                <div className="text-sm text-gray-600">Email</div>
                <input className="input" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
              </label>
              <label className="space-y-1 md:col-span-2">
                <div className="text-sm text-gray-600">Phone Number</div>
                <input className="input" value={editing.phone_number || ""} onChange={(e) => setEditing({ ...editing, phone_number: e.target.value || null })} />
              </label>
            </div>
            {fieldMeta.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="text-sm font-medium">Extra Fields</div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {fieldMeta.map((f) => (
                    <div key={f.name} className="space-y-1">
                      <div className="text-sm text-gray-600">{f.label || f.name}</div>
                      {(() => {
                        const raw = editing.extra?.[f.name];
                        const yesNo = Array.isArray(f.options) && f.options.length === 2 && f.options.includes("Yes") && f.options.includes("No");
                        const normalizeYesNoString = (v: any): string | "" => {
                          if (v === undefined || v === null) return "";
                          if (v === "-") return "";
                          if (typeof v === "boolean") return v ? "Yes" : "No";
                          const s = String(v).trim().toLowerCase();
                          if (s === "yes" || s === "true" || s === "1") return "Yes";
                          if (s === "no" || s === "false" || s === "0") return "No";
                          return String(v);
                        };
                        const toDisplay = (v: any) => (yesNo ? normalizeYesNoString(v) : (v === "-" ? "" : (v ?? "")));
                        const fromInput = (v: string) => v; // keep stored as string (e.g., "Yes"/"No") for consistency

                        if ((f.type === "select") && Array.isArray(f.options)) {
                          return (
                            <select
                              className="input"
                              value={toDisplay(raw) as any}
                              onChange={(e) => setEditing({ ...editing, extra: { ...editing.extra, [f.name]: fromInput(e.target.value) } })}
                            >
                              <option value="">Select...</option>
                              {f.options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          );
                        }
                        if ((f.type === "radio") && Array.isArray(f.options)) {
                          const current = toDisplay(raw);
                          return (
                            <div className="flex flex-wrap gap-3">
                              {f.options.map((opt) => (
                                <label key={opt} className="inline-flex items-center gap-2 text-sm">
                                  <input
                                    type="radio"
                                    name={`field-${f.name}`}
                                    value={opt}
                                    checked={current === opt}
                                    onChange={() => setEditing({ ...editing, extra: { ...editing.extra, [f.name]: fromInput(opt) } })}
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          );
                        }
                        if ((f.type === "checkbox") && Array.isArray(f.options)) {
                          const arrRaw = Array.isArray(raw) ? raw : raw ? [raw] : [];
                          const arr = arrRaw.map((x) => (yesNo ? normalizeYesNoString(x) : String(x)));
                          const toggle = (opt: string) => {
                            const has = arr.includes(opt);
                            const nextDisp = has ? arr.filter((x) => x !== opt) : [...arr, opt];
                            const next = nextDisp; // store as strings
                            setEditing({ ...editing, extra: { ...editing.extra, [f.name]: next } });
                          };
                          return (
                            <div className="flex flex-wrap gap-3">
                              {f.options.map((opt) => (
                                <label key={opt} className="inline-flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    value={opt}
                                    checked={arr.includes(opt)}
                                    onChange={() => toggle(opt)}
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          );
                        }
                        // default text/email/tel
                        return (
                          <input
                            className="input"
                            type={f.type === "email" || f.type === "tel" ? f.type : "text"}
                            placeholder={f.placeholder}
                            value={String(toDisplay(raw)) as any}
                            onChange={(e) => setEditing({ ...editing, extra: { ...editing.extra, [f.name]: e.target.value } })}
                          />
                        );
                      })()}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button type="button" className="btn-outline" onClick={() => setEditing(null)} disabled={saving}>Cancel</button>
              <button type="button" className="btn" onClick={onSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-red-100 p-2 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 9v4"/>
                  <path d="M12 17h.01"/>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium">Delete participant?</h4>
                <p className="mt-1 text-sm text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button type="button" className="btn-outline" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
              <button type="button" className="btn bg-red-600 hover:bg-red-700 text-white" onClick={() => onDelete(confirmDeleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
