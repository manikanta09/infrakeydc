import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, Bell, Search, Plus, ChevronDown, Settings,
  LogOut, User, HelpCircle, Zap, Command,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useUIStore } from '@/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCommandPalette } from '@/components/shared/CommandPalette'

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'info' as const, title: 'VM-prod-01 is healthy', time: '2m ago' },
  { id: '2', type: 'warning' as const, title: 'GPU utilization at 92%', time: '5m ago' },
  { id: '3', type: 'success' as const, title: 'Snapshot backup completed', time: '18m ago' },
  { id: '4', type: 'error' as const, title: 'Network latency spike detected', time: '1h ago' },
]

const notifTypeStyles = {
  info: 'bg-[var(--color-brand)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error: 'bg-[var(--color-error)]',
}

function NotificationPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute top-full right-0 mt-2 w-80 glass-card rounded-xl border border-[var(--color-border-strong)] shadow-2xl z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">Notifications</span>
        <Badge variant="brand" size="xs">{MOCK_NOTIFICATIONS.length}</Badge>
      </div>

      <div className="divide-y divide-[var(--color-border-subtle)]">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-surface-3)] transition-colors cursor-pointer"
            onClick={onClose}
          >
            <div className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0', notifTypeStyles[n.type])} />
            <div className="min-w-0">
              <p className="text-xs text-[var(--color-text-primary)] leading-relaxed">{n.title}</p>
              <p className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">{n.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 border-t border-[var(--color-border)]">
        <button className="text-xs text-[var(--color-brand)] hover:underline w-full text-center">
          View all notifications
        </button>
      </div>
    </motion.div>
  )
}

function UserMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full right-0 mt-2 w-56 glass-card rounded-xl border border-[var(--color-border-strong)] shadow-2xl z-50 py-1"
    >
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">Manikanta G.</p>
        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">manikantagollapalli09@gmail.com</p>
        <Badge variant="brand" size="xs" className="mt-1.5">Pro Plan</Badge>
      </div>

      {[
        { icon: User, label: 'Profile' },
        { icon: Settings, label: 'Settings' },
        { icon: HelpCircle, label: 'Help & Support' },
      ].map(({ icon: Icon, label }) => (
        <button
          key={label}
          onClick={onClose}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] transition-colors"
        >
          <Icon size={14} />
          {label}
        </button>
      ))}

      <div className="border-t border-[var(--color-border)] mt-1 pt-1">
        <button
          onClick={onClose}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-[var(--color-error-dim)] transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </motion.div>
  )
}

export function TopNav() {
  const { toggleMobileSidebar } = useUIStore()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const { setOpen: openPalette } = useCommandPalette()

  const closeAll = () => {
    setNotifOpen(false)
    setUserOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-[var(--z-topnav)] h-[60px]',
        'bg-[var(--color-surface-1)]/80 backdrop-blur-xl',
        'border-b border-[var(--color-border)]',
        'flex items-center px-4 gap-3'
      )}
    >
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] transition-colors"
      >
        <Menu size={16} />
      </button>

      <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
        <div className="w-5 h-5 rounded-md bg-[var(--color-brand)] flex items-center justify-center">
          <Zap size={11} className="text-white" />
        </div>
        <span className="text-xs font-bold text-gradient-brand">InfrakeyDC</span>
      </div>

      <div className="h-4 w-px bg-[var(--color-border)] hidden lg:block mx-1" />

      <div className="flex-1 max-w-md">
        <button
          onClick={() => openPalette(true)}
          aria-label="Open command palette (⌘K)"
          className={cn(
            'relative flex items-center w-full h-8 pl-8 pr-20 text-xs rounded-lg text-left',
            'bg-[var(--color-surface-3)] border border-[var(--color-border)]',
            'text-[var(--color-text-disabled)]',
            'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-4)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]',
            'transition-all duration-150 cursor-pointer'
          )}
        >
          <Search size={13} className="absolute left-3 pointer-events-none" aria-hidden="true" />
          <span>Search resources, commands…</span>
          <div className="absolute right-2.5 flex items-center gap-1 pointer-events-none">
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] text-[var(--color-text-disabled)] bg-[var(--color-surface-4)] border border-[var(--color-border)]">
              <Command size={8} aria-hidden="true" />K
            </kbd>
          </div>
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <Button variant="brand" size="sm" icon={<Plus size={13} />}>
          <span className="hidden sm:inline">Deploy</span>
        </Button>

        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false) }}
            className={cn(
              'relative w-8 h-8 flex items-center justify-center rounded-lg',
              'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]',
              'hover:bg-[var(--color-surface-3)] transition-colors',
              notifOpen && 'bg-[var(--color-surface-3)] text-[var(--color-text-primary)]'
            )}
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-error)]" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <NotificationPanel onClose={closeAll} />
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-5 bg-[var(--color-border)]" />

        <div className="relative">
          <button
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false) }}
            className={cn(
              'flex items-center gap-2 pl-1 pr-2 h-8 rounded-lg',
              'hover:bg-[var(--color-surface-3)] transition-colors',
              userOpen && 'bg-[var(--color-surface-3)]'
            )}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-neon-purple)] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              M
            </div>
            <span className="text-xs text-[var(--color-text-secondary)] hidden sm:block">Manikanta</span>
            <ChevronDown
              size={12}
              className={cn('text-[var(--color-text-tertiary)] transition-transform duration-150', userOpen && 'rotate-180')}
            />
          </button>

          <AnimatePresence>
            {userOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <UserMenu onClose={closeAll} />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
