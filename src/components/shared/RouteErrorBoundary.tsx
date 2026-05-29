import { Component, type ErrorInfo, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
  eventId: string | null
}

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null, eventId: null }

  static getDerivedStateFromError(error: Error): State {
    return { error, eventId: Math.random().toString(36).slice(2, 10) }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[RouteErrorBoundary]', error, info.componentStack)
  }

  retry = () => this.setState({ error: null, eventId: null })

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback
      return <RouteErrorFallback error={this.state.error} eventId={this.state.eventId} onRetry={this.retry} />
    }
    return this.props.children
  }
}

interface FallbackProps {
  error: Error
  eventId: string | null
  onRetry: () => void
}

function RouteErrorFallback({ error, eventId, onRetry }: FallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--color-error-dim)] border border-[var(--color-error)]/20 flex items-center justify-center mb-5">
        <AlertTriangle size={24} className="text-[var(--color-error)]" />
      </div>

      <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
        Module failed to load
      </h2>
      <p className="text-sm text-[var(--color-text-tertiary)] mt-1.5 max-w-sm">
        An unexpected error occurred while rendering this page. The issue has been logged.
      </p>

      {import.meta.env.DEV && (
        <pre className="mt-4 text-left text-[11px] text-[var(--color-error)] bg-[var(--color-error-dim)] border border-[var(--color-error)]/20 rounded-lg p-3 max-w-lg overflow-auto max-h-40">
          {error.message}
        </pre>
      )}

      {eventId && (
        <p className="text-[10px] text-[var(--color-text-disabled)] mt-3 font-mono">
          Event ID: {eventId}
        </p>
      )}

      <div className="flex items-center gap-3 mt-6">
        <Button variant="brand" size="sm" icon={<RefreshCw size={13} />} onClick={onRetry}>
          Retry
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Home size={13} />}
          onClick={() => window.location.assign('/')}
        >
          Dashboard
        </Button>
      </div>
    </motion.div>
  )
}
