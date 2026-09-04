import { Link } from 'react-router-dom'
import type { JobStrategy } from '../types/domain'

function relativeDate(value: string) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000))
  if (days === 0) return 'Updated today'
  if (days === 1) return 'Updated yesterday'
  return `Updated ${days} days ago`
}

export function StrategyListItem({ strategy }: { strategy: JobStrategy }) {
  const items = strategy.recommendations.recommendations
  const reviewed = items.filter((item) => item.status !== 'pending').length
  const accepted = items.filter((item) => item.status === 'accepted').length
  const description = strategy.target_profile.responsibilities[0]?.description ?? strategy.job_description

  return (
    <article className="strategy-row">
      <Link className="strategy-main-link" to={`/strategies/${strategy.id}`} aria-label={`Open ${strategy.target_profile.role} at ${strategy.target_profile.company}`}>
        <div className="strategy-icon" aria-hidden="true">{strategy.target_profile.company.charAt(0)}</div>
        <div className="strategy-identity">
          <h2>{strategy.target_profile.role}</h2>
          <p className="strategy-company">{strategy.target_profile.company}{strategy.target_profile.seniority ? ` · ${strategy.target_profile.seniority}` : ''}</p>
          <p className="strategy-description">{description}</p>
        </div>
      </Link>
      <div className="strategy-metrics">
        <div className="compact-score"><strong>{strategy.job_match.overall_score}%</strong><span>match</span></div>
        <div className="compact-progress">
          <span>{reviewed} of {items.length} reviewed</span>
          <div aria-hidden="true"><i style={{ width: `${items.length ? (reviewed / items.length) * 100 : 0}%` }} /></div>
          <small>{accepted} accepted · {relativeDate(strategy.updated_at)}</small>
        </div>
        <Link className="row-arrow" to={`/strategies/${strategy.id}`} aria-hidden="true" tabIndex={-1}>→</Link>
      </div>
    </article>
  )
}

