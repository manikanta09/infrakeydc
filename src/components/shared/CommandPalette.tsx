import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Server, Cpu, HardDrive, Network, BrainCircuit,
  MessageSquare, Activity, Building2, ShieldCheck, CreditCard,
  BarChart3, LifeBuoy, Settings, Search, ArrowRight, Zap,
  Plus, RefreshCw, Command as CommandIcon,
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  shortcut?: string
  group: 'navigation' | 'actions' | 'ai'
  action: (navigate: ReturnType<typeof useNavigate>) => void
}

const COMMANDS: CommandItem[] = [
  /* Navigation */
  { id: 'nav-dashboard', label: 'Overview Dashboard', icon: LayoutDashboard, group: 'navigation', action: (n) => n('/') },
  { id: 'nav-compute', label: 'Compute', description: 'Virtual machine management', icon: Server, group: 'navigation', action: (n) => n('/compute') },
  { id: 'nav-gpu', label: 'GPU Fleet', description: 'A100 / H100 instances', icon: Cpu, group: 'navigation', action: (n) => n('/compute/gpu') },
  { id: 'nav-storage', label: 'Storage', description: 'Volumes and object storage', icon: HardDrive, group: 'navigation', action: (n) => n('/storage') },
  { id: 'nav-networking', label: 'Networking', description: 'VPC, subnets, load balancers', icon: Network, group: 'navigation', action: (n) => n('/networking') },
  { id: 'nav-ai-workspace', label: 'AI Workspace', description: 'Model deployments and inference', icon: BrainCircuit, group: 'navigation', action: (n) => n('/ai-workspace') },
  { id: 'nav-ai-assistant', label: 'AI Assistant', description: 'Conversational infrastructure', icon: MessageSquare, group: 'navigation', action: (n) => n('/ai-workspace/assistant') },
  { id: 'nav-monitoring', label: 'Monitoring', description: 'Real-time observability', icon: Activity, group: 'navigation', action: (n) => n('/monitoring') },
  { id: 'nav-infrastructure', label: 'MDC Infrastructure', description: 'Modular datacenter management', icon: Building2, group: 'navigation', action: (n) => n('/infrastructure') },
  { id: 'nav-security', label: 'Security Center', description: 'IAM and threat detection', icon: ShieldCheck, group: 'navigation', action: (n) => n('/security') },
  { id: 'nav-billing', label: 'Billing', description: 'Invoices and payment', icon: CreditCard, group: 'navigation', action: (n) => n('/billing') },
  { id: 'nav-metering', label: 'Metering', description: 'Usage analytics', icon: BarChart3, group: 'navigation', action: (n) => n('/billing/metering') },
  { id: 'nav-support', label: 'Support', description: 'Tickets and documentation', icon: LifeBuoy, group: 'navigation', action: (n) => n('/support') },
  { id: 'nav-settings', label: 'Settings', description: 'Account configuration', icon: Settings, group: 'navigation', action: (n) => n('/settings') },

  /* Quick Actions */
  { id: 'action-new-vm', label: 'New VM', description: 'Provision a virtual machine', icon: Plus, group: 'actions', shortcut: 'N V', action: (n) => n('/compute') },
  { id: 'action-new-gpu', label: 'New GPU Instance', description: 'Provision a GPU cluster', icon: Plus, group: 'actions', shortcut: 'N G', action: (n) => n('/compute/gpu') },
  { id: 'action-deploy-model', label: 'Deploy AI Model', description: 'Launch inference endpoint', icon: Zap, group: 'actions', action: (n) => n('/ai-workspace') },
  { id: 'action-refresh', label: 'Refresh Dashboard', description: 'Reload all metrics', icon: RefreshCw, group: 'actions', action: () => window.location.reload() },

  /* AI */
  { id: 'ai-ask', label: 'Ask AI Assistant', description: 'Open conversational interface', icon: MessageSquare, group: 'ai', shortcut: 'A', action: (n) => n('/ai-workspace/assistant') },
]

const GROUP_LABELS: Record<CommandItem['group'], string> = {
  navigation: 'Navigate to',
  actions: 'Quick Actions',
  ai: 'AI',
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate()

  const runCommand = useCallback((action: CommandItem['action']) => {
    onClose()
    action(navigate)
  }, [navigate, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl"
          >
            <Command
              className={cn(
                'rounded-2xl overflow-hidden',
                'bg-[var(--color-surface-2)] border border-[var(--color-border-strong)]',
                'shadow-[0_24px_64px_rgba(0,0,0,0.6)]'
              )}
              shouldFilter={true}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)]">
                <Search size={15} className="text-[var(--color-text-tertiary)] flex-shrink-0" aria-hidden="true" />
                <Command.Input
                  autoFocus
                  placeholder="Search commands, navigate, or ask AI..."
                  className={cn(
                    'flex-1 bg-transparent text-sm text-[var(--color-text-primary)]',
                    'placeholder:text-[var(--color-text-disabled)]',
                    'outline-none border-none caret-[var(--color-brand)]'
                  )}
                />
                <kbd className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-[var(--color-text-disabled)] bg-[var(--color-surface-4)] border border-[var(--color-border)] flex-shrink-0">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-[360px] overflow-y-auto p-2">
                <Command.Empty className="py-10 text-center text-sm text-[var(--color-text-tertiary)]">
                  No results found.
                </Command.Empty>

                {(['navigation', 'actions', 'ai'] as const).map((group) => {
                  const items = COMMANDS.filter((c) => c.group === group)
                  return (
                    <Command.Group
                      key={group}
                      heading={GROUP_LABELS[group]}
                      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[9px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-[var(--color-text-disabled)]"
                    >
                      {items.map((cmd) => {
                        const Icon = cmd.icon
                        return (
                          <Command.Item
                            key={cmd.id}
                            value={`${cmd.label} ${cmd.description ?? ''}`}
                            onSelect={() => runCommand(cmd.action)}
                            className={cn(
                              'flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer',
                              'text-[var(--color-text-secondary)]',
                              'aria-selected:bg-[var(--color-brand-subtle)] aria-selected:text-[var(--color-text-primary)]',
                              'transition-colors duration-75',
                              'outline-none'
                            )}
                          >
                            <div className="w-7 h-7 rounded-lg bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
                              <Icon size={13} aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">{cmd.label}</p>
                              {cmd.description && (
                                <p className="text-[10px] text-[var(--color-text-tertiary)] truncate mt-0.5">{cmd.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {cmd.shortcut && (
                                <div className="flex items-center gap-1">
                                  {cmd.shortcut.split(' ').map((k) => (
                                    <kbd key={k} className="px-1.5 py-0.5 rounded text-[9px] text-[var(--color-text-disabled)] bg-[var(--color-surface-4)] border border-[var(--color-border)]">
                                      {k}
                                    </kbd>
                                  ))}
                                </div>
                              )}
                              <ArrowRight size={12} className="text-[var(--color-text-disabled)] opacity-0 aria-selected:opacity-100" aria-hidden="true" />
                            </div>
                          </Command.Item>
                        )
                      })}
                    </Command.Group>
                  )
                })}
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-disabled)]">
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-[var(--color-surface-4)] border border-[var(--color-border)]">↑↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-[var(--color-surface-4)] border border-[var(--color-border)]">↵</kbd> open</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-[var(--color-surface-4)] border border-[var(--color-border)]">ESC</kbd> close</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-disabled)]">
                  <CommandIcon size={10} />
                  <span>InfrakeyDC</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* ── Global keyboard hook ── */
export function useCommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return { open, setOpen, close: () => setOpen(false) }
}
