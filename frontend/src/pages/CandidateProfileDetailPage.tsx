import { Navigate, useParams } from 'react-router-dom'
import { useWorkflow } from '../context/useWorkflow'

export function CandidateProfileDetailPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading } = useWorkflow()
  const strategy = getStrategy(strategyId)
  if (strategiesLoading) return <div className="strategy-content page-width">Loading candidate profile…</div>
  if (!strategy) return <Navigate to="/strategy-not-found" replace />
  const profile = strategy.candidate.career_profile

  return (
    <div className="strategy-content detail-page page-width">
      <header className="detail-header"><p className="eyebrow">Candidate profile</p><h2>The experience used for this strategy</h2><p>This is the candidate snapshot that the match and action plan are based on.</p></header>
      <section className="profile-summary"><div className="profile-monogram" aria-hidden="true">{profile.candidate_name.split(' ').map((name) => name[0]).join('')}</div><div><h2>{profile.candidate_name}</h2><p>{profile.summary}</p></div></section>
      <div className="detail-grid">
        <section><h2>Skills</h2><div className="profile-skill-list">{profile.skills.map((skill) => <div key={skill.name}><strong>{skill.name}</strong><span>{skill.proficiency ?? 'Level not specified'} · {skill.category}</span></div>)}</div></section>
        <section><h2>Experience</h2>{profile.experience.map((item) => <article className="timeline-item" key={`${item.company}-${item.role}`}><h3>{item.role}</h3><p className="item-meta">{item.company} · {item.start_date ?? 'Start date not specified'}–{item.end_date ?? 'Present'}</p><p>{item.description}</p>{item.achievements.length > 0 && <ul>{item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>}</article>)}</section>
        <section><h2>Education</h2>{profile.education.map((item) => <article className="timeline-item" key={item.institution}><h3>{item.degree ?? 'Education'}</h3><p className="item-meta">{item.institution}{item.field ? ` · ${item.field}` : ''}</p><p>{item.description}</p></article>)}</section>
        <section><h2>Projects & credentials</h2>{profile.projects.map((item) => <article className="timeline-item" key={item.name}><h3>{item.name}</h3><p>{item.description}</p><span className="item-meta">{item.technologies.join(' · ')}</span></article>)}{!profile.projects.length && !profile.certifications.length && <p className="empty-state">No projects or certifications were extracted.</p>}</section>
      </div>
      <section className="source-snapshot"><div><h2>Original source text</h2><p>Review the exact information used to create this profile.</p></div><details><summary>Resume text</summary><pre>{strategy.candidate.inputs.resume_text}</pre></details><details><summary>LinkedIn text</summary><pre>{strategy.candidate.inputs.linkedin_text}</pre></details></section>
    </div>
  )
}

