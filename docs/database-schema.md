 # Database

The database is designed for Supabase/Postgres. Apply migrations in filename order through the Supabase SQL editor or CLI. The backend should use the service role only for trusted server-side processing; browser requests are protected by Row-Level Security.

## Tables

- `profiles`: user-owned career profile and onboarding state.
- `resumes`: original file metadata, extracted text, and processing state.
- `job_targets`: company websites, roles, and cached company analysis.
- `job_matches`: scored matches, strengths, gaps, and recommendations.
- `recommendations`: AI suggestions awaiting human approval.
- `interviews`: uploaded media, transcripts, and interview coaching feedback.
- `career_profiles`: structured output from the Career Profile agent, including evidence-bearing JSON sections.
- `target_profiles`: structured output from the Job Profile agent, linked one-to-one with a job target.

All user-owned records include `user_id` except `profiles`, where the primary key is the authenticated user ID. Timestamps are UTC and `updated_at` is maintained by a database trigger.

Migration `007_create_agent_outputs.sql` stores the complete agent schemas without flattening nested evidence. `career_profiles` stores education, skills, experience, projects, achievements, and certifications. `target_profiles` stores responsibilities, required/preferred skills, soft skills, requirements, keywords, and signals.

## Storage

Private buckets are created by migration `006_storage_and_rls.sql`: `resumes`, `interviews`, and `profile-assets`. Store files under `{user_id}/{file_name}` so the storage policy can enforce ownership.

## Local setup

1. Create a Supabase project.
2. Apply `database/migrations/001_*.sql` through `006_*.sql` in order.
3. Create `demo@example.com` in Supabase Auth if seed data is wanted.
4. Run `database/seed.sql`.
