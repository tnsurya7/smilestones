export type UserRole = 'super_admin' | 'sub_doctor';

export interface User {
  id: string;
  name: string;
  email?: string;
  username?: string;
  role: UserRole;
  created_at: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  parent_name: string;
  phone: string;
  assigned_doctor_id: string | null;
  created_at: string;
}

export interface Session {
  id: string;
  child_id: string;
  doctor_id: string;
  date: string;
  attendance: boolean;
  eye_contact: boolean;
  follow_instructions: boolean;
  speech_attempt: boolean;
  motor_improvement: boolean;
  skill_level: 'poor' | 'average' | 'good' | 'excellent';
  activities: string[];
  notes: string;
  next_goal: string;
  created_at: string;
}

export interface SessionWithDetails extends Session {
  child: Child;
  doctor: User;
}
