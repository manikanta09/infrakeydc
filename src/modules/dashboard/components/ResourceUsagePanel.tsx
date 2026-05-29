import { BarChart3, DollarSign, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartContainer } from '@/components/shared/charts/ChartContainer'
import { BarChartWidget } from '@/components/shared/charts/BarChart'
import { DonutChart } from '@/components/shared/charts/DonutChart'
import { RESOURCE_DONUT, BILLING_MONTHLY, BILLING_SERIES } from '../fixtures/dashboard.fixtures'

export function ResourceDistributionPanel() {
  return (
    <Card className="h-full">
      <CardHeader title="Resource Distribution" icon={<BarChart3 size={14} />} />
      <div className="flex items-center gap-4">
        <div className="w-40 h-40 flex-shrink-0">
          <DonutChart
            data={RESOURCE_DONUT}
            innerRadius={45}
            outerRadius={65}
            centerValue="$82k"
            centerLabel="total"
          />
        </div>
        <div className="space-y-2.5 flex-1">
          {RESOURCE_DONUT.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-[var(--color-text-secondary)]">{d.name}</span>
              </div>
              <span className="text-xs font-semibold text-[var(--color-text-primary)] font-mono">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function UsageMeteringPanel() {
  return (
    <ChartContainer
      title="Usage & Metering"
      subtitle="Monthly cost breakdown by service"
      icon={<DollarSign size={14} />}
      height={220}
      action={
        <Button variant="ghost" size="xs" icon={<ArrowUpRight size={11} />}>
          Full report
        </Button>
      }
    >
      <BarChartWidget
        data={BILLING_MONTHLY}
        series={[...BILLING_SERIES]}
        xKey="month"
        yTickFormatter={(v) => `$${Number(v) / 1000}k`}
        showGrid
      />
    </ChartContainer>
  )
}
