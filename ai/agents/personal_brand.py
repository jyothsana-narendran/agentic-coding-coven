from pathlib import Path
from typing import Any, TypedDict
from langgraph.graph import END, START, StateGraph
from ai.schemas.recommendation import PersonalBrandRecommendation

PROMPT_FILE = Path(__file__).parent.parent / 'prompts' / 'personal_brand.txt'
class PersonalBrandState(TypedDict, total=False):
    career_profile: dict[str, Any]
    target_profile: dict[str, Any]
    result: PersonalBrandRecommendation | None
    error: str | None

def create_personal_brand_agent(llm):
    structured_llm = llm.with_structured_output(PersonalBrandRecommendation)
    prompt = PROMPT_FILE.read_text(encoding='utf-8')
    def build_brand(state: PersonalBrandState):
        try:
            result = structured_llm.invoke(f"{prompt}\n\nCandidate profile:\n{state.get('career_profile', {})}\n\nTarget role:\n{state.get('target_profile', {})}")
            return {'result': result, 'error': None}
        except Exception as exc: return {'result': None, 'error': str(exc)}
    graph = StateGraph(PersonalBrandState); graph.add_node('build_brand', build_brand); graph.add_edge(START, 'build_brand'); graph.add_edge('build_brand', END)
    return graph.compile()
