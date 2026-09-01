insert into storage.buckets (id, name, public) values
  ('resumes', 'resumes', false),
  ('interviews', 'interviews', false),
  ('profile-assets', 'profile-assets', false)
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.job_targets enable row level security;
alter table public.job_matches enable row level security;
alter table public.recommendations enable row level security;
alter table public.interviews enable row level security;

drop policy if exists profiles_user_access on public.profiles;
create policy profiles_user_access on public.profiles for all
using (id = auth.uid()) with check (id = auth.uid());

do $$ declare t text; begin
  foreach t in array array['resumes','job_targets','job_matches','recommendations','interviews'] loop
    execute format('drop policy if exists %I_user_access on public.%I', t, t);
    execute format('create policy %I_user_access on public.%I for all using (user_id = auth.uid()) with check (user_id = auth.uid())', t, t);
  end loop;
end $$;

drop policy if exists "user owns private files" on storage.objects;
create policy "user owns private files" on storage.objects for all
using (bucket_id in ('resumes','interviews','profile-assets') and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id in ('resumes','interviews','profile-assets') and (storage.foldername(name))[1] = auth.uid()::text);
