-- Migration: Add appointments table
-- Run this in Neon SQL Editor if you haven't created the appointments table yet

-- Create appointments table (admin created appointments)
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);

-- Create index for therapy registrations referral code
CREATE INDEX IF NOT EXISTS idx_therapy_registrations_code ON therapy_registrations(referral_code);

-- Success message
SELECT 'Migration completed successfully! Appointments table created.' as message;
