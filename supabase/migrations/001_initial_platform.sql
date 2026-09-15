create extension if not exists pgcrypto;

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  difficulty text not null check (difficulty in ('beginner','intermediate','advanced')),
  scenario_config jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  score numeric(5,2) not null check (score >= 0 and score <= 100),
  architecture_json jsonb not null default '{}'::jsonb,
  metrics_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  completed boolean not null default false,
  best_score numeric(5,2) check (best_score >= 0 and best_score <= 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, challenge_id)
);

alter table public.challenges enable row level security;
alter table public.attempts enable row level security;
alter table public.progress enable row level security;

create policy "published challenges are public"
on public.challenges for select
using (is_published = true);

create policy "users read own attempts"
on public.attempts for select
using (auth.uid() = user_id);

create policy "users read own progress"
on public.progress for select
using (auth.uid() = user_id);

create index if not exists attempts_user_id_created_at_idx
on public.attempts(user_id, created_at desc);

create index if not exists attempts_challenge_id_idx
on public.attempts(challenge_id);
