import type { TimeRange } from '../../types/billing.types'

const RANGES: { value: TimeRange; label: string }[] = [
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
  { value: '6m', label: '6M' },
  { value: '1y', label: '1Y' },
  { value: 'mtd', label: 'MTD' },
]

interface Props {
  value: TimeRange
  onChange: (range: TimeRange) => void
  className?: string
}

export function TimeRangeSelector({ value, onChange, className }: Props) {
  return (
    <div
      className={['flex items-center gap-1 p-1 bg-[var(--color-surface-2)] rounded-lg border border-[var(--color-border-base)]', className].join(' ')}
      role="group"
      aria-label="Time range"
    >
      {RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={[
            'px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150',
            value === r.value
              ? 'bg-[var(--color-brand)] text-white shadow-sm'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)]',
          ].join(' ')}
          aria-pressed={value === r.value}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
