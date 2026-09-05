import { Link, NavLink, useParams } from 'react-router-dom'
import { useWorkflow } from '../context/useWorkflow'

const sections = [
  { end: true, label: 'Overview', suffix: '' },
  { label: 'Candidate profile', suffix: '/profile' },
  { label: 'Target job', suffix: '/target' },
  { label: 'Match', suffix: '/match' },
  { label: 'Action plan', suffix: '/recommendations' },
]

export function StrategyWorkspaceHeader() {
  const { strategyId } = useParams()
  const { getStrategy } = useWorkflow()
  const strategy = getStrategy(strategyId)
  if (!strategy || !strategyId) return null
  const base = `/strategies/${strategyId}`

  return (
    <div className="strategy-workspace-header">
      <div className="page-width">
        <Link className="back-to-dashboard" to="/">← All job strategies</Link>
        <div className="workspace-title-row">
          <div><h1>{strategy.target_profile.role}</h1><p>{strategy.target_profile.company}</p></div>
        </div>
        <nav className="strategy-tabs" aria-label="Strategy sections">
          {sections.map((section) => <NavLink key={section.label} end={section.end} to={`${base}${section.suffix}`} className={({ isActive }) => isActive ? 'active' : ''}>{section.label}</NavLink>)}
        </nav>
      </div>
    </div>
  )
}
