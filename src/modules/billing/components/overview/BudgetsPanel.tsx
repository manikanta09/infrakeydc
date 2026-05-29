import { useBudgets } from '../../hooks/useBillingInsights'
import { SkeletonText } from '@/components/shared'

const STATUS_COLORS = {
  ok:       { bar: 'var(--color-success)',      text: 'text-[var(--color-success)]' },
  warning:  { bar: 'var(--color-warning)',      text: 'text-[var(--color-warning)]' },
  critical: { bar: 'var(--color-error)',        text: 'text-[var(--color-error)]' },
  exceeded: { bar: 'var(--color-error)',        text: 'text-[var(--color-error)]' },
}

export function BudgetsPanel() {
  const { data: budgets, isPending } = useBudgets()

  return (
    <div className="glass-card rounded-xl border border-[var(--color-border-base)] p-4">
      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Budgets</h3>

      <div className="space-y-4">
        {isPending
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonText key={i} lines={3} />)
          : (budgets ?? []).map((b) => {
              const cfg = STATUS_COLORS[b.status]
              return (
                <div key={b.id}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">{b.name}</span>
                    <span className={['text-xs font-semibold', cfg.text].join(' ')}>
                      {b.usedPercent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(b.usedPercent, 100)}%`,
                        background: cfg.bar,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-[var(--color-text-tertiary)]">{b.spendFormatted} spent</span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)]">{b.limitFormatted} limit</span>
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
  )
}
