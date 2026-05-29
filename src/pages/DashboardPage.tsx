import { motion } from 'framer-motion'
import { PageContainer } from '@/components/shared/PageContainer'
import { DashboardHeader } from '@/modules/dashboard/components/DashboardHeader'
import { DashboardMetrics } from '@/modules/dashboard/components/DashboardMetrics'
import { InfrastructureTelemetry } from '@/modules/dashboard/components/InfrastructureTelemetry'
import { ServiceHealthPanel } from '@/modules/dashboard/components/ServiceHealthPanel'
import { ActivityFeedPanel } from '@/modules/dashboard/components/ActivityFeedPanel'
import { ResourceDistributionPanel, UsageMeteringPanel } from '@/modules/dashboard/components/ResourceUsagePanel'
import { QuickActionsPanel } from '@/modules/dashboard/components/QuickActionsPanel'
import { AIAssistantPreview } from '@/modules/dashboard/components/AIAssistantPreview'
import { VMInstancesTable } from '@/modules/dashboard/components/VMInstancesTable'
import { PlatformStatsRow } from '@/modules/dashboard/components/PlatformStatsRow'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.25 },
})

export function DashboardPage() {
  return (
    <PageContainer>
      <DashboardHeader />
      <DashboardMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        <motion.div {...fade(0.12)} className="lg:col-span-8">
          <InfrastructureTelemetry />
        </motion.div>

        <motion.div {...fade(0.15)} className="lg:col-span-4">
          <ServiceHealthPanel />
        </motion.div>

        <motion.div {...fade(0.18)} className="lg:col-span-4">
          <ActivityFeedPanel />
        </motion.div>

        <motion.div {...fade(0.20)} className="lg:col-span-4">
          <ResourceDistributionPanel />
        </motion.div>

        <motion.div {...fade(0.22)} className="lg:col-span-4">
          <QuickActionsPanel />
        </motion.div>

        <motion.div {...fade(0.24)} className="lg:col-span-8">
          <UsageMeteringPanel />
        </motion.div>

        <motion.div {...fade(0.26)} className="lg:col-span-4">
          <AIAssistantPreview />
        </motion.div>

        <motion.div {...fade(0.28)} className="lg:col-span-12">
          <VMInstancesTable />
        </motion.div>

        <motion.div {...fade(0.30)} className="lg:col-span-12">
          <PlatformStatsRow />
        </motion.div>

      </div>
    </PageContainer>
  )
}
