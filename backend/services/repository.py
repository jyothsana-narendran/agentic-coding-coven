from typing import Any
from uuid import uuid4
import httpx
from app.config import get_settings

class Repository:
    """Development persistence boundary; replace with Supabase calls in production."""
    def __init__(self) -> None:
        self.records: dict[str, dict[str, Any]] = {}
    def create(self, kind: str, user_id: str, data: dict[str, Any], status: str = 'pending') -> dict[str, Any]:
        record = {'id': str(uuid4()), 'kind': kind, 'user_id': user_id, 'status': status, **data}
        self.records[record['id']] = record
        return record
    def get(self, record_id: str, user_id: str) -> dict[str, Any] | None:
        record = self.records.get(record_id)
        return record if record and record['user_id'] == user_id else None

    def save_agent_output(self, kind: str, user_id: str, output: dict[str, Any], source_id: str | None = None) -> dict[str, Any]:
        """Persist a complete validated agent payload while Supabase integration is wired in."""
        data = {'output': output}
        if source_id:
            data['source_id'] = source_id
        return self.create(kind, user_id, data, 'completed')

repository = Repository()

async def supabase_insert(table: str, payload: dict[str, Any]) -> dict[str, Any]:
    """Insert one record through Supabase REST using the server-only key."""
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError('Supabase server credentials are not configured')
    headers = {
        'apikey': settings.supabase_service_role_key,
        'Authorization': f'Bearer {settings.supabase_service_role_key}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
    }
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(f'{settings.supabase_url.rstrip("/")}/rest/v1/{table}', headers=headers, json=payload)
    if response.is_error:
        raise RuntimeError(f'Supabase insert into {table} failed: {response.text[:500]}')
    rows = response.json()
    return rows[0] if rows else payload
