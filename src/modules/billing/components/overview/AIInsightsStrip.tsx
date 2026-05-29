import { Sparkles } from 'lucide-react'
import { SkeletonText } from '@/components/shared'
import { AIInsightCard } from '../shared/AIInsightCard'
import { useBillingInsights } from '../../hooks/useBillingInsights'

export function AIInsightsStrip() {
  const { data: insights, isPending } = useBillingInsights()

  return (
    <div className="glass-card rounded-xl border border-[var(--color-border-base)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-[var(--color-brand)]" aria-hidden="true" />
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">AI Insights</span>
        {!isPending && insights && (
          <span className="ml-auto text-xs text-[var(--color-text-tertiary)]">
            {insights.length} active
          </span>
        )}
      </div>

      <div className="space-y-2">
        {isPending
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonText key={i} lines={2} />)
          : (insights ?? []).slice(0, 4).map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} compact />
            ))
        }
      </div>
    </div>
  )
}
