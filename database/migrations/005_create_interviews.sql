create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_target_id uuid references public.job_targets(id) on delete set null,
  media_path text,
  media_type text check (media_type in ('audio','video')),
  question text,
  transcript text,
  transcript_metadata jsonb not null default '{}'::jsonb,
  feedback jsonb not null default '{}'::jsonb,
  status text not null default 'uploaded' check (status in ('uploaded','transcribing','coaching','completed','failed')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists interviews_user_id_idx on public.interviews(user_id);
create trigger interviews_updated_at before update on public.interviews for each row execute function public.set_updated_at();
