import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader, CardDivider } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AI_PREVIEW_MESSAGES } from '../fixtures/dashboard.fixtures'

export function AIAssistantPreview() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/ai-workspace/assistant')
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="AI Assistant"
        icon={<Zap size={14} />}
        action={<Badge variant="brand" size="xs" dot>Live</Badge>}
      />

      <div className="flex-1 flex flex-col gap-2.5">
        {AI_PREVIEW_MESSAGES.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'ai' && (
              <div className="w-5 h-5 rounded-full bg-[var(--color-brand-subtle)] border border-[var(--color-brand)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Zap size={9} className="text-[var(--color-brand)]" />
              </div>
            )}
            <div
              className={`text-[11px] leading-relaxed rounded-xl px-3 py-2 max-w-[80%] ${
                m.role === 'user'
                  ? 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20'
                  : 'bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
              }`}
            >
              {m.msg}
            </div>
          </div>
        ))}
      </div>

      <CardDivider />

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your infrastructure..."
          className="flex-1 h-8 px-3 text-xs bg-[var(--color-surface-3)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:border-[var(--color-brand)] transition-colors"
        />
        <Button type="submit" variant="brand" size="xs" icon={<ArrowUpRight size={12} />} />
      </form>
    </Card>
  )
}
