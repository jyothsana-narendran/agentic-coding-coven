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
        resume_text = state.get("resume_text", "")
        linkedin_text = state.get("linkedin_text", "")

        user_prompt = f"""
{prompts}

Candidate ID:
{candidate_id}

RESUME
----------------------
{resume_text}
----------------------

LINKEDIN
----------------------
{linkedin_text}
----------------------

Extract the candidate's career profile from the provided sources.

Preserve the source of each piece of evidence.

Evidence source rules:
- Use "resume" when the information comes from the resume.
- Use "linkedin" when the information comes from LinkedIn.
- Do not use generic source names such as "Provided resume".
- If the same information appears in both sources, preserve evidence
  from both sources when relevant.

Do not hallucinate missing information.
Do not assume that information appearing in one source appears in another.

Return the information using the CareerProfile schema.
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