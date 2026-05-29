import { useNavigate } from 'react-router-dom'
import { Server, Cpu, Cloud, Globe, Zap } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/card'
import { QUICK_ACTIONS } from '../fixtures/dashboard.fixtures'

const ICON_MAP: Record<string, React.ElementType> = { Server, Cpu, Cloud, Globe }

export function QuickActionsPanel() {
  const navigate = useNavigate()

  return (
    <Card className="h-full">
      <CardHeader title="Quick Actions" icon={<Zap size={14} />} />
      <div className="grid grid-cols-2 gap-2.5">
        {QUICK_ACTIONS.map(({ id, icon, label, desc, color, bg, path }) => {
          const Icon = ICON_MAP[icon] ?? Server
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className="flex flex-col items-start gap-2 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)] hover:border-[var(--color-border-strong)] transition-all duration-150 text-left cursor-pointer"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg} ${color}`}>
                <Icon size={14} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">{label}</p>
                <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{desc}</p>
              </div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
