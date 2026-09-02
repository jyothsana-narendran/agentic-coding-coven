from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from ..dependencies import current_user_id
from ..schemas import ProfileUpdate
from ..services.storage import save_upload
from services.repository import repository

router = APIRouter(prefix='/profile', tags=['profile'])
@router.get('')
async def get_profile(user_id: str = Depends(current_user_id)):
    return repository.records.get(user_id, {'id': user_id, 'skills': [], 'onboarding_completed': False})
@router.patch('')
async def update_profile(payload: ProfileUpdate, user_id: str = Depends(current_user_id)):
    record = repository.records.setdefault(user_id, {'id': user_id, 'user_id': user_id})
    record.update(payload.model_dump(mode='json', exclude_none=True)); return record
@router.post('/resumes', status_code=201)
async def upload_resume(file: UploadFile = File(...), user_id: str = Depends(current_user_id)):
    if file.content_type != 'application/pdf': raise HTTPException(415, 'Only PDF resumes are supported')
    try: stored = await save_upload(file, user_id, 'resumes')
    except ValueError as exc: raise HTTPException(413, str(exc)) from exc
    return repository.create('resume', user_id, {'file': stored}, 'uploaded')
