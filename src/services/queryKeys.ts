/**
 * Typed query key factory.
 *
 * Rules:
 *  - All keys begin with a module-level string (e.g. 'billing')
 *  - Keys narrow from broad → specific: [module, entity, id?, params?]
 *  - Use `all` as a scope umbrella for invalidation (e.g. invalidateQueries(billingKeys.all))
 *  - Keep params objects serializable (no functions / class instances)
 */

/* ── Dashboard ── */
export const dashboardKeys = {
  all: ['dashboard'] as const,
  overview: () => [...dashboardKeys.all, 'overview'] as const,
  telemetry: (range: string) => [...dashboardKeys.all, 'telemetry', range] as const,
  serviceHealth: () => [...dashboardKeys.all, 'serviceHealth'] as const,
  activityFeed: (page?: number) => [...dashboardKeys.all, 'activity', page ?? 0] as const,
}

/* ── Billing & Metering ── */
export const billingKeys = {
  all: ['billing'] as const,
  overview: () => [...billingKeys.all, 'overview'] as const,
  invoices: () => [...billingKeys.all, 'invoices'] as const,
  invoice: (id: string) => [...billingKeys.all, 'invoices', id] as const,
  currentUsage: () => [...billingKeys.all, 'usage', 'current'] as const,
  usageHistory: (params: { from: string; to: string; granularity?: string }) =>
    [...billingKeys.all, 'usage', 'history', params] as const,
  usageAnalytics: (range: string) => [...billingKeys.all, 'usage', 'analytics', range] as const,
  forecast: () => [...billingKeys.all, 'forecast'] as const,
  meteringEvents: (params?: { serviceType?: string; region?: string }) =>
    [...billingKeys.all, 'metering', 'events', params ?? {}] as const,
  meteringStats: () => [...billingKeys.all, 'metering', 'stats'] as const,
  insights: () => [...billingKeys.all, 'insights'] as const,
  budgets: () => [...billingKeys.all, 'budgets'] as const,
  paymentMethods: () => [...billingKeys.all, 'payment-methods'] as const,
  costBreakdown: (period: string) => [...billingKeys.all, 'cost-breakdown', period] as const,
}

/* ── Compute ── */
export const computeKeys = {
  all: ['compute'] as const,
  vms: () => [...computeKeys.all, 'vms'] as const,
  vm: (id: string) => [...computeKeys.all, 'vms', id] as const,
  vmMetrics: (id: string, range: string) => [...computeKeys.all, 'vms', id, 'metrics', range] as const,
  snapshots: (vmId: string) => [...computeKeys.all, 'vms', vmId, 'snapshots'] as const,
  instanceTypes: () => [...computeKeys.all, 'instance-types'] as const,
  regions: () => [...computeKeys.all, 'regions'] as const,
}

/* ── GPU ── */
export const gpuKeys = {
  all: ['gpu'] as const,
  instances: () => [...gpuKeys.all, 'instances'] as const,
  instance: (id: string) => [...gpuKeys.all, 'instances', id] as const,
  utilization: (id: string, range: string) => [...gpuKeys.all, 'instances', id, 'utilization', range] as const,
  models: () => [...gpuKeys.all, 'models'] as const,
}

/* ── Storage ── */
export const storageKeys = {
  all: ['storage'] as const,
  volumes: () => [...storageKeys.all, 'volumes'] as const,
  volume: (id: string) => [...storageKeys.all, 'volumes', id] as const,
  buckets: () => [...storageKeys.all, 'buckets'] as const,
  bucket: (name: string) => [...storageKeys.all, 'buckets', name] as const,
}

/* ── Networking ── */
export const networkingKeys = {
  all: ['networking'] as const,
  vpcs: () => [...networkingKeys.all, 'vpcs'] as const,
  vpc: (id: string) => [...networkingKeys.all, 'vpcs', id] as const,
  loadBalancers: () => [...networkingKeys.all, 'load-balancers'] as const,
  firewalls: () => [...networkingKeys.all, 'firewalls'] as const,
}

/* ── AI Workspace ── */
export const aiKeys = {
  all: ['ai'] as const,
  models: () => [...aiKeys.all, 'models'] as const,
  model: (id: string) => [...aiKeys.all, 'models', id] as const,
  endpoints: () => [...aiKeys.all, 'endpoints'] as const,
  endpoint: (id: string) => [...aiKeys.all, 'endpoints', id] as const,
  inferences: (params: { modelId?: string; from?: string; to?: string }) =>
    [...aiKeys.all, 'inferences', params] as const,
  conversations: () => [...aiKeys.all, 'conversations'] as const,
  conversation: (id: string) => [...aiKeys.all, 'conversations', id] as const,
}

/* ── Infrastructure (MDC) ── */
export const infrastructureKeys = {
  all: ['infrastructure'] as const,
  nodes: () => [...infrastructureKeys.all, 'nodes'] as const,
  node: (id: string) => [...infrastructureKeys.all, 'nodes', id] as const,
  clusters: () => [...infrastructureKeys.all, 'clusters'] as const,
  cluster: (id: string) => [...infrastructureKeys.all, 'clusters', id] as const,
  health: () => [...infrastructureKeys.all, 'health'] as const,
}

/* ── Monitoring ── */
export const monitoringKeys = {
  all: ['monitoring'] as const,
  alerts: () => [...monitoringKeys.all, 'alerts'] as const,
  alert: (id: string) => [...monitoringKeys.all, 'alerts', id] as const,
  metrics: (resource: string, range: string) => [...monitoringKeys.all, 'metrics', resource, range] as const,
  logs: (params: { source?: string; level?: string; from?: string }) =>
    [...monitoringKeys.all, 'logs', params] as const,
}

/* ── Security ── */
export const securityKeys = {
  all: ['security'] as const,
  policies: () => [...securityKeys.all, 'policies'] as const,
  threats: () => [...securityKeys.all, 'threats'] as const,
  auditLog: (params: { from?: string; to?: string }) => [...securityKeys.all, 'audit', params] as const,
  apiKeys: () => [...securityKeys.all, 'api-keys'] as const,
}

/* ── Auth / Account ── */
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
  tenant: () => [...authKeys.all, 'tenant'] as const,
  members: () => [...authKeys.all, 'members'] as const,
}

/* ── Support ── */
export const supportKeys = {
  all: ['support'] as const,
  tickets: () => [...supportKeys.all, 'tickets'] as const,
  ticket: (id: string) => [...supportKeys.all, 'tickets', id] as const,
}
