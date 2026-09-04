import { mockJobStrategies } from '../data/mockData'
import type { JobStrategy, RecommendationStatus } from '../types/domain'

const clone = <T,>(value: T): T => structuredClone(value)

// Mock persistence boundary. These methods can become FastAPI requests while
// pages and context continue using the same JobStrategy contract.
export async function listJobStrategies(): Promise<JobStrategy[]> {
  return clone(mockJobStrategies)
}

export async function persistRecommendationDecision(
  _strategyId: string,
  _recommendationId: string,
  _status: RecommendationStatus,
): Promise<void> {
  void _strategyId
  void _recommendationId
  void _status
}
