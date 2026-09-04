import { mockCareerProfile, mockJobMatch, mockRecommendations, mockTargetProfile } from '../data/mockData'
import type { CareerPipelineRequest, CareerPipelineResponse } from '../types/api'
import type { CandidateInput, CareerProfile, JobMatch, JobStrategy, RecommendationResult, TargetProfile } from '../types/domain'
import { ApiError, postJson } from './apiClient'

const dataSource = (import.meta.env.VITE_DATA_SOURCE as string | undefined)?.toLowerCase() ?? 'mock'
const inFlightRequests = new Map<string, Promise<CareerPipelineResponse>>()
const clone = <T,>(value: T): T => structuredClone(value)
const asList = <T,>(value: T[] | undefined): T[] => Array.isArray(value) ? value : []

async function mockPipeline(request: CareerPipelineRequest): Promise<CareerPipelineResponse> {
  await new Promise((resolve) => window.setTimeout(resolve, 2000))
  return {
    candidate_id: 'mock-candidate',
    career_profile: clone(mockCareerProfile),
    target_profile: clone(mockTargetProfile),
    job_match: clone(mockJobMatch),
    recommendations: clone(mockRecommendations),
    resume_text: request.resume_text,
    linkedin_text: request.linkedin_text,
    job_description: request.job_description,
  }
}

function runPipeline(request: CareerPipelineRequest): Promise<CareerPipelineResponse> {
  const requestKey = JSON.stringify(request)
  const existing = inFlightRequests.get(requestKey)
  if (existing) return existing

  let promise: Promise<CareerPipelineResponse>
  if (dataSource === 'api') promise = postJson<CareerPipelineResponse, CareerPipelineRequest>('/profile/pipeline', request)
  else if (dataSource === 'mock') promise = mockPipeline(request)
  else promise = Promise.reject(new ApiError('VITE_DATA_SOURCE must be either "api" or "mock".'))

  inFlightRequests.set(requestKey, promise)
  void promise.finally(() => inFlightRequests.delete(requestKey)).catch(() => undefined)
  return promise
}

function normalizeCareerProfile(profile: CareerProfile): CareerProfile {
  return {
    ...profile,
    education: asList(profile.education),
    skills: asList(profile.skills),
    experience: asList(profile.experience),
    projects: asList(profile.projects),
    achievements: asList(profile.achievements),
    certifications: asList(profile.certifications),
    summary: profile.summary ?? '',
  }
}

function normalizeTargetProfile(profile: TargetProfile): TargetProfile {
  return {
    ...profile,
    responsibilities: asList(profile.responsibilities),
    required_skills: asList(profile.required_skills),
    preferred_skills: asList(profile.preferred_skills),
    soft_skills: asList(profile.soft_skills),
    experience_requirements: asList(profile.experience_requirements),
    education_requirements: asList(profile.education_requirements),
    keywords: asList(profile.keywords),
    signals: asList(profile.signals),
  }
}

function normalizeJobMatch(match: JobMatch): JobMatch {
  return {
    match_score: Number.isFinite(match.match_score) ? match.match_score : 0,
    strengths: asList(match.strengths),
    skill_gaps: asList(match.skill_gaps),
    evidence: asList(match.evidence),
    recommendations: asList(match.recommendations),
  }
}

function normalizeRecommendations(result: RecommendationResult): RecommendationResult {
  return {
    priority_actions: asList(result.priority_actions),
    resume_recommendations: asList(result.resume_recommendations),
    linkedin_recommendations: asList(result.linkedin_recommendations),
    skill_recommendations: asList(result.skill_recommendations),
    interview_recommendations: asList(result.interview_recommendations),
    rationale: asList(result.rationale),
  }
}

export async function createJobStrategy(input: CandidateInput, jobDescription: string): Promise<JobStrategy> {
  const request: CareerPipelineRequest = {
    resume_text: input.resume_text,
    linkedin_text: input.linkedin_text,
    job_description: jobDescription,
  }
  const response = await runPipeline(request)
  if (response.error) throw new ApiError('The AI analysis could not be completed. Please try again.')
  const now = new Date().toISOString()

  return {
    id: `strategy-${Date.now()}`,
    created_at: now,
    updated_at: now,
    candidate: { inputs: clone(input), career_profile: normalizeCareerProfile(response.career_profile) },
    job_description: jobDescription,
    target_profile: normalizeTargetProfile(response.target_profile),
    job_match: normalizeJobMatch(response.job_match),
    recommendations: normalizeRecommendations(response.recommendations),
    recommendation_decisions: {},
    backend_refs: response.persisted,
  }
}
