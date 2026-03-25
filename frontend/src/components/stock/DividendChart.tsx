import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { useDividends } from '../../hooks/useDividends'
import { useCurrency } from '../../lib/currency'
import Skeleton from '../ui/Skeleton'
import ErrorCard from '../ui/ErrorCard'

interface DividendChartProps {
  ticker: string
}

export default function DividendChart({ ticker }: DividendChartProps) {
  const { data, isLoading, isError, refetch } = useDividends(ticker)
  const { symbol, convert } = useCurrency()

  if (isLoading) {
    return (
      <div className="card p-5">
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-44 w-full" />
      </div>
    )
  }

  if (isError) return <ErrorCard message="Failed to load dividends" onRetry={refetch} />

  // Aggregate by calendar year
  const byYear: Record<string, number> = {}
  for (const d of data ?? []) {
    const year = d.date?.slice(0, 4)
    if (!year || !d.amount) continue
    byYear[year] = (byYear[year] ?? 0) + d.amount
  }

  const chartData = Object.entries(byYear)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, total]) => ({ year, amount: convert(total) }))

  function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-surface-2 border border-border rounded-lg p-3 text-xs shadow-xl">
        <p className="font-medium text-text-1 mb-1">{label}</p>
        <span className="text-accent font-mono">{symbol}{payload[0].value.toFixed(4)} per share</span>
      </div>
    )
  }

  if (!chartData.length) {
    return (
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-text-1 mb-4">Dividend per Share</h2>
        <p className="text-white/50 text-sm text-center py-8">No dividends paid</p>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-text-1 mb-4">Dividend per Share</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: '#3a5070', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#3a5070', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${symbol}${v.toFixed(2)}`}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[3, 3, 0, 0]} maxBarSize={32}>
            {chartData.map((entry, i) => (
              <Cell
                key={i}
                fill={i === chartData.length - 1 ? '#00c4a0' : '#1a3a5c'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
