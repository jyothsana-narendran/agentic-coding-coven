import type { SkillGap } from '../types/domain'
import { ImportanceBadge } from './Badge'

export function GapCard({ gap }: { gap: SkillGap }) {
  return (
    <article className={`gap-item importance-border-${gap.importance}`}>
      <div className="item-heading"><h3>{gap.skill}</h3><ImportanceBadge value={gap.importance} /></div>
      <p>{gap.reason}</p>
      <div className="next-action"><strong>Next move</strong><span>{gap.recommended_action}</span></div>
    </article>
  )
}
