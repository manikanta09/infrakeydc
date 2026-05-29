import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import type { Variant, Size } from '@/types'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Extract<Size, 'xs' | 'sm' | 'md' | 'lg'>
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const variantStyles: Record<string, string> = {
  default:
    'bg-[var(--color-surface-3)] hover:bg-[var(--color-surface-4)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)]',
  brand:
    'bg-[var(--color-brand)] hover:bg-[var(--color-brand-dim)] text-white border border-transparent shadow-[var(--shadow-brand)] hover:shadow-[0_0_28px_rgba(59,130,246,0.45)]',
  success:
    'bg-[var(--color-success-dim)] hover:bg-[rgba(34,197,94,0.25)] text-[var(--color-success)] border border-[var(--color-success)]/20',
  warning:
    'bg-[var(--color-warning-dim)] hover:bg-[rgba(245,158,11,0.25)] text-[var(--color-warning)] border border-[var(--color-warning)]/20',
  error:
    'bg-[var(--color-error-dim)] hover:bg-[rgba(239,68,68,0.25)] text-[var(--color-error)] border border-[var(--color-error)]/20',
  ghost:
    'bg-transparent hover:bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-transparent',
}

const sizeStyles: Record<string, string> = {
  xs: 'h-6 px-2.5 text-[11px] gap-1.5 rounded-md',
  sm: 'h-8 px-3 text-xs gap-2 rounded-lg',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-sm gap-2.5 rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={14} />
        ) : (
          icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
