import type {
  BillingOverview,
  Invoice,
  UsageAnalytics,
  CostForecast,
  BillingInsight,
  Budget,
  PaymentMethod,
  ServiceSpend,
} from '../types/billing.types'

/* ── Tenant seed ── */
const TENANT_ID = 'tenant-infrakey-001'

/* ─────────────────────────────────────────────────────────────────
   SERVICE BREAKDOWN
───────────────────────────────────────────────────────────────── */
export const SERVICE_BREAKDOWN: ServiceSpend[] = [
  { service: 'gpu',          label: 'GPU Compute',      amount: 34210, percentage: 41.4, trend: 18.2,  color: '#a855f7' },
  { service: 'compute',      label: 'Virtual Machines',  amount: 24680, percentage: 29.9, trend: 5.1,   color: '#3b82f6' },
  { service: 'storage',      label: 'Storage',           amount: 10540, percentage: 12.8, trend: -2.3,  color: '#22c55e' },
  { service: 'network',      label: 'Networking',        amount:  7420, percentage:  9.0, trend: 8.7,   color: '#f59e0b' },
  { service: 'ai_inference', label: 'AI Inference',      amount:  3920, percentage:  4.7, trend: 34.6,  color: '#00d4ff' },
  { service: 'managed_db',   label: 'Managed DB',        amount:  1880, percentage:  2.3, trend: -1.1,  color: '#f97316' },
]

/* ─────────────────────────────────────────────────────────────────
   BILLING OVERVIEW
───────────────────────────────────────────────────────────────── */
export const BILLING_OVERVIEW: BillingOverview = {
  tenantId: TENANT_ID,
  period: 'June 2026',
  currentSpend: 82650,
  projectedSpend: 91200,
  lastMonthSpend: 73480,
  momChange: 12.5,
  budgetLimit: 100000,
  budgetUsedPercent: 82.7,
  currency: 'USD',
  serviceBreakdown: SERVICE_BREAKDOWN,
  anomalyCount: 3,
  savingsOpportunity: 8400,
}

/* ─────────────────────────────────────────────────────────────────
   INVOICES
───────────────────────────────────────────────────────────────── */
export const INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-0601',
    tenantId: TENANT_ID,
    tenantName: 'InfrakeyDC — Primary',
    period: 'June 2026',
    periodStart: '2026-06-01',
    periodEnd: '2026-06-30',
    issueDate: '2026-07-01',
    dueDate: '2026-07-15',
    status: 'pending',
    subtotal: 82650,
    taxRate: 0.18,
    taxAmount: 14877,
    total: 97527,
    currency: 'USD',
    lineItems: [
      { id: 'li-001', description: 'GPU A100 — 40GB (12 units × 720h)', serviceType: 'gpu',     resourceId: 'gpu-cluster-01', resourceName: 'GPU-A100-Cluster', quantity: 8640, unit: 'GPU-hr', unitPrice: 2.80, total: 24192, region: 'us-east-1' },
      { id: 'li-002', description: 'GPU H100 — 80GB (4 units × 720h)',  serviceType: 'gpu',     resourceId: 'gpu-cluster-02', resourceName: 'GPU-H100-Cluster', quantity: 2880, unit: 'GPU-hr', unitPrice: 3.47, total: 10018, region: 'us-east-1' },
      { id: 'li-003', description: 'VM — c6i.8xlarge (8 instances)',    serviceType: 'compute', resourceId: 'vm-prod-pool',   resourceName: 'Prod VM Pool',    quantity: 5760, unit: 'vCPU-hr', unitPrice: 0.192, total: 11059, region: 'us-east-1' },
      { id: 'li-004', description: 'VM — m6i.4xlarge (staging pool)',   serviceType: 'compute', resourceId: 'vm-stage-pool',  resourceName: 'Stage VM Pool',   quantity: 2880, unit: 'vCPU-hr', unitPrice: 0.096, total: 2765, region: 'eu-west-1' },
      { id: 'li-005', description: 'Block Storage — SSD (18 TB)',       serviceType: 'storage', resourceId: 'vol-pool-01',    resourceName: 'SSD Volume Pool', quantity: 18432, unit: 'GB-mo', unitPrice: 0.10, total: 1843, region: 'us-east-1' },
      { id: 'li-006', description: 'Object Storage — S3-compatible',   serviceType: 'storage', resourceId: 'bucket-pool',    resourceName: 'Object Storage',  quantity: 86400, unit: 'GB-mo', unitPrice: 0.023, total: 1987, region: 'global' },
      { id: 'li-007', description: 'Outbound Bandwidth (14.2 TB)',      serviceType: 'network', resourceId: 'net-egress',     resourceName: 'Egress',          quantity: 14540, unit: 'GB', unitPrice: 0.09, total: 1309, region: 'us-east-1' },
      { id: 'li-008', description: 'AI Inference — 4.2M requests',     serviceType: 'ai_inference', resourceId: 'ai-endpoint-01', resourceName: 'AI Inference', quantity: 4200000, unit: 'req', unitPrice: 0.0009, total: 3780, region: 'us-east-1' },
    ],
    notes: 'Reserved instance discount applied. Next cycle starts July 1.',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-0501',
    tenantId: TENANT_ID,
    tenantName: 'InfrakeyDC — Primary',
    period: 'May 2026',
    periodStart: '2026-05-01',
    periodEnd: '2026-05-31',
    issueDate: '2026-06-01',
    dueDate: '2026-06-15',
    status: 'paid',
    subtotal: 73480,
    taxRate: 0.18,
    taxAmount: 13226,
    total: 86706,
    currency: 'USD',
    lineItems: [],
    notes: 'Paid via bank transfer on Jun 12.',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2026-0401',
    tenantId: TENANT_ID,
    tenantName: 'InfrakeyDC — Primary',
    period: 'April 2026',
    periodStart: '2026-04-01',
    periodEnd: '2026-04-30',
    issueDate: '2026-05-01',
    dueDate: '2026-05-15',
    status: 'paid',
    subtotal: 68200,
    taxRate: 0.18,
    taxAmount: 12276,
    total: 80476,
    currency: 'USD',
    lineItems: [],
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2026-0301',
    tenantId: TENANT_ID,
    tenantName: 'InfrakeyDC — Primary',
    period: 'March 2026',
    periodStart: '2026-03-01',
    periodEnd: '2026-03-31',
    issueDate: '2026-04-01',
    dueDate: '2026-04-15',
    status: 'paid',
    subtotal: 61900,
    taxRate: 0.18,
    taxAmount: 11142,
    total: 73042,
    currency: 'USD',
    lineItems: [],
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2026-0201',
    tenantId: TENANT_ID,
    tenantName: 'InfrakeyDC — Primary',
    period: 'February 2026',
    periodStart: '2026-02-01',
    periodEnd: '2026-02-28',
    issueDate: '2026-03-01',
    dueDate: '2026-03-15',
    status: 'paid',
    subtotal: 54300,
    taxRate: 0.18,
    taxAmount: 9774,
    total: 64074,
    currency: 'USD',
    lineItems: [],
  },
  {
    id: 'inv-006',
    invoiceNumber: 'INV-2026-0101',
    tenantId: TENANT_ID,
    tenantName: 'InfrakeyDC — Primary',
    period: 'January 2026',
    periodStart: '2026-01-01',
    periodEnd: '2026-01-31',
    issueDate: '2026-02-01',
    dueDate: '2026-02-15',
    status: 'overdue',
    subtotal: 48900,
    taxRate: 0.18,
    taxAmount: 8802,
    total: 57702,
    currency: 'USD',
    lineItems: [],
    notes: 'Payment overdue. Contact finance@infrakey.io.',
  },
]

/* ─────────────────────────────────────────────────────────────────
   USAGE ANALYTICS (30-day daily series)
───────────────────────────────────────────────────────────────── */
const generateUsageSeries = (days: number) => {
  const series = []
  const base = new Date('2026-06-01')
  for (let i = 0; i < days; i++) {
    const d = new Date(base)
    d.setDate(d.getDate() + i)
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const weekendFactor = isWeekend ? 0.72 : 1
    const trend = 1 + (i / days) * 0.18        // slight upward trend
    const noise = () => 0.88 + Math.random() * 0.24

    const compute = Math.round(820 * weekendFactor * trend * noise())
    const gpu     = Math.round(1140 * weekendFactor * trend * noise() * (i > 14 ? 1.2 : 1))
    const storage = Math.round(340 * trend * noise() * 0.4)
    const network = Math.round(240 * weekendFactor * trend * noise())
    const ai      = Math.round(130 * weekendFactor * trend * noise() * (i > 20 ? 1.35 : 1))

    series.push({
      timestamp: d.toISOString().slice(0, 10),
      compute, gpu, storage, network, ai_inference: ai,
      total: compute + gpu + storage + network + ai,
    })
  }
  return series
}

export const USAGE_SERIES_30D = generateUsageSeries(30)
export const USAGE_SERIES_7D  = USAGE_SERIES_30D.slice(-7)
export const USAGE_SERIES_90D = [
  ...generateUsageSeries(60).map((d, i) => ({
    ...d,
    timestamp: new Date(new Date('2026-03-01').setDate(new Date('2026-03-01').getDate() + i)).toISOString().slice(0, 10),
  })),
  ...USAGE_SERIES_30D,
]

export const USAGE_ANALYTICS_30D: UsageAnalytics = {
  tenantId: TENANT_ID,
  range: '30d',
  granularity: 'day',
  series: USAGE_SERIES_30D,
  peakDay: '2026-06-27',
  peakAmount: 3840,
  avgDailySpend: 2755,
}

export const USAGE_ANALYTICS_7D: UsageAnalytics = {
  tenantId: TENANT_ID,
  range: '7d',
  granularity: 'day',
  series: USAGE_SERIES_7D,
  peakDay: '2026-06-27',
  peakAmount: 3840,
  avgDailySpend: 2920,
}

export const USAGE_ANALYTICS_90D: UsageAnalytics = {
  tenantId: TENANT_ID,
  range: '90d',
  granularity: 'day',
  series: USAGE_SERIES_90D,
  peakDay: '2026-06-27',
  peakAmount: 3840,
  avgDailySpend: 2460,
}

/* ─────────────────────────────────────────────────────────────────
   COST FORECAST
───────────────────────────────────────────────────────────────── */
const generateForecast = (): CostForecast => {
  const series = []
  const base = new Date('2026-06-01')
  const today = new Date('2026-06-29')

  for (let i = 0; i < 30; i++) {
    const d = new Date(base)
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().slice(0, 10)
    const isPast = d <= today
    const forecast = Math.round(2600 + i * 42 + Math.sin(i * 0.4) * 120)

    series.push({
      date: dateStr,
      actual: isPast ? Math.round(forecast * (0.92 + Math.random() * 0.16)) : null,
      forecast,
      lowerBound: Math.round(forecast * 0.88),
      upperBound: Math.round(forecast * 1.12),
    })
  }

  return {
    tenantId: TENANT_ID,
    generatedAt: '2026-06-29T14:00:00Z',
    forecastedTotal: 91200,
    confidence: 87,
    series,
    assumptions: [
      'Current GPU cluster utilization maintained',
      'No new VM provisioning assumed',
      'Historical weekend usage patterns applied',
      'AI inference growth rate extrapolated at +34% MoM',
    ],
  }
}

export const COST_FORECAST = generateForecast()

/* ─────────────────────────────────────────────────────────────────
   AI BILLING INSIGHTS
───────────────────────────────────────────────────────────────── */
export const BILLING_INSIGHTS: BillingInsight[] = [
  {
    id: 'ins-001',
    severity: 'warning',
    title: 'GPU cluster spend up 18.2% this month',
    detail: 'GPU-A100-Cluster in us-east-1 accounts for 29% of total spend. Utilization averaged 92% — consider reserving capacity for a 24% discount.',
    estimatedImpact: 5810,
    affectedService: 'gpu',
    affectedRegion: 'us-east-1',
    actionLabel: 'Reserve capacity',
    actionPath: '/compute/gpu',
    generatedAt: '2026-06-29T06:00:00Z',
  },
  {
    id: 'ins-002',
    severity: 'opportunity',
    title: '3 idle VMs detected in eu-west-1',
    detail: 'vm-staging-02, vm-staging-03, and vm-dev-01 have had < 4% CPU utilization for 12+ days. Stopping them would save $342/month.',
    estimatedImpact: 342,
    affectedService: 'compute',
    affectedRegion: 'eu-west-1',
    actionLabel: 'Review instances',
    actionPath: '/compute',
    generatedAt: '2026-06-29T06:00:00Z',
  },
  {
    id: 'ins-003',
    severity: 'critical',
    title: 'Budget 82.7% consumed with 2 days remaining',
    detail: 'At current burn rate of $2,755/day, the $100,000 monthly budget will be exceeded by ~$5,510. Consider deferring non-critical workloads.',
    estimatedImpact: 5510,
    affectedService: undefined,
    affectedRegion: undefined,
    actionLabel: 'View budget',
    actionPath: '/billing/budgets',
    generatedAt: '2026-06-29T14:00:00Z',
  },
  {
    id: 'ins-004',
    severity: 'opportunity',
    title: 'Reserved compute could reduce spend by 22%',
    detail: 'Converting 6 on-demand c6i.8xlarge instances to 1-year reserved would reduce compute spend by ~$5,412/month.',
    estimatedImpact: 5412,
    affectedService: 'compute',
    affectedRegion: 'us-east-1',
    actionLabel: 'View plan',
    actionPath: '/compute',
    generatedAt: '2026-06-28T18:00:00Z',
  },
  {
    id: 'ins-005',
    severity: 'info',
    title: 'AI inference growth is accelerating',
    detail: 'Inference costs grew 34.6% MoM. At this trajectory, AI services will represent 9% of total spend by Q4 2026.',
    estimatedImpact: undefined,
    affectedService: 'ai_inference',
    generatedAt: '2026-06-28T06:00:00Z',
  },
  {
    id: 'ins-006',
    severity: 'warning',
    title: 'Egress bandwidth spike detected',
    detail: 'Network egress from ap-southeast-1 spiked 3.4× above baseline on Jun 27. Possible data migration or misconfigured replication.',
    estimatedImpact: 840,
    affectedService: 'network',
    affectedRegion: 'ap-southeast-1',
    actionLabel: 'Investigate',
    actionPath: '/monitoring',
    generatedAt: '2026-06-27T22:00:00Z',
  },
]

/* ─────────────────────────────────────────────────────────────────
   BUDGETS
───────────────────────────────────────────────────────────────── */
export const BUDGETS: Budget[] = [
  {
    id: 'bud-001',
    tenantId: TENANT_ID,
    name: 'Monthly Infrastructure',
    period: 'monthly',
    limitAmount: 100000,
    currentSpend: 82650,
    usedPercent: 82.7,
    status: 'warning',
    alertThresholds: [75, 90, 100],
    services: ['compute', 'gpu', 'storage', 'network', 'ai_inference', 'managed_db'],
    resetDate: '2026-07-01',
  },
  {
    id: 'bud-002',
    tenantId: TENANT_ID,
    name: 'GPU Cluster Budget',
    period: 'monthly',
    limitAmount: 40000,
    currentSpend: 34210,
    usedPercent: 85.5,
    status: 'warning',
    alertThresholds: [75, 90, 100],
    services: ['gpu'],
    resetDate: '2026-07-01',
  },
  {
    id: 'bud-003',
    tenantId: TENANT_ID,
    name: 'AI Services Quarterly',
    period: 'quarterly',
    limitAmount: 15000,
    currentSpend: 9840,
    usedPercent: 65.6,
    status: 'ok',
    alertThresholds: [75, 90, 100],
    services: ['ai_inference'],
    resetDate: '2026-07-01',
  },
]

/* ─────────────────────────────────────────────────────────────────
   PAYMENT METHODS
───────────────────────────────────────────────────────────────── */
export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm-001', type: 'card',          label: 'Visa •••• 4242',           isDefault: true,  expiresAt: '2028-09' },
  { id: 'pm-002', type: 'bank_transfer', label: 'HDFC Bank — XXXX8841',    isDefault: false },
  { id: 'pm-003', type: 'wire',          label: 'International Wire — USD', isDefault: false },
]
