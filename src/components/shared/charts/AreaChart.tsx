import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { cn } from '@/utils/cn'

interface AreaSeries {
  key: string
  label: string
  color: string
  gradient?: boolean
}

interface AreaChartProps {
  data: Record<string, unknown>[]
  series: AreaSeries[]
  xKey?: string
  xTickFormatter?: (v: unknown) => string
  yTickFormatter?: (v: unknown) => string
  showGrid?: boolean
  showLegend?: boolean
  className?: string
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-lg p-3 shadow-xl min-w-[120px]">
      <p className="text-[11px] text-[var(--color-text-tertiary)] mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[11px] text-[var(--color-text-secondary)]">{p.name}</span>
          </div>
          <span className="text-[11px] font-semibold text-[var(--color-text-primary)] font-mono">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function AreaChartWidget({
  data,
  series,
  xKey = 'time',
  xTickFormatter,
  yTickFormatter,
  showGrid = true,
  showLegend = false,
  className,
}: AreaChartProps) {
  return (
    <div className={cn('w-full h-full', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ReAreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-subtle)"
              vertical={false}
            />
          )}

          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 10, fill: 'var(--color-text-disabled)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={xTickFormatter}
            dy={6}
          />

          <YAxis
            tick={{ fontSize: 10, fill: 'var(--color-text-disabled)', fontFamily: 'var(--font-sans)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '4 4' }}
          />

          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}
            />
          )}

          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={1.5}
              fill={s.gradient !== false ? `url(#grad-${s.key})` : 'transparent'}
              dot={false}
              activeDot={{ r: 3, fill: s.color, stroke: 'var(--color-surface-1)', strokeWidth: 2 }}
            />
          ))}
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
