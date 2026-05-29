import type {
  BillingOverview,
  Invoice,
  UsageAnalytics,
  CostForecast,
  MeteringEvent,
  MeteringStats,
  BillingInsight,
  Budget,
  PaymentMethod,
  BillingApiResponse,
  TimeRange,
} from '../types/billing.types'

import {
  BILLING_OVERVIEW,
  INVOICES,
  USAGE_ANALYTICS_30D,
  USAGE_ANALYTICS_7D,
  USAGE_ANALYTICS_90D,
  COST_FORECAST,
  BILLING_INSIGHTS,
  BUDGETS,
  PAYMENT_METHODS,
} from '../fixtures/billing.fixtures'

import { METERING_EVENTS, METERING_STATS } from '../fixtures/metering.fixtures'

/* ── Delay simulation ──────────────────────────────────────────────────────
   Simulates realistic network latency.  Replace with actual fetch() calls
   when migrating to FastAPI — the function signatures stay identical.
────────────────────────────────────────────────────────────────────────── */
function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms))
}

function wrap<T>(data: T, tenantId = 'tenant-acme'): BillingApiResponse<T> {
  return { data, tenantId, generatedAt: new Date().toISOString(), cached: false }
}

function jitter(base: number, variance = 80): number {
  return base + Math.random() * variance - variance / 2
}

/* ── Billing Overview ───────────────────────────────────────────────────── */

export async function getBillingOverview(
  tenantId: string
): Promise<BillingApiResponse<BillingOverview>> {
  await delay(jitter(320))
  return wrap({ ...BILLING_OVERVIEW, tenantId }, tenantId)
}

/* ── Invoices ───────────────────────────────────────────────────────────── */

export interface InvoiceListParams {
  page?: number
  pageSize?: number
  status?: Invoice['status'] | 'all'
}

export interface PaginatedInvoices {
  items: Invoice[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export async function getInvoiceList(
  tenantId: string,
  params: InvoiceListParams = {}
): Promise<BillingApiResponse<PaginatedInvoices>> {
  await delay(jitter(280))
  const { page = 1, pageSize = 10, status = 'all' } = params
  const filtered = status === 'all' ? INVOICES : INVOICES.filter((inv) => inv.status === status)
  const start = (page - 1) * pageSize
  return wrap(
    {
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize),
    },
    tenantId
  )
}

export async function getInvoiceById(
  tenantId: string,
  invoiceId: string
): Promise<BillingApiResponse<Invoice>> {
  await delay(jitter(200))
  const invoice = INVOICES.find((inv) => inv.id === invoiceId)
  if (!invoice) throw new Error(`Invoice ${invoiceId} not found`)
  return wrap(invoice, tenantId)
}

/* ── Usage Analytics ────────────────────────────────────────────────────── */

export async function getUsageAnalytics(
  tenantId: string,
  range: TimeRange = '30d'
): Promise<BillingApiResponse<UsageAnalytics>> {
  await delay(jitter(400))

  const analytics =
    range === '7d' ? USAGE_ANALYTICS_7D
    : range === '90d' ? USAGE_ANALYTICS_90D
    : USAGE_ANALYTICS_30D

  return wrap({ ...analytics, tenantId }, tenantId)
}

/* ── Cost Forecast ──────────────────────────────────────────────────────── */

export async function getCostForecast(
  tenantId: string
): Promise<BillingApiResponse<CostForecast>> {
  await delay(jitter(360))
  return wrap(COST_FORECAST, tenantId)
}

/* ── Metering Events ────────────────────────────────────────────────────── */

export interface MeteringEventsParams {
  limit?: number
  serviceType?: MeteringEvent['serviceType'] | 'all'
  region?: MeteringEvent['region'] | 'all'
}

export async function getMeteringEvents(
  tenantId: string,
  params: MeteringEventsParams = {}
): Promise<BillingApiResponse<MeteringEvent[]>> {
  await delay(jitter(260))
  const { limit = 50, serviceType = 'all', region = 'all' } = params
  let events = [...METERING_EVENTS]
  if (serviceType !== 'all') events = events.filter((e) => e.serviceType === serviceType)
  if (region !== 'all') events = events.filter((e) => e.region === region)
  return wrap(events.slice(0, limit), tenantId)
}

export async function getMeteringStats(
  tenantId: string
): Promise<BillingApiResponse<MeteringStats>> {
  await delay(jitter(180))
  return wrap(METERING_STATS, tenantId)
}

/* ── AI Insights ────────────────────────────────────────────────────────── */

export async function getBillingInsights(
  tenantId: string
): Promise<BillingApiResponse<BillingInsight[]>> {
  await delay(jitter(300))
  return wrap(BILLING_INSIGHTS, tenantId)
}

/* ── Budgets ────────────────────────────────────────────────────────────── */

export async function getBudgets(
  tenantId: string
): Promise<BillingApiResponse<Budget[]>> {
  await delay(jitter(240))
  return wrap(BUDGETS, tenantId)
}

/* ── Payment Methods ────────────────────────────────────────────────────── */

export async function getPaymentMethods(
  tenantId: string
): Promise<BillingApiResponse<PaymentMethod[]>> {
  await delay(jitter(200))
  return wrap(PAYMENT_METHODS, tenantId)
}
