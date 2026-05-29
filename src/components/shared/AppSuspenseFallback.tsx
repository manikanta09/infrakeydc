import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

/* Full-page route transition loader — shown while a lazy chunk is downloading */
export function AppSuspenseFallback() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-10 h-10 rounded-xl bg-[var(--color-brand-subtle)] border border-[var(--color-brand)]/20 flex items-center justify-center"
      >
        <Zap size={18} className="text-[var(--color-brand)]" />
      </motion.div>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* Inline skeleton for widget-level suspense (inside a Card) */
export function WidgetSuspenseFallback() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-32 rounded bg-[var(--color-surface-3)]" />
      <div className="h-24 w-full rounded-lg bg-[var(--color-surface-3)]" />
      <div className="h-4 w-20 rounded bg-[var(--color-surface-3)]" />
    </div>
  )
}
