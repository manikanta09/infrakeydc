import { cn } from '@/utils/cn'
import { Card, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Status } from '@/types'

export interface StatusItem {
  id: string
  label: string
  status: Status
  detail?: string
  metric?: string
}

interface StatusWidgetProps {
  title: string
  items: StatusItem[]
  icon?: React.ReactNode
  className?: string
  loading?: boolean
}

const statusConfig: Record<Status, { label: string; variant: 'online' | 'warning' | 'error' | 'offline' | 'provisioning' }> = {
  online: { label: 'Healthy', variant: 'online' },
  offline: { label: 'Offline', variant: 'offline' },
  warning: { label: 'Warning', variant: 'warning' },
  error: { label: 'Critical', variant: 'error' },
  pending: { label: 'Pending', variant: 'provisioning' },
  provisioning: { label: 'Provisioning', variant: 'provisioning' },
}

export function StatusWidget({ title, items, icon, className, loading = false }: StatusWidgetProps) {
  if (loading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <div className="h-4 w-32 bg-[var(--color-surface-3)] rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 w-24 bg-[var(--color-surface-3)] rounded" />
              <div className="h-5 w-16 bg-[var(--color-surface-3)] rounded-full" />
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader title={title} icon={icon} />
      <div className="space-y-2">
        {items.map((item) => {
          const config = statusConfig[item.status]
          return (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)] last:border-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{item.label}</p>
                {item.detail && (
                  <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">{item.detail}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.metric && (
                  <span className="text-xs text-[var(--color-text-secondary)] font-mono">{item.metric}</span>
                )}
                <Badge variant={config.variant} dot>
                  {config.label}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
