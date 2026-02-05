// localStorage service for admin panel data
// This will be replaced with Supabase API calls later

export interface Doctor {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string; // In production, this should be hashed
  role: 'super_admin' | 'sub_doctor';
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

// Helper to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Doctors CRUD
export const getDoctors = (): Doctor[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('doctors');
  return data ? JSON.parse(data) : [];
};

export const addDoctor = (doctor: Omit<Doctor, 'id' | 'created_at'>): Doctor => {
  const doctors = getDoctors();
  const newDoctor: Doctor = {
    ...doctor,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  doctors.push(newDoctor);
  localStorage.setItem('doctors', JSON.stringify(doctors));
  return newDoctor;
};

export const updateDoctor = (id: string, updates: Partial<Doctor>): Doctor | null => {
  const doctors = getDoctors();
  const index = doctors.findIndex(d => d.id === id);
  if (index === -1) return null;
  
  doctors[index] = { ...doctors[index], ...updates };
  localStorage.setItem('doctors', JSON.stringify(doctors));
  return doctors[index];
};

export const deleteDoctor = (id: string): boolean => {
  const doctors = getDoctors();
  const filtered = doctors.filter(d => d.id !== id);
  if (filtered.length === doctors.length) return false;
  
  localStorage.setItem('doctors', JSON.stringify(filtered));
  return true;
};

// Children CRUD
export const getChildren = (): Child[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('children');
  return data ? JSON.parse(data) : [];
};

export const addChild = (child: Omit<Child, 'id' | 'created_at'>): Child => {
  const children = getChildren();
  const newChild: Child = {
    ...child,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  children.push(newChild);
  localStorage.setItem('children', JSON.stringify(children));
  return newChild;
};

export const updateChild = (id: string, updates: Partial<Child>): Child | null => {
  const children = getChildren();
  const index = children.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  children[index] = { ...children[index], ...updates };
  localStorage.setItem('children', JSON.stringify(children));
  return children[index];
};

export const deleteChild = (id: string): boolean => {
  const children = getChildren();
  const filtered = children.filter(c => c.id !== id);
  if (filtered.length === children.length) return false;
  
  localStorage.setItem('children', JSON.stringify(filtered));
  
  // Also delete associated sessions
  const sessions = getSessions();
  const filteredSessions = sessions.filter(s => s.child_id !== id);
  localStorage.setItem('sessions', JSON.stringify(filteredSessions));
  
  return true;
};

// Sessions CRUD
export const getSessions = (): Session[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('sessions');
  return data ? JSON.parse(data) : [];
};

export const addSession = (session: Omit<Session, 'id' | 'created_at'>): Session => {
  const sessions = getSessions();
  const newSession: Session = {
    ...session,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  sessions.push(newSession);
  localStorage.setItem('sessions', JSON.stringify(sessions));
  return newSession;
};

export const updateSession = (id: string, updates: Partial<Session>): Session | null => {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  sessions[index] = { ...sessions[index], ...updates };
  localStorage.setItem('sessions', JSON.stringify(sessions));
  return sessions[index];
};

export const deleteSession = (id: string): boolean => {
  const sessions = getSessions();
  const filtered = sessions.filter(s => s.id !== id);
  if (filtered.length === sessions.length) return false;
  
  localStorage.setItem('sessions', JSON.stringify(filtered));
  return true;
};

// Helper functions
export const getChildById = (id: string): Child | null => {
  const children = getChildren();
  return children.find(c => c.id === id) || null;
};

export const getDoctorById = (id: string): Doctor | null => {
  const doctors = getDoctors();
  return doctors.find(d => d.id === id) || null;
};

export const getSessionsByChildId = (childId: string): Session[] => {
  const sessions = getSessions();
  return sessions.filter(s => s.child_id === childId);
};

export const getSessionsByDoctorId = (doctorId: string): Session[] => {
  const sessions = getSessions();
  return sessions.filter(s => s.doctor_id === doctorId);
};

// Stats
export const getStats = () => {
  const children = getChildren();
  const doctors = getDoctors();
  const sessions = getSessions();
  const today = new Date().toISOString().split('T')[0];
  
  return {
    totalChildren: children.length,
    totalDoctors: doctors.length,
    sessionsToday: sessions.filter(s => s.date === today).length,
    totalSessions: sessions.length,
  };
};
