import { createContext } from 'react'
import type { CandidateInput, JobStrategy, RecommendationStatus } from '../types/domain'

export interface StrategyDraft {
  candidateInput: CandidateInput
  jobDescription: string
}

export interface WorkflowContextValue {
  strategies: JobStrategy[]
  strategiesLoading: boolean
  draft: StrategyDraft
  setCandidateInput: (input: CandidateInput) => void
  setJobDescription: (description: string) => void
  addStrategy: (strategy: JobStrategy) => void
  getStrategy: (id: string | undefined) => JobStrategy | undefined
  updateRecommendationStatus: (strategyId: string, recommendationId: string, status: RecommendationStatus) => void
  resetDraft: () => void
}

export const WorkflowContext = createContext<WorkflowContextValue | null>(null)
