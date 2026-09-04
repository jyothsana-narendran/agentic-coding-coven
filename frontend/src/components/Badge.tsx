import type { Importance, RecommendationStatus } from '../types/domain'

export function ImportanceBadge({ value }: { value: Importance }) {
  return <span className={`badge importance-${value}`}>{value} priority</span>
}

export function StatusBadge({ value }: { value: RecommendationStatus }) {
  const symbol = value === 'accepted' ? '✓' : value === 'rejected' ? '×' : '•'
  return <span className={`badge status-${value}`}><span aria-hidden="true">{symbol}</span> {value}</span>
}

