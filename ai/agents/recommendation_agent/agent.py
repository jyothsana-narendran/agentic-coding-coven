
from pathlib import Path

from langgraph.graph import START, END, StateGraph

from .recommendation_schema import Recommendations
from .recommendation_state import RecommendationState


# ==================================================
# PROMPT FILE
# ==================================================

PROMPT_FILE = Path(__file__).parent / "recommendation.txt"


def load_prompts():
    return PROMPT_FILE.read_text(
        encoding="utf-8"
    )


# ==================================================
# CREATE RECOMMENDATION AGENT
# ==================================================

def create_recommendation_agent(llm):

    structured_llm = llm.with_structured_output(
        Recommendations
    )

    prompts = load_prompts()

    # ==================================================
    # RECOMMENDATION NODE
    # ==================================================

    def generate_recommendations(
        state: RecommendationState
    ):

        career_profile = state["career_profile"]
        target_profile = state["target_profile"]
        job_match = state["job_match"]

        user_prompt = f"""
{prompts}

# ==================================================
# CAREER PROFILE
# ==================================================

{career_profile.model_dump_json(indent=2)}

# ==================================================
# TARGET PROFILE
# ==================================================

{target_profile.model_dump_json(indent=2)}

# ==================================================
# JOB MATCH
# ==================================================

{job_match.model_dump_json(indent=2)}

# ==================================================

Generate actionable recommendations based on the
CareerProfile, TargetProfile, and JobMatch.

Use only evidence contained in the provided inputs.

Do not hallucinate candidate information.

Return the result using the Recommendations schema.
"""

        try:

            recommendations = structured_llm.invoke(
                user_prompt
            )

            return {
                "recommendations": recommendations,
                "error": None,
            }

        except Exception as e:

            return {
                "recommendations": None,
                "error": str(e),
            }

    # ==================================================
    # LANGGRAPH
    # ==================================================

    graph = StateGraph(
        RecommendationState
    )

    graph.add_node(
        "generate_recommendations",
        generate_recommendations,
    )

    graph.add_edge(
        START,
        "generate_recommendations",
    )

    graph.add_edge(
        "generate_recommendations",
        END,
    )

    return graph.compile()

