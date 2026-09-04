import { Navigate, useParams } from 'react-router-dom'
import { StrategyOverviewContent } from '../components/StrategyOverviewContent'
import { useWorkflow } from '../context/useWorkflow'

export function StrategyOverviewPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading } = useWorkflow()
  const strategy = getStrategy(strategyId)
  if (strategiesLoading) return <div className="strategy-content page-width">Loading strategy…</div>
  if (!strategy) return <Navigate to="/strategy-not-found" replace />
  return <div className="strategy-content page-width"><StrategyOverviewContent strategy={strategy} /></div>
}
