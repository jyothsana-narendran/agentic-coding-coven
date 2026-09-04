from fastapi import APIRouter, Depends, File, UploadFile
from ..dependencies import current_user_id
from ..services.storage import save_upload
from ..services.ai_service import coach_interview
from ..schemas import InterviewCoachRequest
from services.repository import repository
router = APIRouter(prefix='/interviews', tags=['interviews'])
@router.post('', status_code=201)
async def create_interview(file: UploadFile = File(...), user_id: str = Depends(current_user_id)):
    stored = await save_upload(file, user_id, 'interviews')
    return repository.create('interview', user_id, {'file': stored}, 'uploaded')

@router.post('/coach')
async def coach(payload: InterviewCoachRequest, user_id: str = Depends(current_user_id)):
    feedback = await coach_interview(payload.question, payload.answer, payload.job_context)
    return repository.create('recommendation', user_id, {'category': 'interview', 'content': feedback}, 'completed')
