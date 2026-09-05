import { Link, Navigate, useParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { useWorkflow } from '../context/useWorkflow'

function ResultList({ items, empty }: { items: string[]; empty: string }) {
  return items.length ? <div className="strength-list">{items.map((item) => <article key={item}><span aria-hidden="true">✓</span><div><h3>{item}</h3></div></article>)}</div> : <EmptyState>{empty}</EmptyState>
}

export function MatchPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading } = useWorkflow()
  const strategy = getStrategy(strategyId)
  if (strategiesLoading) return <div className="strategy-content page-width">Loading match analysis…</div>
  if (!strategy || !strategyId) return <Navigate to="/strategy-not-found" replace />
  const jobMatch = strategy.job_match
  const score = Math.min(100, Math.max(0, jobMatch.match_score))

  return <div className="results-page page-width">
    <header className="results-header strategy-result-header"><div><p className="eyebrow">Match analysis</p><h2>How your experience compares</h2><p>See where you already align and which gaps deserve your attention.</p></div><div className="score-summary" aria-label={`${jobMatch.match_score} percent overall match`}><div><strong>{jobMatch.match_score}%</strong><span>overall match</span></div><div className="score-bar" aria-hidden="true"><span style={{ width: `${score}%` }} /></div><p>Use the details below to focus your preparation for this role.</p></div></header>
    <section className="results-section strengths-section"><div className="section-heading"><p className="eyebrow">What already aligns</p><h2>Your strongest signals</h2></div><ResultList items={jobMatch.strengths} empty="No strengths were identified for this role yet." /></section>
    <section className="results-section"><div className="section-heading"><p className="eyebrow">Where to focus</p><h2>Skill gaps</h2></div><ResultList items={jobMatch.skill_gaps} empty="No skill gaps were identified for this role." /></section>
    <section className="results-section"><div className="section-heading"><p className="eyebrow">Supporting detail</p><h2>Evidence used in this match</h2></div><ResultList items={jobMatch.evidence} empty="No supporting evidence was returned." /></section>
    <section className="results-section"><div className="section-heading"><p className="eyebrow">Suggested next steps</p><h2>How to strengthen your fit</h2></div><ResultList items={jobMatch.recommendations} empty="No match-level next steps were returned." /></section>
    <div className="sticky-next"><div><strong>Ready to close the gaps?</strong><span>Turn this analysis into specific changes you control.</span></div><Link className="button button-primary" to={`/strategies/${strategyId}/recommendations`}>Review my action plan <span aria-hidden="true">→</span></Link></div>
  </div>
}
