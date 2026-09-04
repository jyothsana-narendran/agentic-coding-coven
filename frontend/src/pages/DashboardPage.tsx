import { Link } from 'react-router-dom'
import { StrategyListItem } from '../components/StrategyListItem'
import { useWorkflow } from '../context/useWorkflow'
import { getRecommendationCounts } from '../utils/recommendations'

export function DashboardPage() {
  const { strategies, strategiesLoading } = useWorkflow()
  const pending = strategies.reduce((total, strategy) => total + getRecommendationCounts(strategy).pending, 0)

  if (strategiesLoading) return <div className="dashboard page-width"><div className="dashboard-loading" aria-live="polite">Loading your job strategies…</div></div>

  if (!strategies.length) {
    return (
      <div className="empty-dashboard page-width-narrow">
        <p className="eyebrow">Your career workspace</p><h1>Build your first job strategy</h1>
        <p className="lede">Compare your experience with a target role and turn the gaps into a focused action plan you control.</p>
        <Link className="button button-primary button-large" to="/new/profile">Analyze your first job <span aria-hidden="true">→</span></Link>
      </div>
    )
  }

  return (
    <div className="dashboard page-width">
      <header className="dashboard-header">
        <div><p className="eyebrow">Your career workspace</p><h1>Job strategies</h1><p>Return to a target role, review your fit, and keep moving your action plan forward.</p></div>
        <Link className="button button-primary" to="/new/profile">+ Analyze another job</Link>
      </header>
      <section className="dashboard-workflow" aria-labelledby="workflow-heading">
        <div><p className="eyebrow">How it works</p><h2 id="workflow-heading">From your experience to a focused plan</h2></div>
        <ol>
          <li><span>1</span><p><strong>Add your profile</strong>Paste your resume and LinkedIn information.</p></li>
          <li><span>2</span><p><strong>Add a target job</strong>Share the role you want to assess.</p></li>
          <li><span>3</span><p><strong>Review your strategy</strong>See your fit, gaps, and recommended actions.</p></li>
        </ol>
      </section>
      <div className="dashboard-summary" aria-label="Workspace summary">
        <p><strong>{strategies.length}</strong> active job {strategies.length === 1 ? 'strategy' : 'strategies'}</p>
        <p><strong>{pending}</strong> recommendation{pending === 1 ? '' : 's'} waiting for review</p>
      </div>
      <section className="strategy-list" aria-label="Saved job strategies">
        {strategies.map((strategy) => <StrategyListItem key={strategy.id} strategy={strategy} />)}
      </section>
    </div>
  )
}
