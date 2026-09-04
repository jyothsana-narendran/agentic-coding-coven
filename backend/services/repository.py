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

    def save_agent_output(self, kind: str, user_id: str, output: dict[str, Any], source_id: str | None = None) -> dict[str, Any]:
        """Persist a complete validated agent payload while Supabase integration is wired in."""
        data = {'output': output}
        if source_id:
            data['source_id'] = source_id
        return self.create(kind, user_id, data, 'completed')

repository = Repository()
