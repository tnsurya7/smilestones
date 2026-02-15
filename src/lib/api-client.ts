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
