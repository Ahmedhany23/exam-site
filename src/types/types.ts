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

export interface Exam {
  academic_year: "first" | "second" | "third";
  can_enter: boolean;
  created_at: string;
  created_by: number | null;
  creator: string;
  description: string;
  duration_minutes: number;
  end_time: string;
  exam_type: "practice" | "final";
  id: number;
  is_active: boolean;
  is_published: boolean;
  minimum_battery_percentage: number;
  require_video_recording: boolean;
  start_time: string;
  status: "completed";
  subject_name: Subject["name"];
  subject_id: Subject["id"];
  time_remaining: number | null;
  title: string;
  total_score: number;
}

export interface Question {
  id: number;
  exam_id: number;
  section_id: number | null;
  question_text: string;
  question_image: string | null;
  question_type: "multiple_choice" | "essay" | "true_false" | string; // extend as needed
  help_text: string | null;
  points: number;
  is_required: boolean;
  options?: string[]; // only for multiple-choice type
  correct_answer?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Section {
  id: number;
  code: string;
  name: string;
  total_points: number;
  questions?: Question[];
}

export interface ExamData {
  sections: Section[];
  unsectioned_questions: Question[];
}

export interface Governorate {
  id: number;
  name: string;
}

export interface School {
  id: number;
  name: string;
  code: string;
  address: string;
  phone: string;
  latitude: string;
  longitude: string;
  allowed_ip_range: string;
  is_active: boolean;
  governorate: Governorate; 
}
