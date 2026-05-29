import { Activity } from 'lucide-react'
import { StatusWidget } from '@/components/shared/widgets/StatusWidget'
import { SERVICE_STATUS_ITEMS } from '../fixtures/dashboard.fixtures'

export function ServiceHealthPanel() {
  return (
    <StatusWidget
      title="Service Health"
      items={SERVICE_STATUS_ITEMS}
      icon={<Activity size={14} />}
    />
  )
}
