import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend,
} from 'recharts'
import { useEarnings } from '../../hooks/useEarnings'
import { useCurrency } from '../../lib/currency'
import Skeleton from '../ui/Skeleton'
import ErrorCard from '../ui/ErrorCard'
import type { FinnhubEarnings } from '../../types/finnhub'

interface EarningsChartProps {
  ticker: string
}

export default function EarningsChart({ ticker }: EarningsChartProps) {
  const { data, isLoading, isError, refetch } = useEarnings(ticker)
  const { symbol, convert } = useCurrency()
  const [view, setView] = useState<'chart' | 'table'>('chart')

  function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-surface-2 border border-border rounded-lg p-3 text-xs shadow-xl">
        <p className="font-medium text-text-1 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }} />
            <span className="text-text-2">{p.name}:</span>
            <span className="font-mono font-medium text-text-1">
              {p.value != null ? `${symbol}${convert(p.value).toFixed(2)}` : '—'}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="card p-5">
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-56 w-full" />
      </div>
    )
  }

  if (isError) return <ErrorCard message="Failed to load earnings" onRetry={refetch} />

  if (!data?.length) {
    return (
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-text-1 mb-4">
          Earnings History
        </h2>
        <p className="text-white/50 text-sm text-center py-8">No earnings data available</p>
      </div>
    )
  }

  const chartData = data.map((e: FinnhubEarnings) => ({
    period: `Q${e.quarter} ${e.year}`,
    Actual: e.actual,
    Estimate: e.estimate,
    surprisePercent: e.surprisePercent,
  }))

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-sm font-semibold text-text-1">
          Earnings History (EPS)
        </h2>
        <div className="flex gap-1">
          {(['chart', 'table'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors capitalize ${
                view === v
                  ? 'bg-accent text-white'
                  : 'text-text-2 hover:bg-surface-2'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'chart' ? (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c2e31" vertical={false} />
            <XAxis
              dataKey="period"
              tick={{ fill: '#4a4f56', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#4a4f56', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${symbol}${convert(v).toFixed(2)}`}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#8a8f96', paddingTop: '8px' }}
            />
            <ReferenceLine y={0} stroke="#2c2e31" />
            <Bar dataKey="Actual" fill="#28EBCF" radius={[3, 3, 0, 0]} maxBarSize={24} />
            <Bar dataKey="Estimate" fill="#2c2e31" radius={[3, 3, 0, 0]} maxBarSize={24} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Period', 'Actual EPS', 'Estimate', 'Surprise', 'Surprise %'].map((h) => (
                  <th key={h} className="text-left text-xs text-white/50 pb-2 pr-4 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((e: FinnhubEarnings) => {
                const beat = (e.surprisePercent ?? 0) >= 0
                return (
                  <tr key={e.period} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-text-1">Q{e.quarter} {e.year}</td>
                    <td className="py-2.5 pr-4 font-mono text-text-1">
                      {e.actual != null ? `${symbol}${convert(e.actual).toFixed(2)}` : '—'}
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-text-2">
                      {e.estimate != null ? `${symbol}${convert(e.estimate).toFixed(2)}` : '—'}
                    </td>
                    <td className={`py-2.5 pr-4 font-mono ${beat ? 'text-positive' : 'text-negative'}`}>
                      {e.surprise != null ? `${beat ? '+' : ''}${symbol}${convert(Math.abs(e.surprise)).toFixed(2)}` : '—'}
                    </td>
                    <td className={`py-2.5 font-mono ${beat ? 'text-positive' : 'text-negative'}`}>
                      {e.surprisePercent != null ? `${beat ? '+' : ''}${e.surprisePercent.toFixed(1)}%` : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
