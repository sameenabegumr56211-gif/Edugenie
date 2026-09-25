/*
# Create app_secrets table for storing the Gemini API key securely

1. New Tables
- `app_secrets`
  - `id` (uuid, primary key)
  - `key_name` (text, unique, not null) — e.g. "GEMINI_API_KEY"
  - `key_value` (text, not null) — the actual secret value
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `app_secrets`.
- NO policies are created — this means anon and authenticated roles CANNOT read or write.
  Only the service role (used by edge functions) can access this table, because the
  service role bypasses RLS entirely.
- This keeps the Gemini API key invisible to the browser/frontend.

3. Notes
- The edge function reads the Gemini API key from this table using the service role key.
- The frontend never touches this table.
*/

CREATE TABLE IF NOT EXISTS app_secrets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_name text UNIQUE NOT NULL,
  key_value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE app_secrets ENABLE ROW LEVEL SECURITY;

INSERT INTO app_secrets (key_name, key_value)
VALUES ('GEMINI_API_KEY', 'AQ.Ab8RN6LopuAMTZ0k5sMYPyawFh1MzNHfaRzfpN9O6OODQvPiVQ')
ON CONFLICT (key_name) DO UPDATE SET key_value = EXCLUDED.key_value;
