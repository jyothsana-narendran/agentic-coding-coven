
import os

from dotenv import load_dotenv
from langchain_aws import ChatBedrockConverse

from ai.agents.career_profile import create_career_profile_agent


load_dotenv()


def main():
    if not os.getenv("AWS_ACCESS_KEY_ID") or not os.getenv("AWS_SECRET_ACCESS_KEY"):
        raise ValueError("AWS credentials were not found in your .env file.")
    llm = ChatBedrockConverse(model=os.getenv("BEDROCK_MODEL_ID", "amazon.nova-lite-v1:0"), region_name=os.getenv("AWS_REGION", "us-east-1"), temperature=0)

    agent = create_career_profile_agent(llm)

    # Load resume
    with open(
        "ai/agents/career_profile/career_profile_test.txt",
        "r",
        encoding="utf-8",
    ) as file:
        resume_text = file.read()

    # Load LinkedIn profile
    with open(
        "ai/agents/career_profile/career_profile_test_input2.txt",
        "r",
        encoding="utf-8",
    ) as file:
        linkedin_text = file.read()

    result = agent.invoke(
        {
            "candidate_id": "test_candidate_001",
            "resume_text": resume_text,
            "linkedin_text": linkedin_text,
        }
    )

    if result.get("error"):
        print("\nAgent error:")
        print(result["error"])
        return

    profile = result["career_profile"]

    print("\n========== CAREER PROFILE ==========\n")

    print(
        profile.model_dump_json(
            indent=2
        )
    )


if __name__ == "__main__":
    main()
