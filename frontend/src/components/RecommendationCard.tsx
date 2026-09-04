import type { Recommendation, RecommendationStatus } from '../types/domain'
import { ImportanceBadge, StatusBadge } from './Badge'

interface Props {
  recommendation: Recommendation
  onDecision: (id: string, status: RecommendationStatus) => void
}
const sourceLabels = {
  candidate_profile: 'Your profile',
  job_description: 'Target role',
  job_match: 'Match analysis',
}

export function RecommendationCard({ recommendation, onDecision }: Props) {
  return (
    <article className={`recommendation-card decision-${recommendation.status}`}>
      <div className="recommendation-heading">
        <div>
          <span className="category-label">{recommendation.category}</span>
          <h2>{recommendation.title}</h2>
        </div>
        <div className="badge-row"><ImportanceBadge value={recommendation.priority} /><StatusBadge value={recommendation.status} /></div>
      </div>

      {(recommendation.current || recommendation.suggested) && (
        <div className="comparison-grid">
          <section className="comparison-current">
            <h3>Current</h3>
            <p>{recommendation.current ?? 'No current content is shown in your profile.'}</p>
          </section>
          <section className="comparison-suggested">
            <h3>Suggested</h3>
            <p>{recommendation.suggested ?? 'No replacement wording is needed for this action.'}</p>
          </section>
        </div>
      )}

      <div className="recommendation-detail">
        <h3>Why this matters</h3>
        <p>{recommendation.reason}</p>
        {recommendation.evidence.length > 0 && (
          <details>
            <summary>View supporting evidence ({recommendation.evidence.length})</summary>
            <ul>
              {recommendation.evidence.map((item, index) => (
                <li key={`${item.source}-${index}`}><strong>{sourceLabels[item.source]}:</strong> {item.text}</li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <div className="decision-bar" aria-label={`Decision for ${recommendation.title}`}>
        <p>{recommendation.status === 'pending' ? 'Review this suggestion' : `You ${recommendation.status} this suggestion. You can change your decision.`}</p>
        <div>
          <button type="button" className={`button button-reject ${recommendation.status === 'rejected' ? 'selected' : ''}`} onClick={() => onDecision(recommendation.id, 'rejected')} aria-pressed={recommendation.status === 'rejected'}>Reject</button>
          <button type="button" className={`button button-accept ${recommendation.status === 'accepted' ? 'selected' : ''}`} onClick={() => onDecision(recommendation.id, 'accepted')} aria-pressed={recommendation.status === 'accepted'}>Accept</button>
        </div>
      </div>
    </article>
  )
}
