-- Structured persistence for Career Profile and Job Profile agent outputs.
create table if not exists public.career_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resume_id uuid references public.resumes(id) on delete set null,
  candidate_name text not null,
  summary text not null default '',
  education jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  experience jsonb not null default '[]'::jsonb,
  projects jsonb not null default '[]'::jsonb,
  achievements jsonb not null default '[]'::jsonb,
  certifications jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.target_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_target_id uuid not null unique references public.job_targets(id) on delete cascade,
  company text not null,
  role text not null,
  seniority text,
  responsibilities jsonb not null default '[]'::jsonb,
  required_skills jsonb not null default '[]'::jsonb,
  preferred_skills jsonb not null default '[]'::jsonb,
  soft_skills jsonb not null default '[]'::jsonb,
  experience_requirements jsonb not null default '[]'::jsonb,
  education_requirements jsonb not null default '[]'::jsonb,
  keywords jsonb not null default '[]'::jsonb,
  signals jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists career_profiles_user_id_idx on public.career_profiles(user_id);
create index if not exists target_profiles_user_id_idx on public.target_profiles(user_id);
drop trigger if exists career_profiles_updated_at on public.career_profiles;
create trigger career_profiles_updated_at before update on public.career_profiles for each row execute function public.set_updated_at();
drop trigger if exists target_profiles_updated_at on public.target_profiles;
create trigger target_profiles_updated_at before update on public.target_profiles for each row execute function public.set_updated_at();

alter table public.career_profiles enable row level security;
alter table public.target_profiles enable row level security;
drop policy if exists career_profiles_user_access on public.career_profiles;
create policy career_profiles_user_access on public.career_profiles for all using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists target_profiles_user_access on public.target_profiles;
create policy target_profiles_user_access on public.target_profiles for all using (user_id = auth.uid()) with check (user_id = auth.uid());
