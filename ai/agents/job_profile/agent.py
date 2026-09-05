from pathlib import Path

from langgraph.graph import START, END, StateGraph

from .job_profile_schema import TargetProfile
from .job_profile_state import JobProfileState


# Path to job_profile.txt
PROMPT_FILE = Path(__file__).parent / "job_profile.txt"


def load_prompts():
    """
    Load the Job Profile prompts from job_profile.txt.
    """

    prompt_text = PROMPT_FILE.read_text(
        encoding="utf-8"
    )

    return prompt_text


def create_job_profile_agent(llm):
    """
    Creates and compiles the Job Profile LangGraph agent.
    """

    structured_llm = llm.with_structured_output(TargetProfile, method='json_schema')

    prompts = load_prompts()

    def extract_profile(state: JobProfileState):

        job_description = state["job_description"]

        user_prompt = f"""
{prompts}

Job description:
----------------
{job_description}
----------------

Return the information using the TargetProfile schema.

Preserve evidence for extracted claims.

Do not hallucinate missing information.

Clearly distinguish required skills from preferred skills.
"""

        try:

            profile = structured_llm.invoke(
                user_prompt
            )

            return {
                "target_profile": profile,
                "error": None,
            }

        except Exception as e:

            return {
                "target_profile": None,
                "error": str(e),
            }

    graph = StateGraph(JobProfileState)

    graph.add_node(
        "extract_profile",
        extract_profile,
    )

    graph.add_edge(
        START,
        "extract_profile",
    )

    graph.add_edge(
        "extract_profile",
        END,
    )

    return graph.compile()
