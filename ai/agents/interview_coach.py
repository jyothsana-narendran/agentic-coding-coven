from pathlib import Path
from typing import Any, TypedDict

from langgraph.graph import END, START, StateGraph

from ai.schemas.interview import InterviewSessionResult

PROMPT_FILE = Path(__file__).parent.parent / "prompts" / "interview_coach.txt"


class InterviewCoachState(TypedDict, total=False):
    question: str
    answer: str
    job_context: str
    result: Any
    error: str | None


def load_prompt() -> str:
    return PROMPT_FILE.read_text(encoding="utf-8") if PROMPT_FILE.exists() else (
        "Evaluate the answer fairly and give specific, actionable coaching. "
        "Do not invent facts about the candidate."
    )


def create_interview_coach_agent(llm):
    """Create a structured-output LangGraph interview coaching agent.

    The caller supplies a configured chat model, keeping API keys and model
    selection outside the agent module.
    """
    structured_llm = llm.with_structured_output(InterviewSessionResult)
    prompt = load_prompt()

    def coach(state: InterviewCoachState):
        user_prompt = f"""{prompt}

Job context:
{state.get('job_context', '')}

Interview question:
{state.get('question', '')}

Candidate answer:
{state.get('answer', '')}

Evaluate only the answer provided. Return the InterviewSessionResult schema.
"""
        try:
            result = structured_llm.invoke(user_prompt)
            return {"result": result, "error": None}
        except Exception as exc:
            return {"result": None, "error": str(exc)}

    graph = StateGraph(InterviewCoachState)
    graph.add_node("coach", coach)
    graph.add_edge(START, "coach")
    graph.add_edge("coach", END)
    return graph.compile()
