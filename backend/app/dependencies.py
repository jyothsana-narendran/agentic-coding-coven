from fastapi import Header, HTTPException
from uuid import UUID

async def current_user_id(authorization: str | None = Header(default=None), x_user_id: str | None = Header(default=None)) -> str:
    if x_user_id and authorization is None:
        x_user_id = x_user_id.strip().strip('\\"\'')
        try:
            UUID(x_user_id)
        except ValueError as exc:
            raise HTTPException(422, 'X-User-ID must be the UUID of an existing Supabase Auth user') from exc
        return x_user_id
    if not authorization or not authorization.lower().startswith('bearer '): raise HTTPException(401, 'Bearer token required')
    token = authorization[7:].strip()
    if not token: raise HTTPException(401, 'Invalid bearer token')
    return token
