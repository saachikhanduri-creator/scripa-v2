# Scripa — Go-Niche Research: Trades (HVAC / Electrical / Plumbing Field Technicians)

## Why trades, and why first

Field trade technicians (HVAC, electrical, plumbing, and similar home/commercial service trades) spend a meaningful chunk of every job — commonly estimated at 30–60+ minutes per day, or several hours per week — writing up job reports, inspection checklists, and service summaries after the work itself is done. Unlike clinical documentation, this pain is almost entirely undigitized: most small-to-mid trade businesses still use paper carbons, generic PDF templates, or free-text fields bolted onto scheduling software. There is no dominant "voize-for-trades" player yet — the closest analogues (voize, Heidi Health, Tandem Health, Voquill) are all built specifically for clinical/medical documentation and do not serve this market at all. That gap, combined with the same underlying pattern (heavy, repetitive, semi-regulated documentation, low digitization, high time cost), is exactly the thesis Scripa is built on.

## Market size (directional)

- The HVAC, electrical, and plumbing trades collectively employ well over 1 million technicians in the US alone (US BLS estimates put HVAC technicians at ~400K+, electricians at ~700K+, plumbers at ~500K+), spread across hundreds of thousands of small and mid-sized service businesses.
- Even a conservative estimate of 20–30 minutes saved per technician per day, multiplied by a modest per-seat SaaS price, implies a large addressable market once aggregated — small individually, but the trades vertical as a whole is sizeable and highly fragmented, meaning no single incumbent owns it.
- This is a "too small for horizontal players, big enough for a focused startup" market — the exact shape the Scripa thesis targets.

## ICP (Ideal Customer Profile)

- **Primary:** small-to-mid HVAC, electrical, and plumbing service businesses (2–50 technicians) that run recurring residential or light-commercial service calls (maintenance, repair, inspection).
- **Buyer:** owner/operator or office manager, who feels the pain both in technician time and in report quality/consistency (needed for compliance, warranty claims, and customer trust).
- **End user:** the field technician, who currently either handwrites notes on-site or does paperwork at the end of the day/week — a task most technicians actively dislike and delay.

## Willingness to pay

- Technician time is directly billable; if a technician bills $75–150/hr, saving even 20–30 minutes/day is worth real money to the business owner, translating to a clear "time is money" ROI story.
- Trade businesses already pay for field-service software (ServiceTitan, Jobber, Housecall Pro) — they are accustomed to per-seat SaaS pricing and have budget lines for tools that make technicians faster.
- Documentation quality also reduces callback/warranty disputes and supports insurance/compliance needs (especially for electrical and gas-related work), adding a risk-reduction angle on top of pure time savings.

## Documentation pain (concrete)

- Reports are typically written from memory at the end of a job or end of a day, leading to missed details, inconsistent formatting between technicians, and rushed, low-quality write-ups.
- Handwritten or ad hoc digital notes don't integrate cleanly with the scheduling/invoicing software the business already uses, creating duplicate data entry.
- Client-facing summaries (what was actually done, in plain language) are often skipped entirely, or copy-pasted from the internal technical report — a missed opportunity for trust-building and upsell (e.g., recommending replacement).

## Competitive scan

| Player | Focus | Overlap with trades documentation |
|---|---|---|
| **voize** | Care/nursing voice documentation | None — clinical vertical, different vocabulary/compliance needs |
| **Heidi Health** | Clinician (doctor) consultation notes | None — clinical vertical |
| **Tandem Health** | Clinician documentation | None — clinical vertical |
| **Voquill** | Pathology sign-out reports | None — clinical vertical |
| **ServiceTitan / Jobber / Housecall Pro** | Field-service scheduling, dispatch, invoicing | Adjacent — these own the *workflow* (jobs, invoices, customers) but have only basic free-text or checklist note fields; none offer voice-to-structured-report generation as a core feature |
| **Generic AI notetakers (Otter, Fireflies, etc.)** | Horizontal meeting transcription | Explicitly out of scope per the Scripa thesis — not vertical, not structured for compliance/report formats, not mobile-field-first |

**The gap:** nobody combines (a) mobile-first voice capture built for a technician mid-job or right after, (b) AI structuring into the exact job/inspection report format a trade business needs, and (c) an ready output that could integrate into the field-service tools they already use. Scripa's wedge is to win the documentation moment itself, then become the data-entry layer that feeds the existing scheduling/invoicing stack — not to replace it.

## Why this profession first (summary)

1. Large, fragmented market with no dominant vertical documentation player (unlike clinical, which already has voize/Heidi/Tandem).
2. Clear, provable ROI tied directly to billable time — an easy sell to owner-operators.
3. Low-complexity compliance/format requirements compared to clinical or pathology (easier MVP, faster time-to-value), while still being "regulated enough" (safety, warranty, electrical/gas code references) to justify a structured, compliant document rather than a generic note.
4. Existing willingness to pay for field-service SaaS tools proves the buying behavior already exists — Scripa doesn't need to create a new budget line, just prove it deserves one.
