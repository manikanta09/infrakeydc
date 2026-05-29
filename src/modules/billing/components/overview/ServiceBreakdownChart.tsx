import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartContainer } from '@/components/shared'
import { SkeletonChart } from '@/components/shared'
import { useBillingOverview } from '../../hooks/useBillingOverview'
import { formatCurrency } from '../../services/billing.adapters'

export function ServiceBreakdownChart() {
  const { data, isPending } = useBillingOverview()

  return (
    <ChartContainer
      title="Service Breakdown"
      subtitle="Current month spend by service"
    >
      {isPending ? (
        <SkeletonChart />
      ) : (
        <div className="flex flex-col gap-4">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data?.serviceBreakdown ?? []}
                dataKey="amount"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={76}
                paddingAngle={2}
                strokeWidth={0}
              >
                {(data?.serviceBreakdown ?? []).map((entry) => (
                  <Cell key={entry.service} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border-base)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'var(--color-text-primary)',
                }}
                formatter={(v) => [formatCurrency(Number(v)), 'Spend']}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-2">
            {(data?.serviceBreakdown ?? []).map((s) => (
              <div key={s.service} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-xs text-[var(--color-text-secondary)] flex-1">{s.label}</span>
                <span className="text-xs font-medium text-[var(--color-text-primary)]">
                  {formatCurrency(s.amount)}
                </span>
                <span className="text-[10px] text-[var(--color-text-tertiary)] w-8 text-right">
                  {s.percentage.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartContainer>
  )
}
