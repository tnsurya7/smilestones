-- Social-Emotional Assessment Table
CREATE TABLE IF NOT EXISTS social_emotional (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  age VARCHAR(10) NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_social_emotional_child_id ON social_emotional(child_id);

-- Add comment
COMMENT ON TABLE social_emotional IS 'Stores social-emotional development assessment data for children';
