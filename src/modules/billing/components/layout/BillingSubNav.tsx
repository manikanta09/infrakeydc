import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, BarChart3, TrendingUp, Activity } from 'lucide-react'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { path: '/billing', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/billing/invoices', label: 'Invoices', icon: FileText, exact: false },
  { path: '/billing/usage', label: 'Usage', icon: BarChart3, exact: false },
  { path: '/billing/cost-analysis', label: 'Cost Analysis', icon: TrendingUp, exact: false },
  { path: '/billing/metering', label: 'Metering', icon: Activity, exact: false },
]

export function BillingSubNav() {
  return (
    <nav
      aria-label="Billing navigation"
      className="flex items-center gap-1 px-6 border-b border-[var(--color-border-base)]"
    >
      {NAV_ITEMS.map((item) => {
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive: na }) => [
              'relative flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors duration-150 whitespace-nowrap',
              na
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            ].join(' ')}
          >
            {({ isActive: na }) => (
              <>
                <item.icon size={15} aria-hidden="true" />
                {item.label}
                {na && (
                  <motion.span
                    layoutId="billing-sub-nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-brand)] rounded-t-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  />
                )}
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
