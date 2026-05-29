import { useQuery } from '@tanstack/react-query'
import { billingKeys } from '@/services/queryKeys'
import { getMeteringEvents, getMeteringStats, type MeteringEventsParams } from '../services/billing.service.mock'
import { adaptMeteringEventList, adaptMeteringStats } from '../services/billing.adapters'

const TENANT_ID = 'tenant-acme'

export function useMeteringEvents(params: MeteringEventsParams = {}) {
  return useQuery({
    queryKey: billingKeys.meteringEvents(params),
    queryFn: async () => {
      const res = await getMeteringEvents(TENANT_ID, params)
      return adaptMeteringEventList(res.data)
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
  })
}

export function useMeteringStats() {
  return useQuery({
    queryKey: billingKeys.meteringStats(),
    queryFn: async () => {
      const res = await getMeteringStats(TENANT_ID)
      return adaptMeteringStats(res.data)
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
  })
}
