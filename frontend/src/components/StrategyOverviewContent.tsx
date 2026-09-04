import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { JobStrategy } from '../types/domain'
import { ImportanceBadge } from './Badge'

interface Props { strategy: JobStrategy; footer?: ReactNode }

export function StrategyOverviewContent({ strategy, footer }: Props) {
  const recommendations = strategy.recommendations.recommendations
  const accepted = recommendations.filter((item) => item.status === 'accepted').length
  const pending = recommendations.filter((item) => item.status === 'pending').length
  const topGaps = strategy.job_match.missing_skills.slice(0, 2)
  const base = `/strategies/${strategy.id}`

  return <>
    <section className="overview-lead">
      <div><p className="eyebrow">Strategy overview</p><h2>Your fit at a glance</h2><p>{strategy.candidate.career_profile.summary}</p></div>
      <div className="overview-score"><strong>{strategy.job_match.overall_score}%</strong><span>overall match</span><Link to={`${base}/match`}>View full match →</Link></div>
    </section>
    <div className="overview-grid">
      <section className="overview-section">
        <div className="overview-section-heading"><div><p className="eyebrow">Strongest alignment</p><h2>What already works</h2></div><Link to={`${base}/match`}>All strengths</Link></div>
        <div className="overview-lines">{strategy.job_match.strengths.slice(0, 3).map((item) => <article key={item.strength}><span aria-hidden="true">✓</span><div><h3>{item.strength}</h3><p>{item.evidence}</p></div></article>)}</div>
      </section>
      <section className="overview-section">
        <div className="overview-section-heading"><div><p className="eyebrow">Priority gaps</p><h2>Where to focus</h2></div><Link to={`${base}/match`}>All gaps</Link></div>
        <div className="overview-gap-list">{topGaps.map((gap) => <article key={gap.skill}><div><h3>{gap.skill}</h3><p>{gap.reason}</p></div><ImportanceBadge value={gap.importance} /></article>)}</div>
      </section>
    </div>
    {footer ?? <section className="action-overview"><div><p className="eyebrow">Action plan</p><h2>{pending ? `${pending} recommendations need your decision` : 'Your recommendations are reviewed'}</h2><p>{accepted} accepted out of {recommendations.length} total recommendations. Nothing is applied without your approval.</p></div><Link className="button button-primary" to={`${base}/recommendations`}>Review action plan <span aria-hidden="true">→</span></Link></section>}
  </>
}
