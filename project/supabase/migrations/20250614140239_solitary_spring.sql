/*
  # Create family members table

  1. New Tables
    - `family_members`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `birth_year` (integer, optional)
      - `location` (text, required)
      - `country` (text, required)
      - `email` (text, optional)
      - `phone` (text, optional)
      - `profession` (text, optional)
      - `branch` (text, required)
      - `generation` (integer, required)
      - `parents` (text array, optional)
      - `bio` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `family_members` table
    - Add policy for public read access (family website)
    - Add policy for authenticated users to insert/update
*/

CREATE TABLE IF NOT EXISTS family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birth_year integer,
  location text NOT NULL,
  country text NOT NULL,
  email text,
  phone text,
  profession text,
  branch text NOT NULL,
  generation integer NOT NULL,
  parents text[],
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access for the family website
CREATE POLICY "Allow public read access"
  ON family_members
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert new family members
CREATE POLICY "Allow authenticated insert"
  ON family_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update family members
CREATE POLICY "Allow authenticated update"
  ON family_members
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_family_members_updated_at
  BEFORE UPDATE ON family_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();