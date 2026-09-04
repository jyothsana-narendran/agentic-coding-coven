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

class JobProfileAnalyzeRequest(BaseModel):
    job_description: str | None = Field(default=None, min_length=1)

class CareerProfileAnalyzeRequest(BaseModel):
    resume_text: str = Field(min_length=1)
    linkedin_text: str = ''

class JobMatchRequest(BaseModel):
    career_profile: dict[str, Any]
    target_profile: dict[str, Any]

class PersonalBrandRequest(BaseModel):
    career_profile: dict[str, Any]
    target_profile: dict[str, Any] = Field(default_factory=dict)

class CareerPipelineRequest(BaseModel):
    resume_text: str = Field(min_length=1)
    linkedin_text: str = ''
    job_description: str = Field(min_length=1)


class RecommendationUpdate(BaseModel):
    status: Literal["approved", "dismissed", "applied"]

class InterviewCoachRequest(BaseModel):
    question: str = Field(min_length=1)
    answer: str = Field(min_length=1)
    job_context: str = ''


class RecordResponse(BaseModel):
    id: str
    status: str
    data: dict[str, Any] = Field(default_factory=dict)
