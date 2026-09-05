import type { RecommendationCategory, RecommendationStatus } from '../types/domain'
import { StatusBadge } from './Badge'

interface Props {
  actionKey: string
  category: RecommendationCategory
  recommendation: string
  status: RecommendationStatus
  onDecision: (actionKey: string, status: RecommendationStatus) => void
}

const categoryLabels: Record<RecommendationCategory, string> = {
  priority: 'Priority action',
  resume: 'Resume',
  linkedin: 'LinkedIn',
  skills: 'Skills',
  interview: 'Interview',
}

export function RecommendationCard({ actionKey, category, recommendation, status, onDecision }: Props) {
  return (
    <article className={`recommendation-card simple-recommendation decision-${status}`}>
      <div className="recommendation-heading">
        <div><span className="category-label">{categoryLabels[category]}</span><h2>{recommendation}</h2></div>
        <StatusBadge value={status} />
      </div>
      <div className="decision-bar" aria-label={`Decision for ${recommendation}`}>
        <p>{status === 'pending' ? 'Review this suggested action' : `You ${status} this action. You can change your decision.`}</p>
        <div>
          <button type="button" className={`button button-reject ${status === 'rejected' ? 'selected' : ''}`} onClick={() => onDecision(actionKey, 'rejected')} aria-pressed={status === 'rejected'}>Reject</button>
          <button type="button" className={`button button-accept ${status === 'accepted' ? 'selected' : ''}`} onClick={() => onDecision(actionKey, 'accepted')} aria-pressed={status === 'accepted'}>Accept</button>
        </div>
      </div>
    </article>
  )
}
