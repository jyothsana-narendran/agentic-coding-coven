create table if not exists public.job_targets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text not null,
  website_url text not null,
  role_title text,
  job_description text,
  company_context jsonb not null default '{}'::jsonb,
  analysis_status text not null default 'pending' check (analysis_status in ('pending','processing','completed','failed')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists job_targets_user_id_idx on public.job_targets(user_id);
create trigger job_targets_updated_at before update on public.job_targets for each row execute function public.set_updated_at();
