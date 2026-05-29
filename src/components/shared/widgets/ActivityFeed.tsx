import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Card, CardHeader } from '@/components/ui/card'

export interface ActivityEvent {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  detail?: string
  timestamp: string
  source?: string
}

interface ActivityFeedProps {
  title?: string
  events: ActivityEvent[]
  icon?: React.ReactNode
  action?: React.ReactNode
  maxItems?: number
  className?: string
  loading?: boolean
}

const typeStyles = {
  info: {
    dot: 'bg-[var(--color-brand)]',
    bar: 'bg-[var(--color-brand)]',
  },
  success: {
    dot: 'bg-[var(--color-success)]',
    bar: 'bg-[var(--color-success)]',
  },
  warning: {
    dot: 'bg-[var(--color-warning)]',
    bar: 'bg-[var(--color-warning)]',
  },
  error: {
    dot: 'bg-[var(--color-error)]',
    bar: 'bg-[var(--color-error)]',
  },
}

export function ActivityFeed({
  title = 'Recent Activity',
  events,
  icon,
  action,
  maxItems = 8,
  className,
  loading = false,
}: ActivityFeedProps) {
  const visible = events.slice(0, maxItems)

  if (loading) {
    return (
      <Card className={cn('', className)}>
        <div className="h-4 w-32 bg-[var(--color-surface-3)] rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-surface-3)] mt-1.5 flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-[var(--color-surface-3)] rounded w-3/4" />
                <div className="h-3 bg-[var(--color-surface-3)] rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader title={title} icon={icon} action={action} />

      <div className="relative">
        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[var(--color-border-subtle)]" />
        <AnimatePresence initial={false}>
          <div className="space-y-3 pl-5">
            {visible.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="relative"
              >
                <div
                  className={cn(
                    'absolute -left-5 top-1.5 w-2 h-2 rounded-full border-2 border-[var(--color-surface-1)]',
                    typeStyles[event.type].dot
                  )}
                />
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-primary)] leading-relaxed">
                    {event.message}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {event.source && (
                      <span className="text-[10px] text-[var(--color-brand)] font-medium">{event.source}</span>
                    )}
                    {event.detail && (
                      <span className="text-[10px] text-[var(--color-text-tertiary)]">{event.detail}</span>
                    )}
                    <span className="text-[10px] text-[var(--color-text-disabled)]">{event.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </Card>
  )
}
