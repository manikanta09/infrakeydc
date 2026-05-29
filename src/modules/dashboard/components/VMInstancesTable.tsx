import { Server, ArrowUpRight, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable, type Column } from '@/components/shared/tables/DataTable'
import { VM_INSTANCES, type VMRow } from '../fixtures/dashboard.fixtures'

const VM_COLUMNS: Column<VMRow>[] = [
  {
    key: 'name',
    header: 'Instance',
    render: (_, row) => (
      <div>
        <p className="text-xs font-semibold text-[var(--color-text-primary)] font-mono">{row.name}</p>
        <p className="text-[10px] text-[var(--color-text-tertiary)]">{row.vcpus}</p>
      </div>
    ),
  },
  {
    key: 'region',
    header: 'Region',
    render: (v) => (
      <span className="text-xs text-[var(--color-text-secondary)] font-mono">{String(v)}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (_, row) => (
      <Badge variant={row.status} dot size="xs">
        {row.status === 'online' ? 'Running' : row.status === 'warning' ? 'Degraded' : 'Stopped'}
      </Badge>
    ),
  },
  {
    key: 'uptime',
    header: 'Uptime',
    align: 'right',
    render: (v) => (
      <span className="text-xs font-mono text-[var(--color-text-secondary)]">{String(v)}</span>
    ),
  },
  {
    key: 'cost',
    header: 'Cost',
    align: 'right',
    render: (v) => (
      <span className="text-xs font-mono text-[var(--color-text-primary)] font-semibold">{String(v)}</span>
    ),
  },
]

export function VMInstancesTable() {
  const navigate = useNavigate()

  return (
    <Card padding="none">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)]">
            <Server size={14} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Active Instances</h3>
            <p className="text-[11px] text-[var(--color-text-tertiary)]">48 running · 3 stopped · 2 provisioning</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" dot>48 Running</Badge>
          <Button variant="ghost" size="xs" icon={<ArrowUpRight size={11} />} onClick={() => navigate('/compute')}>
            View all
          </Button>
          <Button variant="brand" size="xs" icon={<Plus size={11} />} onClick={() => navigate('/compute')}>
            New VM
          </Button>
        </div>
      </div>
      <DataTable
        columns={VM_COLUMNS}
        data={VM_INSTANCES}
        keyExtractor={(r) => r.name}
        striped
      />
    </Card>
  )
}
