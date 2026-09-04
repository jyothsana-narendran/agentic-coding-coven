import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { RecommendationCard } from '../components/RecommendationCard'
import { EmptyState } from '../components/EmptyState'
import { useWorkflow } from '../context/useWorkflow'
import type { RecommendationCategory } from '../types/domain'
import { getRecommendationActions, getRecommendationCounts, getRecommendationStatus } from '../utils/recommendations'

const categories: Array<{ value: 'all' | RecommendationCategory; label: string }> = [
  { value: 'all', label: 'All' }, { value: 'priority', label: 'Priority' }, { value: 'resume', label: 'Resume' }, { value: 'linkedin', label: 'LinkedIn' }, { value: 'skills', label: 'Skills' }, { value: 'interview', label: 'Interview' },
]

export function RecommendationsPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading, updateRecommendationStatus } = useWorkflow()
  const [filter, setFilter] = useState<'all' | RecommendationCategory>('all')
  const strategy = getStrategy(strategyId)
  if (strategiesLoading) return <div className="strategy-content page-width">Loading action plan…</div>
  if (!strategy || !strategyId) return <Navigate to="/strategy-not-found" replace />
  const actions = getRecommendationActions(strategy.recommendations)
  const counts = getRecommendationCounts(strategy)
  const filtered = actions.filter((item) => filter === 'all' || item.category === filter)

  return <div className="recommendations-page page-width">
    <header className="recommendations-header strategy-recommendations-header"><div><p className="eyebrow">Your action plan</p><h2>Choose what you want to improve</h2><p>These suggestions were generated for the {strategy.target_profile.role} role. Your accept and reject decisions stay local in this version.</p></div><aside className="review-summary" aria-label="Review progress"><div><strong>{counts.pending}</strong><span>to review</span></div><div><strong>{counts.accepted}</strong><span>accepted</span></div><div><strong>{counts.rejected}</strong><span>rejected</span></div></aside></header>
    <div className="review-principle"><span aria-hidden="true">✓</span><p><strong>You stay in control.</strong> Review each recommendation, then accept or reject it for this saved strategy.</p></div>
    <div className="filter-row" role="group" aria-label="Filter recommendations by category">{categories.map((category) => <button key={category.value} type="button" className={filter === category.value ? 'active' : ''} aria-pressed={filter === category.value} onClick={() => setFilter(category.value)}>{category.label}</button>)}</div>
    <div className="recommendation-list">{filtered.length ? filtered.map((action) => <RecommendationCard key={action.key} actionKey={action.key} category={action.category} recommendation={action.text} status={getRecommendationStatus(strategy, action.key)} onDecision={(id, status) => updateRecommendationStatus(strategyId, id, status)} />) : <EmptyState>No recommendations in this category.</EmptyState>}</div>
    {strategy.recommendations.rationale.length > 0 && <section className="results-section"><div className="section-heading"><p className="eyebrow">Why this plan</p><h2>Recommendation rationale</h2></div><ul>{strategy.recommendations.rationale.map((reason) => <li key={reason}>{reason}</li>)}</ul></section>}
    <div className="completion-panel"><div><p className="eyebrow">Next step</p><h2>Practice telling the stronger story</h2><p>Use your accepted improvements and match insights to prepare for interviews.</p></div><Link className="button button-primary" to={`/strategies/${strategyId}/interview`}>Practice interview <span aria-hidden="true">→</span></Link></div>
  </div>
}
