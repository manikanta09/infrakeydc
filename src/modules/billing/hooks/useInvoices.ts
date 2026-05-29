import { useQuery } from '@tanstack/react-query'
import { billingKeys } from '@/services/queryKeys'
import { getInvoiceList, getInvoiceById, type InvoiceListParams } from '../services/billing.service.mock'
import { adaptInvoiceList, adaptInvoice } from '../services/billing.adapters'

const TENANT_ID = 'tenant-acme'

export function useInvoices(params: InvoiceListParams = {}) {
  return useQuery({
    queryKey: [...billingKeys.invoices(), params],
    queryFn: async () => {
      const res = await getInvoiceList(TENANT_ID, params)
      return {
        ...res.data,
        items: adaptInvoiceList(res.data.items),
      }
    },
    staleTime: 120_000,
  })
}

export function useInvoice(invoiceId: string) {
  return useQuery({
    queryKey: billingKeys.invoice(invoiceId),
    queryFn: async () => {
      const res = await getInvoiceById(TENANT_ID, invoiceId)
      return adaptInvoice(res.data)
    },
    enabled: !!invoiceId,
    staleTime: 300_000,
  })
}
