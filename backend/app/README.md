# Backend application modules

The FastAPI application is organized into API routes and services:

- `api/profile.py`: profile and resume workflows
- `api/jobs.py`: target companies and job matching
- `api/recommendations.py`: personal-brand and resume recommendations
- `api/interviews.py`: interview media, transcripts, and feedback
- `services/storage.py`: Supabase Storage integration
- `services/transcription.py`: speech-to-text integration
- `services/ai_service.py`: LangGraph integration

Routes should stay thin: authenticate and validate input, call a service, and return a persisted database record. User ownership is enforced both in the service layer and by Supabase Row-Level Security.
