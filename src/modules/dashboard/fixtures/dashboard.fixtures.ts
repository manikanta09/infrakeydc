import type { ActivityEvent } from '@/components/shared/widgets/ActivityFeed'
import type { StatusItem } from '@/components/shared/widgets/StatusWidget'
import type { MetricCardProps } from '@/modules/dashboard/types'

/* ── Telemetry ── */

export const TELEMETRY_DATA = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  cpu: Math.round(30 + Math.random() * 45 + (i > 10 && i < 18 ? 20 : 0)),
  memory: Math.round(45 + Math.random() * 30),
  network: Math.round(10 + Math.random() * 60),
}))

export const TELEMETRY_SERIES = [
  { key: 'cpu', label: 'CPU %', color: '#3b82f6' },
  { key: 'memory', label: 'Memory %', color: '#a855f7' },
  { key: 'network', label: 'Network Mb/s', color: '#22c55e' },
] as const

/* ── Billing / Metering ── */

export const BILLING_MONTHLY = [
  { month: 'Jan', compute: 4200, storage: 1100, network: 800 },
  { month: 'Feb', compute: 5100, storage: 1300, network: 920 },
  { month: 'Mar', compute: 4800, storage: 1200, network: 880 },
  { month: 'Apr', compute: 6200, storage: 1500, network: 1100 },
  { month: 'May', compute: 7100, storage: 1800, network: 1300 },
  { month: 'Jun', compute: 8265, storage: 2100, network: 1580 },
]

export const BILLING_SERIES = [
  { key: 'compute', label: 'Compute', color: '#3b82f6' },
  { key: 'storage', label: 'Storage', color: '#22c55e' },
  { key: 'network', label: 'Network', color: '#f59e0b' },
] as const

/* ── Resource Distribution ── */

export const RESOURCE_DONUT = [
  { name: 'Compute', value: 48, color: '#3b82f6' },
  { name: 'GPU', value: 28, color: '#a855f7' },
  { name: 'Storage', value: 15, color: '#22c55e' },
  { name: 'Network', value: 9, color: '#f59e0b' },
]

/* ── Activity Feed ── */

export const ACTIVITY_EVENTS: ActivityEvent[] = [
  { id: '1', type: 'success', message: 'VM vm-prod-01 provisioned successfully', source: 'Compute', timestamp: '2m ago' },
  { id: '2', type: 'warning', message: 'GPU utilization threshold exceeded (92%)', source: 'GPU Fleet', timestamp: '5m ago', detail: 'gpu-a100-03' },
  { id: '3', type: 'info', message: 'Snapshot backup initiated for vol-data-01', source: 'Storage', timestamp: '18m ago' },
  { id: '4', type: 'error', message: 'Network latency spike in us-east-1', source: 'Networking', timestamp: '34m ago' },
  { id: '5', type: 'success', message: 'Security scan completed — no threats', source: 'Security', timestamp: '1h ago' },
  { id: '6', type: 'info', message: 'AI model inference endpoint scaled up', source: 'AI Workspace', timestamp: '2h ago' },
]

/* ── Service Status ── */

export const SERVICE_STATUS_ITEMS: StatusItem[] = [
  { id: '1', label: 'Compute API', status: 'online', detail: 'us-east-1', metric: '99.98%' },
  { id: '2', label: 'GPU Cluster', status: 'warning', detail: 'High utilization', metric: '92%' },
  { id: '3', label: 'Object Storage', status: 'online', detail: 'Global', metric: '100%' },
  { id: '4', label: 'AI Inference', status: 'online', detail: 'eu-west-1', metric: '99.91%' },
  { id: '5', label: 'MDC Network', status: 'online', detail: 'Multi-region', metric: '99.99%' },
]

/* ── VM Instances ── */

export interface VMRow {
  name: string
  region: string
  vcpus: string
  status: 'online' | 'warning' | 'offline'
  uptime: string
  cost: string
}

export const VM_INSTANCES: VMRow[] = [
  { name: 'vm-prod-api-01', region: 'us-east-1', vcpus: '8 vCPU / 32 GB', status: 'online', uptime: '99.98%', cost: '$184/mo' },
  { name: 'vm-prod-db-01', region: 'us-east-1', vcpus: '16 vCPU / 64 GB', status: 'online', uptime: '100%', cost: '$342/mo' },
  { name: 'vm-staging-01', region: 'eu-west-1', vcpus: '4 vCPU / 16 GB', status: 'warning', uptime: '97.2%', cost: '$92/mo' },
  { name: 'vm-ml-worker-02', region: 'ap-southeast-1', vcpus: '32 vCPU / 128 GB', status: 'online', uptime: '99.85%', cost: '$680/mo' },
  { name: 'vm-dev-sandbox', region: 'us-west-2', vcpus: '2 vCPU / 8 GB', status: 'offline', uptime: '—', cost: '$28/mo' },
]

/* ── Quick Actions ── */

export const QUICK_ACTIONS = [
  {
    id: 'new-vm',
    label: 'New VM',
    desc: 'Provision compute',
    icon: 'Server',
    color: 'text-[var(--color-brand)]',
    bg: 'bg-[var(--color-brand-subtle)]',
    path: '/compute',
  },
  {
    id: 'gpu-instance',
    label: 'GPU Instance',
    desc: 'A100 / H100 fleet',
    icon: 'Cpu',
    color: 'text-[var(--color-neon-purple)]',
    bg: 'bg-[rgba(168,85,247,0.1)]',
    path: '/compute/gpu',
  },
  {
    id: 'ai-deploy',
    label: 'AI Deploy',
    desc: 'Deploy model endpoint',
    icon: 'Cloud',
    color: 'text-[var(--color-neon-green)]',
    bg: 'bg-[rgba(0,255,136,0.08)]',
    path: '/ai-workspace',
  },
  {
    id: 'mdc-region',
    label: 'MDC Region',
    desc: 'New datacenter node',
    icon: 'Globe',
    color: 'text-[var(--color-neon-orange)]',
    bg: 'bg-[rgba(249,115,22,0.1)]',
    path: '/infrastructure',
  },
]

/* ── Platform Stats ── */

export const PLATFORM_STATS = [
  {
    id: 'tenants',
    label: 'Total Tenants',
    value: '24',
    icon: 'Users',
    color: 'text-[var(--color-brand)]',
    bg: 'bg-[var(--color-brand-subtle)]',
    change: '+3 this month',
  },
  {
    id: 'inferences',
    label: 'AI Inferences',
    value: '4.2M',
    icon: 'Zap',
    color: 'text-[var(--color-neon-purple)]',
    bg: 'bg-[rgba(168,85,247,0.1)]',
    change: '+18% vs last week',
  },
  {
    id: 'data',
    label: 'Data Transferred',
    value: '18.4 TB',
    icon: 'Globe',
    color: 'text-[var(--color-neon-green)]',
    bg: 'bg-[rgba(0,255,136,0.08)]',
    change: 'Last 30 days',
  },
  {
    id: 'efficiency',
    label: 'Cost Efficiency',
    value: '+12%',
    icon: 'TrendingUp',
    color: 'text-[var(--color-success)]',
    bg: 'bg-[var(--color-success-dim)]',
    change: 'vs. prev. quarter',
  },
]

/* ── Key Metrics ── */

export const KEY_METRICS: MetricCardProps[] = [
  {
    title: 'Monthly Spend',
    value: '$82,650',
    subtitle: 'Jun 2026 · Pro Plan',
    trend: { value: 12.4, label: ' vs May' },
    accentColor: 'brand',
  },
  {
    title: 'Active Instances',
    value: '2CT / 48',
    subtitle: '2 GPU clusters · 48 VMs',
    trend: { value: 8, direction: 'up' },
    accentColor: 'green',
  },
  {
    title: 'Avg GPU Utilization',
    value: '78.4%',
    subtitle: '12 A100 · 4 H100 active',
    trend: { value: 5.2, direction: 'up' },
    accentColor: 'purple',
  },
  {
    title: 'Uptime SLA',
    value: '99.97%',
    subtitle: 'Last 30 days · All regions',
    trend: { value: 0.01, direction: 'up' },
    accentColor: 'orange',
  },
]

/* ── AI Assistant Preview Messages ── */

export const AI_PREVIEW_MESSAGES = [
  { role: 'user' as const, msg: 'Show GPU utilization across clusters' },
  { role: 'ai' as const, msg: 'GPU-A100 cluster: 92% avg. H100 cluster: 74%. Recommend scaling H100 pool by 2 nodes.' },
  { role: 'user' as const, msg: "What's my projected cost for June?" },
  { role: 'ai' as const, msg: 'Based on current usage, projected spend is $91,200 ±3% for June.' },
]
