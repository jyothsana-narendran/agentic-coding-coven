from pydantic import BaseModel, Field


class InterviewFeedback(BaseModel):
    overall_score: float = Field(ge=0, le=100)
    strengths: list[str] = Field(default_factory=list)
    improvements: list[str] = Field(default_factory=list)
    communication_score: float = Field(ge=0, le=100)
    relevance_score: float = Field(ge=0, le=100)
    structure_score: float = Field(ge=0, le=100)
    confidence_score: float = Field(ge=0, le=100)
    filler_words: list[str] = Field(default_factory=list)
    suggested_answer: str = ""
    next_question: str = ""


class InterviewSessionResult(BaseModel):
    question: str
    answer: str
    feedback: InterviewFeedback
