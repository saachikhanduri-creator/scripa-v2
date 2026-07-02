"use client";

import { useState } from "react";
import type { GenerateResponse } from "@/lib/types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-sm text-slate-400 italic">None noted</p>;
  return (
    <ul className="list-disc list-inside space-y-1 text-sm text-slate-800">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function ReportView({ data }: { data: GenerateResponse }) {
  const [tab, setTab] = useState<"report" | "summary">("report");
  const { structured_report: r, client_summary } = data;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setTab("report")}
          className={`flex-1 py-3 text-sm font-medium ${
            tab === "report" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500"
          }`}
        >
          Job Report
        </button>
        <button
          onClick={() => setTab("summary")}
          className={`flex-1 py-3 text-sm font-medium ${
            tab === "summary" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500"
          }`}
        >
          Client Summary
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "report" ? (
          <div>
            <Section title="Job Info">
              <p className="text-sm text-slate-800">
                {r.job_info.customer_name ?? "—"} · {r.job_info.address ?? "—"}
                <br />
                {r.job_info.job_type ?? "—"}
              </p>
            </Section>

            <Section title="Equipment">
              <p className="text-sm text-slate-800">
                {r.equipment.type ?? "—"} {r.equipment.make_model ? `(${r.equipment.make_model})` : ""}
              </p>
            </Section>

            <Section title="Work Performed">
              {r.work_performed.length === 0 ? (
                <p className="text-sm text-slate-400 italic">None noted</p>
              ) : (
                <ul className="space-y-2">
                  {r.work_performed.map((w, i) => (
                    <li key={i} className="text-sm text-slate-800 flex gap-2">
                      <span>{w.completed ? "✅" : "⬜️"}</span>
                      <span>
                        {w.item}
                        {w.notes && <span className="text-slate-500"> — {w.notes}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section title="Materials Used">
              <BulletList items={r.materials_used} />
            </Section>

            <Section title="Issues Found">
              <BulletList items={r.issues_found} />
            </Section>

            <Section title="Recommendations">
              <BulletList items={r.recommendations} />
            </Section>

            <Section title="Safety Concerns">
              <BulletList items={r.safety_concerns} />
            </Section>

            <Section title="Follow-up Required">
              <p className="text-sm text-slate-800">{r.follow_up_required ? "Yes" : "No"}</p>
            </Section>

            {r.technician_notes && (
              <Section title="Technician Notes">
                <p className="text-sm text-slate-800">{r.technician_notes}</p>
              </Section>
            )}
          </div>
        ) : (
          <div>
            <p className="text-sm text-slate-800 leading-relaxed">{client_summary}</p>
            <button
              onClick={() => navigator.clipboard.writeText(client_summary)}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Copy summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
