-- Create language_development table
CREATE TABLE IF NOT EXISTS language_development (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  age TEXT NOT NULL, -- Age in months (e.g., "24", "36")
  answers JSONB NOT NULL DEFAULT '{}', -- Stores all answers as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_language_development_child ON language_development(child_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_language_development_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_language_development_updated_at
  BEFORE UPDATE ON language_development
  FOR EACH ROW
  EXECUTE FUNCTION update_language_development_updated_at();

-- Verify table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'language_development'
ORDER BY ordinal_position;
