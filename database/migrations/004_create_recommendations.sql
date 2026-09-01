create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('resume','linkedin','personal_brand','social_media','interview','skills')),
  title text not null,
  content text not null,
  evidence jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','approved','dismissed','applied')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists recommendations_user_id_idx on public.recommendations(user_id);
create trigger recommendations_updated_at before update on public.recommendations for each row execute function public.set_updated_at();
