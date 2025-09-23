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

export interface Teacher {
  id: number;
  teacher_id: number;
  teacher_code: string;
  name: string;
  email: string;
  phone: string;
  national_id: string;
  subject_specialization: string;
  teacher_type: "regular" | "admin" | "assistant";
  can_create_exams: boolean;
  can_correct_essays: boolean;
  is_active: boolean | number;
  user_type: "teacher" | "admin";
  schools: any[]; // replace with School[] if you have a School type
  created_at: string;
  updated_at: string;
  email_verified_at: string | null;
  actions: any;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  section: "scientific" | "literature" | "common";
  duration_minutes: number;
  max_score: number;
  has_essay_questions: boolean;
  is_active: boolean;
}
