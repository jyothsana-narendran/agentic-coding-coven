from typing import Any, TypedDict
from langgraph.graph import END, START, StateGraph
from ai.agents.career_profile import create_career_profile_agent
from ai.agents.job_profile import create_job_profile_agent
from ai.agents.job_match_agent import create_job_match_agent
from ai.agents.recommendation_agent import create_recommendation_agent

class CareerPipelineState(TypedDict, total=False):
    candidate_id: str
    resume_text: str
    linkedin_text: str
    job_description: str
    career_profile: dict[str, Any]
    target_profile: dict[str, Any]
    job_match: dict[str, Any]
    recommendations: dict[str, Any]
    error: str | None

def create_career_pipeline(llm):
    career = create_career_profile_agent(llm)
    target = create_job_profile_agent(llm)
    match = create_job_match_agent(llm)
    recommendation = create_recommendation_agent(llm)
    graph = StateGraph(CareerPipelineState)
    async def career_node(s):
        r = await career.ainvoke({'candidate_id': s['candidate_id'], 'resume_text': s['resume_text'], 'linkedin_text': s.get('linkedin_text','')})
        if r.get('error'): return {'error': r['error']}
        return {'career_profile': r['career_profile']}
    async def target_node(s):
        r = await target.ainvoke({'job_description': s['job_description']})
        if r.get('error'): return {'error': r['error']}
        return {'target_profile': r['target_profile']}
    async def match_node(s):
        r = await match.ainvoke({'career_profile': s['career_profile'], 'target_profile': s['target_profile']})
        if r.get('error'): return {'error': r['error']}
        return {'job_match': r['job_match']}
    async def recommendation_node(s):
        r = await recommendation.ainvoke({'career_profile': s['career_profile'], 'target_profile': s['target_profile'], 'job_match': s['job_match']})
        if r.get('error'): return {'error': r['error']}
        return {'recommendations': r['recommendations']}
    graph.add_node('career_profile', career_node); graph.add_node('job_profile', target_node); graph.add_node('job_match', match_node); graph.add_node('recommendations', recommendation_node)
    def next_after_profile(s): return 'stop' if s.get('error') else 'continue'
    def next_after_target(s): return 'stop' if s.get('error') else 'continue'
    def next_after_match(s): return 'stop' if s.get('error') else 'continue'
    graph.add_edge(START, 'career_profile')
    graph.add_conditional_edges('career_profile', next_after_profile, {'continue': 'job_profile', 'stop': END})
    graph.add_conditional_edges('job_profile', next_after_target, {'continue': 'job_match', 'stop': END})
    graph.add_conditional_edges('job_match', next_after_match, {'continue': 'recommendations', 'stop': END})
    graph.add_edge('recommendations', END)
    return graph.compile()
