Career Copilot

Career Copilot is an agentic career intelligence system that helps candidates move beyond simply applying for jobs and become stronger candidates for the roles they target.

> **Don't just apply. Become the stronger candidate.**

The application combines a candidate's resume and LinkedIn profile with a target job description to identify strengths, gaps, and practical next steps. It turns the traditional `find → apply → interview` workflow into:

`understand → assess → improve → prepare → perform`

## Features

- Candidate profile analysis from resume and LinkedIn information.
- Target-role analysis and candidate/job compatibility assessment.
- Personalized action plans for improving candidacy.
- Resume and LinkedIn positioning recommendations.
- Role-specific interview practice and coaching.

## Architecture

Career Copilot uses a sequential multi-agent workflow. Each agent produces structured output for the next stage:

```text
LinkedIn Profile + Resume → CareerProfile
Job Description             → TargetProfile
CareerProfile + TargetProfile → JobMatch
CareerProfile + TargetProfile + JobMatch → Recommendations
```

| Agent | Responsibility | Output |
|---|---|---|
| Career Profile Agent | Structures the candidate's experience, skills, and achievements | `CareerProfile` |
| Job Profile Agent | Extracts requirements and expectations from the target role | `TargetProfile` |
| Job Match Agent | Evaluates alignment, strengths, and gaps | `JobMatch` |
| Recommendation Agent | Generates tailored, actionable improvement steps | `Recommendations` |

### Technology stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** FastAPI, Python
- **Database and storage:** Supabase
- **AI models:** AWS Bedrock
- **Agent orchestration:** LangChain, LangGraph
- **Validation:** Pydantic

## Prerequisites

Install the following before starting:

- Python 3.13 or later
- Node.js and npm
- An AWS Bedrock credential, either a bearer token or AWS IAM credentials
- A Supabase project if you want persistent database and storage functionality

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd career-copilot
```

### 2. Configure the backend

Create the backend virtual environment and install dependencies:

```bash
cd backend
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Copy the environment template to the project root:

```bash
cp ../.env.example ../.env
```

Open `../.env` and configure the values below:

```dotenv
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=amazon.nova-lite-v1:0

# Use either a Bedrock bearer token...
AWS_BEARER_TOKEN_BEDROCK=your-bedrock-bearer-token

# ...or AWS IAM credentials.
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SESSION_TOKEN=

# Optional for local in-memory mode.
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

FRONTEND_ORIGIN=http://localhost:5173
```

Do not commit `.env` or expose AWS credentials in the frontend.

### 3. Configure the frontend

In a second terminal, install the frontend dependencies:

```bash
cd frontend
npm install
cp .env.example .env.local
```

The default frontend configuration uses the FastAPI backend:

```dotenv
VITE_DATA_SOURCE=api
VITE_API_URL=http://localhost:8000
VITE_DEV_USER_ID=career-copilot-local-demo
```

To run the UI with local fixture data instead, set `VITE_DATA_SOURCE=mock`.

## Run locally

Start the backend from the `backend` directory:

```bash
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

Start the frontend from the `frontend` directory in another terminal:

```bash
npm run dev
```

Open the local URL shown by Vite, normally [http://localhost:5173](http://localhost:5173).

Check that the backend is running at [http://localhost:8000/health](http://localhost:8000/health). The expected response is:

```json
{"status":"ok"}
```

## Useful commands

From `frontend/`:

```bash
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

From `backend/`:

```bash
uvicorn app.main:app --reload --port 8000
```

## Project structure

```text
career-copilot/
├── backend/
│   ├── app/
│   │   ├── api/             # Profile, jobs, recommendations, interviews
│   │   ├── services/        # AI, storage, and transcription services
│   │   ├── config.py        # Environment-backed application settings
│   │   └── main.py          # FastAPI application entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API and workflow clients
│   │   └── types/           # Frontend domain and API types
│   └── package.json
├── .env.example
└── README.md
```

## Future direction

The platform can evolve into a continuous career development system by incorporating portfolios, GitHub repositories, employer intelligence, adaptive mock interviews, and progress tracking.

The long-term feedback loop is:

`Assess → Identify Gaps → Recommend → Develop → Re-evaluate`




