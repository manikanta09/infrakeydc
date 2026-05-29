/* ─────────────────────────────────────────────────────────────────────────
   InfrakeyDC — Billing & Metering Types
   All DTOs are shaped for direct FastAPI response mapping.
───────────────────────────────────────────────────────────────────────── */

/* ── Time Range ── */
export type TimeRange = '7d' | '30d' | '90d' | '6m' | '1y' | 'mtd' | 'custom'

export interface DateRange {
  from: string   // ISO 8601
  to: string
}

/* ── Currency ── */
export interface Money {
  amount: number
  currency: 'USD' | 'INR'
}

/* ── Service Types ── */
export type BillingServiceType =
  | 'compute'
  | 'gpu'
  | 'storage'
  | 'network'
  | 'ai_inference'
  | 'managed_db'
  | 'cdn'
  | 'mdc_colocation'

export type BillingRegion =
  | 'us-east-1'
  | 'us-west-2'
  | 'eu-west-1'
  | 'ap-southeast-1'
  | 'ap-northeast-1'
  | 'global'

/* ── Invoice ── */
export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'processing' | 'draft' | 'voided'

export interface InvoiceLineItem {
  id: string
  description: string
  serviceType: BillingServiceType
  resourceId?: string
  resourceName?: string
  quantity: number
  unit: string                  // 'vCPU-hr', 'GB-hr', 'GPU-hr', 'req', etc.
  unitPrice: number
  total: number
  region: BillingRegion
}

export interface Invoice {
  id: string
  invoiceNumber: string         // INV-2026-0601
  tenantId: string
  tenantName: string
  period: string                // 'June 2026'
  periodStart: string           // ISO
  periodEnd: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  currency: 'USD' | 'INR'
  lineItems: InvoiceLineItem[]
  notes?: string
}

/* ── Spend Summary ── */
export interface ServiceSpend {
  service: BillingServiceType
  label: string
  amount: number
  percentage: number
  trend: number                 // % change vs previous period
  color: string
}

export interface BillingOverview {
  tenantId: string
  period: string
  currentSpend: number
  projectedSpend: number
  lastMonthSpend: number
  momChange: number             // month-over-month % change
  budgetLimit: number
  budgetUsedPercent: number
  currency: 'USD' | 'INR'
  serviceBreakdown: ServiceSpend[]
  anomalyCount: number
  savingsOpportunity: number    // estimated monthly savings available
}

/* ── Usage Timeseries ── */
export interface UsageDataPoint {
  timestamp: string
  compute: number
  gpu: number
  storage: number
  network: number
  ai_inference: number
  total: number
}

export interface UsageAnalytics {
  tenantId: string
  range: TimeRange
  granularity: 'hour' | 'day' | 'week' | 'month'
  series: UsageDataPoint[]
  peakDay: string
  peakAmount: number
  avgDailySpend: number
}

/* ── Cost Forecast ── */
export interface ForecastDataPoint {
  date: string
  actual: number | null         // null for future dates
  forecast: number
  lowerBound: number
  upperBound: number
}

export interface CostForecast {
  tenantId: string
  generatedAt: string
  forecastedTotal: number
  confidence: number            // 0-100
  series: ForecastDataPoint[]
  assumptions: string[]
}

/* ── Metering Events ── */
export type MeteringEventType =
  | 'vm_start' | 'vm_stop' | 'vm_resize'
  | 'gpu_alloc' | 'gpu_release'
  | 'storage_write' | 'storage_read' | 'storage_delete'
  | 'network_egress' | 'network_ingress'
  | 'ai_inference' | 'ai_training'
  | 'snapshot_create' | 'snapshot_delete'
  | 'billing_cycle_close'

export interface MeteringEvent {
  id: string
  tenantId: string
  eventType: MeteringEventType
  resourceId: string
  resourceName: string
  serviceType: BillingServiceType
  region: BillingRegion
  quantity: number
  unit: string
  rate: number                  // $/unit
  cost: number
  timestamp: string
  metadata?: Record<string, string>
}

export interface MeteringStats {
  totalEventsToday: number
  totalCostToday: number
  activeResources: number
  ingestionRate: number         // events/minute
  topResourceById: string
  topResourceCost: number
}

/* ── AI Insights ── */
export type InsightSeverity = 'info' | 'warning' | 'critical' | 'opportunity'

export interface BillingInsight {
  id: string
  severity: InsightSeverity
  title: string
  detail: string
  estimatedImpact?: number      // $ amount saved or at risk
  affectedService?: BillingServiceType
  affectedRegion?: BillingRegion
  actionLabel?: string
  actionPath?: string
  generatedAt: string
}

/* ── Budget ── */
export type BudgetPeriod = 'monthly' | 'quarterly' | 'annual'
export type BudgetAlertThreshold = 50 | 75 | 90 | 100

export interface Budget {
  id: string
  tenantId: string
  name: string
  period: BudgetPeriod
  limitAmount: number
  currentSpend: number
  usedPercent: number
  status: 'ok' | 'warning' | 'critical' | 'exceeded'
  alertThresholds: BudgetAlertThreshold[]
  services: BillingServiceType[]
  resetDate: string
}

/* ── Payment ── */
export type PaymentMethodType = 'card' | 'bank_transfer' | 'wire' | 'crypto'

export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  label: string                 // 'Visa •••• 4242'
  isDefault: boolean
  expiresAt?: string
}

/* ── API Response wrappers (matches FastAPI structure) ── */
export interface BillingApiResponse<T> {
  data: T
  tenantId: string
  generatedAt: string
  cached: boolean
}
