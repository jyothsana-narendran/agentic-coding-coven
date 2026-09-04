from fastapi import HTTPException
from ..config import get_settings

def _llm():
    settings = get_settings()
    if settings.groq_api_key:
        try:
            from langchain_groq import ChatGroq
        except ImportError as exc:
            raise HTTPException(503, 'Install langchain-groq to use GROQ_API_KEY') from exc
        return ChatGroq(model=settings.groq_model, api_key=settings.groq_api_key, temperature=0.2)
    raise HTTPException(503, 'GROQ_API_KEY is not configured')

async def analyze_resume(text: str, target_context: dict | None = None) -> dict:
    # The career-profile graph returns the complete structured profile.
    from ai.agents.career_profile import create_career_profile_agent
    result = await create_career_profile_agent(_llm()).ainvoke({'candidate_id': 'backend-request', 'resume_text': text})
    if result.get('error'): raise HTTPException(502, result['error'])
    return result['career_profile'].model_dump() if hasattr(result['career_profile'], 'model_dump') else result['career_profile']

async def coach_interview(question: str, answer: str, job_context: str = '') -> dict:
    from ai.agents.interview_coach import create_interview_coach_agent
    result = await create_interview_coach_agent(_llm()).ainvoke({'question': question, 'answer': answer, 'job_context': job_context})
    if result.get('error'): raise HTTPException(502, result['error'])
    output = result['result']
    return output.model_dump() if hasattr(output, 'model_dump') else output

async def save_career_profile(user_id: str, profile: dict, resume_id: str | None = None) -> dict:
    from services.repository import repository
    return repository.save_agent_output('career_profile', user_id, profile, resume_id)

async def save_target_profile(user_id: str, profile: dict, job_target_id: str) -> dict:
    from services.repository import repository
    return repository.save_agent_output('target_profile', user_id, profile, job_target_id)
