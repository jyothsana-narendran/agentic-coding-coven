# Backend API contracts

All protected routes require `Authorization: Bearer <supabase-access-token>`.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/health` | Service health check |
| GET/PATCH | `/profile` | Read or update the authenticated profile |
| POST | `/resumes` | Upload a PDF and create a resume record |
| GET | `/resumes/{id}` | Read resume extraction status and text |
| POST | `/resumes/{id}/analyze` | Start resume and personal-brand analysis |
| POST | `/job-targets` | Add a company website and target role |
| GET | `/job-targets/{id}` | Read company analysis status |
| POST | `/job-matches` | Generate and save a job match |
| GET | `/recommendations` | List recommendations for approval |
| PATCH | `/recommendations/{id}` | Approve, dismiss, or apply a recommendation |
| POST | `/interviews` | Create an interview media upload |
| GET | `/interviews/{id}` | Read transcript and coaching status |

Create operations return `201`. Long-running operations return `202` with a persisted record containing `id` and `status`. Invalid input returns `422`; missing records return `404`; unauthenticated requests return `401`.

Resume uploads accept `application/pdf`. Interview uploads accept supported audio/video types. Files remain in private Supabase Storage buckets; the API returns record IDs rather than public URLs.
