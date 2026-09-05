
from pathlib import Path

from langgraph.graph import START, END, StateGraph

from .job_match_schema import JobMatch
from .job_match_state import JobMatchState


PROMPT_FILE = Path(__file__).parent / "job_match.txt"


def load_prompts():
    return PROMPT_FILE.read_text(
        encoding="utf-8"
    )


def create_job_match_agent(llm):
    structured_llm = llm.with_structured_output(JobMatch)

    prompts = load_prompts()

    def match_profile(state: JobMatchState):
        career_profile = state["career_profile"]
        target_profile = state["target_profile"]

        user_prompt = f"""
{prompts}

Career Profile:
{career_profile.model_dump_json(indent=2)}

Target Profile:
{target_profile.model_dump_json(indent=2)}
"""

        try:
            job_match = structured_llm.invoke(user_prompt)

            return {
                "job_match": job_match,
                "error": None,
            }

        except Exception as e:
            return {
                "job_match": None,
                "error": str(e),
            }

    graph = StateGraph(JobMatchState)

    graph.add_node(
        "match_profile",
        match_profile,
    )

    graph.add_edge(
        START,
        "match_profile",
    )

    graph.add_edge(
        "match_profile",
        END,
    )

    return graph.compile()

