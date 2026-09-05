import type { JobStrategy, RecommendationCategory, RecommendationResult, RecommendationStatus } from '../types/domain'

export interface RecommendationAction {
  key: string
  category: RecommendationCategory
  text: string
}

const groups: Array<{ field: keyof Omit<RecommendationResult, 'rationale'>; category: RecommendationCategory }> = [
  { field: 'priority_actions', category: 'priority' },
  { field: 'resume_recommendations', category: 'resume' },
  { field: 'linkedin_recommendations', category: 'linkedin' },
  { field: 'skill_recommendations', category: 'skills' },
  { field: 'interview_recommendations', category: 'interview' },
]

export function getRecommendationActions(recommendations: RecommendationResult): RecommendationAction[] {
  return groups.flatMap(({ field, category }) => recommendations[field].map((text, index) => ({
    key: `${category}:${index}`,
    category,
    text,
  })))
}

export function getRecommendationStatus(strategy: JobStrategy, key: string): RecommendationStatus {
  return strategy.recommendation_decisions[key] ?? 'pending'
}

export function getRecommendationCounts(strategy: JobStrategy): Record<RecommendationStatus, number> {
  return getRecommendationActions(strategy.recommendations).reduce<Record<RecommendationStatus, number>>(
    (counts, action) => ({ ...counts, [getRecommendationStatus(strategy, action.key)]: counts[getRecommendationStatus(strategy, action.key)] + 1 }),
    { pending: 0, accepted: 0, rejected: 0 },
  )
}
