from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')
    app_name: str = 'Career Copilot API'
    frontend_origin: str = 'http://localhost:5173'
    supabase_url: str = ''
    supabase_anon_key: str = ''
    supabase_service_role_key: str = ''
    openai_api_key: str = ''
    max_upload_size_bytes: int = 10 * 1024 * 1024

@lru_cache
def get_settings() -> Settings:
    return Settings()
