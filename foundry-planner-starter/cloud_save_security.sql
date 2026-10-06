-- Run once in the Supabase SQL editor. API routes use the server-only service role.
-- Removes direct anonymous access to edit keys through the table.
alter table public.plans enable row level security;
drop policy if exists "Public read plans" on public.plans;
revoke all on table public.plans from anon, authenticated;
