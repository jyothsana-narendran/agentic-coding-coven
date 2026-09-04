import os

from dotenv import load_dotenv
from langchain_aws import ChatBedrockConverse

from ai.agents.job_profile.agent import create_job_profile_agent


load_dotenv()


def main():

    if not os.getenv("AWS_ACCESS_KEY_ID") or not os.getenv("AWS_SECRET_ACCESS_KEY"):
        raise ValueError("AWS credentials are not set in the .env file.")
    llm = ChatBedrockConverse(model=os.getenv("BEDROCK_MODEL_ID", "amazon.nova-lite-v1:0"), region_name=os.getenv("AWS_REGION", "us-east-1"), temperature=0)

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
