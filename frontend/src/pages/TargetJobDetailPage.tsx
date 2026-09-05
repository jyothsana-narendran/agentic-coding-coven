import { Navigate, useParams } from 'react-router-dom'
import { ImportanceBadge } from '../components/Badge'
import { useWorkflow } from '../context/useWorkflow'

export function TargetJobDetailPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading } = useWorkflow()
  const strategy = getStrategy(strategyId)
  if (strategiesLoading) return <div className="strategy-content page-width">Loading target job…</div>
  if (!strategy) return <Navigate to="/strategy-not-found" replace />
  const target = strategy.target_profile

  return (
    <div className="strategy-content detail-page page-width">
      <header className="detail-header"><p className="eyebrow">Target job</p><h2>What {target.company} is looking for</h2><p>The role requirements extracted from the posting used for this strategy.</p></header>
      <div className="target-summary"><div><span>Company</span><strong>{target.company}</strong></div><div><span>Role</span><strong>{target.role}</strong></div><div><span>Seniority</span><strong>{target.seniority ?? 'Not specified'}</strong></div></div>
      <section className="target-section"><h2>Key responsibilities</h2><div className="responsibility-list">{target.responsibilities.map((item) => <article key={item.description}><h3>{item.description}</h3><p>From posting: “{item.evidence_from_jd}”</p></article>)}</div></section>
      <section className="target-section"><h2>Skills</h2><div className="target-skills"><div><h3>Required</h3>{target.required_skills.map((skill) => <article key={skill.name}><div><strong>{skill.name}</strong><p>{skill.evidence_from_jd}</p></div><ImportanceBadge value={skill.importance} /></article>)}</div><div><h3>Preferred</h3>{target.preferred_skills.map((skill) => <article key={skill.name}><div><strong>{skill.name}</strong><p>{skill.evidence_from_jd}</p></div><ImportanceBadge value={skill.importance} /></article>)}</div></div></section>
      <section className="target-section requirement-grid"><div><h2>Experience</h2><ul>{target.experience_requirements.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h2>Role signals</h2><ul>{target.signals.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
      <section className="source-snapshot"><div><h2>Original job posting</h2><p>The complete description used for this analysis.</p></div><details><summary>View full job description</summary><pre>{strategy.job_description}</pre></details></section>
    </div>
  )
}

