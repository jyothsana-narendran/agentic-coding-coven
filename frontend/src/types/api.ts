import type { CareerProfile, JobMatch, RecommendationResult, TargetProfile } from './domain'

export interface CareerPipelineRequest {
  resume_text: string
  linkedin_text: string
  job_description: string
}

export interface CareerPipelineResponse {
  candidate_id?: string
  resume_text?: string
  linkedin_text?: string
  job_description?: string
  career_profile: CareerProfile
  target_profile: TargetProfile
  job_match: JobMatch
  recommendations: RecommendationResult
  persisted?: {
    career_profile?: string
    target_profile?: string
    job_match?: string
    recommendations?: string
  }
  error?: string | null
}

export interface InterviewCoachRequest {
  question: string
  answer: string
  job_context: string
}

export interface InterviewFeedback {
  overall_score: number
  strengths: string[]
  improvements: string[]
  communication_score: number
  relevance_score: number
  structure_score: number
  confidence_score: number
  filler_words: string[]
  suggested_answer: string
  next_question: string
}

export interface InterviewCoachResponse {
  id: string
  kind: string
  user_id: string
  status: string
  category: string
  content: {
    question: string
    answer: string
    feedback: InterviewFeedback
  }
}
