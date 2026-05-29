import { Drawer } from '@/components/shared'
import { SkeletonText } from '@/components/shared'
import { InvoiceStatusBadge } from '../shared/InvoiceStatusBadge'
import { useInvoice } from '../../hooks/useInvoices'

interface Props {
  invoiceId: string | null
  onClose: () => void
}

export function InvoiceDetailDrawer({ invoiceId, onClose }: Props) {
  const { data: invoice, isPending } = useInvoice(invoiceId ?? '')

  return (
    <Drawer
      open={!!invoiceId}
      onClose={onClose}
      title={invoice?.invoiceNumber ?? 'Invoice Details'}
      width="560px"
    >
      {isPending ? (
        <div className="space-y-4 p-4">
          <SkeletonText lines={4} />
          <SkeletonText lines={6} />
        </div>
      ) : invoice ? (
        <div className="flex flex-col gap-6 p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-bold text-[var(--color-text-primary)]">{invoice.invoiceNumber}</div>
              <div className="text-sm text-[var(--color-text-tertiary)]">{invoice.period}</div>
            </div>
            <InvoiceStatusBadge status={invoice.status} />
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'Tenant', value: invoice.tenantName },
              { label: 'Currency', value: invoice.currency },
              { label: 'Issue Date', value: new Date(invoice.issueDate).toLocaleDateString() },
              { label: 'Due Date', value: new Date(invoice.dueDate).toLocaleDateString() },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[var(--color-surface-2)] rounded-lg p-3">
                <div className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wide mb-0.5">{label}</div>
                <div className="font-medium text-[var(--color-text-primary)]">{value}</div>
              </div>
            ))}
          </div>

          {/* Line Items */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">
              Line Items
            </h4>
            <div className="rounded-lg border border-[var(--color-border-base)] overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[var(--color-surface-2)] border-b border-[var(--color-border-base)]">
                    <th className="py-2 px-3 text-left text-[var(--color-text-tertiary)] font-medium">Description</th>
                    <th className="py-2 px-3 text-right text-[var(--color-text-tertiary)] font-medium">Qty</th>
                    <th className="py-2 px-3 text-right text-[var(--color-text-tertiary)] font-medium">Unit Price</th>
                    <th className="py-2 px-3 text-right text-[var(--color-text-tertiary)] font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lineItems.map((item, i) => (
                    <tr
                      key={item.id}
                      className={[
                        'border-b border-[var(--color-border-subtle)] last:border-0',
                        i % 2 === 1 ? 'bg-[var(--color-surface-1)]' : '',
                      ].join(' ')}
                    >
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-[var(--color-text-primary)]">{item.description}</div>
                        <div className="text-[var(--color-text-tertiary)]">{item.unit} · {item.region}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--color-text-secondary)]">
                        {item.quantity.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--color-text-secondary)]">
                        {item.unitPriceFormatted}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold text-[var(--color-text-primary)]">
                        {item.totalFormatted}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="rounded-lg bg-[var(--color-surface-2)] p-4 space-y-2 text-sm">
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>Subtotal</span>
              <span>{invoice.subtotalFormatted}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>Tax ({(invoice.taxRate * 100).toFixed(0)}%)</span>
              <span>{invoice.taxAmountFormatted}</span>
            </div>
            <div className="flex justify-between font-bold text-[var(--color-text-primary)] text-base pt-2 border-t border-[var(--color-border-base)]">
              <span>Total</span>
              <span className="text-[var(--color-brand)]">{invoice.totalFormatted}</span>
            </div>
          </div>

          {invoice.notes && (
            <p className="text-xs text-[var(--color-text-tertiary)] italic">{invoice.notes}</p>
          )}
        </div>
      ) : (
        <div className="p-4 text-sm text-[var(--color-text-tertiary)]">Invoice not found.</div>
      )}
    </Drawer>
  )
}
