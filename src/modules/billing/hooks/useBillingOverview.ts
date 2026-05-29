import { useQuery } from '@tanstack/react-query'
import { billingKeys } from '@/services/queryKeys'
import { getBillingOverview } from '../services/billing.service.mock'
import { adaptBillingOverview } from '../services/billing.adapters'

const TENANT_ID = 'tenant-acme'

export function useBillingOverview() {
  return useQuery({
    queryKey: billingKeys.overview(),
    queryFn: async () => {
      const res = await getBillingOverview(TENANT_ID)
      return adaptBillingOverview(res.data)
    },
    staleTime: 60_000,
  })
}
