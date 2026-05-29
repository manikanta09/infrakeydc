import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared'
import { UsageAnalyticsPanel } from '../components/usage/UsageAnalyticsPanel'
import { AIInsightsStrip } from '../components/overview/AIInsightsStrip'

export function BillingUsagePage() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <PageHeader
          title="Usage Analytics"
          subtitle="Service consumption breakdown · All regions"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.06, ease: 'easeOut' }}
      >
        <UsageAnalyticsPanel />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1, ease: 'easeOut' }}
      >
        <AIInsightsStrip />
      </motion.div>
    </div>
  )
}
