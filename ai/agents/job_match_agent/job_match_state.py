from typing import TypedDict

from ai.agents.career_profile.career_profile_schema import CareerProfile
from ai.agents.job_profile.job_profile_schema import TargetProfile

from .job_match_schema import JobMatch

class JobMatchState(TypedDict, total=False):
    career_profile: CareerProfile
    target_profile: TargetProfile

    job_match: JobMatch | None
    error: str | None