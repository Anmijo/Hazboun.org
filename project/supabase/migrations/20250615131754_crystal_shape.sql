/*
  # Fix RLS Policy for Anonymous Users

  1. Security Changes
    - Update INSERT policy to allow anonymous users to add family members
    - Keep existing SELECT policy for public read access
    - Keep existing UPDATE policy for authenticated users only
  
  2. Rationale
    - The application is designed as a family tree management system
    - Currently uses anonymous access without authentication
    - Need to allow anonymous users to add family members through the admin panel
*/

-- Drop the existing INSERT policy that requires authentication
DROP POLICY IF EXISTS "Allow authenticated insert" ON family_members;

-- Create a new INSERT policy that allows anonymous users
CREATE POLICY "Allow anonymous insert"
  ON family_members
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert (for future use)
CREATE POLICY "Allow authenticated insert"
  ON family_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);