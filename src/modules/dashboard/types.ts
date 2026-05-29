export interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    label?: string
    direction?: 'up' | 'down' | 'neutral'
  }
  accentColor?: 'brand' | 'green' | 'purple' | 'orange' | 'pink'
}
