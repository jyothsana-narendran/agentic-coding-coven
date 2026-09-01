create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = timezone('utc', now()); return new; end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  headline text,
  location text,
  linkedin_url text,
  skills text[] not null default '{}',
  goals text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  mime_type text not null default 'application/pdf',
  file_size_bytes bigint,
  extracted_text text,
  processing_status text not null default 'uploaded' check (processing_status in ('uploaded','processing','completed','failed')),
  processing_error text,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists resumes_user_id_idx on public.resumes(user_id);
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger resumes_updated_at before update on public.resumes for each row execute function public.set_updated_at();
