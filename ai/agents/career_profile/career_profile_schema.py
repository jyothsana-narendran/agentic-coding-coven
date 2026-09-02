from typing import Literal, Optional

from pydantic import BaseModel, Field


class Evidence(BaseModel):
    source: str
    text: str
    confidence: Optional[float] = Field(
        default=None,
        ge=0.0,
        le=1.0,
    )


class Education(BaseModel):
    institution: str
    degree: Optional[str] = None
    field: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    evidence: str


class Skill(BaseModel):
    name: str

    category: Literal[
        "technical",
        "soft",
        "language",
        "tool",
        "other",
    ]

    proficiency: Optional[
        Literal[
            "beginner",
            "intermediate",
            "advanced",
        ]
    ] = None

    evidence: list[Evidence] = Field(default_factory=list)


class Experience(BaseModel):
    company: str
    role: str

    start_date: Optional[str] = None
    end_date: Optional[str] = None

    description: Optional[str] = None

    achievements: list[str] = Field(default_factory=list)
    skills_used: list[str] = Field(default_factory=list)

    evidence: list[Evidence] = Field(default_factory=list)


class Project(BaseModel):
    name: str
    description: str

    technologies: list[str] = Field(default_factory=list)
    achievements: list[str] = Field(default_factory=list)

    url: Optional[str] = None

    evidence: list[Evidence] = Field(default_factory=list)


class Achievement(BaseModel):
    description: str
    metric: Optional[str] = None

    evidence: list[Evidence] = Field(default_factory=list)


class Certification(BaseModel):
    name: str

    issuer: Optional[str] = None
    issue_date: Optional[str] = None
    expiry_date: Optional[str] = None
    credential_id: Optional[str] = None
    url: Optional[str] = None

    evidence: list[Evidence] = Field(default_factory=list)


class CareerProfile(BaseModel):
    id: str
    candidate_name: str

    education: list[Education] = Field(default_factory=list)
    skills: list[Skill] = Field(default_factory=list)
    experience: list[Experience] = Field(default_factory=list)
    projects: list[Project] = Field(default_factory=list)
    achievements: list[Achievement] = Field(default_factory=list)
    certifications: list[Certification] = Field(default_factory=list)

    summary: str = ""