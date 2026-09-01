from fastapi import APIRouter, Depends, HTTPException
from ..dependencies import current_user_id
from ..schemas import RecommendationUpdate
from backend.services.repository import repository
router = APIRouter(prefix='/recommendations', tags=['recommendations'])
@router.get('')
async def list_recommendations(user_id: str = Depends(current_user_id)):
    return [r for r in repository.records.values() if r['user_id'] == user_id and r['kind'] == 'recommendation']
@router.patch('/{record_id}')
async def update_recommendation(record_id: str, payload: RecommendationUpdate, user_id: str = Depends(current_user_id)):
    record = repository.get(record_id, user_id)
    if not record or record['kind'] != 'recommendation': raise HTTPException(404, 'Recommendation not found')
    record['status'] = payload.status; return record
