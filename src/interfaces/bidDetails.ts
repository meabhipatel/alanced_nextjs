export interface IBidDetails {
  id: number;
  bid_amount: number;
  description: string;
  bid_type: string;
  bid_time: string;
  freelancer_name: string;
  project_id: number;
  freelancer_id: number;
  freelancer_category: string;
  freelancer_address: string;
  freelancer_skills: string;
  freelancer_profilepic: string;
  freelancer_about: string;
  freelancer_hourly_rate: number;
  freelancer_experience_level: string;
  Freelancer_Languages: string;
  Freelancer_qualification: string;
  project: {
    title: string;
    description: string;
    category: string;
    skills_required: string;
    deadline: string;
    fixed_budget: number;
    rate: string;
    min_hourly_rate: number | null;
    max_hourly_rate: number | null;
    created_at: string;
    is_hired: boolean;
  };
}
