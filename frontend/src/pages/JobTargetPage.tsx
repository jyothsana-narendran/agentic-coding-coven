import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useWorkflow } from '../context/useWorkflow'

export function JobTargetPage() {
  const navigate = useNavigate()
  const { draft, setJobDescription } = useWorkflow()
  const [description, setDescription] = useState(draft.jobDescription)
  const [submitted, setSubmitted] = useState(false)

  if (!draft.candidateInput.resume_text) return <Navigate to="/new/profile" replace />

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (!description.trim()) return
    setJobDescription(description.trim())
    navigate('/new/analysis')
  }

  return (
    <div className="form-page page-width-narrow">
      <Link className="back-to-dashboard" to="/">← Cancel and return to job strategies</Link>
      <header className="page-header"><p className="eyebrow">Step 2 of 3</p><h1>Add your target role</h1><p>Paste the complete job description. We’ll identify the role’s priorities, expectations, and language before comparing your fit.</p></header>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <div className="field-heading"><label htmlFor="job-description">Job description</label><span>Required</span></div>
          <p id="job-help">Include responsibilities, requirements, and preferred qualifications when available.</p>
          <textarea id="job-description" value={description} onChange={(event) => setDescription(event.target.value)} aria-describedby={`job-help${submitted && !description.trim() ? ' job-error' : ''}`} aria-invalid={submitted && !description.trim()} placeholder="Paste the target job description here…" rows={18} />
          {submitted && !description.trim() && <p className="field-error" id="job-error">Add a job description to analyze your fit.</p>}
        </div>
        <div className="form-actions"><Link className="text-link" to="/new/profile">← Back to profile</Link><button className="button button-primary" type="submit">Analyze my fit <span aria-hidden="true">→</span></button></div>
      </form>
    </div>
  )
}
