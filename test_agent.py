
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
        model="llama-3.3-70b-versatile",
        temperature=0,
        api_key=api_key,
    )

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
