export interface IInvitationDetails {
  hire_id: number;
  project_id: number;
  freelancer_id: number;
  project_title: string;
  project_description: string;
  project_category: string;
  hiring_budget: number;
  hiring_budget_type: "Fixed" | "Hourly";
  message: string;
  freelancer_name: string;
  freelancer_category: string;
  freelancer_description: string;
  freelancer_skills: string;
  freelancer_hourly_rate: number;
  freelancer_experience_level: string;
  freelancer_language: string;
  hire_by: string;
  freelancer_accepted: boolean;
  freelancer_rejected: boolean;
  hired_at: string;
  is_hired: boolean;
}
