import { Activity, DollarSign, Server, Zap } from 'lucide-react'
import { SpendMetricCard } from '../shared/SpendMetricCard'
import { SkeletonMetricCard } from '@/components/shared'
import { useMeteringStats } from '../../hooks/useMeteringEvents'

export function MeteringStatsRow() {
  const { data, isPending } = useMeteringStats()

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
        label="Events Today"
        value={data.totalEventsToday}
        sub="Metering events processed"
        accentColor="brand"
        icon={<Activity size={14} />}
      />
      <SpendMetricCard
        label="Cost Today"
        value={data.totalCostToday}
        sub="Accrued since midnight"
        accentColor="purple"
        icon={<DollarSign size={14} />}
      />
      <SpendMetricCard
        label="Active Resources"
        value={String(data.activeResources)}
        sub="VMs, GPUs, Storage volumes"
        accentColor="green"
        icon={<Server size={14} />}
      />
      <SpendMetricCard
        label="Ingestion Rate"
        value={data.ingestionRate}
        sub={`Top: ${data.topResourceById}`}
        accentColor="orange"
        icon={<Zap size={14} />}
      />
    </div>
  )
}
