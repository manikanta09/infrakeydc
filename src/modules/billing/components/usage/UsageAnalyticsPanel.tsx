import { useState } from 'react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, SkeletonChart } from '@/components/shared'
import { TimeRangeSelector } from '../shared/TimeRangeSelector'
import { useUsageAnalytics } from '../../hooks/useUsageAnalytics'
import type { TimeRange } from '../../types/billing.types'

const BARS = [
  { key: 'gpu',          label: 'GPU',         color: '#a855f7' },
  { key: 'compute',      label: 'Compute',     color: '#3b82f6' },
  { key: 'storage',      label: 'Storage',     color: '#22c55e' },
  { key: 'network',      label: 'Network',     color: '#f59e0b' },
  { key: 'ai_inference', label: 'AI',          color: '#06b6d4' },
]

function usd(v: number) {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`
  return `$${v.toFixed(0)}`
}

export function UsageAnalyticsPanel() {
  const [range, setRange] = useState<TimeRange>('30d')
  const { data, isPending } = useUsageAnalytics(range)

  return (
    <ChartContainer
      title="Usage Analytics"
      subtitle={`Spend breakdown by service · ${range.toUpperCase()}`}
      action={<TimeRangeSelector value={range} onChange={setRange} />}
    >
      {isPending ? (
        <SkeletonChart />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={data?.chartSeries ?? []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={usd}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border-base)',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: 'var(--color-text-primary)',
                }}
                formatter={(v, name) => [usd(Number(v)), String(name)]}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-secondary)', paddingTop: 8 }}
              />
              {BARS.map((b) => (
                <Bar
                  key={b.key}
                  dataKey={b.key}
                  name={b.label}
                  stackId="spend"
                  fill={b.color}
                  radius={[0, 0, 0, 0]}
                  maxBarSize={28}
                />
              ))}
              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="4 2"
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: 'Peak Day',     value: data?.peakDay ? new Date(data.peakDay).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—' },
              { label: 'Peak Amount',  value: usd(data?.peakAmount ?? 0) },
              { label: 'Avg Daily',    value: usd(data?.avgDailySpend ?? 0) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[var(--color-surface-2)] rounded-lg p-3 text-center">
                <div className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wide">{label}</div>
                <div className="text-sm font-bold text-[var(--color-text-primary)] mt-0.5">{value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </ChartContainer>
  )
}
