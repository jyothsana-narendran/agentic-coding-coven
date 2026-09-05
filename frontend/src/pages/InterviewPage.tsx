import { useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { VoiceInput } from '../components/VoiceInput'
import { useWorkflow } from '../context/useWorkflow'
import { ApiError } from '../services/apiClient'
import { getInterviewFeedback } from '../services/interviewService'
import type { InterviewFeedback } from '../types/api'
import { getRecommendationCounts } from '../utils/recommendations'

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
  const [feedback, setFeedback] = useState<InterviewFeedback | null>(null)
  const [listening, setListening] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const submissionLock = useRef(false)

  if (strategiesLoading) return <div className="strategy-content page-width">Loading interview practice…</div>
  if (!strategy || !strategyId) return <Navigate to="/strategy-not-found" replace />

  const question = questions[questionIndex]
  const accepted = getRecommendationCounts(strategy).accepted
  const jobContext = `${strategy.target_profile.role} at ${strategy.target_profile.company}\n\n${strategy.job_description}`

  async function submitResponse(event: FormEvent) {
    event.preventDefault()
    if (listening || submitting || submissionLock.current) return
    const answer = response.trim()
    if (!answer) {
      setError('Write a response before requesting feedback.')
      return
    }
    setError('')
    submissionLock.current = true
    setSubmitting(true)
    try {
      const result = await getInterviewFeedback({
        question: question.prompt,
        answer,
        job_context: jobContext,
      })
      setFeedback(result)
      setFeedbackVisible(true)
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : 'Feedback could not be generated. Please try again.')
    } finally {
      submissionLock.current = false
      setSubmitting(false)
    }
  }

  function nextQuestion() {
    setQuestionIndex((current) => (current + 1) % questions.length)
    setResponse('')
    setFeedback(null)
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
            <button key={item.prompt} type="button" disabled={listening || submitting} className={index === questionIndex ? 'active' : ''} onClick={() => { setQuestionIndex(index); setResponse(''); setFeedback(null); setFeedbackVisible(false); setError('') }}>
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
              <textarea id="interview-response" rows={10} value={response} disabled={listening || submitting} onChange={(event) => { setResponse(event.target.value); setFeedback(null); setFeedbackVisible(false) }} aria-invalid={Boolean(error)} aria-describedby={error ? 'response-error' : 'response-help'} placeholder="Type your answer here, or speak it below…" />
              <div className="answer-meta"><span id="response-help">Aim for a focused 1–2 minute answer.</span><span>{response.trim().split(/\s+/).filter(Boolean).length} words</span></div>
              <VoiceInput value={response} disabled={submitting} onListeningChange={setListening} onTranscript={(transcript) => { setResponse(transcript); setFeedback(null); setFeedbackVisible(false) }} onError={setError} />
              {error && <p className="field-error" id="response-error">{error}</p>}
              <div className="practice-actions"><button className="button button-primary" type="submit" disabled={listening || submitting}>{submitting ? 'Getting feedback…' : 'Submit answer'}</button><span>Your response is not saved in this version.</span></div>
            </form>
          </section>

          {feedbackVisible && feedback && (
            <section className="feedback-panel" aria-live="polite">
              <div className="feedback-heading"><div><span className="success-mark small" aria-hidden="true">✓</span><div><p className="eyebrow">Response feedback</p><h2>Your interview coaching</h2></div></div><span className="feedback-rating">{Math.round(feedback.overall_score)} / 100</span></div>
              <div className="feedback-grid">
                <article><h3>What worked</h3><ul>{feedback.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article>
                <article><h3>Make it stronger</h3><ul>{feedback.improvements.map((item) => <li key={item}>{item}</li>)}</ul></article>
              </div>
              {feedback.suggested_answer && <div className="feedback-example"><h3>Suggested answer</h3><blockquote>{feedback.suggested_answer}</blockquote><p>Use only details that are true to your experience.</p></div>}
              <div className="feedback-actions"><button className="button button-secondary" type="button" onClick={() => setFeedbackVisible(false)}>Revise my response</button><button className="button button-primary" type="button" onClick={nextQuestion}>Next question <span aria-hidden="true">→</span></button></div>
            </section>
          )}
        </div>
      </div>
      <div className="interview-footer-link"><Link className="text-link" to={`/strategies/${strategyId}/recommendations`}>← Back to action plan</Link></div>
    </div>
  )
}
