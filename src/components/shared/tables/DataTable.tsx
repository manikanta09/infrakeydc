import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { EmptyState } from '../empty-states/EmptyState'
import { SkeletonTableRow } from '../skeletons/Skeleton'
import { Database } from 'lucide-react'

export interface Column<T> {
  key: keyof T | string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (value: unknown, row: T, index: number) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  onRowClick?: (row: T) => void
  className?: string
  stickyHeader?: boolean
  striped?: boolean
}

type SortDir = 'asc' | 'desc' | null

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyTitle = 'No records',
  emptyDescription = 'No data to display.',
  onRowClick,
  className,
  stickyHeader = true,
  striped = false,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const aVal = (a as Record<string, unknown>)[sortKey]
    const bVal = (b as Record<string, unknown>)[sortKey]
    const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''), undefined, { numeric: true })
    return sortDir === 'asc' ? cmp : -cmp
  })

  return (
    <div className={cn('w-full overflow-auto', className)}>
      <table className="w-full border-collapse text-sm">
        <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
          <tr className="bg-[var(--color-surface-1)] border-b border-[var(--color-border)]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]',
                  col.align === 'right' && 'text-right',
                  col.align === 'center' && 'text-center',
                  col.sortable && 'cursor-pointer select-none hover:text-[var(--color-text-secondary)] transition-colors'
                )}
                style={{ width: col.width }}
                onClick={() => col.sortable && handleSort(String(col.key))}
              >
                <div className={cn('flex items-center gap-1', col.align === 'right' && 'justify-end')}>
                  {col.header}
                  {col.sortable && (
                    <span className="opacity-50">
                      {sortKey === String(col.key) ? (
                        sortDir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />
                      ) : (
                        <ChevronsUpDown size={11} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[var(--color-border-subtle)]">
                <td colSpan={columns.length} className="py-0 px-4">
                  <SkeletonTableRow cols={columns.length} />
                </td>
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <EmptyState
                  icon={<Database size={20} />}
                  title={emptyTitle}
                  description={emptyDescription}
                  size="sm"
                />
              </td>
            </tr>
          ) : (
            <AnimatePresence initial={false}>
              {sorted.map((row, rowIdx) => (
                <motion.tr
                  key={keyExtractor(row)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'border-b border-[var(--color-border-subtle)] transition-colors duration-100',
                    striped && rowIdx % 2 === 0 && 'bg-[rgba(255,255,255,0.01)]',
                    onRowClick && 'cursor-pointer hover:bg-[var(--color-surface-3)]',
                    !onRowClick && 'hover:bg-[rgba(255,255,255,0.01)]'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col) => {
                    const rawVal = (row as Record<string, unknown>)[String(col.key)]
                    return (
                      <td
                        key={String(col.key)}
                        className={cn(
                          'py-3 px-4 text-[var(--color-text-secondary)]',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center'
                        )}
                      >
                        {col.render ? col.render(rawVal, row, rowIdx) : String(rawVal ?? '-')}
                      </td>
                    )
                  })}
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
    </div>
  )
}
