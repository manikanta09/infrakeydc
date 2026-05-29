import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared'
import { BillingMetricsRow } from '../components/overview/BillingMetricsRow'
import { SpendTrendChart } from '../components/overview/SpendTrendChart'
import { ServiceBreakdownChart } from '../components/overview/ServiceBreakdownChart'
import { AIInsightsStrip } from '../components/overview/AIInsightsStrip'
import { CostForecastPanel } from '../components/overview/CostForecastPanel'
import { BudgetsPanel } from '../components/overview/BudgetsPanel'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay, ease: 'easeOut' as const },
})

export function BillingOverviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div {...fade(0)}>
        <PageHeader
          title="Billing Overview"
          subtitle="Jun 2026 · InfrakeyDC Tenant"
        />
      </motion.div>

      <motion.div {...fade(0.04)}>
        <BillingMetricsRow />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div {...fade(0.08)} className="lg:col-span-8">
          <SpendTrendChart />
        </motion.div>
        <motion.div {...fade(0.1)} className="lg:col-span-4">
          <ServiceBreakdownChart />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div {...fade(0.12)} className="lg:col-span-8">
          <CostForecastPanel />
        </motion.div>
        <motion.div {...fade(0.14)} className="lg:col-span-4 flex flex-col gap-4">
          <BudgetsPanel />
        </motion.div>
      </div>

      <motion.div {...fade(0.16)}>
        <AIInsightsStrip />
      </motion.div>
    </div>
  )
}
