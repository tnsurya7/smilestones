// Client-side API wrapper for database operations
import type { Doctor, Child, Session } from './neon/database';

// Re-export types for convenience
export type { Doctor, Child, Session };

// ==================== DOCTORS ====================

export async function getDoctors(): Promise<Doctor[]> {
  const response = await fetch('/api/doctors');
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return response.json();
}

export async function addDoctor(doctor: Omit<Doctor, 'id' | 'created_at'>): Promise<Doctor> {
  const response = await fetch('/api/doctors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctor),
  });
  if (!response.ok) throw new Error('Failed to add doctor');
  return response.json();
}

export async function updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor | null> {
  const response = await fetch('/api/doctors', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!response.ok) throw new Error('Failed to update doctor');
  return response.json();
}

export async function deleteDoctor(id: string): Promise<boolean> {
  const response = await fetch(`/api/doctors?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete doctor');
  const data = await response.json();
  return data.success;
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  const response = await fetch(`/api/doctors?id=${id}`);
  if (!response.ok) throw new Error('Failed to fetch doctor');
  return response.json();
}

// ==================== CHILDREN ====================

export async function getChildren(): Promise<Child[]> {
  const response = await fetch('/api/children');
  if (!response.ok) throw new Error('Failed to fetch children');
  return response.json();
}

export async function addChild(child: Omit<Child, 'id' | 'created_at'>): Promise<Child> {
  const response = await fetch('/api/children', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(child),
  });
  if (!response.ok) throw new Error('Failed to add child');
  return response.json();
}

export async function updateChild(id: string, updates: Partial<Child>): Promise<Child | null> {
  const response = await fetch('/api/children', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!response.ok) throw new Error('Failed to update child');
  return response.json();
}

export async function deleteChild(id: string): Promise<boolean> {
  const response = await fetch(`/api/children?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete child');
  const data = await response.json();
  return data.success;
}

export async function getChildById(id: string): Promise<Child | null> {
  const response = await fetch(`/api/children?id=${id}`);
  if (!response.ok) throw new Error('Failed to fetch child');
  return response.json();
}

// ==================== SESSIONS ====================

export async function getSessions(): Promise<Session[]> {
  const response = await fetch('/api/sessions');
  if (!response.ok) throw new Error('Failed to fetch sessions');
  return response.json();
}

export async function addSession(session: Omit<Session, 'id' | 'created_at'>): Promise<Session> {
  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session),
  });
  if (!response.ok) throw new Error('Failed to add session');
  return response.json();
}

export async function updateSession(id: string, updates: Partial<Session>): Promise<Session | null> {
  const response = await fetch('/api/sessions', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
  if (!response.ok) throw new Error('Failed to update session');
  return response.json();
}

export async function deleteSession(id: string): Promise<boolean> {
  const response = await fetch(`/api/sessions?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete session');
  const data = await response.json();
  return data.success;
}

export async function getSessionsByChildId(childId: string): Promise<Session[]> {
  const response = await fetch(`/api/sessions?childId=${childId}`);
  if (!response.ok) throw new Error('Failed to fetch sessions');
  return response.json();
}

// ==================== STATS ====================

export async function getStats() {
  const response = await fetch('/api/stats');
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

// ==================== ASSESSMENTS ====================

export interface Assessment {
  id: string;
  child_id: string;
  data: any;
  status: 'draft' | 'completed';
  created_at: string;
  updated_at: string;
  child_name?: string;
}

export async function getAssessments(childId?: string): Promise<Assessment[]> {
  const url = childId ? `/api/assessments?child_id=${childId}` : '/api/assessments';
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch assessments');
  return response.json();
}

export async function addAssessment(assessment: { child_id: string; data: any; status?: 'draft' | 'completed' }): Promise<Assessment> {
  const response = await fetch('/api/assessments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assessment),
  });
  if (!response.ok) throw new Error('Failed to add assessment');
  return response.json();
}

export async function updateAssessment(id: string, data: any, status: 'draft' | 'completed'): Promise<Assessment> {
  const response = await fetch('/api/assessments', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, data, status }),
  });
  if (!response.ok) throw new Error('Failed to update assessment');
  return response.json();
}

export async function deleteAssessment(id: string): Promise<boolean> {
  const response = await fetch(`/api/assessments?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete assessment');
  const data = await response.json();
  return data.success;
}

// ==================== PARENT APPOINTMENTS ====================

export async function getParentAppointments() {
  const response = await fetch('/api/parent-appointments');
  if (!response.ok) throw new Error('Failed to fetch parent appointments');
  return response.json();
}

export async function addParentAppointment(appointment: { phone: string; date: string; time: string; service: string }) {
  const response = await fetch('/api/parent-appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) throw new Error('Failed to add parent appointment');
  return response.json();
}

// ==================== APPOINTMENTS ====================

export async function getAppointments() {
  const response = await fetch('/api/appointments');
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
}

export async function addAppointment(appointment: { phone: string; date: string; time: string; service: string }) {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) throw new Error('Failed to add appointment');
  return response.json();
}

// ==================== PARENT UPDATES ====================

export async function getParentUpdates(childId: string) {
  const response = await fetch(`/api/parent-updates?child_id=${childId}`);
  if (!response.ok) throw new Error('Failed to fetch parent updates');
  return response.json();
}

export async function saveParentUpdates(data: { child_id: string; achievements: string[]; motivational_messages: string[]; video_links: string[] }) {
  const response = await fetch('/api/parent-updates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to save parent updates');
  return response.json();
}

// ==================== PARENT PAYMENTS ====================

export async function getParentPayments() {
  const response = await fetch('/api/parent-payments');
  if (!response.ok) throw new Error('Failed to fetch parent payments');
  return response.json();
}

export async function addParentPayment(payment: { therapies: any; payment_mode: string; amount: number; unique_code: string }) {
  const response = await fetch('/api/parent-payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment),
  });
  if (!response.ok) throw new Error('Failed to add parent payment');
  return response.json();
}

// ==================== THERAPY REGISTRATIONS ====================

export async function getTherapyRegistrations() {
  const response = await fetch('/api/therapy-registrations');
  if (!response.ok) throw new Error('Failed to fetch therapy registrations');
  return response.json();
}

export async function addTherapyRegistration(registration: { child_name: string; parent_name: string; phone: string; email?: string; therapy_types: string[]; payment_mode: string; referral_code: string }) {
  const response = await fetch('/api/therapy-registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registration),
  });
  if (!response.ok) throw new Error('Failed to add therapy registration');
  return response.json();
}
