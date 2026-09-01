from fastapi import APIRouter, Depends, File, UploadFile
from ..dependencies import current_user_id
from ..services.storage import save_upload
from backend.services.repository import repository
router = APIRouter(prefix='/interviews', tags=['interviews'])
@router.post('', status_code=201)
async def create_interview(file: UploadFile = File(...), user_id: str = Depends(current_user_id)):
    stored = await save_upload(file, user_id, 'interviews')
    return repository.create('interview', user_id, {'file': stored}, 'uploaded')
