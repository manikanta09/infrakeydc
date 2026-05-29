import { useLocation, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import {
  LayoutDashboard, Server, Cpu, HardDrive, Network, BrainCircuit,
  MessageSquare, Activity, Building2, ShieldCheck, CreditCard,
  BarChart3, LifeBuoy, Settings, ChevronLeft, X, Zap,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useUIStore } from '@/store'
import { NAV_ITEMS, NAV_SECTIONS } from './nav.config'

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Server, Cpu, HardDrive, Network, BrainCircuit,
  MessageSquare, Activity, Building2, ShieldCheck, CreditCard,
  BarChart3, LifeBuoy, Settings,
}

/* ── Accessible Tooltip wrapper (Radix) ── */
function NavTooltip({ label, children, disabled }: { label: string; children: React.ReactNode; disabled: boolean }) {
  if (disabled) return <>{children}</>
  return (
    <TooltipPrimitive.Root delayDuration={200}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="right"
          sideOffset={8}
          className={cn(
            'z-[var(--z-tooltip)] px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
            'bg-[var(--color-surface-4)] border border-[var(--color-border-strong)]',
            'text-[var(--color-text-primary)] shadow-xl',
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=right]:slide-in-from-left-2'
          )}
        >
          {label}
          <TooltipPrimitive.Arrow className="fill-[var(--color-surface-4)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

function NavItemComponent({ item, collapsed }: { item: typeof NAV_ITEMS[0]; collapsed: boolean }) {
  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard
  const location = useLocation()
  const isActive = item.path === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(item.path)

  return (
    <NavTooltip label={item.label} disabled={!collapsed}>
      <NavLink
        to={item.path}
        aria-label={collapsed ? item.label : undefined}
        className={cn('nav-item group relative', isActive && 'active')}
      >
        <Icon size={15} className="flex-shrink-0" aria-hidden="true" />

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden whitespace-nowrap flex-1"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {!collapsed && item.badge && (
          <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20">
            {item.badge}
          </span>
        )}
      </NavLink>
    </NavTooltip>
  )
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <div className={cn('flex items-center gap-2.5 px-3 py-4 border-b border-[var(--color-border)]', collapsed && 'justify-center px-0')}>
        <div className="w-7 h-7 rounded-lg bg-[var(--color-brand)] flex items-center justify-center flex-shrink-0 glow-brand">
          <Zap size={14} className="text-white" aria-hidden="true" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <span className="text-sm font-bold text-gradient-brand whitespace-nowrap">InfrakeyDC</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {NAV_SECTIONS.map((section) => {
          const sectionItems = NAV_ITEMS.filter((item) => item.section === section)
          if (!sectionItems.length) return null
          return (
            <div key={section} className="mb-2">
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-disabled)]"
                    aria-hidden="true"
                  >
                    {section}
                  </motion.p>
                )}
              </AnimatePresence>

              {collapsed && <div className="h-px bg-[var(--color-border-subtle)] mx-2 my-2" role="separator" />}

              <div className="space-y-0.5">
                {sectionItems.map((item) => (
                  <NavItemComponent key={item.id} item={item} collapsed={collapsed} />
                ))}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="border-t border-[var(--color-border)] px-2 py-3">
        <div className={cn('flex items-center gap-2.5 px-2 py-2 rounded-lg', collapsed && 'justify-center')}>
          <div
            className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-neon-purple)] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
            aria-hidden="true"
          >
            M
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden min-w-0"
              >
                <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate whitespace-nowrap">Manikanta</p>
                <p className="text-[10px] text-[var(--color-text-tertiary)] truncate whitespace-nowrap">Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const { sidebarCollapsed, sidebarMobileOpen, toggleSidebar, closeMobileSidebar } = useUIStore()
  const width = sidebarCollapsed ? 60 : 240

  return (
    <TooltipPrimitive.Provider>
      <AnimatePresence>
        {sidebarMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={closeMobileSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Sidebar"
        className={cn(
          'fixed top-0 left-0 h-full z-[var(--z-sidebar)]',
          'bg-[var(--color-surface-1)] border-r border-[var(--color-border)]',
          'flex flex-col overflow-hidden',
          'hidden lg:flex',
        )}
      >
        <SidebarContent collapsed={sidebarCollapsed} />

        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={cn(
            'absolute top-4 -right-3 w-6 h-6 rounded-full',
            'bg-[var(--color-surface-3)] border border-[var(--color-border-strong)]',
            'flex items-center justify-center text-[var(--color-text-tertiary)]',
            'hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-4)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]',
            'transition-all duration-150 cursor-pointer shadow-md'
          )}
        >
          <motion.div animate={{ rotate: sidebarCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={12} aria-hidden="true" />
          </motion.div>
        </button>
      </motion.aside>

      <AnimatePresence>
        {sidebarMobileOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile navigation"
            className={cn(
              'fixed top-0 left-0 h-full w-[240px] z-40',
              'bg-[var(--color-surface-1)] border-r border-[var(--color-border)]',
              'flex flex-col lg:hidden'
            )}
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={closeMobileSidebar}
                aria-label="Close navigation"
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] transition-colors"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
            <SidebarContent collapsed={false} />
          </motion.aside>
        )}
      </AnimatePresence>
    </TooltipPrimitive.Provider>
  )
}
