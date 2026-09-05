
from pathlib import Path
import os

from dotenv import load_dotenv
#from langchain_groq import ChatGroq
from langchain_aws import ChatBedrockConverse



from ai.agents.career_profile.agent import (
    create_career_profile_agent,
)

from ai.agents.job_profile.agent import (
    create_job_profile_agent,
)

from ai.agents.job_match_agent.agent import (
    create_job_match_agent,
)

from ai.agents.recommendation_agent.agent import (
    create_recommendation_agent,
)


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()


# ============================================================
# INPUT FILES
# ============================================================

LINKEDIN_FILE = Path("ai/agents/career_profile/career_profile_test_input2.txt")
RESUME_FILE = Path("ai/agents/career_profile/career_profile_test.txt")
JOB_DESCRIPTION_FILE = Path("ai/agents/job_profile/job_profile_test.txt")


# ============================================================
# READ FILE
# ============================================================

def read_text_file(file_path: Path) -> str:

    if not file_path.exists():
        raise FileNotFoundError(
            f"File not found: {file_path}"
        )

    return file_path.read_text(
        encoding="utf-8"
    )


# ============================================================
# MAIN
# ============================================================

def main():

    # ========================================================
    # API KEY
    # ========================================================

    if not os.getenv("AMAZON_API_KEY"):
        raise ValueError(
            "AMAZON_API_KEY is not set in .env"
        )

    # ========================================================
    # GROQ
    # ========================================================

    # llm = ChatGroq(
    #     model="openai/gpt-oss-120b",
    #     temperature=0,
    # )

    llm = ChatBedrockConverse(
    model="amazon.nova-pro-v1:0",
    region_name="us-east-1",
    temperature=0,
    )

    # ========================================================
    # CREATE AGENTS
    # ========================================================

    career_profile_agent = (
        create_career_profile_agent(llm)
    )

    job_profile_agent = (
        create_job_profile_agent(llm)
    )

    job_match_agent = (
        create_job_match_agent(llm)
    )

    recommendation_agent = (
        create_recommendation_agent(llm)
    )

    # ========================================================
    # READ INPUTS
    # ========================================================

    linkedin_text = read_text_file(
        LINKEDIN_FILE
    )

    resume_text = read_text_file(
        RESUME_FILE
    )

    job_description = read_text_file(
        JOB_DESCRIPTION_FILE
    )

    # ========================================================
    # AGENT 1
    #
    # LinkedIn + Resume
    #       ↓
    # CareerProfile
    # ========================================================

    print()
    print("=" * 60)
    print("RUNNING CAREER PROFILE AGENT")
    print("=" * 60)

    career_result = career_profile_agent.invoke(
        {
            "candidate_id": "candidate_001",
            "linkedin_text": linkedin_text,
            "resume_text": resume_text,
        }
    )

    if career_result.get("error"):
        print("\nCareer Profile Agent Error:")
        print(career_result["error"])
        return

    career_profile = (
        career_result["career_profile"]
    )

    print("\nCareerProfile:")
    print(
        career_profile.model_dump_json(
            indent=2
        )
    )

    # ========================================================
    # AGENT 2
    #
    # Job Description
    #       ↓
    # TargetProfile
    # ========================================================

    print()
    print("=" * 60)
    print("RUNNING JOB PROFILE AGENT")
    print("=" * 60)

    job_result = job_profile_agent.invoke(
        {
            "job_description": job_description,
        }
    )

    if job_result.get("error"):
        print("\nJob Profile Agent Error:")
        print(job_result["error"])
        return

    target_profile = (
        job_result["target_profile"]
    )

    print("\nTargetProfile:")
    print(
        target_profile.model_dump_json(
            indent=2
        )
    )

    # ========================================================
    # AGENT 3
    #
    # CareerProfile + TargetProfile
    #       ↓
    # JobMatch
    # ========================================================

    print()
    print("=" * 60)
    print("RUNNING JOB MATCH AGENT")
    print("=" * 60)

    match_result = job_match_agent.invoke(
        {
            "career_profile": career_profile,
            "target_profile": target_profile,
        }
    )

    if match_result.get("error"):
        print("\nJob Match Agent Error:")
        print(match_result["error"])
        return

    job_match = match_result["job_match"]

    print("\nJobMatch:")
    print(
        job_match.model_dump_json(
            indent=2
        )
    )

    # ========================================================
    # AGENT 4
    #
    # CareerProfile + TargetProfile + JobMatch
    #       ↓
    # Recommendations
    # ========================================================

    print()
    print("=" * 60)
    print("RUNNING RECOMMENDATION AGENT")
    print("=" * 60)

    recommendation_result = (
        recommendation_agent.invoke(
            {
                "career_profile": career_profile,
                "target_profile": target_profile,
                "job_match": job_match,
            }
        )
    )

    if recommendation_result.get("error"):
        print("\nRecommendation Agent Error:")
        print(
            recommendation_result["error"]
        )
        return

    recommendations = (
        recommendation_result["recommendations"]
    )

    # ========================================================
    # FINAL RESULT
    # ========================================================

    print()
    print("=" * 60)
    print("RECOMMENDATIONS")
    print("=" * 60)

    print(
        recommendations.model_dump_json(
            indent=2
        )
    )


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    main()

