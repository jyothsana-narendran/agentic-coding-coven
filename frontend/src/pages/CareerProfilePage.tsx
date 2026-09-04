import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWorkflow } from '../context/useWorkflow'

export function CareerProfilePage() {
  const navigate = useNavigate()
  const { draft, setCandidateInput } = useWorkflow()
  const [resume, setResume] = useState(draft.candidateInput.resume_text)
  const [linkedin, setLinkedin] = useState(draft.candidateInput.linkedin_text)
  const [submitted, setSubmitted] = useState(false)
  const resumeError = submitted && !resume.trim()
  const linkedinError = submitted && !linkedin.trim()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    if (!resume.trim() || !linkedin.trim()) return
    setCandidateInput({ resume_text: resume.trim(), linkedin_text: linkedin.trim() })
    navigate('/new/job')
  }

  return (
    <div className="form-page page-width-narrow">
      <Link className="back-to-dashboard" to="/">← Cancel and return to job strategies</Link>
      <header className="page-header"><p className="eyebrow">Step 1 of 3</p><h1>Build your career profile</h1><p>Paste both sources so we can understand your experience accurately and preserve where each detail came from.</p></header>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <div className="field-heading"><label htmlFor="resume">Resume text</label><span>Required</span></div>
          <p id="resume-help">Copy and paste the full text of your current resume.</p>
          <textarea id="resume" value={resume} onChange={(event) => setResume(event.target.value)} aria-describedby={`resume-help${resumeError ? ' resume-error' : ''}`} aria-invalid={resumeError} placeholder="Paste your resume here…" rows={12} />
          {resumeError && <p className="field-error" id="resume-error">Add your resume text to continue.</p>}
        </div>
        <div className="field-group">
          <div className="field-heading"><label htmlFor="linkedin">LinkedIn profile text</label><span>Required</span></div>
          <p id="linkedin-help">Paste your About, Experience, Skills, and Featured sections.</p>
          <textarea id="linkedin" value={linkedin} onChange={(event) => setLinkedin(event.target.value)} aria-describedby={`linkedin-help${linkedinError ? ' linkedin-error' : ''}`} aria-invalid={linkedinError} placeholder="Paste your LinkedIn profile text here…" rows={12} />
          {linkedinError && <p className="field-error" id="linkedin-error">Add your LinkedIn profile text to continue.</p>}
        </div>
        <div className="form-actions"><span>Both fields are required.</span><button className="button button-primary" type="submit">Continue to target role <span aria-hidden="true">→</span></button></div>
      </form>
    </div>
  )
}
