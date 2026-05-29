import { Clock } from 'lucide-react'
import { ActivityFeed } from '@/components/shared/widgets/ActivityFeed'
import { ACTIVITY_EVENTS } from '../fixtures/dashboard.fixtures'

export function ActivityFeedPanel() {
  return (
    <ActivityFeed
      events={ACTIVITY_EVENTS}
      icon={<Clock size={14} />}
      action={
        <button className="text-[10px] text-[var(--color-brand)] hover:underline">
          View all
        </button>
      }
    />
  )
}
