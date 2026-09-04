async def analyze_resume(text: str, target_context: dict | None = None) -> dict:
    return {'summary': 'Analysis pending AI configuration.', 'strengths': [], 'gaps': [], 'recommendations': [], 'target_context': target_context or {}}

async def coach_interview(transcript: str) -> dict:
    return {'overall_score': None, 'strengths': [], 'improvements': [], 'sample_answer': None, 'transcript': transcript}

async def save_career_profile(user_id: str, profile: dict, resume_id: str | None = None) -> dict:
    from services.repository import repository
    return repository.save_agent_output('career_profile', user_id, profile, resume_id)

async def save_target_profile(user_id: str, profile: dict, job_target_id: str) -> dict:
    from services.repository import repository
    return repository.save_agent_output('target_profile', user_id, profile, job_target_id)
