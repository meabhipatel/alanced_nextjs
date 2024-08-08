export interface IUserProfile {
  id: number;
  first_Name: string;
  last_Name: string;
  email: string;
  contact: string;
  Address: string;
  images_logo: string;
  social_media: string;
  skills: string;
  about: string;
  DOB: string | null;
  gender: string;
  map: string;
  experience: number;
  qualification: string;
  category: string;
  Language: string;
  hourly_rate: number;
  experience_level: string;
}

export interface IFreelancerHiringOpen {
  [key: number]: boolean;
}

export interface IProps {
  closeFreeHiring: (id: number) => void;
  free: IFreelancer;
}

export interface IFreelancer {
  id: number;
  email: string;
  first_Name: string;
  last_Name: string;
  contact: string;
  Address: string;
  DOB: string | null;
  gender: string;
  experience: number;
  type: string;
  images_logo: string;
  qualification: string;
  social_media: string;
  map: string;
  skills: string;
  category: string;
  Language: string;
  hourly_rate: number;
  experience_level: string;
  about: string;
  length: number;
}

export interface IHirerProfile {
  id: number;
  Company_Name: string;
  first_Name: string;
  last_Name: string;
  email: string;
  contact: string;
  Address: string;
  images_logo: string;
  social_media: string;
  about: string;
  DOB: string | null;
  Company_Establish: string | null;
  gender: string;
  map: string;
}

export interface IError {
  response: {
    data: {
      message: string;
    };
  };
}

export interface IViewProject {
  id: number;
  title: string;
  description: string;
  Project_Rate: 'Hourly' | 'Fixed'; // Assuming 'Hourly' or 'Fixed' as possible values
  Project_Fixed_Budget: number | null;
  Project_Min_Hourly_Rate: number;
  Project_Max_Hourly_Rate: number;
  deadline: string; // Date strings can be used or consider using Date type
  skills_required: string; // This might need parsing or conversion to an array
  category: string;
  Project_created_at: string; // Date string or Date type
  project_owner_id: number;
  project_owner_address: string;
  project_owner_created: string; // Date string or Date type
  is_hired: boolean;
  project_owner_name: string;
}
