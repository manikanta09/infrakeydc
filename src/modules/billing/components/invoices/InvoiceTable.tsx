import { useState } from 'react'
import { Download, Eye } from 'lucide-react'
import { DataTable } from '@/components/shared'
import { InvoiceStatusBadge } from '../shared/InvoiceStatusBadge'
import { useInvoices } from '../../hooks/useInvoices'
import { InvoiceDetailDrawer } from './InvoiceDetailDrawer'
import type { InvoiceStatus } from '../../types/billing.types'
import type { InvoiceVM } from '../../services/billing.adapters'
import type { Column } from '@/components/shared/tables/DataTable'

const STATUS_FILTERS: { label: string; value: InvoiceStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
]

const COLUMNS: Column<InvoiceVM>[] = [
  {
    key: 'invoiceNumber',
    header: 'Invoice',
    render: (_v, inv) => (
      <div>
        <div className="text-sm font-medium text-[var(--color-text-primary)]">{inv.invoiceNumber}</div>
        <div className="text-xs text-[var(--color-text-tertiary)]">{inv.period}</div>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (_v, inv) => <InvoiceStatusBadge status={inv.status} />,
  },
  {
    key: 'issueDate',
    header: 'Issued',
    sortable: true,
    render: (_v, inv) => (
      <span className="text-sm text-[var(--color-text-secondary)]">
        {new Date(inv.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </span>
    ),
  },
  {
    key: 'dueDate',
    header: 'Due',
    sortable: true,
    render: (_v, inv) => (
      <span className={['text-sm', inv.isOverdue ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'].join(' ')}>
        {new Date(inv.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </span>
    ),
  },
  {
    key: 'totalFormatted',
    header: 'Total',
    align: 'right',
    render: (_v, inv) => (
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">{inv.totalFormatted}</span>
    ),
  },
  {
    key: 'id',
    header: '',
    align: 'right',
    render: (_v, inv, _i) => <InvoiceActions inv={inv} />,
  },
]

function InvoiceActions({ inv }: { inv: InvoiceVM }) {
  const [, setSelectedId] = useState<string | null>(null)
  return (
    <div className="flex items-center gap-1 justify-end">
      <button
        onClick={() => setSelectedId(inv.id)}
        className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
        aria-label={`View invoice ${inv.invoiceNumber}`}
      >
        <Eye size={14} aria-hidden="true" />
      </button>
      <button
        className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
        aria-label={`Download invoice ${inv.invoiceNumber}`}
      >
        <Download size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

export function InvoiceTable() {
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { data, isPending } = useInvoices({ status: statusFilter })

  const columnsWithAction: Column<InvoiceVM>[] = [
    ...COLUMNS.slice(0, -1),
    {
      key: 'id',
      header: '',
      align: 'right',
      render: (_v, inv) => (
        <div className="flex items-center gap-1 justify-end">
          <button
            onClick={() => setSelectedId(inv.id)}
            className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
            aria-label={`View invoice ${inv.invoiceNumber}`}
          >
            <Eye size={14} aria-hidden="true" />
          </button>
          <button
            className="p-1.5 rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
            aria-label={`Download invoice ${inv.invoiceNumber}`}
          >
            <Download size={14} aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div className="glass-card rounded-xl border border-[var(--color-border-base)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border-base)]">
          <span className="text-sm font-semibold text-[var(--color-text-primary)] mr-2">Invoices</span>
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={[
                'px-3 py-1 text-xs rounded-full border transition-colors',
                statusFilter === f.value
                  ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
                  : 'text-[var(--color-text-secondary)] border-[var(--color-border-base)] hover:border-[var(--color-border-strong)]',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-[var(--color-text-tertiary)]">
            {data?.total ?? 0} invoices
          </span>
        </div>

        <DataTable<InvoiceVM>
          columns={columnsWithAction}
          data={data?.items ?? []}
          keyExtractor={(inv) => inv.id}
          loading={isPending}
          emptyTitle="No invoices found"
          emptyDescription="No invoices match the current filter."
        />
      </div>

      <InvoiceDetailDrawer
        invoiceId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  )
}
