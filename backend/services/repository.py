from typing import Any
from uuid import uuid4

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

repository = Repository()
