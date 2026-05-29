import { motion } from 'framer-motion'
import { RefreshCw, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start justify-between mb-5 gap-4"
    >
      <div>
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
          {greeting}, Manikanta 👋
        </h1>
        <p className="text-sm text-[var(--color-text-tertiary)] mt-0.5">
          {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          {' · '}
          <span className="text-[var(--color-success)]">All systems operational</span>
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button variant="ghost" size="sm" icon={<RefreshCw size={13} />}>Refresh</Button>
        <Button variant="brand" size="sm" icon={<Plus size={13} />}>Deploy</Button>
      </div>
    </motion.div>
  )
}
