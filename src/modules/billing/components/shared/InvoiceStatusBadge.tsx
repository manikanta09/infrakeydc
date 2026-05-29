import type { InvoiceStatus } from '../../types/billing.types'

const CONFIG: Record<InvoiceStatus, { label: string; classes: string }> = {
  paid:       { label: 'Paid',       classes: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[var(--color-success)]/30' },
  pending:    { label: 'Pending',    classes: 'bg-[var(--color-warning-dim)] text-[var(--color-warning)] border-[var(--color-warning)]/30' },
  overdue:    { label: 'Overdue',    classes: 'bg-[var(--color-error-dim)] text-[var(--color-error)] border-[var(--color-error)]/30' },
  processing: { label: 'Processing', classes: 'bg-[var(--color-info-dim)] text-[var(--color-brand)] border-[var(--color-brand)]/30' },
  draft:      { label: 'Draft',      classes: 'bg-[var(--color-surface-2)] text-[var(--color-text-tertiary)] border-[var(--color-border-base)]' },
  voided:     { label: 'Voided',     classes: 'bg-[var(--color-surface-2)] text-[var(--color-text-disabled)] border-[var(--color-border-subtle)]' },
}

interface Props {
  status: InvoiceStatus
  size?: 'sm' | 'md'
}

export function InvoiceStatusBadge({ status, size = 'md' }: Props) {
  const { label, classes } = CONFIG[status]
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs',
        classes,
      ].join(' ')}
    >
      {label}
    </span>
  )
}
