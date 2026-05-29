import { useQuery } from '@tanstack/react-query'
import { billingKeys } from '@/services/queryKeys'
import { getCostForecast } from '../services/billing.service.mock'
import { adaptForecastSeries, formatCurrency } from '../services/billing.adapters'

const TENANT_ID = 'tenant-acme'

export function useCostForecast() {
  return useQuery({
    queryKey: billingKeys.forecast(),
    queryFn: async () => {
      const res = await getCostForecast(TENANT_ID)
      const raw = res.data
      return {
        ...raw,
        forecastedTotalFormatted: formatCurrency(raw.forecastedTotal),
        chartSeries: adaptForecastSeries(raw),
      }
    },
    staleTime: 300_000,
  })
}
