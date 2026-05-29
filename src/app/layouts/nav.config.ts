export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  badge?: number | string
  section?: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: 'LayoutDashboard', path: '/', section: 'Platform' },
  { id: 'compute', label: 'Compute', icon: 'Server', path: '/compute', section: 'Infrastructure' },
  { id: 'gpu', label: 'GPU Fleet', icon: 'Cpu', path: '/compute/gpu', section: 'Infrastructure' },
  { id: 'storage', label: 'Storage', icon: 'HardDrive', path: '/storage', section: 'Infrastructure' },
  { id: 'networking', label: 'Networking', icon: 'Network', path: '/networking', section: 'Infrastructure' },
  { id: 'ai-workspace', label: 'AI Workspace', icon: 'BrainCircuit', path: '/ai-workspace', badge: 'New', section: 'AI Services' },
  { id: 'ai-assistant', label: 'Assistant', icon: 'MessageSquare', path: '/ai-workspace/assistant', section: 'AI Services' },
  { id: 'monitoring', label: 'Monitoring', icon: 'Activity', path: '/monitoring', section: 'Operations' },
  { id: 'infrastructure', label: 'MDC', icon: 'Building2', path: '/infrastructure', section: 'Operations' },
  { id: 'security', label: 'Security', icon: 'ShieldCheck', path: '/security', section: 'Operations' },
  { id: 'billing', label: 'Billing', icon: 'CreditCard', path: '/billing', section: 'Account' },
  { id: 'metering', label: 'Metering', icon: 'BarChart3', path: '/billing/metering', section: 'Account' },
  { id: 'support', label: 'Support', icon: 'LifeBuoy', path: '/support', section: 'Account' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings', section: 'Account' },
]

export const NAV_SECTIONS = ['Platform', 'Infrastructure', 'AI Services', 'Operations', 'Account'] as const
