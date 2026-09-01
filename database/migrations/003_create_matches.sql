create table if not exists public.job_matches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_target_id uuid references public.job_targets(id) on delete cascade,
  match_score numeric(5,2) check (match_score between 0 and 100),
  strengths jsonb not null default '[]'::jsonb,
  skill_gaps jsonb not null default '[]'::jsonb,
  recommendations jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists job_matches_user_id_idx on public.job_matches(user_id);
