import { useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useWorkflow } from '../context/useWorkflow'

const questions = [
  {
    category: 'Ownership & impact',
    prompt: 'Tell me about a product or feature you owned from identifying the problem through launch. What changed because of your work?',
    focus: 'Show how you framed the problem, made decisions, aligned people, and measured the result.',
  },
  {
    category: 'Technical judgment',
    prompt: 'Describe an architectural decision you made when a system needed to scale. What options did you consider?',
    focus: 'Make the constraints, trade-offs, your decision, and its measurable outcome explicit.',
  },
  {
    category: 'Collaboration',
    prompt: 'Tell me about a time you disagreed with product or design. How did you reach a decision?',
    focus: 'Demonstrate curiosity, constructive challenge, and shared ownership of the outcome.',
  },
]

export function InterviewPage() {
  const { strategyId } = useParams()
  const { getStrategy, strategiesLoading } = useWorkflow()
  const strategy = getStrategy(strategyId)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [response, setResponse] = useState('')
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [error, setError] = useState('')

  if (strategiesLoading) return <div className="strategy-content page-width">Loading interview practice…</div>
  if (!strategy || !strategyId) return <Navigate to="/strategy-not-found" replace />

  const question = questions[questionIndex]
  const accepted = strategy.recommendations.recommendations.filter((item) => item.status === 'accepted').length

  function submitResponse(event: FormEvent) {
    event.preventDefault()
    if (!response.trim()) {
      setError('Write a response before requesting feedback.')
      return
    }
    setError('')
    setFeedbackVisible(true)
  }

  function nextQuestion() {
    setQuestionIndex((current) => (current + 1) % questions.length)
    setResponse('')
    setFeedbackVisible(false)
    setError('')
  }

  return (
    <div className="interview-workspace page-width">
      <header className="interview-header">
        <div><p className="eyebrow">Interview practice</p><h2>Practice the stories that matter for this role</h2><p>Write your response as you would say it in an interview. You’ll receive focused feedback based on the role and your strategy.</p></div>
        <div className="practice-progress"><strong>{questionIndex + 1} of {questions.length}</strong><span>practice questions</span></div>
      </header>

      <div className="interview-layout">
        <aside className="question-list" aria-label="Practice questions">
          <p className="eyebrow">Question set</p>
          {questions.map((item, index) => (
            <button key={item.prompt} type="button" className={index === questionIndex ? 'active' : ''} onClick={() => { setQuestionIndex(index); setResponse(''); setFeedbackVisible(false); setError('') }}>
              <span>{index + 1}</span><div><strong>{item.category}</strong><small>{index === questionIndex ? 'In progress' : 'Not started'}</small></div>
            </button>
          ))}
          <p className="practice-note">{accepted ? `${accepted} accepted action-plan item${accepted === 1 ? '' : 's'} informed this practice set.` : 'Your match insights informed this practice set.'}</p>
        </aside>

        <div className="practice-main">
          <section className="question-panel">
            <span className="question-category">{question.category}</span>
            <h1>{question.prompt}</h1>
            <div className="answer-guidance"><strong>What to demonstrate</strong><p>{question.focus}</p></div>
            <form onSubmit={submitResponse} noValidate>
              <label htmlFor="interview-response">Your response</label>
              <textarea id="interview-response" rows={10} value={response} onChange={(event) => { setResponse(event.target.value); setFeedbackVisible(false) }} aria-invalid={Boolean(error)} aria-describedby={error ? 'response-error' : 'response-help'} placeholder="Write your answer here…" />
              <div className="answer-meta"><span id="response-help">Aim for a focused 1–2 minute answer.</span><span>{response.trim().split(/\s+/).filter(Boolean).length} words</span></div>
              {error && <p className="field-error" id="response-error">{error}</p>}
              <div className="practice-actions"><button className="button button-primary" type="submit">Get feedback</button><span>Your response is not saved in this version.</span></div>
            </form>
          </section>

          {feedbackVisible && (
            <section className="feedback-panel" aria-live="polite">
              <div className="feedback-heading"><div><span className="success-mark small" aria-hidden="true">✓</span><div><p className="eyebrow">Response feedback</p><h2>A strong start with room for more evidence</h2></div></div><span className="feedback-rating">Good foundation</span></div>
              <div className="feedback-grid">
                <article><h3>What worked</h3><ul><li>You established clear personal ownership.</li><li>Your answer connects the work to a customer problem.</li><li>The sequence is easy to follow.</li></ul></article>
                <article><h3>Make it stronger</h3><ul><li>Name the most important trade-off you personally decided.</li><li>Add one measurable result to establish impact.</li><li>End by connecting what you learned to this role.</li></ul></article>
              </div>
              <div className="feedback-example"><h3>Try adding a line like this</h3><blockquote>“I chose to simplify the first release around the highest-friction workflow, which helped us launch two weeks earlier and improve activation by 16%.”</blockquote><p>Use only details that are true to your experience.</p></div>
              <div className="feedback-actions"><button className="button button-secondary" type="button" onClick={() => setFeedbackVisible(false)}>Revise my response</button><button className="button button-primary" type="button" onClick={nextQuestion}>Next question <span aria-hidden="true">→</span></button></div>
            </section>
          )}
        </div>
      </div>
      <div className="interview-footer-link"><Link className="text-link" to={`/strategies/${strategyId}/recommendations`}>← Back to action plan</Link></div>
    </div>
  )
}
