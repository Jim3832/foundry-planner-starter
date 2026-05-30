create extension if not exists pgcrypto;
create table if not exists plans (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Foundry Plan',
  player_input text not null default '',
  plan_json jsonb not null default '{}'::jsonb,
  settings_json jsonb not null default '{}'::jsonb,
  edit_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table plans enable row level security;
drop policy if exists "Public read plans" on plans;
create policy "Public read plans" on plans for select using (true);
-- Inserts and updates are handled via Next.js API route using service role key.
