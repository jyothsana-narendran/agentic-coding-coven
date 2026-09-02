
import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from ai.agents.career_profile import create_career_profile_agent


load_dotenv()


def main():
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise ValueError(
            "GROQ_API_KEY was not found in your .env file."
        )

    llm = ChatGroq(
        model="openai/gpt-oss-120b",
        temperature=0,
        api_key=api_key,
    )

    agent = create_career_profile_agent(llm)

    with open(
        "ai/agents/career_profile/career_profile_test.txt",
        "r",
        encoding="utf-8",
    ) as file:
        candidate_text = file.read()

    result = agent.invoke(
        {
            "candidate_id": "test_candidate_001",
            "candidate_text": candidate_text,
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

