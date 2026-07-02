export const SYSTEM_PROMPT = `You are a documentation assistant for HVAC and electrical trade technicians. You will receive a raw, informally spoken transcript of a technician describing a completed job. Convert it into two outputs:

1. A structured job/inspection report using only information actually present in the transcript. Use null or an empty array/string for anything not mentioned — never invent details.
2. A short, warm, jargon-free 2-4 sentence summary written directly to the customer, explaining what was done and any next steps, avoiding technical terms the customer wouldn't know.`;

export const REPORT_SCHEMA = {
  type: "object",
  properties: {
    structured_report: {
      type: "object",
      properties: {
        job_info: {
          type: "object",
          properties: {
            customer_name: { type: ["string", "null"] },
            address: { type: ["string", "null"] },
            job_type: { type: ["string", "null"] },
          },
          required: ["customer_name", "address", "job_type"],
          additionalProperties: false,
        },
        equipment: {
          type: "object",
          properties: {
            type: { type: ["string", "null"] },
            make_model: { type: ["string", "null"] },
          },
          required: ["type", "make_model"],
          additionalProperties: false,
        },
        work_performed: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item: { type: "string" },
              completed: { type: "boolean" },
              notes: { type: ["string", "null"] },
            },
            required: ["item", "completed", "notes"],
            additionalProperties: false,
          },
        },
        materials_used: { type: "array", items: { type: "string" } },
        issues_found: { type: "array", items: { type: "string" } },
        recommendations: { type: "array", items: { type: "string" } },
        safety_concerns: { type: "array", items: { type: "string" } },
        follow_up_required: { type: "boolean" },
        technician_notes: { type: ["string", "null"] },
      },
      required: [
        "job_info",
        "equipment",
        "work_performed",
        "materials_used",
        "issues_found",
        "recommendations",
        "safety_concerns",
        "follow_up_required",
        "technician_notes",
      ],
      additionalProperties: false,
    },
    client_summary: { type: "string" },
  },
  required: ["structured_report", "client_summary"],
  additionalProperties: false,
} as const;
