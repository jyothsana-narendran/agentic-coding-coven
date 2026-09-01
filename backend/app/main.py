from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import get_settings
from .api import profile, jobs, recommendations, interviews
settings = get_settings()
app = FastAPI(title=settings.app_name)
app.add_middleware(CORSMiddleware, allow_origins=[settings.frontend_origin], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
for router in (profile.router, jobs.router, recommendations.router, interviews.router): app.include_router(router)
@app.get('/health')
async def health(): return {'status': 'ok'}
