import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  suffix?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, iconPosition = 'left', suffix, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-[var(--color-text-secondary)]">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && iconPosition === 'left' && (
            <span className="absolute left-3 flex items-center text-[var(--color-text-tertiary)] pointer-events-none">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-9 bg-[var(--color-surface-2)] border border-[var(--color-border)]',
              'rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)]',
              'transition-all duration-150',
              'focus:outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)]/30',
              'hover:border-[var(--color-border-strong)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/30',
              icon && iconPosition === 'left' ? 'pl-9 pr-3' : 'px-3',
              icon && iconPosition === 'right' ? 'pr-9' : '',
              suffix ? 'pr-16' : '',
              className
            )}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <span className="absolute right-3 flex items-center text-[var(--color-text-tertiary)] pointer-events-none">
              {icon}
            </span>
          )}

          {suffix && (
            <span className="absolute right-3 text-xs text-[var(--color-text-tertiary)]">
              {suffix}
            </span>
          )}
        </div>

        {error && <p className="text-[11px] text-[var(--color-error)]">{error}</p>}
        {!error && hint && <p className="text-[11px] text-[var(--color-text-tertiary)]">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
