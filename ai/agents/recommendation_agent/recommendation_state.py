
from typing import TypedDict

from ai.agents.career_profile.career_profile_schema import (
    CareerProfile,
)

from ai.agents.job_profile.job_profile_schema import (
    TargetProfile,
)

from ai.agents.job_match_agent.job_match_schema import (
    JobMatch,
)

from .recommendation_schema import Recommendations


class RecommendationState(TypedDict, total=False):
    career_profile: CareerProfile
    target_profile: TargetProfile
    job_match: JobMatch
    recommendations: Recommendations | None
    error: str | None

