import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ChartContainer } from '@/components/shared'
import { SkeletonChart } from '@/components/shared'
import { TimeRangeSelector } from '../shared/TimeRangeSelector'
import { useUsageAnalytics } from '../../hooks/useUsageAnalytics'
import type { TimeRange } from '../../types/billing.types'

const SERIES = [
  { key: 'gpu',         label: 'GPU',         color: '#a855f7' },
  { key: 'compute',     label: 'Compute',     color: '#3b82f6' },
  { key: 'storage',     label: 'Storage',     color: '#22c55e' },
  { key: 'network',     label: 'Network',     color: '#f59e0b' },
  { key: 'ai_inference',label: 'AI',          color: '#06b6d4' },
]

function usd(v: number) {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`
  return `$${v.toFixed(0)}`
}

export function SpendTrendChart() {
  const [range, setRange] = useState<TimeRange>('30d')
  const { data, isPending } = useUsageAnalytics(range)

  return (
    <ChartContainer
      title="Spend Trend"
      subtitle={`By service · ${range.toUpperCase()}`}
      action={
        <TimeRangeSelector value={range} onChange={setRange} />
      }
    >
      {isPending ? (
        <SkeletonChart />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data?.chartSeries ?? []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              {SERIES.map((s) => (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={usd}
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border-base)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--color-text-primary)',
              }}
              formatter={(v, name) => [usd(Number(v)), String(name)]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-secondary)', paddingTop: 8 }}
            />
            {SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={1.5}
                fill={`url(#grad-${s.key})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}
