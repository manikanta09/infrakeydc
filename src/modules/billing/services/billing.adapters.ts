import type {
  BillingOverview,
  Invoice,
  InvoiceLineItem,
  UsageAnalytics,
  CostForecast,
  MeteringEvent,
  MeteringStats,
  BillingInsight,
  Budget,
  ServiceSpend,
  UsageDataPoint,
} from '../types/billing.types'

/* ── Formatting helpers ──────────────────────────────────────────────────── */

export function formatCurrency(amount: number, currency: 'USD' | 'INR' = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

export function formatUsageUnit(quantity: number, unit: string): string {
  if (quantity >= 1_000_000) return `${(quantity / 1_000_000).toFixed(1)}M ${unit}`
  if (quantity >= 1_000) return `${(quantity / 1_000).toFixed(1)}K ${unit}`
  return `${quantity} ${unit}`
}

/* ── Overview adapters ───────────────────────────────────────────────────── */

export interface BillingOverviewVM {
  currentSpend: string
  projectedSpend: string
  lastMonthSpend: string
  momChange: string
  momDirection: 'up' | 'down' | 'flat'
  budgetLimit: string
  budgetUsedPercent: number
  budgetStatus: 'ok' | 'warning' | 'critical' | 'exceeded'
  currency: 'USD' | 'INR'
  serviceBreakdown: ServiceSpend[]
  anomalyCount: number
  savingsOpportunity: string
  period: string
}

export function adaptBillingOverview(raw: BillingOverview): BillingOverviewVM {
  const mom = raw.momChange
  return {
    currentSpend: formatCurrency(raw.currentSpend, raw.currency),
    projectedSpend: formatCurrency(raw.projectedSpend, raw.currency),
    lastMonthSpend: formatCurrency(raw.lastMonthSpend, raw.currency),
    momChange: formatPercent(mom),
    momDirection: mom > 0.5 ? 'up' : mom < -0.5 ? 'down' : 'flat',
    budgetLimit: formatCurrency(raw.budgetLimit, raw.currency),
    budgetUsedPercent: raw.budgetUsedPercent,
    budgetStatus:
      raw.budgetUsedPercent >= 100 ? 'exceeded'
      : raw.budgetUsedPercent >= 90 ? 'critical'
      : raw.budgetUsedPercent >= 75 ? 'warning'
      : 'ok',
    currency: raw.currency,
    serviceBreakdown: raw.serviceBreakdown,
    anomalyCount: raw.anomalyCount,
    savingsOpportunity: formatCurrency(raw.savingsOpportunity, raw.currency),
    period: raw.period,
  }
}

/* ── Invoice adapters ────────────────────────────────────────────────────── */

export interface InvoiceVM extends Omit<Invoice, 'subtotal' | 'taxAmount' | 'total' | 'lineItems'> {
  subtotalFormatted: string
  taxAmountFormatted: string
  totalFormatted: string
  isOverdue: boolean
  lineItems: InvoiceLineItemVM[]
}

export interface InvoiceLineItemVM extends InvoiceLineItem {
  unitPriceFormatted: string
  totalFormatted: string
}

export function adaptInvoiceLineItem(item: InvoiceLineItem): InvoiceLineItemVM {
  return {
    ...item,
    unitPriceFormatted: formatCurrency(item.unitPrice),
    totalFormatted: formatCurrency(item.total),
  }
}

export function adaptInvoice(raw: Invoice): InvoiceVM {
  return {
    ...raw,
    subtotalFormatted: formatCurrency(raw.subtotal, raw.currency),
    taxAmountFormatted: formatCurrency(raw.taxAmount, raw.currency),
    totalFormatted: formatCurrency(raw.total, raw.currency),
    isOverdue: raw.status === 'overdue',
    lineItems: raw.lineItems.map(adaptInvoiceLineItem),
  }
}

export function adaptInvoiceList(rawList: Invoice[]): InvoiceVM[] {
  return rawList.map(adaptInvoice)
}

/* ── Usage analytics adapters ────────────────────────────────────────────── */

export interface UsageChartPoint {
  label: string
  compute: number
  gpu: number
  storage: number
  network: number
  ai_inference: number
  total: number
}

export function adaptUsageSeries(series: UsageDataPoint[], granularity: UsageAnalytics['granularity']): UsageChartPoint[] {
  return series.map((pt) => {
    const d = new Date(pt.timestamp)
    let label: string
    switch (granularity) {
      case 'hour':
        label = `${String(d.getUTCHours()).padStart(2, '0')}:00`
        break
      case 'day':
        label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
        break
      case 'week':
        label = `W${Math.ceil(d.getUTCDate() / 7)}`
        break
      case 'month':
        label = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
        break
    }
    return { label, ...pt }
  })
}

/* ── Forecast adapters ───────────────────────────────────────────────────── */

export interface ForecastChartPoint {
  label: string
  actual: number | null
  forecast: number
  lowerBound: number
  upperBound: number
}

export function adaptForecastSeries(raw: CostForecast): ForecastChartPoint[] {
  return raw.series.map((pt) => {
    const d = new Date(pt.date)
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    return { label, ...pt }
  })
}

/* ── Metering adapters ───────────────────────────────────────────────────── */

export interface MeteringEventVM extends MeteringEvent {
  costFormatted: string
  quantityFormatted: string
  rateFormatted: string
  timeAgo: string
}

function getTimeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export function adaptMeteringEvent(raw: MeteringEvent): MeteringEventVM {
  return {
    ...raw,
    costFormatted: formatCurrency(raw.cost),
    quantityFormatted: formatUsageUnit(raw.quantity, raw.unit),
    rateFormatted: `${formatCurrency(raw.rate)}/${raw.unit}`,
    timeAgo: getTimeAgo(raw.timestamp),
  }
}

export function adaptMeteringEventList(rawList: MeteringEvent[]): MeteringEventVM[] {
  return rawList.map(adaptMeteringEvent)
}

export interface MeteringStatsVM {
  totalEventsToday: string
  totalCostToday: string
  activeResources: number
  ingestionRate: string
  topResourceCost: string
  topResourceById: string
}

export function adaptMeteringStats(raw: MeteringStats): MeteringStatsVM {
  return {
    totalEventsToday: raw.totalEventsToday.toLocaleString(),
    totalCostToday: formatCurrency(raw.totalCostToday),
    activeResources: raw.activeResources,
    ingestionRate: `${raw.ingestionRate} evt/min`,
    topResourceCost: formatCurrency(raw.topResourceCost),
    topResourceById: raw.topResourceById,
  }
}

/* ── Insight adapters ────────────────────────────────────────────────────── */

export interface BillingInsightVM extends BillingInsight {
  impactFormatted: string | null
}

export function adaptInsight(raw: BillingInsight): BillingInsightVM {
  return {
    ...raw,
    impactFormatted: raw.estimatedImpact != null ? formatCurrency(raw.estimatedImpact) : null,
  }
}

export function adaptInsightList(rawList: BillingInsight[]): BillingInsightVM[] {
  return rawList.map(adaptInsight)
}

/* ── Budget adapters ─────────────────────────────────────────────────────── */

export interface BudgetVM extends Budget {
  limitFormatted: string
  spendFormatted: string
  remainingFormatted: string
  remainingAmount: number
}

export function adaptBudget(raw: Budget): BudgetVM {
  const remaining = raw.limitAmount - raw.currentSpend
  return {
    ...raw,
    limitFormatted: formatCurrency(raw.limitAmount),
    spendFormatted: formatCurrency(raw.currentSpend),
    remainingFormatted: formatCurrency(Math.max(remaining, 0)),
    remainingAmount: remaining,
  }
}

export function adaptBudgetList(rawList: Budget[]): BudgetVM[] {
  return rawList.map(adaptBudget)
}
