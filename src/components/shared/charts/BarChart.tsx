import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { cn } from '@/utils/cn'

interface BarSeries {
  key: string
  label: string
  color: string
}

interface BarChartProps {
  data: Record<string, unknown>[]
  series: BarSeries[]
  xKey?: string
  xTickFormatter?: (v: unknown) => string
  yTickFormatter?: (v: unknown) => string
  showGrid?: boolean
  horizontal?: boolean
  radius?: number
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
            <div className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
            <span className="text-[11px] text-[var(--color-text-secondary)]">{p.name}</span>
          </div>
          <span className="text-[11px] font-semibold text-[var(--color-text-primary)] font-mono">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function BarChartWidget({
  data,
  series,
  xKey = 'name',
  xTickFormatter,
  yTickFormatter,
  showGrid = true,
  horizontal = false,
  radius = 4,
  className,
}: BarChartProps) {
  return (
    <div className={cn('w-full h-full', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          barCategoryGap="30%"
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-subtle)"
              vertical={!horizontal}
              horizontal={horizontal}
            />
          )}

          {horizontal ? (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: 'var(--color-text-disabled)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={yTickFormatter}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                tick={{ fontSize: 10, fill: 'var(--color-text-disabled)' }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 10, fill: 'var(--color-text-disabled)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={xTickFormatter}
                dy={6}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--color-text-disabled)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={yTickFormatter}
              />
            </>
          )}

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />

          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color}
              radius={[radius, radius, 0, 0]}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={s.color} fillOpacity={0.8} />
              ))}
            </Bar>
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}
