import { DollarSign, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'
import { SpendMetricCard } from '../shared/SpendMetricCard'
import { SkeletonMetricCard } from '@/components/shared'
import { useBillingOverview } from '../../hooks/useBillingOverview'

export function BillingMetricsRow() {
  const { data, isPending } = useBillingOverview()

  if (isPending) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonMetricCard key={i} />)}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <SpendMetricCard
        label="Current Spend"
        value={data.currentSpend}
        sub={data.period}
        trend={data.momChange ? parseFloat(data.momChange) : undefined}
        trendLabel="vs last month"
        accentColor="brand"
        icon={<DollarSign size={14} />}
      />
      <SpendMetricCard
        label="Projected Spend"
        value={data.projectedSpend}
        sub="End of month estimate"
        accentColor="purple"
        icon={<TrendingUp size={14} />}
        badge={`${data.budgetUsedPercent.toFixed(0)}% of budget`}
      />
      <SpendMetricCard
        label="Budget Limit"
        value={data.budgetLimit}
        sub={data.budgetStatus === 'critical' ? 'Critical — near limit' : data.budgetStatus === 'warning' ? 'Warning threshold hit' : 'Within budget'}
        accentColor={data.budgetStatus === 'critical' || data.budgetStatus === 'exceeded' ? 'red' : data.budgetStatus === 'warning' ? 'orange' : 'green'}
        icon={<AlertTriangle size={14} />}
      />
      <SpendMetricCard
        label="Savings Available"
        value={data.savingsOpportunity}
        sub={`${data.anomalyCount} anomal${data.anomalyCount === 1 ? 'y' : 'ies'} detected`}
        accentColor="green"
        icon={<Lightbulb size={14} />}
      />
    </div>
  )
}
