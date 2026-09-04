from ai.agents.interview_coach import create_interview_coach_agent


def create_interview_graph(llm):
    """Compatibility entry point for the interview workflow."""
    return create_interview_coach_agent(llm)
