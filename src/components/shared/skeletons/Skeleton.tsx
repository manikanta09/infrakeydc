import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const roundedMap = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function Skeleton({ className, width, height, rounded = 'md' }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse bg-[var(--color-surface-3)]', roundedMap[rounded], className)}
      style={{ width, height }}
    />
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={12}
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonMetricCard({ className }: { className?: string }) {
  return (
    <div className={cn('surface-card p-4 space-y-3', className)}>
      <div className="flex items-center gap-2">
        <Skeleton width={32} height={32} rounded="lg" />
        <Skeleton width={80} height={12} />
      </div>
      <Skeleton width={120} height={28} />
      <div className="flex items-center justify-between">
        <Skeleton width={64} height={10} />
        <Skeleton width={48} height={20} rounded="full" />
      </div>
    </div>
  )
}

export function SkeletonTableRow({ cols = 4, className }: { cols?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 py-3 border-b border-[var(--color-border-subtle)]', className)}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} height={12} width={i === 0 ? '30%' : '20%'} />
      ))}
    </div>
  )
}

export function SkeletonChart({ height = 200, className }: { height?: number; className?: string }) {
  return (
    <div className={cn('surface-card p-4', className)}>
      <div className="flex items-center gap-2 mb-4">
        <Skeleton width={28} height={28} rounded="md" />
        <Skeleton width={120} height={14} />
      </div>
      <Skeleton height={height} className="w-full" />
    </div>
  )
}
