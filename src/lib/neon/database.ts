import { sql } from './client';

// Types (same as localStorage.ts)
export interface Doctor {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
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

// ==================== DOCTORS ====================

export async function getDoctors(): Promise<Doctor[]> {
  const result = await sql`
    SELECT * FROM doctors 
    ORDER BY created_at DESC
  `;
  return result as Doctor[];
}

export async function addDoctor(doctor: Omit<Doctor, 'id' | 'created_at'>): Promise<Doctor> {
  const result = await sql`
    INSERT INTO doctors (name, email, username, password, role)
    VALUES (${doctor.name}, ${doctor.email}, ${doctor.username}, ${doctor.password}, ${doctor.role})
    RETURNING *
  `;
  return result[0] as Doctor;
}

export async function updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor | null> {
  const result = await sql`
    UPDATE doctors
    SET 
      name = COALESCE(${updates.name}, name),
      email = COALESCE(${updates.email}, email),
      username = COALESCE(${updates.username}, username),
      password = COALESCE(${updates.password}, password),
      role = COALESCE(${updates.role}, role)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as Doctor || null;
}

export async function deleteDoctor(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM doctors WHERE id = ${id}
    RETURNING id
  `;
  return result.length > 0;
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
  const result = await sql`
    SELECT * FROM doctors WHERE id = ${id}
  `;
  return result[0] as Doctor || null;
}

// ==================== CHILDREN ====================

export async function getChildren(): Promise<Child[]> {
  const result = await sql`
    SELECT * FROM children 
    ORDER BY created_at DESC
  `;
  return result as Child[];
}

export async function addChild(child: Omit<Child, 'id' | 'created_at'>): Promise<Child> {
  const result = await sql`
    INSERT INTO children (name, age, diagnosis, parent_name, phone, assigned_doctor_id)
    VALUES (${child.name}, ${child.age}, ${child.diagnosis}, ${child.parent_name}, ${child.phone}, ${child.assigned_doctor_id})
    RETURNING *
  `;
  return result[0] as Child;
}

export async function updateChild(id: string, updates: Partial<Child>): Promise<Child | null> {
  const result = await sql`
    UPDATE children
    SET 
      name = COALESCE(${updates.name}, name),
      age = COALESCE(${updates.age}, age),
      diagnosis = COALESCE(${updates.diagnosis}, diagnosis),
      parent_name = COALESCE(${updates.parent_name}, parent_name),
      phone = COALESCE(${updates.phone}, phone),
      assigned_doctor_id = COALESCE(${updates.assigned_doctor_id}, assigned_doctor_id)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as Child || null;
}

export async function deleteChild(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM children WHERE id = ${id}
    RETURNING id
  `;
  return result.length > 0;
}

export async function getChildById(id: string): Promise<Child | null> {
  const result = await sql`
    SELECT * FROM children WHERE id = ${id}
  `;
  return result[0] as Child || null;
}

// ==================== SESSIONS ====================

export async function getSessions(): Promise<Session[]> {
  const result = await sql`
    SELECT * FROM sessions 
    ORDER BY date DESC, created_at DESC
  `;
  return result as Session[];
}

export async function addSession(session: Omit<Session, 'id' | 'created_at'>): Promise<Session> {
  const result = await sql`
    INSERT INTO sessions (
      child_id, doctor_id, date, attendance, eye_contact, 
      follow_instructions, speech_attempt, motor_improvement, 
      skill_level, activities, notes, next_goal
    )
    VALUES (
      ${session.child_id}, ${session.doctor_id}, ${session.date}, ${session.attendance},
      ${session.eye_contact}, ${session.follow_instructions}, ${session.speech_attempt},
      ${session.motor_improvement}, ${session.skill_level}, ${session.activities},
      ${session.notes}, ${session.next_goal}
    )
    RETURNING *
  `;
  return result[0] as Session;
}

export async function getSessionsByChildId(childId: string): Promise<Session[]> {
  const result = await sql`
    SELECT * FROM sessions 
    WHERE child_id = ${childId}
    ORDER BY date DESC
  `;
  return result as Session[];
}

// ==================== PARENT APPOINTMENTS ====================

export async function getParentAppointments() {
  const result = await sql`
    SELECT * FROM parent_appointments 
    ORDER BY created_at DESC
  `;
  return result;
}

export async function addParentAppointment(appointment: any) {
  const result = await sql`
    INSERT INTO parent_appointments (phone, date, time, service)
    VALUES (${appointment.phone}, ${appointment.date}, ${appointment.time}, ${appointment.service})
    RETURNING *
  `;
  return result[0];
}

// ==================== PARENT PAYMENTS ====================

export async function getParentPayments() {
  const result = await sql`
    SELECT * FROM parent_payments 
    ORDER BY created_at DESC
  `;
  return result;
}

export async function addParentPayment(payment: any) {
  const result = await sql`
    INSERT INTO parent_payments (therapies, payment_mode, amount, unique_code)
    VALUES (${JSON.stringify(payment.therapies)}, ${payment.paymentMode}, ${payment.amount}, ${payment.uniqueCode})
    RETURNING *
  `;
  return result[0];
}

// ==================== STATS ====================

export async function getStats() {
  const [childrenCount, doctorsCount, sessionsCount, todaySessions] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM children`,
    sql`SELECT COUNT(*) as count FROM doctors`,
    sql`SELECT COUNT(*) as count FROM sessions`,
    sql`SELECT COUNT(*) as count FROM sessions WHERE date = CURRENT_DATE`
  ]);

  return {
    totalChildren: Number(childrenCount[0].count),
    totalDoctors: Number(doctorsCount[0].count),
    totalSessions: Number(sessionsCount[0].count),
    sessionsToday: Number(todaySessions[0].count)
  };
}
