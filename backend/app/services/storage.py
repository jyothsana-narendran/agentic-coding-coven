from pathlib import Path
from uuid import uuid4
from fastapi import UploadFile
from ..config import get_settings

async def save_upload(upload: UploadFile, user_id: str, bucket: str) -> dict[str, str | int]:
    content = await upload.read(get_settings().max_upload_size_bytes + 1)
    if len(content) > get_settings().max_upload_size_bytes:
        raise ValueError('Upload exceeds size limit')
    name = Path(upload.filename or 'upload.bin').name
    return {'bucket': bucket, 'path': f'{user_id}/{uuid4()}-{name}', 'size': len(content), 'content_type': upload.content_type or 'application/octet-stream'}
