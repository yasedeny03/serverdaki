/*
  # Gallery Schema Setup

  1. Tables
    - `albums`: Store album information
    - `images`: Store image metadata and storage paths
    - `settings`: Store application settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create tables
CREATE TABLE IF NOT EXISTS albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id uuid REFERENCES albums(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  storage_path text NOT NULL,
  thumbnail_path text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    -- Albums policies
    DROP POLICY IF EXISTS "Albums are viewable by authenticated users" ON albums;
    DROP POLICY IF EXISTS "Albums are insertable by authenticated users" ON albums;
    DROP POLICY IF EXISTS "Albums are updatable by authenticated users" ON albums;
    DROP POLICY IF EXISTS "Albums are deletable by authenticated users" ON albums;
    
    -- Images policies
    DROP POLICY IF EXISTS "Images are viewable by authenticated users" ON images;
    DROP POLICY IF EXISTS "Images are insertable by authenticated users" ON images;
    DROP POLICY IF EXISTS "Images are updatable by authenticated users" ON images;
    DROP POLICY IF EXISTS "Images are deletable by authenticated users" ON images;
    
    -- Settings policies
    DROP POLICY IF EXISTS "Settings are viewable by authenticated users" ON settings;
    DROP POLICY IF EXISTS "Settings are modifiable by authenticated users" ON settings;
END $$;

-- Create new policies
-- Albums
CREATE POLICY "Albums are viewable by authenticated users"
  ON albums FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Albums are insertable by authenticated users"
  ON albums FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Albums are updatable by authenticated users"
  ON albums FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Albums are deletable by authenticated users"
  ON albums FOR DELETE
  TO authenticated
  USING (true);

-- Images
CREATE POLICY "Images are viewable by authenticated users"
  ON images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Images are insertable by authenticated users"
  ON images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Images are updatable by authenticated users"
  ON images FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Images are deletable by authenticated users"
  ON images FOR DELETE
  TO authenticated
  USING (true);

-- Settings
CREATE POLICY "Settings are viewable by authenticated users"
  ON settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Settings are modifiable by authenticated users"
  ON settings FOR ALL
  TO authenticated
  USING (true);

-- Insert default settings if they don't exist
INSERT INTO settings (key, value)
VALUES ('logo', '{"path": ""}')
ON CONFLICT (key) DO NOTHING;