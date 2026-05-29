/* ── Core Domain Types ── */

export type Status = 'online' | 'offline' | 'warning' | 'error' | 'pending' | 'provisioning'
export type Tier = 'free' | 'starter' | 'pro' | 'enterprise'
export type Region = 'us-east-1' | 'us-west-2' | 'eu-west-1' | 'ap-southeast-1' | 'ap-northeast-1'

export interface Tenant {
  id: string
  name: string
  slug: string
  tier: Tier
  region: Region
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: 'owner' | 'admin' | 'operator' | 'viewer'
  tenantId: string
}

/* ── Infrastructure Types ── */

export interface VM {
  id: string
  name: string
  status: Status
  region: Region
  vcpus: number
  memoryGb: number
  diskGb: number
  publicIp?: string
  createdAt: string
}

export interface GPUInstance {
  id: string
  name: string
  status: Status
  gpuModel: string
  gpuCount: number
  vramGb: number
  region: Region
  utilization: number
}

/* ── Metrics Types ── */

export interface TimeSeriesPoint {
  timestamp: string
  value: number
}

export interface MetricSeries {
  name: string
  color?: string
  data: TimeSeriesPoint[]
}

/* ── Billing Types ── */

export interface Invoice {
  id: string
  period: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  dueDate: string
  items: InvoiceItem[]
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

/* ── Navigation Types ── */

export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  badge?: number | string
  children?: NavItem[]
  section?: string
}

/* ── Widget Types ── */

export interface WidgetConfig {
  id: string
  type: 'metric' | 'chart' | 'table' | 'status' | 'activity' | 'ai'
  title: string
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  refreshInterval?: number
}

/* ── API Types ── */

export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

/* ── UI Types ── */

export type Variant = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'ghost'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface SelectOption<T = string> {
  label: string
  value: T
  description?: string
  disabled?: boolean
}
