import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { JobStrategy } from '../types/domain'
import { getRecommendationActions, getRecommendationCounts } from '../utils/recommendations'

interface Props { strategy: JobStrategy; footer?: ReactNode }

export function StrategyOverviewContent({ strategy, footer }: Props) {
  const recommendations = getRecommendationActions(strategy.recommendations)
  const counts = getRecommendationCounts(strategy)
  const topGaps = strategy.job_match.skill_gaps.slice(0, 2)
  const base = `/strategies/${strategy.id}`

  return <>
    <section className="overview-lead">
      <div><p className="eyebrow">Strategy overview</p><h2>Your fit at a glance</h2><p>{strategy.candidate.career_profile.summary}</p></div>
      <div className="overview-score"><strong>{strategy.job_match.match_score}%</strong><span>overall match</span><Link to={`${base}/match`}>View full match →</Link></div>
    </section>
    <div className="overview-grid">
      <section className="overview-section"><div className="overview-section-heading"><div><p className="eyebrow">Strongest alignment</p><h2>What already works</h2></div><Link to={`${base}/match`}>All strengths</Link></div><div className="overview-lines">{strategy.job_match.strengths.slice(0, 3).map((item) => <article key={item}><span aria-hidden="true">✓</span><div><h3>{item}</h3></div></article>)}</div></section>
      <section className="overview-section"><div className="overview-section-heading"><div><p className="eyebrow">Priority gaps</p><h2>Where to focus</h2></div><Link to={`${base}/match`}>All gaps</Link></div>{topGaps.length ? <div className="overview-gap-list">{topGaps.map((gap) => <article key={gap}><div><h3>{gap}</h3></div></article>)}</div> : <p>No skill gaps were identified.</p>}</section>
    </div>
    {footer ?? <section className="action-overview"><div><p className="eyebrow">Action plan</p><h2>{counts.pending ? `${counts.pending} recommendations need your decision` : 'Your recommendations are reviewed'}</h2><p>{counts.accepted} accepted out of {recommendations.length} total recommendations. Decisions are kept in this browser for now.</p></div><Link className="button button-primary" to={`${base}/recommendations`}>Review action plan <span aria-hidden="true">→</span></Link></section>}
  </>
}
