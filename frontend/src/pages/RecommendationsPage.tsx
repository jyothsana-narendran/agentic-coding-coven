import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { RecommendationCard } from '../components/RecommendationCard'
import { EmptyState } from '../components/EmptyState'
import { useWorkflow } from '../context/useWorkflow'
import type { RecommendationCategory } from '../types/domain'

const categories: Array<{ value: 'all' | RecommendationCategory; label: string }> = [
  { value: 'all', label: 'All' }, { value: 'resume', label: 'Resume' }, { value: 'linkedin', label: 'LinkedIn' },
  { value: 'skills', label: 'Skills' }, { value: 'projects', label: 'Projects' }, { value: 'interview', label: 'Interview' }, { value: 'career', label: 'Career' },
]

export function RecommendationsPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading, updateRecommendationStatus } = useWorkflow()
  const [filter, setFilter] = useState<'all' | RecommendationCategory>('all')
  const strategy = getStrategy(strategyId)
  if (strategiesLoading) return <div className="strategy-content page-width">Loading action plan…</div>
  if (!strategy || !strategyId) return <Navigate to="/strategy-not-found" replace />
  const { recommendations, target_profile: targetProfile } = strategy

  const counts = recommendations.recommendations.reduce((result, item) => ({ ...result, [item.status]: result[item.status] + 1 }), { pending: 0, accepted: 0, rejected: 0 })
  const filtered = recommendations.recommendations.filter((item) => filter === 'all' || item.category === filter)

  return (
    <div className="recommendations-page page-width">
      <header className="recommendations-header strategy-recommendations-header">
        <div><p className="eyebrow">Your action plan</p><h2>Choose what you want to improve</h2><p>Each suggestion is grounded in your profile and the {targetProfile.role} role. Nothing changes unless you approve it.</p></div>
        <aside className="review-summary" aria-label="Review progress"><div><strong>{counts.pending}</strong><span>to review</span></div><div><strong>{counts.accepted}</strong><span>accepted</span></div><div><strong>{counts.rejected}</strong><span>rejected</span></div></aside>
      </header>

      <div className="review-principle"><span aria-hidden="true">✓</span><p><strong>You stay in control.</strong> Review each recommendation, understand the evidence, then accept or reject it.</p></div>

      <div className="filter-row" role="group" aria-label="Filter recommendations by category">
        {categories.map((category) => <button key={category.value} type="button" className={filter === category.value ? 'active' : ''} aria-pressed={filter === category.value} onClick={() => setFilter(category.value)}>{category.label}</button>)}
      </div>

      <div className="recommendation-list">
        {filtered.length ? filtered.map((recommendation) => <RecommendationCard key={recommendation.id} recommendation={recommendation} onDecision={(id, status) => updateRecommendationStatus(strategyId, id, status)} />) : <EmptyState>No recommendations in this category.</EmptyState>}
      </div>

      <div className="completion-panel"><div><p className="eyebrow">Next step</p><h2>Practice telling the stronger story</h2><p>Use your accepted improvements and match insights to prepare for interviews.</p></div><Link className="button button-primary" to={`/strategies/${strategyId}/interview`}>Practice interview <span aria-hidden="true">→</span></Link></div>
    </div>
  )
}
