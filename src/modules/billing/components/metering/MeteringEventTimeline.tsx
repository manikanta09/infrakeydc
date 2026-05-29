import { Activity, Cpu, HardDrive, Network, Zap, Database } from 'lucide-react'
import { motion } from 'framer-motion'
import { SkeletonText } from '@/components/shared'
import { useMeteringEvents } from '../../hooks/useMeteringEvents'
import type { BillingServiceType } from '../../types/billing.types'

const SERVICE_ICONS: Record<BillingServiceType, React.ElementType> = {
  compute:         Cpu,
  gpu:             Zap,
  storage:         HardDrive,
  network:         Network,
  ai_inference:    Activity,
  managed_db:      Database,
  cdn:             Network,
  mdc_colocation:  Database,
}

const SERVICE_COLORS: Record<BillingServiceType, string> = {
  compute:         '#3b82f6',
  gpu:             '#a855f7',
  storage:         '#22c55e',
  network:         '#f59e0b',
  ai_inference:    '#06b6d4',
  managed_db:      '#f97316',
  cdn:             '#ec4899',
  mdc_colocation:  '#64748b',
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  vm_start:           'VM Started',
  vm_stop:            'VM Stopped',
  vm_resize:          'VM Resized',
  gpu_alloc:          'GPU Allocated',
  gpu_release:        'GPU Released',
  storage_write:      'Storage Write',
  storage_read:       'Storage Read',
  storage_delete:     'Storage Delete',
  network_egress:     'Network Egress',
  network_ingress:    'Network Ingress',
  ai_inference:       'AI Inference',
  ai_training:        'AI Training',
  snapshot_create:    'Snapshot Created',
  snapshot_delete:    'Snapshot Deleted',
  billing_cycle_close:'Billing Cycle Closed',
}

interface Props {
  limit?: number
}

export function MeteringEventTimeline({ limit = 15 }: Props) {
  const { data: events, isPending } = useMeteringEvents({ limit })

  return (
    <div className="glass-card rounded-xl border border-[var(--color-border-base)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border-base)] flex items-center gap-2">
        <Activity size={14} className="text-[var(--color-brand)]" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Metering Events</h3>
        <span className="ml-auto text-xs text-[var(--color-text-tertiary)] font-mono">Live</span>
        <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" aria-hidden="true" />
      </div>

      <div className="divide-y divide-[var(--color-border-subtle)] max-h-[520px] overflow-y-auto">
        {isPending
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="px-4 py-3">
                <SkeletonText lines={2} />
              </div>
            ))
          : (events ?? []).map((ev, i) => {
              const Icon = SERVICE_ICONS[ev.serviceType] ?? Activity
              const color = SERVICE_COLORS[ev.serviceType] ?? '#64748b'
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-surface-2)] transition-colors"
                >
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: `${color}18`, color }}
                  >
                    <Icon size={13} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xs font-medium text-[var(--color-text-primary)]">
                        {EVENT_TYPE_LABELS[ev.eventType] ?? ev.eventType}
                      </span>
                      <span className="text-xs text-[var(--color-text-tertiary)] truncate">{ev.resourceName}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] text-[var(--color-text-tertiary)]">{ev.quantityFormatted}</span>
                      <span className="text-[10px] text-[var(--color-text-tertiary)]">{ev.region}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                      {ev.costFormatted}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{ev.timeAgo}</span>
                  </div>
                </motion.div>
              )
            })
        }
      </div>
    </div>
  )
}
