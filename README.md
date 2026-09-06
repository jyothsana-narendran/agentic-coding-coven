Project Scope
Overview
The project aims to develop an agentic career intelligence system that helps candidates move beyond simply applying for jobs and instead become stronger candidates for the roles they target.
The system brings together a candidate's resume and LinkedIn profile with a target job description to develop a structured understanding of the candidate and the requirements of the role. It then evaluates the candidate's suitability, identifies areas of alignment, highlights strengths and potential gaps, and provides actionable recommendations to improve their candidacy.
The core principle of the project is “Don't just apply. Become the stronger candidate.”.
Rather than treating a job application as a one-time matching exercise, the system approaches the process holistically—from understanding the candidate and target role, to identifying areas for improvement and by providing personalized recommendations.
.
Summary
The system is designed to support the candidate throughout the job application. It combines information from the candidate's professional background with the requirements of a specific target role to provide personalized insights and guidance.
The system focuses on four key capabilities:
Candidate Understanding — Builds a structured view of the candidate's professional experience, skills, achievements, and career background from their resume and LinkedIn profile.
Role Understanding & Job Matching — Analyzes the target role and evaluates how well the candidate's background aligns with its requirements, including identifying strengths and potential gaps.
Personalized Recommendations — Provides actionable guidance on how the candidate can better position their existing experience and address areas that may strengthen their candidacy.
Overall, the project seeks to transform the traditional “find → apply → interview” workflow into an intelligent “understand → assess → improve → prepare → perform” process, helping candidates make more informed application decisions and continuously improve their readiness for targeted roles.
Motivation
The job application process is often treated as a simple cycle of finding a suitable role, submitting an application, and preparing for an interview. However, candidates are frequently left without a clear understanding of how well they actually align with a role, where their gaps are, or what they can do to improve their chances of success.
Existing tools often focus on optimizing a resume for a job description or providing a basic match score. While useful, these approaches primarily answer “How well do I match this job?” rather than “How can I become a stronger candidate for this job?”
This project was motivated by the idea of making the process more personalized, continuous, and actionable. By combining a candidate's professional background with the requirements of a specific role, the system can provide deeper insight into the candidate's strengths, gaps and positioning.
The goal is therefore not simply to help candidates apply to more jobs, but to help them better understand the opportunities they pursue so that they can improve their candidacy. Don't just apply. Become the stronger candidate.
User Stories 
As a candidate, I want to provide my resume and LinkedIn profile so that the system can understand my professional background, skills, and experience.
As a candidate, I want to provide a target job description so that I can understand how well my profile aligns with the role and identify potential gaps.
As a candidate, I want personalized recommendations based on my profile and the target role so that I can take actionable steps to become a stronger candidate.
Proposed Core Features
Candidate Analysis
Users can upload their resume and LinkedIn information to our website. This is used to build a specialised profile for each user that captures the user’s relevant skills, experience, education, achievements, and professional background. These profiles provide the foundation for the system's subsequent job-match analysis and personalized recommendations.
Compatibility Analysis 
Users can upload the details of a desired job posting for cross reference with their candidate profile. The system will analyse the users’ profile with respect to the job posting to evaluate the compatibility between the user’s skills and experience and the job posting. This analysis is generated dynamically from the candidate’s specific background and the requirements of the role, allowing the assessment to be specialised and to reflect the context of each application.
Personalized Action Plan
The compatibility analysis is then turned into actionable recommendations for strengthening the candidate's positioning for the target role.
Based on the candidate's profile, role requirements, and identified gaps, the system generates recommendations for the users to strengthen their compatibility score.These recommendations may include skills or competencies to develop, suggestions for restructuring or refining their resume and LinkedIn profile to better highlight relevant experience, and other actionable steps to address identified gaps and improve their overall candidacy.
Each recommendation is specially tailored to the candidate's specific context to give useful career advice for improvement rather than generic tips. Users can review the generated recommendations and accept or reject individual actions as they work through their plan.
Personalized Interview Preparation & Coaching
This allows the user to prepare for the target role through interview questions and feedback grounded in the candidate's background and the requirements of the role.
Users receive questions they could potentially face in the interview for their desired role, for which they can practice answering. For each submitted response, the Interview Coach provides structured feedback on how the user can improve on their response to better appeal to the interviewers. This feature gives users the opportunity to both practise answering role-relevant interview questions and receive actionable feedback to continuously improve their interview performance. This extends the system beyond identifying whether a candidate is suitable for a role by helping them actively improve how they communicate their experience during the interview process.

Design- make the tables/system architecture
Agentic Workflow
The application implements a multi-agent career intelligence workflow that takes a candidate's professional information and a target job description, analyzes both independently, evaluates the candidate-job fit, and finally generates personalized recommendations.
The workflow is composed of four specialized agents:
Career Profile Agent
Job Profile Agent
Job Match Agent
Recommendation Agent
Each agent has a clearly defined responsibility and produces a structured output that is consumed by subsequent agents. This creates a sequential pipeline where the output of one stage becomes the context for the next stage.
Overall Workflow:
At a high level, the system follows this process:
LinkedIn Profile + Resume → CareerProfile
Job Description → TargetProfile
CareerProfile + TargetProfile → JobMatch
CareerProfile + TargetProfile + JobMatch → Recommendations
The final result is a structured recommendation based on both the candidate's background and the requirements of the target position.
Career Profile Agent
The first agent is responsible for understanding and structuring the candidate's professional background.
It receives:
candidate_id
linkedin_text
resume_text
The agent processes the LinkedIn information and resume together to create a consolidated CareerProfile.
The purpose of this stage is to transform unstructured candidate information into a structured representation of the candidate's career.
Instead of requiring every downstream agent to interpret the original resume and LinkedIn profile independently, the system creates a single structured candidate representation that can be reused throughout the rest of the workflow.
Conceptually:
LinkedIn Profile + Resume
            ↓
Career Profile Agent
            ↓
CareerProfile

The resulting CareerProfile becomes one of the primary inputs for the Job Match Agent and Recommendation Agent. If the Career Profile Agent returns an error, the workflow stops at this stage rather than continuing with incomplete candidate information.
Job Profile Agent
The second agent focuses exclusively on understanding the target job.
It receives the raw job description and converts it into a structured TargetProfile.
The TargetProfile represents the characteristics and requirements of the position that are relevant for evaluating a candidate.
Conceptually:
Job Description
       ↓
Job Profile Agent
       ↓
TargetProfile

This creates a structured representation of the job that can be compared against the candidate's CareerProfile. Separating this stage from the candidate analysis allows the system to independently understand who the candidate is and what the job requires before performing the matching process. If the Job Profile Agent returns an error, the workflow stops and no matching or recommendation is performed.
Job Match Agent
Once both profiles have been generated, the system moves to the matching stage.
The Job Match Agent receives:
CareerProfile
TargetProfile
It evaluates the relationship between the candidate's background and the target role. This stage is responsible for determining the candidate's overall fit for the position based on the structured information produced by the previous two agents.
Conceptually:
CareerProfile + TargetProfile
              ↓
Job Match Agent
              ↓
JobMatch

The resulting JobMatch acts as the structured assessment of the candidate-job relationship.
This intermediate result is particularly important because it separates matching from recommendation generation. The Recommendation Agent does not have to independently determine whether the candidate is a good fit. Instead, it can use the already-generated JobMatch together with the candidate and job profiles to focus on producing useful recommendations.
Recommendation Agent
The final agent is responsible for generating the recommendations.
Unlike the previous agents, this agent receives the complete context generated throughout the workflow:
CareerProfile
TargetProfile
JobMatch

This allows the agent to consider the candidate's background, the requirements of the role, and the identified level of fit when generating its final output.
Conceptually:
CareerProfile
      +
TargetProfile
      +
JobMatch
      ↓
Recommendation Agent
      ↓
Recommendations

The recommendations represent the final output of the workflow.
Because the Recommendation Agent receives the outputs of all previous stages, it has access to the complete candidate-job context rather than having to infer everything from the original raw documents.

Structured Data Flow Between Agents
A key design characteristic of this architecture is that agents communicate through structured objects. The workflow does not simply pass raw text from one LLM call to another.
Instead, each stage produces a structured representation:
Candidate information becomes CareerProfile
Job information becomes TargetProfile
Candidate-job comparison becomes JobMatch
Final analysis becomes Recommendations
This creates a progressive transformation of the original input:
Raw Candidate Data → CareerProfile
Raw Job Data → TargetProfile
CareerProfile + TargetProfile → JobMatch
CareerProfile + TargetProfile + JobMatch → Recommendations

This approach makes the workflow easier to reason about and allows each stage to have a clearly defined input/output contract.
Techstack
Frontend: React + Vite
Backend: FastAPI + Python
Database: Supabase
AI Models: AWS Bedrock
Agent Workflow: LangChain / LangGraph
Data Validation: Pydantic
HTTP Client: HTTPX
Future Plans
The current workflow provides the foundation for a more comprehensive career intelligence platform. Future development can extend the system in several directions.
Personalized Mock Interview Preparation
The CareerProfile, TargetProfile, and JobMatch can be used to generate candidate- and role-specific mock interviews rather than generic interview questions. Questions can be based on the candidate's actual experience, projects, skills, and identified gaps, while also reflecting the requirements of the target role. The interview can be made interactive, with the agent adapting follow-up questions based on the candidate's answers. Feedback can also be personalized, highlighting specific strengths, weaknesses, and missed opportunities in relation to both the candidate's background and the target role.
Broader Candidate Analysis
Candidate analysis can be expanded beyond resumes and LinkedIn profiles to include portfolios, personal websites, GitHub repositories, publications, and other relevant public professional profiles. This would provide a more complete view of the candidate's professional brand and allow the system to distinguish between skills that are simply claimed and those supported by demonstrated work. Recommendations could then address not only job applications but also the candidate's overall professional presence.
Deeper Employer Intelligence
The system can move beyond analysing an individual job description by building an understanding of the organisation behind the role. Company websites, careers pages, values, culture, technology environment, and multiple job postings could be analysed to identify broader hiring expectations.
This would allow recommendations and interview preparation to be tailored not only to the role, but also to the specific organisation and its apparent priorities.
Continuous Career Development
The platform can evolve from a point-in-time assessment into a continuous career development system. Candidate progress can be tracked as they complete recommendations, develop skills, gain experience, and update their professional profiles. The system can periodically re-evaluate the candidate's fit against target roles and dynamically update their improvement plan. Identified gaps could be linked to actionable recommendations such as relevant courses, certifications, projects, or experiences.

This creates a continuous feedback loop:
Assess → Identify Gaps → Recommend → Develop → Re-evaluate
Ultimately, the goal is to move from simply answering "How well does this candidate match this role?"  to help candidates understand where they are, where they want to go, and what they should do next to get there.

