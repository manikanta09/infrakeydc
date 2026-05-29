import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared'
import { MeteringStatsRow } from '../components/metering/MeteringStatsRow'
import { MeteringEventTimeline } from '../components/metering/MeteringEventTimeline'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay, ease: 'easeOut' as const },
})

export function MeteringPage() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div {...fade(0)}>
        <PageHeader
          title="Metering"
          subtitle="Real-time resource consumption events"
        />
      </motion.div>

      <motion.div {...fade(0.04)}>
        <MeteringStatsRow />
      </motion.div>

      <motion.div {...fade(0.08)}>
        <MeteringEventTimeline limit={25} />
      </motion.div>
    </div>
  )
}
