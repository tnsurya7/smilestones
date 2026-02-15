-- Smilestones Database Schema for Neon PostgreSQL
-- Run this in Neon SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'sub_doctor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'sub_doctor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Children table
CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 0 AND age <= 18),
  diagnosis TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  assigned_doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  attendance BOOLEAN NOT NULL DEFAULT false,
  eye_contact BOOLEAN DEFAULT false,
  follow_instructions BOOLEAN DEFAULT false,
  speech_attempt BOOLEAN DEFAULT false,
  motor_improvement BOOLEAN DEFAULT false,
  skill_level TEXT CHECK (skill_level IN ('poor', 'average', 'good', 'excellent')),
  activities TEXT[] DEFAULT '{}',
  notes TEXT,
  next_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}',
  status TEXT CHECK (status IN ('draft', 'completed')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parent appointments table (from public booking)
CREATE TABLE IF NOT EXISTS parent_appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parent payments table (from public registration)
CREATE TABLE IF NOT EXISTS parent_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  therapies JSONB NOT NULL,
  payment_mode TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  unique_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('online', 'parent_training', 'free_resources', 'weekly')),
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Therapy registrations table
CREATE TABLE IF NOT EXISTS therapy_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  therapy_types TEXT[] NOT NULL,
  payment_mode TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EMR (Electronic Medical Records) table
CREATE TABLE IF NOT EXISTS emr (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  session_feedbacks JSONB DEFAULT '{}',
  overall_progress TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parent updates table
CREATE TABLE IF NOT EXISTS parent_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  achievements TEXT[] DEFAULT '{}',
  motivational_messages TEXT[] DEFAULT '{}',
  video_links TEXT[] DEFAULT '{}',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_children_assigned_doctor ON children(assigned_doctor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_child ON sessions(child_id);
CREATE INDEX IF NOT EXISTS idx_sessions_doctor ON sessions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date);
CREATE INDEX IF NOT EXISTS idx_assessments_child ON assessments(child_id);
CREATE INDEX IF NOT EXISTS idx_parent_appointments_date ON parent_appointments(date);
CREATE INDEX IF NOT EXISTS idx_parent_payments_unique_code ON parent_payments(unique_code);
CREATE INDEX IF NOT EXISTS idx_emr_child ON emr(child_id);
CREATE INDEX IF NOT EXISTS idx_parent_updates_child ON parent_updates(child_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default super admin user
INSERT INTO users (email, username, password_hash, name, role)
VALUES (
  'admin@smilestones.com',
  'smilestones',
  'child@777',
  'Super Admin',
  'super_admin'
) ON CONFLICT (username) DO NOTHING;

-- Also insert into doctors table for compatibility
INSERT INTO doctors (name, email, username, password, role)
VALUES (
  'Super Admin',
  'admin@smilestones.com',
  'smilestones',
  'child@777',
  'super_admin'
) ON CONFLICT (username) DO NOTHING;

-- Success message
SELECT 'Database schema created successfully!' as message;
