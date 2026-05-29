import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared'
import { CostForecastPanel } from '../components/overview/CostForecastPanel'
import { ServiceBreakdownChart } from '../components/overview/ServiceBreakdownChart'
import { BudgetsPanel } from '../components/overview/BudgetsPanel'
import { AIInsightsStrip } from '../components/overview/AIInsightsStrip'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay, ease: 'easeOut' as const },
})

export function BillingCostAnalysisPage() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div {...fade(0)}>
        <PageHeader
          title="Cost Analysis"
          subtitle="Forecasting, budgets, and optimization opportunities"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div {...fade(0.06)} className="lg:col-span-8">
          <CostForecastPanel />
        </motion.div>
        <motion.div {...fade(0.08)} className="lg:col-span-4">
          <ServiceBreakdownChart />
        </motion.div>
      </div>

      <motion.div {...fade(0.1)}>
        <BudgetsPanel />
      </motion.div>

      <motion.div {...fade(0.12)}>
        <AIInsightsStrip />
      </motion.div>
    </div>
  )
}
