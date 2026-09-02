from typing import Any, Literal

from pydantic import BaseModel, Field, HttpUrl


class ProfileUpdate(BaseModel):
    full_name: str | None = None
    headline: str | None = None
    location: str | None = None
    linkedin_url: HttpUrl | None = None
    skills: list[str] = Field(default_factory=list)
    goals: str | None = None


class JobTargetCreate(BaseModel):
    company_name: str = Field(min_length=1, max_length=200)
    website_url: HttpUrl
    role_title: str | None = None
    job_description: str | None = None


class RecommendationUpdate(BaseModel):
    status: Literal["approved", "dismissed", "applied"]


class RecordResponse(BaseModel):
    id: str
    status: str
    data: dict[str, Any] = Field(default_factory=dict)
