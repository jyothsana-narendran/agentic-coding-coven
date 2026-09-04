import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { listJobStrategies, persistRecommendationDecision } from '../services/strategyService'
import type { JobStrategy } from '../types/domain'
import { WorkflowContext, type StrategyDraft, type WorkflowContextValue } from './WorkflowContextDefinition'

const emptyDraft: StrategyDraft = {
  candidateInput: { resume_text: '', linkedin_text: '' },
  jobDescription: '',
}

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [strategies, setStrategies] = useState<JobStrategy[]>([])
  const [strategiesLoading, setStrategiesLoading] = useState(true)
  const [draft, setDraft] = useState<StrategyDraft>(emptyDraft)

  useEffect(() => {
    let active = true
    void listJobStrategies().then((items) => {
      if (active) {
        setStrategies(items)
        setStrategiesLoading(false)
      }
    })
    return () => { active = false }
  }, [])

  const setCandidateInput = useCallback((candidateInput: StrategyDraft['candidateInput']) => {
    setDraft((current) => ({ ...current, candidateInput }))
  }, [])
  const setJobDescription = useCallback((jobDescription: string) => {
    setDraft((current) => ({ ...current, jobDescription }))
  }, [])
  const addStrategy = useCallback((strategy: JobStrategy) => {
    setStrategies((current) => [strategy, ...current])
  }, [])
  const getStrategy = useCallback((id: string | undefined) => strategies.find((strategy) => strategy.id === id), [strategies])
  const updateRecommendationStatus = useCallback<WorkflowContextValue['updateRecommendationStatus']>((strategyId, recommendationId, status) => {
    setStrategies((current) => current.map((strategy) => strategy.id === strategyId
      ? {
          ...strategy,
          updated_at: new Date().toISOString(),
          recommendations: {
            recommendations: strategy.recommendations.recommendations.map((recommendation) =>
              recommendation.id === recommendationId ? { ...recommendation, status } : recommendation,
            ),
          },
        }
      : strategy))
    void persistRecommendationDecision(strategyId, recommendationId, status)
  }, [])
  const resetDraft = useCallback(() => setDraft(emptyDraft), [])

  const value = useMemo<WorkflowContextValue>(() => ({
    strategies,
    strategiesLoading,
    draft,
    setCandidateInput,
    setJobDescription,
    addStrategy,
    getStrategy,
    updateRecommendationStatus,
    resetDraft,
  }), [addStrategy, draft, getStrategy, resetDraft, setCandidateInput, setJobDescription, strategies, strategiesLoading, updateRecommendationStatus])

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>
}
