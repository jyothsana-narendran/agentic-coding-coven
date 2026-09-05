import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { StrategyOverviewContent } from '../components/StrategyOverviewContent'
import { useWorkflow } from '../context/useWorkflow'

export function CreatedStrategyPage() {
  const { strategyId } = useParams()
  const { getStrategy, resetDraft, strategiesLoading } = useWorkflow()
  const strategy = getStrategy(strategyId)

  useEffect(() => resetDraft(), [resetDraft])

  if (strategiesLoading) return <div className="created-strategy page-width-narrow">Preparing your strategy…</div>
  if (!strategy || !strategyId) return <Navigate to="/strategy-not-found" replace />

  return (
    <div className="created-strategy page-width">
      <header className="creation-success">
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">Job strategy created</p>
        <h1>Your strategy for {strategy.target_profile.role} is ready.</h1>
        <p>We compared your experience with the role at {strategy.target_profile.company} and created a focused action plan.</p>
      </header>

      <div className="created-overview-wrap">
        <StrategyOverviewContent strategy={strategy} footer={<div className="created-actions"><Link className="button button-primary" to={`/strategies/${strategyId}`}>More information <span aria-hidden="true">→</span></Link><Link className="button button-secondary" to="/">Return to home</Link></div>} />
      </div>
    </div>
  )
}
