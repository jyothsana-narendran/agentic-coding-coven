Career Copilot — Project Scope

## Overview

Career Copilot is an agentic career intelligence system that helps candidates move beyond simply applying for jobs and become stronger candidates for the roles they target.

The system combines a candidate's resume and LinkedIn profile with a target job description to build a structured understanding of both the candidate and the role. It then evaluates suitability, identifies areas of alignment, highlights strengths and potential gaps, and provides actionable recommendations to improve the candidate's chances.

> **Core principle:** Don't just apply. Become the stronger candidate.

Rather than treating a job application as a one-time matching exercise, Career Copilot supports the full process—from understanding the candidate and target role to identifying areas for improvement and providing personalized recommendations.

## Summary

Career Copilot supports candidates throughout the job application process by combining their professional background with the requirements of a specific target role.

The system focuses on four key capabilities:

1. **Candidate understanding** — Builds a structured view of the candidate's experience, skills, achievements, education, and career background.
2. **Role understanding and job matching** — Analyzes the target role and evaluates how well the candidate's background aligns with its requirements.
3. **Personalized recommendations** — Provides actionable guidance to better position existing experience and address important gaps.
4. **Interview preparation and coaching** — Generates role-specific questions and provides feedback grounded in the candidate's profile and target role.

Career Copilot transforms the traditional:

> Find → Apply → Interview

into an intelligent, continuous process:

> Understand → Assess → Improve → Prepare → Perform

## Motivation

The job application process is often treated as a simple cycle: find a suitable role, submit an application, and prepare for an interview. Candidates are frequently left without a clear understanding of how well they align with a role, where their gaps are, or what they can do to improve their chances of success.

Existing tools often focus on resume optimization or basic match scores. While useful, these approaches primarily answer:

> How well do I match this job?

Career Copilot focuses on the more useful question:

> How can I become a stronger candidate for this job?

By combining a candidate's professional background with the requirements of a specific role, the system provides deeper insight into strengths, gaps, and positioning. The goal is not simply to help candidates apply to more jobs, but to help them make informed decisions and continuously improve their readiness.

## User Stories

- As a candidate, I want to provide my resume and LinkedIn profile so that the system can understand my professional background, skills, and experience.
- As a candidate, I want to provide a target job description so that I can understand how well my profile aligns with the role and identify potential gaps.
- As a candidate, I want personalized recommendations based on my profile and the target role so that I can take actionable steps to become a stronger candidate.
- As a candidate, I want role-specific interview questions and feedback so that I can improve how I communicate my experience.

## Proposed Core Features

### 1. Candidate Analysis

Users can upload their resume and LinkedIn information. Career Copilot uses this data to create a specialized candidate profile containing relevant skills, experience, education, achievements, and professional background.

This profile provides the foundation for job matching and personalized recommendations.

### 2. Compatibility Analysis

Users can provide details of a desired job posting. The system compares the candidate profile with the job requirements to evaluate compatibility between the candidate's skills and experience and the target role.

The analysis is generated dynamically from the candidate's specific background and the requirements of the role, making the assessment relevant to each application.

### 3. Personalized Action Plan

The compatibility analysis is converted into actionable recommendations for strengthening the candidate's positioning.

Recommendations may include:

- Skills or competencies to develop.
- Resume restructuring or refinement.
- LinkedIn updates that better highlight relevant experience.
- Ways to address identified gaps.
- Suggestions for improving overall candidacy.

Each recommendation is tailored to the candidate's context rather than providing generic career advice. Users can review recommendations and accept or reject individual actions as they work through their plan.

### 4. Personalized Interview Preparation and Coaching

Career Copilot helps users prepare for the target role with interview questions and feedback grounded in both the candidate's background and the role's requirements.

Users can practice answering potential interview questions. For each submitted response, the Interview Coach provides structured feedback on how to communicate the candidate's experience more effectively and appeal to interviewers.

## Agentic Workflow

The application implements a multi-agent career intelligence workflow that analyzes candidate information and a target job description independently, evaluates candidate-job fit, and generates personalized recommendations.

### Workflow Overview

```text
LinkedIn Profile + Resume → CareerProfile
Job Description             → TargetProfile
CareerProfile + TargetProfile → JobMatch
CareerProfile + TargetProfile + JobMatch → Recommendations
```

The workflow is composed of four specialized agents:

| Agent | Responsibility | Output |
|---|---|---|
| Career Profile Agent | Understands and structures the candidate's professional background | `CareerProfile` |
| Job Profile Agent | Understands and structures the target job | `TargetProfile` |
| Job Match Agent | Evaluates the relationship between the candidate and target role | `JobMatch` |
| Recommendation Agent | Generates personalized actions using the complete workflow context | `Recommendations` |

Each agent has a clearly defined responsibility and produces a structured output consumed by subsequent agents.

### Career Profile Agent

**Inputs:**

- `candidate_id`
- `linkedin_text`
- `resume_text`

The agent processes the LinkedIn profile and resume together to create a consolidated `CareerProfile`. This transforms unstructured career information into a reusable, structured representation.

```text
LinkedIn Profile + Resume
          ↓
Career Profile Agent
          ↓
CareerProfile
```

If the agent returns an error, the workflow stops rather than continuing with incomplete candidate information.

### Job Profile Agent

**Input:**

- Raw job description

The agent converts the job description into a structured `TargetProfile` representing the characteristics and requirements relevant to candidate evaluation.

```text
Job Description
       ↓
Job Profile Agent
       ↓
TargetProfile
```

If the agent returns an error, the workflow stops and matching or recommendations are not performed.

### Job Match Agent

**Inputs:**

- `CareerProfile`
- `TargetProfile`

The agent evaluates the candidate's overall fit for the position based on the structured outputs from the previous stages.

```text
CareerProfile + TargetProfile
              ↓
        Job Match Agent
              ↓
           JobMatch
```

Separating matching from recommendation generation allows the Recommendation Agent to focus on producing useful actions instead of independently re-evaluating candidate fit.

### Recommendation Agent

**Inputs:**

- `CareerProfile`
- `TargetProfile`
- `JobMatch`

The agent uses the complete candidate-job context to generate the final recommendations.

```text
CareerProfile
      +
TargetProfile
      +
JobMatch
      ↓
Recommendation Agent
      ↓
Recommendations
```

## Structured Data Flow

Agents communicate through structured objects rather than passing raw text between every model call.

| Source | Structured representation |
|---|---|
| Raw candidate data | `CareerProfile` |
| Raw job data | `TargetProfile` |
| Candidate-job comparison | `JobMatch` |
| Final analysis | `Recommendations` |

```text
Raw Candidate Data → CareerProfile
Raw Job Data       → TargetProfile
CareerProfile + TargetProfile → JobMatch
CareerProfile + TargetProfile + JobMatch → Recommendations
```

This progressive transformation makes the workflow easier to reason about and gives each stage a clear input/output contract.

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | FastAPI + Python |
| Database | Supabase |
| AI models | AWS Bedrock |
| Agent workflow | LangChain / LangGraph |
| Data validation | Pydantic |
| HTTP client | HTTPX |

## Future Plans

### Personalized Mock Interview Preparation

Use the `CareerProfile`, `TargetProfile`, and `JobMatch` to generate candidate- and role-specific mock interviews. Questions can reflect the candidate's actual experience and identified gaps, while adaptive follow-up questions respond to the candidate's answers.

### Broader Candidate Analysis

Extend candidate analysis to portfolios, personal websites, GitHub repositories, publications, and other relevant professional profiles. This would help distinguish between claimed skills and skills supported by demonstrated work.

### Deeper Employer Intelligence

Analyze company websites, careers pages, values, culture, technology environments, and multiple job postings to identify broader hiring expectations. Recommendations and interview preparation could then be tailored to both the role and the organization.

### Continuous Career Development

Evolve from a point-in-time assessment into a continuous career development system. Candidate progress could be tracked as users complete recommendations, develop skills, gain experience, and update their professional profiles.

The long-term feedback loop is:

> Assess → Identify Gaps → Recommend → Develop → Re-evaluate

Ultimately, Career Copilot aims to help candidates understand where they are, where they want to go, and what they should do next to get there.
