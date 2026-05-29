import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shared/PageContainer'
import { Card } from '@/components/ui/card'

interface PlaceholderPageProps {
  title: string
  subtitle?: string
}

export function PlaceholderPage({ title, subtitle }: PlaceholderPageProps) {
  return (
    <PageContainer>
      <PageHeader title={title} subtitle={subtitle} />
      <Card className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-2xl bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-tertiary)] mb-4"
        >
          <Construction size={24} />
        </motion.div>
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{title} module</h3>
        <p className="text-sm text-[var(--color-text-tertiary)] mt-1.5 text-center max-w-xs">
          This module is part of the planned architecture. Implementation coming soon.
        </p>
        <div className="flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-[var(--color-brand-subtle)] border border-[var(--color-brand)]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] pulse-online" />
          <span className="text-xs text-[var(--color-brand)] font-medium">In development</span>
        </div>
      </Card>
    </PageContainer>
  )
}
