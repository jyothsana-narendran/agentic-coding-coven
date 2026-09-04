from pathlib import Path
from typing import Any, TypedDict
from langgraph.graph import END, START, StateGraph
from ai.schemas.recommendation import RecommendationResult

PROMPT_FILE = Path(__file__).parent.parent / 'prompts' / 'recommendation.txt'
class RecommendationState(TypedDict, total=False):
    career_profile: dict[str, Any]
    target_profile: dict[str, Any]
    job_match: dict[str, Any]
    result: RecommendationResult | None
    error: str | None

def create_recommendation_agent(llm):
    structured_llm = llm.with_structured_output(RecommendationResult)
    prompt = PROMPT_FILE.read_text(encoding='utf-8')
    def recommend(state: RecommendationState):
        try:
            result = structured_llm.invoke(f"{prompt}\n\nCandidate:\n{state.get('career_profile', {})}\n\nTarget job:\n{state.get('target_profile', {})}\n\nMatch analysis:\n{state.get('job_match', {})}")
            return {'result': result, 'error': None}
        except Exception as exc: return {'result': None, 'error': str(exc)}
    graph = StateGraph(RecommendationState); graph.add_node('recommend', recommend); graph.add_edge(START, 'recommend'); graph.add_edge('recommend', END)
    return graph.compile()
