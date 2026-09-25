/*
# Revoke public access to app_secrets table

1. Security Changes
- Revoke all privileges (SELECT, INSERT, UPDATE, DELETE) from the `anon` and `authenticated` roles on the `app_secrets` table.
- RLS is already enabled with NO policies, so anon/authenticated already cannot read any rows.
- This migration removes the column-level grants as well, providing defense-in-depth.
- The service role (used by the edge function) bypasses RLS and retains full access.

2. Why
- The app_secrets table stores the Gemini API key.
- The frontend uses the anon key, so it must never be able to query this table — not even column metadata.
- Only the edge function (using the service role key) should be able to read the key.
*/

REVOKE ALL ON app_secrets FROM anon;
REVOKE ALL ON app_secrets FROM authenticated;
