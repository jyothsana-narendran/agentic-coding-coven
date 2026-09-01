-- Demo data is created only when a matching auth user exists.
insert into public.profiles (id, full_name, headline, location, skills, goals, onboarding_completed)
select id, 'Demo Jobseeker', 'Early-career product-minded developer', 'Singapore',
       array['Python','React','Communication'], 'Find a software engineering role', true
from auth.users where email = 'demo@example.com'
on conflict (id) do nothing;
