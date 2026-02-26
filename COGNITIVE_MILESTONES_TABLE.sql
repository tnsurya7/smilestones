-- Create cognitive_milestones table
CREATE TABLE IF NOT EXISTS cognitive_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  age TEXT NOT NULL, -- Age in months (e.g., "24", "36")
  answers JSONB NOT NULL DEFAULT '{}', -- Stores all answers as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cognitive_milestones_child ON cognitive_milestones(child_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cognitive_milestones_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cognitive_milestones_updated_at
  BEFORE UPDATE ON cognitive_milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_cognitive_milestones_updated_at();

-- Verify table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cognitive_milestones'
ORDER BY ordinal_position;
