import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/card'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    label?: string
    direction?: 'up' | 'down' | 'neutral'
  }
  icon?: React.ReactNode
  accentColor?: 'brand' | 'green' | 'purple' | 'orange' | 'pink'
  sparkline?: React.ReactNode
  badge?: React.ReactNode
  className?: string
  loading?: boolean
}

const accentMap = {
  brand: {
    icon: 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border-[var(--color-brand)]/20',
    value: 'text-[var(--color-brand)]',
  },
  green: {
    icon: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[var(--color-success)]/20',
    value: 'text-[var(--color-success)]',
  },
  purple: {
    icon: 'bg-[rgba(168,85,247,0.1)] text-[var(--color-neon-purple)] border-[var(--color-neon-purple)]/20',
    value: 'text-[var(--color-neon-purple)]',
  },
  orange: {
    icon: 'bg-[rgba(249,115,22,0.1)] text-[var(--color-neon-orange)] border-[var(--color-neon-orange)]/20',
    value: 'text-[var(--color-neon-orange)]',
  },
  pink: {
    icon: 'bg-[rgba(236,72,153,0.1)] text-[var(--color-neon-pink)] border-[var(--color-neon-pink)]/20',
    value: 'text-[var(--color-neon-pink)]',
  },
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  accentColor = 'brand',
  sparkline,
  badge,
  className,
  loading = false,
}: MetricCardProps) {
  const accent = accentMap[accentColor]
  const trendDir = trend?.direction ?? (trend && trend.value >= 0 ? 'up' : 'down')

  if (loading) {
    return (
      <Card className={cn('min-h-[100px]', className)}>
        <div className="animate-pulse space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[var(--color-surface-3)]" />
            <div className="h-3 w-24 rounded bg-[var(--color-surface-3)]" />
          </div>
          <div className="h-7 w-32 rounded bg-[var(--color-surface-3)]" />
          <div className="h-3 w-20 rounded bg-[var(--color-surface-3)]" />
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Card hover glow={accentColor === 'brand' ? 'brand' : 'none'} className={cn('group', className)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {icon && (
              <div className={cn('w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0', accent.icon)}>
                {icon}
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wide">{title}</p>
              {badge && <div className="mt-0.5">{badge}</div>}
            </div>
          </div>
          {sparkline && <div className="flex-shrink-0">{sparkline}</div>}
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className={cn('text-2xl font-bold metric-number leading-none', accent.value)}>{value}</p>
            {subtitle && (
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">{subtitle}</p>
            )}
          </div>

          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full',
                trendDir === 'up' && 'text-[var(--color-success)] bg-[var(--color-success-dim)]',
                trendDir === 'down' && 'text-[var(--color-error)] bg-[var(--color-error-dim)]',
                trendDir === 'neutral' && 'text-[var(--color-text-tertiary)] bg-[var(--color-surface-3)]'
              )}
            >
              {trendDir === 'up' && <TrendingUp size={11} />}
              {trendDir === 'down' && <TrendingDown size={11} />}
              {trendDir === 'neutral' && <Minus size={11} />}
              {Math.abs(trend.value)}%
              {trend.label && <span className="opacity-70">{trend.label}</span>}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
