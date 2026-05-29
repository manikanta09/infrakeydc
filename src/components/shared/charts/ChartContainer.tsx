import { cn } from '@/utils/cn'
import { Card, CardHeader } from '@/components/ui/card'

interface ChartContainerProps {
  title?: string
  subtitle?: string
  action?: React.ReactNode
  icon?: React.ReactNode
  height?: number
  children: React.ReactNode
  className?: string
  loading?: boolean
}

export function ChartContainer({
  title,
  subtitle,
  action,
  icon,
  height = 200,
  children,
  className,
  loading = false,
}: ChartContainerProps) {
  if (loading) {
    return (
      <Card className={cn('', className)}>
        {title && (
          <div className="flex items-center gap-2 mb-4 animate-pulse">
            <div className="w-7 h-7 rounded-md bg-[var(--color-surface-3)]" />
            <div className="h-4 w-32 bg-[var(--color-surface-3)] rounded" />
          </div>
        )}
        <div
          className="animate-pulse bg-[var(--color-surface-3)] rounded-lg"
          style={{ height }}
        />
      </Card>
    )
  }

  return (
    <Card className={cn('', className)}>
      {title && (
        <CardHeader title={title} subtitle={subtitle} action={action} icon={icon} />
      )}
      <div style={{ height }}>
        {children}
      </div>
    </Card>
  )
}
