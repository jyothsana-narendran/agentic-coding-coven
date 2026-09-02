from typing import Optional, TypedDict

from .career_profile_schema import CareerProfile


class CareerProfileState(TypedDict, total=False):
    candidate_id: str

    resume_text: str
    linkedin_text: str

    career_profile: Optional[CareerProfile]

    error: Optional[str]