-- Migration: Add clinical modules tables
-- Run this in Neon SQL Editor

-- Case Sheet table
CREATE TABLE IF NOT EXISTS case_sheets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}',
  uhid TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- M-CHAT Screening table
CREATE TABLE IF NOT EXISTS mchat_screenings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}',
  total_score INTEGER,
  risk_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DSM Checklist table
CREATE TABLE IF NOT EXISTS dsm_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}',
  a_criteria_count INTEGER,
  b_criteria_count INTEGER,
  c_criteria BOOLEAN,
  d_criteria BOOLEAN,
  meets_criteria BOOLEAN,
  interpretation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_case_sheets_child ON case_sheets(child_id);
CREATE INDEX IF NOT EXISTS idx_mchat_child ON mchat_screenings(child_id);
CREATE INDEX IF NOT EXISTS idx_dsm_child ON dsm_checklists(child_id);
CREATE INDEX IF NOT EXISTS idx_case_sheets_uhid ON case_sheets(uhid);

-- Create triggers for updated_at
CREATE TRIGGER update_case_sheets_updated_at BEFORE UPDATE ON case_sheets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mchat_updated_at BEFORE UPDATE ON mchat_screenings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dsm_updated_at BEFORE UPDATE ON dsm_checklists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Clinical modules tables created successfully!' as message;
