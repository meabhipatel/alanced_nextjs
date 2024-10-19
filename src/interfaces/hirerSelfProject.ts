export interface IHirerSelfProject {
  id: number;
  title: string;
  description: string;
  Project_Rate: "Hourly" | "Fixed";
  experience_level: "Entry_Level" | "Intermediate" | "Expert";
  Project_Fixed_Budget: number | null;
  Project_Min_Hourly_Rate: number | null;
  Project_Max_Hourly_Rate: number | null;
  deadline: string;
  skills_required: string;
  category: string;
  Project_created_at: string;
  project_owner_id: number;
  project_owner_address: string;
  project_owner_created: string;
  is_hired: boolean;
  project_owner_name: string;
  proposals: number;
  invitations: number;
}
