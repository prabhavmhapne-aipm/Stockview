import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { useTickerStore } from '../../store/tickerStore'
import { useCandles } from '../../hooks/useCandles'
import { useCurrency } from '../../lib/currency'
import Skeleton from '../ui/Skeleton'
import ErrorCard from '../ui/ErrorCard'
import type { Range, CandlePoint } from '../../types/app'

const RANGES: Range[] = ['1D', '1W', '1M', '3M', '1Y']

function CustomTooltip({ active, payload, symbol }: any) {
  if (!active || !payload?.length) return null
  const d: CandlePoint = payload[0].payload
  return (
    <div className="bg-surface-2 border border-border rounded-xl p-3 text-xs shadow-float">
      <p className="text-text-2 mb-2 font-medium">{d.timeLabel}</p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-1">
        <span className="text-white/50">Open</span>   <span className="text-text-1 font-mono tabular-nums">{symbol}{d.open.toFixed(2)}</span>
        <span className="text-white/50">Close</span>  <span className="text-text-1 font-mono tabular-nums">{symbol}{d.close.toFixed(2)}</span>
        <span className="text-white/50">High</span>   <span className="text-positive font-mono tabular-nums">{symbol}{d.high.toFixed(2)}</span>
        <span className="text-white/50">Low</span>    <span className="text-negative font-mono tabular-nums">{symbol}{d.low.toFixed(2)}</span>
        <span className="text-white/50">Volume</span> <span className="text-text-2 font-mono tabular-nums">{(d.volume / 1_000_000).toFixed(1)}M</span>
      </div>
    </div>
  )
}

export default function PriceChart() {
  const { activeTicker, selectedRange, setRange } = useTickerStore()
  const { symbol, convert } = useCurrency()
  const { data: candles, isLoading, isError, refetch } = useCandles(activeTicker, selectedRange)

  const convertedCandles = candles?.map((p) => ({
    ...p,
    open:  convert(p.open),
    high:  convert(p.high),
    low:   convert(p.low),
    close: convert(p.close),
  }))

  if (isLoading) {
    return (
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-1">{RANGES.map((r) => <Skeleton key={r} className="h-6 w-9 rounded-full" />)}</div>
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  if (isError) return <ErrorCard message="Failed to load price chart" onRetry={refetch} />

  const firstClose = convertedCandles?.[0]?.close ?? 0
  const lastClose  = convertedCandles?.[convertedCandles.length - 1]?.close ?? 0
  const isUp = lastClose >= firstClose
  const strokeColor = isUp ? '#28EBCF' : '#f43f5e'
  const gradientId  = 'priceGradient'
  const tickCount   = 6
  const step = convertedCandles && convertedCandles.length > tickCount
    ? Math.floor(convertedCandles.length / tickCount)
    : 1

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <h2 className="text-sm font-semibold text-text-1">Price</h2>
        <div className="flex gap-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`range-btn ${r === selectedRange ? 'range-btn-active' : 'range-btn-inactive'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {!convertedCandles || convertedCandles.length === 0 ? (
        <div className="h-72 flex items-center justify-center text-white/50 text-sm">
          No chart data for this period
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={convertedCandles} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={strokeColor} stopOpacity={0.20} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c2e31" vertical={false} />
            <XAxis
              dataKey="timeLabel"
              tick={{ fill: '#4a4f56', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={step - 1}
            />
            <YAxis
              tick={{ fill: '#4a4f56', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${symbol}${v.toFixed(0)}`}
              width={60}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip symbol={symbol} />} cursor={{ stroke: '#2c2e31', strokeWidth: 1 }} />
            <ReferenceLine y={firstClose} stroke="#2c2e31" strokeDasharray="4 4" />
            <Area
              type="monotone"
              dataKey="close"
              stroke={strokeColor}
              strokeWidth={1.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, fill: strokeColor, stroke: '#101112', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
