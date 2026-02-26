-- Create gross_motor_skills table
CREATE TABLE IF NOT EXISTS gross_motor_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  age TEXT NOT NULL, -- Age in months (e.g., "24", "36")
  answers JSONB NOT NULL DEFAULT '{}', -- Stores all answers as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_gross_motor_skills_child ON gross_motor_skills(child_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_gross_motor_skills_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gross_motor_skills_updated_at
  BEFORE UPDATE ON gross_motor_skills
  FOR EACH ROW
  EXECUTE FUNCTION update_gross_motor_skills_updated_at();

-- Verify table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gross_motor_skills'
ORDER BY ordinal_position;
