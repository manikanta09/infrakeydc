import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'brand' | 'green' | 'purple' | 'none'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const glowStyles = {
  brand: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-[var(--color-brand)]/30',
  green: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:border-[var(--color-success)]/30',
  purple: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-[var(--color-neon-purple)]/30',
  none: '',
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
}

export function Card({ children, className, hover = false, glow = 'none', padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'surface-card',
        hover && 'surface-card-hover transition-all duration-200',
        glow !== 'none' && hover && glowStyles[glow],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export function CardHeader({ title, subtitle, action, icon, className }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 mb-4', className)}>
      <div className="flex items-center gap-2.5 min-w-0">
        {icon && (
          <div className="flex-shrink-0 w-7 h-7 rounded-md bg-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)]">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{title}</h3>
          {subtitle && (
            <p className="text-[11px] text-[var(--color-text-tertiary)] truncate mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

interface CardDividerProps {
  className?: string
}

export function CardDivider({ className }: CardDividerProps) {
  return <div className={cn('border-t border-[var(--color-border)] -mx-4 my-3', className)} />
}
