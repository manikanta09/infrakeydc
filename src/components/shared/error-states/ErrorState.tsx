import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  type?: 'generic' | 'network' | 'not-found' | 'unauthorized'
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

const errorConfig = {
  generic: {
    icon: AlertTriangle,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    color: 'text-[var(--color-error)]',
    bg: 'bg-[var(--color-error-dim)]',
  },
  network: {
    icon: WifiOff,
    title: 'Connection failed',
    description: 'Unable to reach the server. Check your connection and retry.',
    color: 'text-[var(--color-warning)]',
    bg: 'bg-[var(--color-warning-dim)]',
  },
  'not-found': {
    icon: AlertTriangle,
    title: 'Not found',
    description: 'The resource you are looking for does not exist.',
    color: 'text-[var(--color-text-tertiary)]',
    bg: 'bg-[var(--color-surface-3)]',
  },
  unauthorized: {
    icon: AlertTriangle,
    title: 'Access denied',
    description: "You don't have permission to view this resource.",
    color: 'text-[var(--color-error)]',
    bg: 'bg-[var(--color-error-dim)]',
  },
}

export function ErrorState({
  type = 'generic',
  title,
  description,
  onRetry,
  className,
}: ErrorStateProps) {
  const config = errorConfig[type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('flex flex-col items-center justify-center py-12 text-center', className)}
    >
      <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-4', config.bg)}>
        <Icon size={22} className={config.color} />
      </div>

      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
        {title ?? config.title}
      </h3>
      <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5 max-w-xs">
        {description ?? config.description}
      </p>

      {onRetry && (
        <Button
          variant="default"
          size="sm"
          onClick={onRetry}
          icon={<RefreshCw size={13} />}
          className="mt-5"
        >
          Try again
        </Button>
      )}
    </motion.div>
  )
}
