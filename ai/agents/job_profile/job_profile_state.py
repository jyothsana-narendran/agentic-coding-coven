from typing import TypedDict

from .job_profile_schema import TargetProfile


class JobProfileState(TypedDict, total=False):
    job_description: str
    target_profile: TargetProfile | None
    error: str | None