import { useQuery } from '@tanstack/react-query'
import { billingKeys } from '@/services/queryKeys'
import { getBillingInsights, getBudgets } from '../services/billing.service.mock'
import { adaptInsightList, adaptBudgetList } from '../services/billing.adapters'

const TENANT_ID = 'tenant-acme'

export function useBillingInsights() {
  return useQuery({
    queryKey: billingKeys.insights(),
    queryFn: async () => {
      const res = await getBillingInsights(TENANT_ID)
      return adaptInsightList(res.data)
    },
    staleTime: 120_000,
  })
}

export function useBudgets() {
  return useQuery({
    queryKey: billingKeys.budgets(),
    queryFn: async () => {
      const res = await getBudgets(TENANT_ID)
      return adaptBudgetList(res.data)
    },
    staleTime: 120_000,
  })
}
