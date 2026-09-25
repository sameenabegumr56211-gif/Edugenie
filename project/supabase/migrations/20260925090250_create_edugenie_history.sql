/*
# Create edugenie_history table (single-tenant, no auth)

1. New Tables
- `edugenie_history`
  - `id` (uuid, primary key)
  - `task_type` (text, not null) — which learning feature was used: explain, qa, quiz, summarize, path
  - `user_input` (text, not null) — the prompt or passage the student entered
  - `response` (jsonb, not null) — the full AI response object returned by the edge function
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `edugenie_history`.
- This is a single-tenant app with no sign-in screen, so anon + authenticated can CRUD all rows.
  The data is intentionally shared/public for this learning tool.
- Four separate policies (SELECT / INSERT / UPDATE / DELETE), all `TO anon, authenticated`.

3. Notes
- The edge function inserts rows using the service role key (bypasses RLS).
- The frontend can read history via the anon key to display past sessions.
*/

CREATE TABLE IF NOT EXISTS edugenie_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type text NOT NULL,
  user_input text NOT NULL,
  response jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE edugenie_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_history" ON edugenie_history;
CREATE POLICY "anon_select_history" ON edugenie_history FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_history" ON edugenie_history;
CREATE POLICY "anon_insert_history" ON edugenie_history FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_history" ON edugenie_history;
CREATE POLICY "anon_update_history" ON edugenie_history FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_history" ON edugenie_history;
CREATE POLICY "anon_delete_history" ON edugenie_history FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_edugenie_history_created_at ON edugenie_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_edugenie_history_task_type ON edugenie_history(task_type);
