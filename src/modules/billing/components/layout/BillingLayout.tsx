import { Outlet } from 'react-router-dom'
import { BillingSubNav } from './BillingSubNav'

export function BillingLayout() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)]">
      <div className="sticky top-[60px] z-20 bg-[var(--color-surface-1)] backdrop-blur-sm">
        <BillingSubNav />
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  )
}
