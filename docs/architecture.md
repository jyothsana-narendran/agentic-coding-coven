# Backend architecture

The existing runtime lives under `backend/app`. The React UI calls FastAPI routes, which validate the request and authenticated user before delegating to services.

`React UI -> FastAPI route -> auth/validation -> service -> Supabase or LangGraph -> persisted result`

Application responsibilities:

- `backend/app/api/profile.py`: profile and resume endpoints
- `backend/app/api/jobs.py`: company targets and job matching
- `backend/app/api/recommendations.py`: AI recommendations and approval state
- `backend/app/api/interviews.py`: media upload, transcription, and coaching
- `backend/app/services/storage.py`: private file storage
- `backend/app/services/transcription.py`: speech-to-text
- `backend/app/services/ai_service.py`: LangGraph orchestration

Long-running operations persist status transitions such as `uploaded -> processing -> completed` or `processing -> failed`. Errors should preserve the record and store a safe message.

Security requirements:

- Validate Supabase access tokens on protected routes.
- Never expose the service-role key to the frontend.
- Keep resume and interview buckets private.
- Store files under `{user_id}/{uuid}-{file_name}`.
- Treat company URLs and social-media content as untrusted input.
- Require human approval before applying or publishing AI recommendations.
