import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from ai.agents.job_profile.agent import create_job_profile_agent


load_dotenv()


def main():

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise ValueError(
            "GROQ_API_KEY is not set in the .env file."
        )

    llm = ChatGroq(
        api_key=api_key,
        model="openai/gpt-oss-120b",
        temperature=0,
    )

    agent = create_job_profile_agent(llm)

    job_description = """
    Senior Software Engineer

    ABC Technologies is looking for a Senior Software Engineer
    to join our backend engineering team.

    Responsibilities:
    - Design and develop scalable backend services.
    - Build distributed systems.
    - Collaborate with product and engineering teams.
    - Review code and mentor junior engineers.

    Requirements:
    - 5+ years of software engineering experience.
    - Strong Python programming skills.
    - Experience with C++ or Java.
    - Experience building distributed systems.
    - Bachelor's degree in Computer Science or related field.

    Preferred:
    - Experience with AWS.
    - Kubernetes experience.
    - Strong communication and problem-solving skills.
    """

    result = agent.invoke(
        {
            "job_description": job_description,
            "target_profile": None,
            "error": None,
        }
    )

    if result.get("error"):
        print("ERROR:")
        print(result["error"])
        return

    print("\nTARGET PROFILE")
    print("=" * 60)

    print(
        result["target_profile"].model_dump_json(
            indent=2
        )
    )


if __name__ == "__main__":
    main()