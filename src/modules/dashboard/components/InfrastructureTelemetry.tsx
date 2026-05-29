import { Activity } from 'lucide-react'
import { ChartContainer } from '@/components/shared/charts/ChartContainer'
import { AreaChartWidget } from '@/components/shared/charts/AreaChart'
import { TELEMETRY_DATA, TELEMETRY_SERIES } from '../fixtures/dashboard.fixtures'

export function InfrastructureTelemetry() {
  return (
    <ChartContainer
      title="Infrastructure Health"
      subtitle="Real-time telemetry — last 24h"
      icon={<Activity size={14} />}
      height={220}
      action={
        <div className="flex items-center gap-1.5">
          {TELEMETRY_SERIES.map((s, i) => (
            <span key={s.key} className="flex items-center gap-1 text-[10px] text-[var(--color-text-tertiary)]">
              <span className="w-2 h-2 rounded-sm" style={{ background: s.color }} />
              {['CPU', 'Memory', 'Network'][i]}
            </span>
          ))}
        </div>
      }
    >
      <AreaChartWidget
        data={TELEMETRY_DATA}
        series={[...TELEMETRY_SERIES]}
        xKey="time"
        yTickFormatter={(v) => `${v}%`}
        showGrid
      />
    </ChartContainer>
  )
}
