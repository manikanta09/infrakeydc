import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  label: string
  value: string
  sub?: string
  trend?: number
  trendLabel?: string
  accentColor?: 'brand' | 'green' | 'purple' | 'orange' | 'red'
  icon?: React.ReactNode
  badge?: string
}

const ACCENT: Record<string, { value: string; dim: string }> = {
  brand:  { value: 'var(--color-brand)',        dim: 'var(--color-brand-subtle)' },
  green:  { value: 'var(--color-success)',       dim: 'var(--color-success-dim)' },
  purple: { value: 'var(--color-neon-purple)',   dim: 'rgba(168,85,247,0.1)' },
  orange: { value: 'var(--color-neon-orange)',   dim: 'rgba(249,115,22,0.1)' },
  red:    { value: 'var(--color-error)',         dim: 'var(--color-error-dim)' },
}

export function SpendMetricCard({ label, value, sub, trend, trendLabel, accentColor = 'brand', icon, badge }: Props) {
  const accent = ACCENT[accentColor]
  const hasUp = trend !== undefined && trend > 0
  const hasDown = trend !== undefined && trend < 0
  const isFlat = trend !== undefined && trend === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 flex flex-col gap-3 border border-[var(--color-border-base)] hover:border-[var(--color-border-strong)] transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: accent.dim, color: accent.value }}
            >
              {icon}
            </div>
          )}
          <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
            {label}
          </span>
        </div>
        {badge && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)]">
            {badge}
          </span>
        )}
      </div>

      <div>
        <div
          className="text-2xl font-bold tracking-tight"
          style={{ color: accent.value }}
        >
          {value}
        </div>
        {sub && (
          <div className="mt-0.5 text-xs text-[var(--color-text-tertiary)]">{sub}</div>
        )}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          {hasUp && <TrendingUp size={12} className="text-[var(--color-error)]" aria-hidden="true" />}
          {hasDown && <TrendingDown size={12} className="text-[var(--color-success)]" aria-hidden="true" />}
          {isFlat && <Minus size={12} className="text-[var(--color-text-tertiary)]" aria-hidden="true" />}
          <span
            className={[
              'text-xs font-medium',
              hasUp ? 'text-[var(--color-error)]' : hasDown ? 'text-[var(--color-success)]' : 'text-[var(--color-text-tertiary)]',
            ].join(' ')}
          >
            {hasUp ? '+' : ''}{trend.toFixed(1)}%
            {trendLabel && <span className="text-[var(--color-text-tertiary)] font-normal ml-1">{trendLabel}</span>}
          </span>
        </div>
      )}
    </motion.div>
  )
}
