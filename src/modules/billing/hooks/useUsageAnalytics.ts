import { useQuery } from '@tanstack/react-query'
import { billingKeys } from '@/services/queryKeys'
import { getUsageAnalytics } from '../services/billing.service.mock'
import { adaptUsageSeries } from '../services/billing.adapters'
import type { TimeRange } from '../types/billing.types'

const TENANT_ID = 'tenant-acme'

export function useUsageAnalytics(range: TimeRange = '30d') {
  return useQuery({
    queryKey: billingKeys.usageAnalytics(range),
    queryFn: async () => {
      const res = await getUsageAnalytics(TENANT_ID, range)
      return {
        ...res.data,
        chartSeries: adaptUsageSeries(res.data.series, res.data.granularity),
      }
    },
    staleTime: 60_000,
  })
}
