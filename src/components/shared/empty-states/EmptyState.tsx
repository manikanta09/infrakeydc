import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeStyles = {
  sm: { wrapper: 'py-8', icon: 'w-10 h-10', title: 'text-sm', desc: 'text-xs' },
  md: { wrapper: 'py-12', icon: 'w-12 h-12', title: 'text-base', desc: 'text-sm' },
  lg: { wrapper: 'py-16', icon: 'w-16 h-16', title: 'text-lg', desc: 'text-sm' },
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className,
}: EmptyStateProps) {
  const styles = sizeStyles[size]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex flex-col items-center justify-center text-center', styles.wrapper, className)}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center rounded-2xl mb-4',
            'bg-[var(--color-surface-3)] border border-[var(--color-border)]',
            'text-[var(--color-text-tertiary)]',
            styles.icon
          )}
        >
          {icon}
        </div>
      )}

      <h3 className={cn('font-semibold text-[var(--color-text-primary)]', styles.title)}>{title}</h3>

      {description && (
        <p className={cn('text-[var(--color-text-tertiary)] mt-1.5 max-w-sm', styles.desc)}>
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-5">
          {action && (
            <Button variant="brand" size="sm" onClick={action.onClick} icon={action.icon}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" size="sm" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  )
}
