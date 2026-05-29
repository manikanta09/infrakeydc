import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn('p-5 min-h-full', className)}
    >
      {children}
    </motion.div>
  )
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  action?: React.ReactNode
  tabs?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, breadcrumbs, action, tabs, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-5', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 mb-2">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-[var(--color-text-disabled)] text-xs">/</span>}
              <span
                className={cn(
                  'text-xs',
                  i < breadcrumbs.length - 1
                    ? 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] cursor-pointer transition-colors'
                    : 'text-[var(--color-text-secondary)]'
                )}
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[var(--color-text-tertiary)] mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      {tabs && <div className="mt-4">{tabs}</div>}
    </div>
  )
}

interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 'auto'
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-[repeat(auto-fill,minmax(220px,1fr))]',
}

const gapMap = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-5',
}

export function Grid({ children, cols = 3, gap = 'md', className }: GridProps) {
  return (
    <div className={cn('grid', colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  )
}
