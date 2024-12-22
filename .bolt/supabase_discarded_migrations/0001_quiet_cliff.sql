/*
  # Gallery Schema Migration

  1. Tables
    - albums: Store album metadata
    - images: Store image metadata and file paths
    - users: Store user information
    - user_album_access: Manage album access permissions

  2. Security
    - Enable RLS on all tables
    - Add policies for viewing albums and images
*/

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  thumbnail_path TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  password TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_album_access (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, album_id)
);

-- Enable RLS
DO $$ 
BEGIN
  ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
  ALTER TABLE images ENABLE ROW LEVEL SECURITY;
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_album_access ENABLE ROW LEVEL SECURITY;
END $$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view their accessible albums" ON albums;
  DROP POLICY IF EXISTS "Users can view images from their albums" ON images;
END $$;

-- Create policies
CREATE POLICY "Users can view their accessible albums"
  ON albums FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM user_album_access WHERE album_id = id
    ) OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view images from their albums"
  ON images FOR SELECT
  USING (
    album_id IN (
      SELECT album_id FROM user_album_access 
      WHERE user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );