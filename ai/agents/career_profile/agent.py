from pathlib import Path

from langgraph.graph import START, END, StateGraph

from .career_profile_schema import CareerProfile
from .career_profile_state import CareerProfileState


# Path to career_profile.txt
PROMPT_FILE = Path(__file__).parent / "career_profile.txt"


def load_prompts():
    """
    Load the Career Profile prompts from career_profile.txt.
    """

    prompt_text = PROMPT_FILE.read_text(encoding="utf-8")

    return prompt_text


def create_career_profile_agent(llm):
    """
    Creates and compiles the Career Profile LangGraph agent.
    """

    structured_llm = llm.with_structured_output(
        CareerProfile
    )

    prompts = load_prompts()

    def extract_profile(state: CareerProfileState):
        candidate_id = state["candidate_id"]
        candidate_text = state["candidate_text"]

        user_prompt = f"""
{prompts}

Candidate ID:
{candidate_id}

Candidate information:
----------------------
{candidate_text}
----------------------

Return the information using the CareerProfile schema.

Preserve evidence for extracted claims.
Do not hallucinate missing information.
"""

        try:
            profile = structured_llm.invoke(
                user_prompt
            )

            return {
                "career_profile": profile,
                "error": None,
            }

        except Exception as e:
            return {
                "career_profile": None,
                "error": str(e),
            }

    graph = StateGraph(CareerProfileState)

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