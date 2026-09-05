from fastapi import HTTPException
from ..config import get_settings

def _llm():
    settings = get_settings()
    if settings.aws_access_key_id and settings.aws_secret_access_key:
        try:
            from langchain_aws import ChatBedrockConverse
        except ImportError as exc:
            raise HTTPException(503, 'Install langchain-aws to use Amazon Bedrock') from exc
        credentials = {
            'aws_access_key_id': settings.aws_access_key_id,
            'aws_secret_access_key': settings.aws_secret_access_key,
            'region_name': settings.aws_region,
        }
        if settings.aws_session_token:
            credentials['aws_session_token'] = settings.aws_session_token
        return ChatBedrockConverse(model=settings.bedrock_model_id, temperature=0.2, **credentials)
    raise HTTPException(503, 'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are not configured')

async def analyze_resume(text: str, target_context: dict | None = None) -> dict:
    # The career-profile graph returns the complete structured profile.
    from ai.agents.career_profile import create_career_profile_agent
    result = await create_career_profile_agent(_llm()).ainvoke({'candidate_id': 'backend-request', 'resume_text': text})
    if result.get('error'): raise HTTPException(502, result['error'])
    return result['career_profile'].model_dump() if hasattr(result['career_profile'], 'model_dump') else result['career_profile']

async def analyze_job_profile(job_description: str) -> dict:
    from ai.agents.job_profile import create_job_profile_agent
    result = await create_job_profile_agent(_llm()).ainvoke({'job_description': job_description})
    if result.get('error'): raise HTTPException(502, result['error'])
    output = result.get('target_profile')
    if output is None: raise HTTPException(502, 'Job Profile agent returned no result')
    return output.model_dump() if hasattr(output, 'model_dump') else output

async def analyze_career_profile(resume_text: str, linkedin_text: str = '') -> dict:
    from ai.agents.career_profile import create_career_profile_agent
    result = await create_career_profile_agent(_llm()).ainvoke({'candidate_id': 'backend-request', 'resume_text': resume_text, 'linkedin_text': linkedin_text})
    if result.get('error'): raise HTTPException(502, result['error'])
    output = result.get('career_profile')
    if output is None: raise HTTPException(502, 'Career Profile agent returned no result')
    return output.model_dump() if hasattr(output, 'model_dump') else output

async def analyze_job_match(career_profile: dict, target_profile: dict) -> dict:
    from ai.agents.job_match import create_job_match_agent
    result = await create_job_match_agent(_llm()).ainvoke({'career_profile': career_profile, 'target_profile': target_profile})
    if result.get('error'): raise HTTPException(502, result['error'])
    return result['result'].model_dump()

async def build_personal_brand(career_profile: dict, target_profile: dict) -> dict:
    from ai.agents.personal_brand import create_personal_brand_agent
    result = await create_personal_brand_agent(_llm()).ainvoke({'career_profile': career_profile, 'target_profile': target_profile})
    if result.get('error'): raise HTTPException(502, result['error'])
    return result['result'].model_dump()

async def run_career_pipeline(candidate_id: str, resume_text: str, linkedin_text: str, job_description: str) -> dict:
    from ai.graphs.career_pipeline import create_career_pipeline
    result = await create_career_pipeline(_llm()).ainvoke({'candidate_id': candidate_id, 'resume_text': resume_text, 'linkedin_text': linkedin_text, 'job_description': job_description})
    if result.get('error'): raise HTTPException(502, result['error'])
    required = ('career_profile', 'target_profile', 'job_match', 'recommendations')
    missing = [key for key in required if key not in result]
    if missing: raise HTTPException(502, f'Career pipeline did not produce: {", ".join(missing)}')
    return result

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
