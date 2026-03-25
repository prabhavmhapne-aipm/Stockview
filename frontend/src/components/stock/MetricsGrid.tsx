import MetricCard from './MetricCard'
import Skeleton from '../ui/Skeleton'
import ErrorCard from '../ui/ErrorCard'
import { useMetrics } from '../../hooks/useMetrics'
import { useCurrency } from '../../lib/currency'

interface MetricsGridProps {
  ticker: string
}

function fmt(n?: number | null, prefix = '', suffix = '', decimals = 2): string {
  if (n === undefined || n === null || isNaN(n)) return '—'
  return `${prefix}${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
}

function interpretPE(pe?: number | null): { text: string; trend: 'up' | 'down' | 'warning' | 'neutral' } {
  if (!pe || pe <= 0) return { text: 'Not profitable or data unavailable', trend: 'neutral' }
  if (pe < 12)  return { text: 'Trading cheap — potentially undervalued', trend: 'up' }
  if (pe < 22)  return { text: 'Fairly valued for its sector', trend: 'neutral' }
  if (pe < 35)  return { text: 'Priced at a premium — market expects growth', trend: 'warning' }
  return         { text: 'Expensive — high growth already priced in', trend: 'down' }
}

function interpretBeta(beta?: number | null): { text: string; trend: 'up' | 'down' | 'neutral' } {
  if (!beta) return { text: 'Volatility data unavailable', trend: 'neutral' }
  if (beta < 0.7) return { text: 'Less volatile than the market — lower risk', trend: 'up' }
  if (beta < 1.2) return { text: 'Moves roughly in line with the market', trend: 'neutral' }
  if (beta < 1.8) return { text: 'More volatile than the market — higher risk/reward', trend: 'warning' }
  return          { text: 'Highly volatile — expect large price swings', trend: 'down' }
}

function interpretROE(roe?: number | null): { text: string; trend: 'up' | 'down' | 'warning' | 'neutral' } {
  if (roe === undefined || roe === null) return { text: 'Profitability data unavailable', trend: 'neutral' }
  if (roe < 0)  return { text: 'Losing money on shareholder capital', trend: 'down' }
  if (roe < 10) return { text: 'Below-average capital efficiency', trend: 'warning' }
  if (roe < 20) return { text: 'Solid returns on shareholder capital', trend: 'neutral' }
  return         { text: 'Excellent — management generates strong returns', trend: 'up' }
}

function interpretPB(pb?: number | null): { text: string; trend: 'up' | 'down' | 'warning' | 'neutral' } {
  if (!pb || pb <= 0) return { text: 'Book value data unavailable', trend: 'neutral' }
  if (pb < 1)   return { text: 'Trading below book value — potentially undervalued', trend: 'up' }
  if (pb < 3)   return { text: 'Reasonable premium to book value', trend: 'neutral' }
  if (pb < 10)  return { text: 'High premium — market prices in intangibles or growth', trend: 'warning' }
  return         { text: 'Very high — typical for asset-light businesses', trend: 'warning' }
}

function interpretDebt(de?: number | null): { text: string; trend: 'up' | 'down' | 'warning' | 'neutral' } {
  if (de === undefined || de === null) return { text: 'Debt data unavailable', trend: 'neutral' }
  if (de < 0.5) return { text: 'Low debt — financially conservative', trend: 'up' }
  if (de < 1.0) return { text: 'Manageable debt level', trend: 'neutral' }
  if (de < 2.0) return { text: 'Elevated debt — worth monitoring', trend: 'warning' }
  return         { text: 'High debt load — increases financial risk', trend: 'down' }
}

export default function MetricsGrid({ ticker }: MetricsGridProps) {
  const { data, isLoading, isError, refetch } = useMetrics(ticker)
  const { symbol, convert } = useCurrency()

  if (isLoading) {
    return (
      <div className="card p-5">
        <Skeleton className="h-4 w-28 mb-5" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      </div>
    )
  }

  if (isError) return <ErrorCard message="Failed to load metrics" onRetry={refetch} />

  const m = data?.metric
  const pe = m?.peBasicExclExtraTTM ?? m?.peExclExtraAnnual
  const pb = m?.pbAnnual
  const beta = m?.beta
  const roe = m?.roeRfy
  const de = m?.totalDebtToEquityAnnual
  const eps52High = m?.['52WeekHigh'] as number | undefined
  const eps52Low = m?.['52WeekLow'] as number | undefined
  const div = m?.annualDividendYield
  const epsGrowth = m?.epsGrowth3Y
  const revGrowth = m?.revenueGrowth3Y
  const eps = m?.epsBasicExclExtraItemsAnnual

  const peInt = interpretPE(pe)
  const pbInt = interpretPB(pb)
  const betaInt = interpretBeta(beta)
  const roeInt = interpretROE(roe)
  const deInt = interpretDebt(de)

  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-text-1 mb-5">Key Metrics</h2>
      <div className="grid grid-cols-2 gap-3">

        <MetricCard
          label="P/E Ratio (TTM)"
          value={pe ? `${pe.toFixed(1)}x` : '—'}
          interpretation={peInt.text}
          trend={peInt.trend}
        />

        <MetricCard
          label="P/B Ratio"
          value={pb ? `${pb.toFixed(2)}x` : '—'}
          interpretation={pbInt.text}
          trend={pbInt.trend}
        />

        <MetricCard
          label="EPS (Annual)"
          value={fmt(eps !== undefined && eps !== null ? convert(eps) : eps, symbol)}
          interpretation={
            eps === undefined || eps === null ? 'Data unavailable' :
            eps >= 0 ? 'Profitable — earning money per share' : 'Currently loss-making'
          }
          trend={(eps ?? 0) >= 0 ? 'up' : 'down'}
        />

        <MetricCard
          label="52-Week High"
          value={fmt(eps52High !== undefined ? convert(eps52High) : eps52High, symbol)}
          interpretation="Highest price in the past year"
          trend="up"
          sub={m?.['52WeekHighDate'] as string | undefined}
        />

        <MetricCard
          label="52-Week Low"
          value={fmt(eps52Low !== undefined ? convert(eps52Low) : eps52Low, symbol)}
          interpretation="Lowest price in the past year"
          trend="down"
          sub={m?.['52WeekLowDate'] as string | undefined}
        />

        <MetricCard
          label="Dividend Yield"
          value={fmt(div, '', '%')}
          interpretation={
            !div || div === 0 ? 'No dividend — reinvests profits instead' :
            div < 2 ? 'Small dividend — growth-focused company' :
            div < 5 ? 'Healthy dividend for income investors' :
            'High yield — check if it is sustainable'
          }
          trend={(div ?? 0) > 0 ? 'up' : 'neutral'}
        />

        <MetricCard
          label="Beta"
          value={fmt(beta)}
          interpretation={betaInt.text}
          trend={betaInt.trend as any}
        />

        <MetricCard
          label="ROE (Annual)"
          value={fmt(roe, '', '%', 1)}
          interpretation={roeInt.text}
          trend={roeInt.trend}
        />

        <MetricCard
          label="Debt / Equity"
          value={fmt(de, '', 'x')}
          interpretation={deInt.text}
          trend={deInt.trend}
        />

        <MetricCard
          label="EPS Growth 3Y"
          value={fmt(epsGrowth, '', '%', 1)}
          interpretation={
            epsGrowth === undefined || epsGrowth === null ? 'Data unavailable' :
            epsGrowth > 15 ? 'Strong earnings growth over 3 years' :
            epsGrowth > 0  ? 'Modest earnings growth' :
            'Earnings have been shrinking'
          }
          trend={(epsGrowth ?? 0) > 0 ? 'up' : 'down'}
        />

        <MetricCard
          label="Revenue Growth 3Y"
          value={fmt(revGrowth, '', '%', 1)}
          interpretation={
            revGrowth === undefined || revGrowth === null ? 'Data unavailable' :
            revGrowth > 15 ? 'Fast-growing company' :
            revGrowth > 0  ? 'Steady revenue expansion' :
            'Revenue has been declining'
          }
          trend={(revGrowth ?? 0) > 0 ? 'up' : 'down'}
        />

      </div>
    </div>
  )
}
