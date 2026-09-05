from fastapi import APIRouter, Depends, HTTPException
from ..dependencies import current_user_id
from ..schemas import JobMatchRequest, JobProfileAnalyzeRequest, JobTargetCreate, PersonalBrandRequest
from ..services.ai_service import analyze_job_match, analyze_job_profile, build_personal_brand, save_target_profile
from services.repository import repository
router = APIRouter(prefix='/job-targets', tags=['jobs'])
@router.post('', status_code=201)
async def create_target(payload: JobTargetCreate, user_id: str = Depends(current_user_id)):
    return repository.create('job_target', user_id, payload.model_dump(mode='json'), 'pending')
@router.get('/{record_id}')
async def get_target(record_id: str, user_id: str = Depends(current_user_id)):
    record = repository.get(record_id, user_id)
    if not record: raise HTTPException(404, 'Job target not found')
    return record

@router.post('/{record_id}/analyze', status_code=201)
async def analyze_target(record_id: str, payload: JobProfileAnalyzeRequest | None = None, user_id: str = Depends(current_user_id)):
    target = repository.get(record_id, user_id)
    if not target: raise HTTPException(404, 'Job target not found')
    description = (payload.job_description if payload else None) or target.get('job_description')
    if not description: raise HTTPException(422, 'A job description is required')
    target['status'] = 'processing'
    profile = await analyze_job_profile(description)
    saved = await save_target_profile(user_id, profile, record_id)
    target['status'] = 'completed'
    target['target_profile_id'] = saved['id']
    return {'job_target': target, 'target_profile': saved}

@router.post('/match')
async def match_job(payload: JobMatchRequest, user_id: str = Depends(current_user_id)):
    result = await analyze_job_match(payload.career_profile, payload.target_profile)
    return repository.create('job_match', user_id, {'output': result}, 'completed')

@router.post('/personal-brand')
async def personal_brand(payload: PersonalBrandRequest, user_id: str = Depends(current_user_id)):
    result = await build_personal_brand(payload.career_profile, payload.target_profile)
    return repository.create('recommendation', user_id, {'category': 'personal_brand', 'content': result, 'recommendation_data': result}, 'pending')
