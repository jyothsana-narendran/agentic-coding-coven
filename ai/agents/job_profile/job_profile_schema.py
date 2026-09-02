from typing import Literal

from pydantic import BaseModel


class Responsibility(BaseModel):
    description: str
    evidence_from_jd: str


class TargetSkill(BaseModel):
    name: str
    importance: Literal[
        "critical",
        "high",
        "medium",
        "low",
    ]
    evidence_from_jd: str


class TargetProfile(BaseModel):
    company: str
    role: str
    seniority: str | None = None

    responsibilities: list[Responsibility]

    required_skills: list[TargetSkill]
    preferred_skills: list[TargetSkill]

    soft_skills: list[str]

    experience_requirements: list[str]
    education_requirements: list[str]

    keywords: list[str]
    signals: list[str]