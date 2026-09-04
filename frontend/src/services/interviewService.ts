import type { InterviewCoachRequest, InterviewCoachResponse, InterviewFeedback } from '../types/api'
import { ApiError, postJson } from './apiClient'

const dataSource = (import.meta.env.VITE_DATA_SOURCE as string | undefined)?.toLowerCase() ?? 'mock'

const mockFeedback: InterviewFeedback = {
  overall_score: 76,
  strengths: ['You established clear personal ownership.', 'Your answer connects the work to a customer problem.', 'The sequence is easy to follow.'],
  improvements: ['Name the most important trade-off you personally decided.', 'Add one measurable result to establish impact.', 'End by connecting what you learned to this role.'],
  communication_score: 78,
  relevance_score: 80,
  structure_score: 74,
  confidence_score: 72,
  filler_words: [],
  suggested_answer: 'Clarify the decision you made, the trade-off you considered, and the measurable outcome. Use only details that are true to your experience.',
  next_question: '',
}

export async function getInterviewFeedback(request: InterviewCoachRequest): Promise<InterviewFeedback> {
  if (dataSource === 'mock') {
    await new Promise((resolve) => window.setTimeout(resolve, 700))
    return structuredClone(mockFeedback)
  }
  if (dataSource !== 'api') throw new ApiError('VITE_DATA_SOURCE must be either "api" or "mock".')
  const response = await postJson<InterviewCoachResponse, InterviewCoachRequest>('/interviews/coach', request)
  return response.content.feedback
}
