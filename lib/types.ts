export interface WorkItem {
  item: string;
  completed: boolean;
  notes: string | null;
}

export interface StructuredReport {
  job_info: {
    customer_name: string | null;
    address: string | null;
    job_type: string | null;
  };
  equipment: {
    type: string | null;
    make_model: string | null;
  };
  work_performed: WorkItem[];
  materials_used: string[];
  issues_found: string[];
  recommendations: string[];
  safety_concerns: string[];
  follow_up_required: boolean;
  technician_notes: string | null;
}

export interface GenerateResponse {
  structured_report: StructuredReport;
  client_summary: string;
}
