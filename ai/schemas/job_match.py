from pydantic import BaseModel, Field

class JobMatch(BaseModel):
    match_score: float = Field(ge=0, le=100)
    strengths: list[str] = Field(default_factory=list)
    skill_gaps: list[str] = Field(default_factory=list)
    evidence: list[str] = Field(default_factory=list)
    recommendations: list[str] = Field(default_factory=list)
