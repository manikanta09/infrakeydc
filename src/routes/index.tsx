import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/app/layouts/AppLayout'
import { AppSuspenseFallback } from '@/components/shared/AppSuspenseFallback'
import { RouteErrorBoundary } from '@/components/shared/RouteErrorBoundary'

/* ── Billing layout — eager import: layout routes must not be lazy so React
   Router can establish the Outlet context before child routes render. ── */
import { BillingLayout } from '@/modules/billing/components/layout/BillingLayout'

/* ── Lazy page imports ── */
const DashboardPage           = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const ComputePage             = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'Compute', subtitle: 'Provision and manage virtual machines' }) })))
const GPUPage                 = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'GPU Fleet', subtitle: 'High-performance GPU instance management' }) })))
const StoragePage             = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'Storage', subtitle: 'Block and object storage management' }) })))
const NetworkingPage          = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'Networking', subtitle: 'VPC, subnets, and load balancers' }) })))
const AIWorkspacePage         = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'AI Workspace', subtitle: 'Model inference, fine-tuning, and deployments' }) })))
const AIAssistantPage         = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'AI Assistant', subtitle: 'Conversational infrastructure management' }) })))
const MonitoringPage          = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'Monitoring', subtitle: 'Real-time infrastructure observability' }) })))
const InfrastructurePage      = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'MDC Infrastructure', subtitle: 'Micro Modular Datacenter management' }) })))
const SecurityPage            = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'Security Center', subtitle: 'IAM, compliance, and threat detection' }) })))
const SupportPage             = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'Support', subtitle: 'Tickets, documentation, and escalations' }) })))
const SettingsPage            = lazy(() => import('@/pages/PlaceholderPage').then(m => ({ default: () => m.PlaceholderPage({ title: 'Settings', subtitle: 'Account, team, and platform configuration' }) })))

/* ── Billing pages (lazy) ── */
const BillingOverviewPage     = lazy(() => import('@/modules/billing/pages/BillingOverviewPage').then(m => ({ default: m.BillingOverviewPage })))
const BillingInvoicesPage     = lazy(() => import('@/modules/billing/pages/BillingInvoicesPage').then(m => ({ default: m.BillingInvoicesPage })))
const BillingUsagePage        = lazy(() => import('@/modules/billing/pages/BillingUsagePage').then(m => ({ default: m.BillingUsagePage })))
const BillingCostAnalysisPage = lazy(() => import('@/modules/billing/pages/BillingCostAnalysisPage').then(m => ({ default: m.BillingCostAnalysisPage })))
const MeteringPage            = lazy(() => import('@/modules/billing/pages/MeteringPage').then(m => ({ default: m.MeteringPage })))

function SuspenseRoute({ children }: { children: React.ReactNode }) {
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<AppSuspenseFallback />}>
        {children}
      </Suspense>
    </RouteErrorBoundary>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,                    element: <SuspenseRoute><DashboardPage /></SuspenseRoute> },
      { path: 'compute',                element: <SuspenseRoute><ComputePage /></SuspenseRoute> },
      { path: 'compute/gpu',            element: <SuspenseRoute><GPUPage /></SuspenseRoute> },
      { path: 'storage',                element: <SuspenseRoute><StoragePage /></SuspenseRoute> },
      { path: 'networking',             element: <SuspenseRoute><NetworkingPage /></SuspenseRoute> },
      { path: 'ai-workspace',           element: <SuspenseRoute><AIWorkspacePage /></SuspenseRoute> },
      { path: 'ai-workspace/assistant', element: <SuspenseRoute><AIAssistantPage /></SuspenseRoute> },
      { path: 'monitoring',             element: <SuspenseRoute><MonitoringPage /></SuspenseRoute> },
      { path: 'infrastructure',         element: <SuspenseRoute><InfrastructurePage /></SuspenseRoute> },
      { path: 'security',               element: <SuspenseRoute><SecurityPage /></SuspenseRoute> },
      {
        path: 'billing',
        element: <BillingLayout />,
        children: [
          { index: true,                element: <SuspenseRoute><BillingOverviewPage /></SuspenseRoute> },
          { path: 'invoices',           element: <SuspenseRoute><BillingInvoicesPage /></SuspenseRoute> },
          { path: 'usage',              element: <SuspenseRoute><BillingUsagePage /></SuspenseRoute> },
          { path: 'cost-analysis',      element: <SuspenseRoute><BillingCostAnalysisPage /></SuspenseRoute> },
          { path: 'metering',           element: <SuspenseRoute><MeteringPage /></SuspenseRoute> },
        ],
      },
      { path: 'support',                element: <SuspenseRoute><SupportPage /></SuspenseRoute> },
      { path: 'settings',               element: <SuspenseRoute><SettingsPage /></SuspenseRoute> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
