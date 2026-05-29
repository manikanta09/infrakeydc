import { Users, Zap, Globe, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PLATFORM_STATS } from '../fixtures/dashboard.fixtures'

const ICON_MAP: Record<string, React.ElementType> = { Users, Zap, Globe, TrendingUp }

export function PlatformStatsRow() {
  return (
    <div className="lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-3">
      {PLATFORM_STATS.map(({ id, label, value, icon, color, bg, change }) => {
        const Icon = ICON_MAP[icon] ?? Zap
        return (
          <Card key={id} hover className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg} ${color}`}>
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[var(--color-text-tertiary)] truncate">{label}</p>
              <p className={`text-xl font-bold metric-number leading-tight ${color}`}>{value}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)] mt-0.5">{change}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
