import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, SkeletonChart } from '@/components/shared'
import { useCostForecast } from '../../hooks/useCostForecast'

function usd(v: number) {
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`
  return `$${v.toFixed(0)}`
}

export function CostForecastPanel() {
  const { data, isPending } = useCostForecast()
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

  return (
    <ChartContainer
      title="Cost Forecast"
      subtitle={
        isPending
          ? 'Loading…'
          : `${data?.forecastedTotalFormatted} projected · ${data?.confidence}% confidence`
      }
    >
      {isPending ? (
        <SkeletonChart />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data?.chartSeries ?? []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="grad-actual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-forecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={4}
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
                fontSize: '12px',
                color: 'var(--color-text-primary)',
              }}
              formatter={(v, name) => [v != null ? usd(Number(v)) : '—', String(name)]}
            />
            <ReferenceLine
              x={today}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="4 4"
              label={{ value: 'Today', fill: 'var(--color-text-tertiary)', fontSize: 10, position: 'top' }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#grad-actual)"
              dot={false}
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              name="Forecast"
              stroke="#a855f7"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="url(#grad-forecast)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="upperBound"
              name="Upper"
              stroke="rgba(168,85,247,0.3)"
              strokeWidth={0.5}
              fill="none"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              name="Lower"
              stroke="rgba(168,85,247,0.3)"
              strokeWidth={0.5}
              fill="none"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}
