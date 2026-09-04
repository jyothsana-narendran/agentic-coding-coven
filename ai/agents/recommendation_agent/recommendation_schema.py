
from typing import Literal

from pydantic import BaseModel, Field


class RecommendationEvidence(BaseModel):
    source: Literal[
        "candidate_profile",
        "job_description",
        "job_match",
    ]

    text: str


class Recommendation(BaseModel):
    id: str

    category: Literal[
        "resume",
        "linkedin",
        "skills",
        "projects",
        "interview",
        "career",
    ]

    priority: Literal[
        "critical",
        "high",
        "medium",
        "low",
    ]

    title: str

    current: str | None = None
    suggested: str | None = None

    reason: str

    evidence: list[RecommendationEvidence] = Field(
        default_factory=list
    )

    status: Literal[
        "pending",
        "accepted",
        "rejected",
    ] = "pending"


class Recommendations(BaseModel):
    recommendations: list[Recommendation] = Field(
        default_factory=list
    )

