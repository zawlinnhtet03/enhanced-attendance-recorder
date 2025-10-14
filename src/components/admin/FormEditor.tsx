"use client";

import { useEffect, useMemo, useState } from "react";
import type { DynamicField, FormKey } from "@/lib/formConfig";

type Props = {
  form: FormKey;
};

export default function FormEditor({ form }: Props) {
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  // Keep raw text for options so typing a trailing comma doesn't get eaten by parsing
  const [optionsText, setOptionsText] = useState<Record<number, string>>({});

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/forms/${form}`)
      .then((r) => r.json())
      .then((res) => {
        if (!alive) return;
        setFields(Array.isArray(res.fields) ? res.fields : []);
        setOptionsText({});
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setFields([]);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [form]);

  function update(idx: number, patch: Partial<DynamicField>) {
    setFields((prev) => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)));
  }
  function addField() {
    setFields((prev) => [
      ...prev,
      { name: `field_${prev.length + 1}`, label: "New Field", type: "text", required: false },
    ]);
  }
  function removeField(idx: number) {
    setFields((prev) => prev.filter((_, i) => i !== idx));
  }
  function move(idx: number, dir: -1 | 1) {
    setFields((prev) => {
      const next = [...prev];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  }

  async function save() {
    setError(null);
    setNote(null);
    setSaving(true);
    try {
      // Clean up options before saving (trim + remove empties)
      const cleaned = fields.map((f) =>
        (f.type === "select" || f.type === "radio" || f.type === "checkbox")
          ? { ...f, options: (f.options || []).map((s) => s?.toString().trim()).filter(Boolean) as string[] }
          : f
      );
      const res = await fetch(`/api/admin/forms/${form}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ fields: cleaned }),
      });
      setSaving(false);
      if (res.ok) setNote("Saved");
      else {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || `Failed to save (${res.status})`);
      }
    } catch (e: any) {
      setSaving(false);
      setError(`Network error: ${e?.message || "Failed to fetch"}`);
    }
  }

  const canSave = useMemo(() => fields.every((f) => f.name && f.label && f.type), [fields]);

  function renderStaticFields() {
    if (form === "CHECK_OUT") {
      return (
        <div className="rounded-lg border border-dashed bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Static fields</div>
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-gray-600 ring-1 ring-gray-200">Not editable</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-xs text-gray-600">Email</div>
              <input className="input mt-1" value="" placeholder="email" disabled />
            </div>
          </div>
        </div>
      );
    }
    // CHECK_IN and ONLY_CHECK_OUT
    return (
      <div className="rounded-lg border border-dashed bg-gray-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-medium">Static fields</div>
          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-gray-600 ring-1 ring-gray-200">Not editable</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-xs text-gray-600">First Name</div>
            <input className="input mt-1" value="" placeholder="first_name" disabled />
          </div>
          <div>
            <div className="text-xs text-gray-600">Last Name</div>
            <input className="input mt-1" value="" placeholder="last_name" disabled />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 mt-3">
          <div>
            <div className="text-xs text-gray-600">Email</div>
            <input className="input mt-1" value="" placeholder="email" disabled />
          </div>
          <div>
            <div className="text-xs text-gray-600">Phone Number</div>
            <input className="input mt-1" value="" placeholder="phone_number" disabled />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-sm text-gray-600">Loading fields…</div>
      ) : (
        <>
          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          {renderStaticFields()}

          <div className="space-y-3">
            {fields.map((f, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm font-medium">Field #{i + 1}</div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="rounded-md border px-2 py-1 text-xs" onClick={() => move(i, -1)}>Up</button>
                    <button type="button" className="rounded-md border px-2 py-1 text-xs" onClick={() => move(i, 1)}>Down</button>
                    <button type="button" className="rounded-md border px-2 py-1 text-xs text-red-600" onClick={() => removeField(i)}>Delete</button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm">Name
                    <input className="input mt-1" value={f.name} onChange={(e) => update(i, { name: e.target.value })} />
                  </label>
                  <label className="text-sm">Label
                    <input className="input mt-1" value={f.label} onChange={(e) => update(i, { label: e.target.value })} />
                  </label>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 mt-3">
                  <label className="text-sm">Type
                    <select className="input mt-1" value={f.type} onChange={(e) => update(i, { type: e.target.value as DynamicField["type"] })}>
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Tel</option>
                      <option value="select">Select</option>
                      <option value="radio">Radio</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </label>
                  <label className="text-sm">Required
                    <input className="ml-2 h-4 w-4 align-middle" type="checkbox" checked={!!f.required} onChange={(e) => update(i, { required: e.target.checked })} />
                  </label>
                  <label className="text-sm">Placeholder
                    <input className="input mt-1" value={f.placeholder || ""} onChange={(e) => update(i, { placeholder: e.target.value })} />
                  </label>
                </div>
                {(f.type === "select" || f.type === "radio" || f.type === "checkbox") && (
                  <label className="mt-3 block text-sm">Options (comma separated)
                    <input
                      className="input mt-1"
                      value={(optionsText[i] ?? (f.options || []).join(", "))}
                      onChange={(e) => {
                        const val = e.target.value;
                        setOptionsText((prev) => ({ ...prev, [i]: val }));
                        // Update parsed options, but do not remove trailing empties so typing a comma feels natural
                        update(i, { options: val.split(',').map((s) => s.trim()) });
                      }}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
          
          {note && <p className="mt-3 rounded-md bg-green-50 p-3 text-sm text-green-700">{note}</p>}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" className="btn" onClick={addField}>Add field</button>
            <button type="button" className="btn" disabled={!canSave || saving} onClick={save}>{saving ? "Saving…" : "Save"}</button>
          </div>
          
        </>
      )}
    </div>
  );
}
