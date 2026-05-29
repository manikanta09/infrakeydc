import { cn } from '@/utils/cn'

interface FormFieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, hint, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-xs font-medium text-[var(--color-text-secondary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-[11px] text-[var(--color-error)]">{error}</p>}
      {!error && hint && <p className="text-[11px] text-[var(--color-text-tertiary)]">{hint}</p>}
    </div>
  )
}

interface FormSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="pb-3 border-b border-[var(--color-border)]">
          {title && <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>}
          {description && (
            <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

interface FormActionsProps {
  children: React.ReactNode
  className?: string
}

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div className={cn('flex items-center justify-end gap-2.5 pt-4 border-t border-[var(--color-border)]', className)}>
      {children}
    </div>
  )
}
