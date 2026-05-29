import { AlertTriangle, Info, TrendingUp, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { BillingInsightVM } from '../../services/billing.adapters'
import type { InsightSeverity } from '../../types/billing.types'

const SEVERITY_CONFIG: Record<InsightSeverity, {
  icon: React.ElementType
  bg: string
  iconColor: string
  border: string
  label: string
}> = {
  critical:    { icon: AlertTriangle, bg: 'bg-[var(--color-error-dim)]',   iconColor: 'text-[var(--color-error)]',   border: 'border-[var(--color-error)]/20',   label: 'Critical' },
  warning:     { icon: AlertTriangle, bg: 'bg-[var(--color-warning-dim)]', iconColor: 'text-[var(--color-warning)]', border: 'border-[var(--color-warning)]/20', label: 'Warning' },
  opportunity: { icon: TrendingUp,    bg: 'bg-[rgba(0,255,136,0.06)]',     iconColor: 'text-[var(--color-success)]', border: 'border-[var(--color-success)]/20', label: 'Opportunity' },
  info:        { icon: Info,          bg: 'bg-[var(--color-info-dim)]',    iconColor: 'text-[var(--color-brand)]',   border: 'border-[var(--color-brand)]/20',   label: 'Info' },
}

interface Props {
  insight: BillingInsightVM
  compact?: boolean
}

export function AIInsightCard({ insight, compact = false }: Props) {
  const navigate = useNavigate()
  const cfg = SEVERITY_CONFIG[insight.severity]
  const Icon = cfg.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={[
        'flex gap-3 rounded-xl border p-3 transition-colors',
        cfg.bg,
        cfg.border,
      ].join(' ')}
    >
      <div className={['flex-shrink-0 mt-0.5', cfg.iconColor].join(' ')}>
        <Icon size={15} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-[var(--color-text-primary)] leading-snug">
            {insight.title}
          </p>
          {insight.impactFormatted && (
            <span className="flex-shrink-0 text-xs font-semibold text-[var(--color-success)] bg-[rgba(0,255,136,0.1)] px-2 py-0.5 rounded-full">
              {insight.impactFormatted}
            </span>
          )}
        </div>
        {!compact && (
          <p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {insight.detail}
          </p>
        )}
        {insight.actionLabel && insight.actionPath && (
          <button
            onClick={() => navigate(insight.actionPath!)}
            className={[
              'mt-2 flex items-center gap-1 text-xs font-medium transition-colors',
              cfg.iconColor,
              'hover:opacity-80',
            ].join(' ')}
          >
            {insight.actionLabel}
            <ArrowRight size={11} aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
