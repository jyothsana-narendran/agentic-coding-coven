from pathlib import Path
from typing import Any, TypedDict
from langgraph.graph import END, START, StateGraph
from ai.schemas.job_match import JobMatch

PROMPT_FILE = Path(__file__).parent.parent / 'prompts' / 'job_match.txt'
class JobMatchState(TypedDict, total=False):
    career_profile: dict[str, Any]
    target_profile: dict[str, Any]
    result: JobMatch | None
    error: str | None

def create_job_match_agent(llm):
    structured_llm = llm.with_structured_output(JobMatch)
    prompt = PROMPT_FILE.read_text(encoding='utf-8')
    def match(state: JobMatchState):
        try:
            result = structured_llm.invoke(f"{prompt}\n\nCandidate profile:\n{state.get('career_profile', {})}\n\nTarget profile:\n{state.get('target_profile', {})}")
            return {'result': result, 'error': None}
        except Exception as exc: return {'result': None, 'error': str(exc)}
    graph = StateGraph(JobMatchState); graph.add_node('match', match); graph.add_edge(START, 'match'); graph.add_edge('match', END)
    return graph.compile()
