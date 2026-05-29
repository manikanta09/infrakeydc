import { motion } from 'framer-motion'
import { PageHeader } from '@/components/shared'
import { InvoiceTable } from '../components/invoices/InvoiceTable'

export function BillingInvoicesPage() {
  return (
    <div className="flex flex-col gap-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <PageHeader
          title="Invoices"
          subtitle="All billing periods · Download, view, and manage"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.06, ease: 'easeOut' }}
      >
        <InvoiceTable />
      </motion.div>
    </div>
  )
}
