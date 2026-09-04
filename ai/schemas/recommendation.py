from pydantic import BaseModel, Field

class PersonalBrandRecommendation(BaseModel):
    positioning_statement: str
    headline: str
    about_section: str
    content_pillars: list[str] = Field(default_factory=list)
    strengths_to_highlight: list[str] = Field(default_factory=list)
    action_items: list[str] = Field(default_factory=list)

class RecommendationResult(BaseModel):
    priority_actions: list[str] = Field(default_factory=list)
    resume_recommendations: list[str] = Field(default_factory=list)
    linkedin_recommendations: list[str] = Field(default_factory=list)
    skill_recommendations: list[str] = Field(default_factory=list)
    interview_recommendations: list[str] = Field(default_factory=list)
    rationale: list[str] = Field(default_factory=list)
