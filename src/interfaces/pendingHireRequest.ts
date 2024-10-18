export interface IPendingHireRequest {
  hire_id: number;
  project_id: number;
  freelancer_id: number;
  hired_by: string;
  hired_by_id: number;
  hired_freelancer_name: string;
  project_title: string;
  project_category: string;
  project_description: string;
  project_exp_level: string;
  project_skills: string;
  project_deadline: string;
  hiring_budget: number;
  hiring_budget_type: string;
  message: string;
  freelancer_accepted: boolean;
  freelancer_rejected: boolean;
  hirer_location: string;
  hirer_creation_date: string;
  Received_time: string;
  is_hired: boolean;
}
