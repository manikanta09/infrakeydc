import { cn } from '@/utils/cn'
import type { Variant, Size } from '@/types'

interface BadgeProps {
  children: React.ReactNode
  variant?: Variant | 'online' | 'offline' | 'provisioning'
  size?: Extract<Size, 'xs' | 'sm' | 'md'>
  dot?: boolean
  className?: string
}

const variantStyles: Record<string, string> = {
  default: 'bg-[var(--color-surface-4)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
  brand: 'bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border-[var(--color-brand)]/20',
  success: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[var(--color-success)]/20',
  warning: 'bg-[var(--color-warning-dim)] text-[var(--color-warning)] border-[var(--color-warning)]/20',
  error: 'bg-[var(--color-error-dim)] text-[var(--color-error)] border-[var(--color-error)]/20',
  ghost: 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)]',
  online: 'bg-[var(--color-success-dim)] text-[var(--color-success)] border-[var(--color-success)]/20',
  offline: 'bg-[var(--color-surface-4)] text-[var(--color-text-tertiary)] border-[var(--color-border)]',
  provisioning: 'bg-[var(--color-info-dim)] text-[var(--color-brand)] border-[var(--color-brand)]/20',
}

const dotColors: Record<string, string> = {
  default: 'bg-[var(--color-text-tertiary)]',
  brand: 'bg-[var(--color-brand)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error: 'bg-[var(--color-error)]',
  ghost: 'bg-[var(--color-text-tertiary)]',
  online: 'bg-[var(--color-success)] pulse-online',
  offline: 'bg-[var(--color-text-disabled)]',
  provisioning: 'bg-[var(--color-brand)] pulse-online',
}

const sizeStyles: Record<string, string> = {
  xs: 'px-1.5 py-0.5 text-[10px] gap-1',
  sm: 'px-2 py-0.5 text-[11px] gap-1.5',
  md: 'px-2.5 py-1 text-xs gap-1.5',
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />
      )}
      {children}
    </span>
  )
}
