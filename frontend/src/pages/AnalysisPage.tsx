import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useWorkflow } from '../context/useWorkflow'
import { createJobStrategy } from '../services/analysisService'

const stageLabels = [
  'Building your career profile',
  'Understanding the target role',
  'Comparing your fit',
  'Generating recommendations',
]

export function AnalysisPage() {
  const navigate = useNavigate()
  const { draft, addStrategy } = useWorkflow()
  const [activeStage, setActiveStage] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function runAnalysis() {
      try {
        setActiveStage(0)
        const stageTimer = window.setInterval(() => setActiveStage((current) => Math.min(3, current + 1)), 500)
        const strategy = await createJobStrategy(draft.candidateInput, draft.jobDescription)
        window.clearInterval(stageTimer)
        if (cancelled) return
        addStrategy(strategy)
        navigate(`/new/result/${strategy.id}`, { replace: true })
      } catch {
        if (!cancelled) setError('We couldn’t complete your analysis. Please try again.')
      }
    }
    void runAnalysis()
    return () => { cancelled = true }
  }, [addStrategy, draft, navigate])

  if (!draft.candidateInput.resume_text || !draft.candidateInput.linkedin_text || !draft.jobDescription) return <Navigate to="/new/profile" replace />

  return (
    <div className="analysis-page page-width-narrow" aria-live="polite">
      <header className="page-header centered"><p className="eyebrow">Step 3 of 3</p><h1>Creating your career strategy</h1><p>We’re working through your experience and the target role in four clear stages.</p></header>
      {error ? (
        <div className="error-panel" role="alert"><h2>Analysis interrupted</h2><p>{error}</p><button className="button button-primary" type="button" onClick={() => window.location.reload()}>Try again</button></div>
      ) : (
        <div className="analysis-progress">
          <div className="progress-track" aria-hidden="true"><span style={{ width: `${((activeStage + 0.45) / stageLabels.length) * 100}%` }} /></div>
          <ol>
            {stageLabels.map((label, index) => (
              <li key={label} className={index < activeStage ? 'complete' : index === activeStage ? 'active' : ''}>
                <span className="analysis-marker" aria-hidden="true">{index < activeStage ? '✓' : index + 1}</span>
                <div><strong>{label}</strong><small>{index < activeStage ? 'Complete' : index === activeStage ? 'In progress…' : 'Waiting'}</small></div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
