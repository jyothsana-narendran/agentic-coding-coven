from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=(Path(__file__).parents[2] / '.env', Path(__file__).parents[3] / '.env'), extra='ignore')
    app_name: str = 'Career Copilot API'
    frontend_origin: str = 'http://localhost:5173'
    supabase_url: str = ''
    supabase_anon_key: str = ''
    supabase_service_role_key: str = ''
    aws_access_key_id: str = ''
    aws_secret_access_key: str = ''
    aws_session_token: str = ''
    aws_region: str = 'ap-southeast-1'
    bedrock_model_id: str = 'amazon.nova-lite-v1:0'
    max_upload_size_bytes: int = 10 * 1024 * 1024

@lru_cache
def get_settings() -> Settings:
    return Settings()
