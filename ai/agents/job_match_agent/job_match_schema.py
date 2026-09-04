
from typing import Literal, Optional

from pydantic import BaseModel


class SkillMatch(BaseModel):
    skill: str

    candidate_level: Optional[
        Literal[
            "beginner",
            "intermediate",
            "advanced",
        ]
    ] = None

    target_importance: Literal[
        "critical",
        "high",
        "medium",
        "low",
    ]

    evidence: str


class SkillGap(BaseModel):
    skill: str

    importance: Literal[
        "critical",
        "high",
        "medium",
        "low",
    ]

    reason: str

    recommended_action: str


class MatchStrength(BaseModel):
    strength: str

    evidence: str


class JobMatch(BaseModel):
    overall_score: float

    matched_skills: list[SkillMatch]

    missing_skills: list[SkillGap]

    strengths: list[MatchStrength]

    experience_gaps: list[str]

    keyword_gaps: list[str]

