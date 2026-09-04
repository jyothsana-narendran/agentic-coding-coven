import { Link, Navigate, useParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { GapCard } from '../components/GapCard'
import { ImportanceBadge } from '../components/Badge'
import { useWorkflow } from '../context/useWorkflow'
import type { Importance } from '../types/domain'

const importanceOrder: Record<Importance, number> = { critical: 0, high: 1, medium: 2, low: 3 }

export function MatchPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading } = useWorkflow()
  const strategy = getStrategy(strategyId)
  if (strategiesLoading) return <div className="strategy-content page-width">Loading match analysis…</div>
  if (!strategy || !strategyId) return <Navigate to="/strategy-not-found" replace />
  const jobMatch = strategy.job_match

  const score = Math.min(100, Math.max(0, jobMatch.overall_score))
  const sortedGaps = [...jobMatch.missing_skills].sort((a, b) => importanceOrder[a.importance] - importanceOrder[b.importance])

  return (
    <div className="results-page page-width">
      <header className="results-header strategy-result-header">
        <div><p className="eyebrow">Match analysis</p><h2>How your experience compares</h2><p>See where you already align and which gaps deserve your attention.</p></div>
        <div className="score-summary" aria-label={`${jobMatch.overall_score} percent overall match`}>
          <div><strong>{jobMatch.overall_score}%</strong><span>overall match</span></div>
          <div className="score-bar" aria-hidden="true"><span style={{ width: `${score}%` }} /></div>
          <p>You have a strong foundation. Focus next on making senior-level scope more visible.</p>
        </div>
      </header>

      <section className="results-section strengths-section" aria-labelledby="strengths-heading">
        <div className="section-heading"><p className="eyebrow">What already aligns</p><h2 id="strengths-heading">Your strongest signals</h2></div>
        {jobMatch.strengths.length ? <div className="strength-list">{jobMatch.strengths.map((item) => <article key={item.strength}><span aria-hidden="true">✓</span><div><h3>{item.strength}</h3><p>{item.evidence}</p></div></article>)}</div> : <EmptyState>No strengths were identified for this role yet.</EmptyState>}
      </section>

      <section className="results-section" aria-labelledby="skills-heading">
        <div className="section-heading split-heading"><div><p className="eyebrow">Evidence of fit</p><h2 id="skills-heading">Matched skills</h2></div><span>{jobMatch.matched_skills.length} aligned</span></div>
        {jobMatch.matched_skills.length ? <div className="matched-skills">{jobMatch.matched_skills.map((item) => <article key={item.skill}><div className="item-heading"><h3>{item.skill}</h3><ImportanceBadge value={item.target_importance} /></div><p>{item.evidence}</p><span className="skill-level">Your level: {item.candidate_level ?? 'Not specified'}</span></article>)}</div> : <EmptyState>No directly matched skills were identified.</EmptyState>}
      </section>

      <section className="results-section" aria-labelledby="gaps-heading">
        <div className="section-heading"><p className="eyebrow">Where to focus</p><h2 id="gaps-heading">Priority skill gaps</h2><p>Higher-priority gaps appear first so you know where your effort will matter most.</p></div>
        {sortedGaps.length ? <div className="gap-list">{sortedGaps.map((gap) => <GapCard key={gap.skill} gap={gap} />)}</div> : <EmptyState>No missing skills were identified for this role.</EmptyState>}
      </section>

      <section className="results-section secondary-gaps" aria-labelledby="other-gaps-heading">
        <div className="section-heading"><p className="eyebrow">Supporting detail</p><h2 id="other-gaps-heading">Other areas to address</h2></div>
        <div className="two-column-detail">
          <div><h3>Experience gaps</h3>{jobMatch.experience_gaps.length ? <ul>{jobMatch.experience_gaps.map((gap) => <li key={gap}>{gap}</li>)}</ul> : <EmptyState>No experience gaps identified.</EmptyState>}</div>
          <div><h3>Keywords to strengthen</h3>{jobMatch.keyword_gaps.length ? <div className="keyword-list">{jobMatch.keyword_gaps.map((keyword) => <span key={keyword}>{keyword}</span>)}</div> : <EmptyState>No keyword gaps identified.</EmptyState>}</div>
        </div>
      </section>

      <div className="sticky-next"><div><strong>Ready to close the gaps?</strong><span>Turn this analysis into specific changes you control.</span></div><Link className="button button-primary" to={`/strategies/${strategyId}/recommendations`}>Review my action plan <span aria-hidden="true">→</span></Link></div>
    </div>
  )
}
