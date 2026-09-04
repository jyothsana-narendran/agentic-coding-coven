import os

from dotenv import load_dotenv
import boto3


load_dotenv()

if not os.getenv("AWS_ACCESS_KEY_ID") or not os.getenv("AWS_SECRET_ACCESS_KEY"):
    raise ValueError("AWS credentials are missing")

client = boto3.client("bedrock", region_name=os.getenv("AWS_REGION", "us-east-1"))
models = client.list_foundation_models(byProvider="Amazon")

print("\nAvailable models:\n")

for model in models.get("modelSummaries", []):
    print(model.get("modelId"))
