from fastapi import APIRouter, Depends, HTTPException
from ..dependencies import current_user_id
from ..schemas import JobTargetCreate
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
