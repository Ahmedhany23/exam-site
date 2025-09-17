export interface userType {
  id: number;
  name: string;
  email: string;
  phone: string;
  national_id: string;
  user_type: "ministry_admin" | "teacher" | "student" | "school_admin";
  is_active: boolean;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}
