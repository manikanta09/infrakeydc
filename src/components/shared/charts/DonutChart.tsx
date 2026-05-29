import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { cn } from '@/utils/cn'

interface DonutSlice {
  name: string
  value: number
  color: string
}

interface DonutChartProps {
  data: DonutSlice[]
  innerRadius?: number
  outerRadius?: number
  centerLabel?: string
  centerValue?: string | number
  className?: string
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: { color: string } }>
}) => {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="glass-card rounded-lg p-2.5 shadow-xl">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: item.payload.color }} />
        <span className="text-[11px] text-[var(--color-text-secondary)]">{item.name}</span>
        <span className="text-[11px] font-semibold text-[var(--color-text-primary)] font-mono">{item.value}</span>
      </div>
    </div>
  )
}

export function DonutChart({
  data,
  innerRadius = 55,
  outerRadius = 75,
  centerLabel,
  centerValue,
  className,
}: DonutChartProps) {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            strokeWidth={0}
            paddingAngle={2}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {(centerLabel || centerValue !== undefined) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue !== undefined && (
            <span className="text-xl font-bold metric-number text-[var(--color-text-primary)]">
              {centerValue}
            </span>
          )}
          {centerLabel && (
            <span className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}
