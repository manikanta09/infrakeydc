import { motion, type Variants } from 'framer-motion'
import { DollarSign, Server, Cpu, Activity } from 'lucide-react'
import { MetricCard } from '@/components/shared/widgets/MetricCard'
import { KEY_METRICS } from '../fixtures/dashboard.fixtures'

const ICONS = [
  <DollarSign size={14} />,
  <Server size={14} />,
  <Cpu size={14} />,
  <Activity size={14} />,
]

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const item: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export function DashboardMetrics() {
  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
    >
      {KEY_METRICS.map((metric, i) => (
        <motion.div key={metric.title} variants={item}>
          <MetricCard {...metric} icon={ICONS[i]} />
        </motion.div>
      ))}
    </motion.div>
  )
}
