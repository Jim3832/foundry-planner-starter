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
alter table public.plans enable row level security;
drop policy if exists "Public read plans" on public.plans;
revoke all on table public.plans from anon, authenticated;
-- All access is handled by server-side API routes using the service role.
