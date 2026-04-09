import MetricCard from './MetricCard'
import AIInterpretation from './AIInterpretation'
import Skeleton from '../ui/Skeleton'
import ErrorCard from '../ui/ErrorCard'
import { useMetrics } from '../../hooks/useMetrics'
import { useCurrency } from '../../lib/currency'
import type { StockMetrics } from '../../types/finnhub'

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
  return         { text: 'Very high — typical for asset-light businesses', trend: 'down' }
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

  const d = data as StockMetrics | undefined
  const pe             = d?.pe
  const pb             = d?.pb
  const eps            = d?.eps
  const eps52High      = d?.weekHigh52
  const eps52Low       = d?.weekLow52
  const div            = d?.dividendYield
  const beta           = d?.beta
  const roe            = d?.roe
  const de             = d?.debtToEquity
  const epsGrowth      = d?.epsGrowth
  const revGrowth      = d?.revenueGrowth
  const revenue        = d?.revenue
  const netIncome      = d?.netIncome
  const revGrowthYoY   = d?.revenueGrowthYoY
  const profitMargin   = d?.profitMargin

  const peInt = interpretPE(pe)
  const pbInt = interpretPB(pb)
  const betaInt = interpretBeta(beta)
  const roeInt = interpretROE(roe)
  const deInt = interpretDebt(de)

  return (
    <div className="card p-5">
      <AIInterpretation ticker={ticker} />
      <h2 className="text-sm font-semibold text-text-1 mb-5">Key Metrics</h2>
      <div className="grid grid-cols-2 gap-3">

        <MetricCard
          label="52-Week High"
          value={fmt(eps52High !== undefined ? convert(eps52High) : eps52High, symbol)}
          interpretation="Highest price in the past year"
          trend="up"
          sub={d?.weekHighDate52 ?? undefined}
          tooltip={"The highest price the stock reached in the last 12 months.\n\nNear the high  🟢 Strong momentum, market confidence\nFar below high  🟡 Either a recovery opportunity or a declining trend — check the reason"}
        />

        <MetricCard
          label="52-Week Low"
          value={fmt(eps52Low !== undefined ? convert(eps52Low) : eps52Low, symbol)}
          interpretation="Lowest price in the past year"
          trend="down"
          sub={d?.weekLowDate52 ?? undefined}
          tooltip={"The lowest price the stock reached in the last 12 months.\n\nNear the low  🔴 Possible distress or value trap — check fundamentals\nFar above low  🟢 Has recovered strongly from its bottom"}
        />

        <MetricCard
          label="P/E Ratio (TTM)"
          value={pe ? `${pe.toFixed(1)}x` : '—'}
          interpretation={peInt.text}
          trend={peInt.trend}
          tooltip={"How much investors pay for every $1 of earnings.\n\n< 12x  🟢 Cheap — possibly undervalued\n12–22x  🟡 Fair — reasonable for most sectors\n22–35x  🟠 Premium — high growth expected\n> 35x  🔴 Expensive — very high expectations priced in"}
        />

        <MetricCard
          label="P/B Ratio"
          value={pb ? `${pb.toFixed(2)}x` : '—'}
          interpretation={pbInt.text}
          trend={pbInt.trend}
          tooltip={"Compares stock price to the company's net asset value (book value).\n\n< 1x  🟢 Trading below assets — potential bargain\n1–3x  🟡 Reasonable premium\n3–10x  🟠 High — market pricing in growth or brand\n> 10x  🔴 Very high — typical for asset-light tech firms"}
        />

        <MetricCard
          label="EPS (Annual)"
          value={fmt(eps !== undefined && eps !== null ? convert(eps) : eps, symbol)}
          interpretation={
            eps === undefined || eps === null ? 'Data unavailable' :
            eps >= 0 ? 'Profitable — earning money per share' : 'Currently loss-making'
          }
          trend={(eps ?? 0) >= 0 ? 'up' : 'down'}
          tooltip={"Earnings Per Share — the profit a company makes for each share.\n\n> $0  🟢 Profitable\n< $0  🔴 Loss-making\n\nGrowing EPS year on year is a strong positive sign."}
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
          trend={!div || div === 0 ? 'neutral' : div < 2 ? 'neutral' : div < 5 ? 'up' : 'warning'}
          tooltip={"Annual dividend paid out as a % of the current stock price.\n\n0%  ⚪ No dividend — reinvests for growth\n1–3%  🟡 Modest income, growth-focused\n3–5%  🟢 Healthy yield for income investors\n> 5%  🟠 High yield — verify it's sustainable"}
        />

        <MetricCard
          label="Beta"
          value={fmt(beta)}
          interpretation={betaInt.text}
          trend={betaInt.trend as any}
          tooltip={"Measures how much the stock moves compared to the overall market (S&P 500 = 1.0).\n\n< 0.7  🟢 Low volatility — defensive, stable\n0.7–1.2  🟡 Moves with the market\n1.2–1.8  🟠 More volatile — higher risk & reward\n> 1.8  🔴 Highly volatile — expect large price swings"}
        />

        <MetricCard
          label="ROE (Annual)"
          value={fmt(roe, '', '%', 1)}
          interpretation={roeInt.text}
          trend={roeInt.trend}
          tooltip={"Return on Equity — how much profit the company generates from shareholder money.\n\n< 0%  🔴 Losing money on equity\n0–10%  🟠 Below average efficiency\n10–20%  🟡 Solid returns\n> 20%  🟢 Excellent — management creates strong value"}
        />

        <MetricCard
          label="Debt / Equity"
          value={fmt(de, '', 'x')}
          interpretation={deInt.text}
          trend={deInt.trend}
          tooltip={"Total debt divided by shareholder equity. Shows how leveraged the company is.\n\n< 0.5x  🟢 Conservative — low financial risk\n0.5–1x  🟡 Manageable debt level\n1–2x  🟠 Elevated — worth monitoring\n> 2x  🔴 High leverage — increases bankruptcy risk"}
        />

        <MetricCard
          label="EPS Growth"
          value={fmt(epsGrowth, '', '%', 1)}
          interpretation={
            epsGrowth === undefined || epsGrowth === null ? 'Data unavailable' :
            epsGrowth > 15 ? 'Strong earnings growth over 3 years' :
            epsGrowth > 0  ? 'Modest earnings growth' :
            'Earnings have been shrinking'
          }
          trend={(epsGrowth ?? 0) > 0 ? 'up' : 'down'}
          tooltip={"How fast earnings per share have grown over the past 3 years (annualised).\n\n> 15%  🟢 Strong growth trajectory\n0–15%  🟡 Modest but positive\n< 0%  🔴 Earnings are shrinking — investigate why"}
        />

        <MetricCard
          label="Revenue Growth"
          value={fmt(revGrowth, '', '%', 1)}
          interpretation={
            revGrowth === undefined || revGrowth === null ? 'Data unavailable' :
            revGrowth > 15 ? 'Fast-growing company' :
            revGrowth > 0  ? 'Steady revenue expansion' :
            'Revenue has been declining'
          }
          trend={(revGrowth ?? 0) > 15 ? 'up' : (revGrowth ?? 0) > 0 ? 'neutral' : 'down'}
          tooltip={"How fast the company's total sales have grown over the past 3 years (annualised).\n\n> 15%  🟢 Fast-growing business\n0–15%  🟡 Steady expansion\n< 0%  🔴 Revenue is declining — check market conditions"}
        />

      </div>

      {/* Financials */}
      <h2 className="text-sm font-semibold text-text-1 mt-6 mb-4">Financials</h2>
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Revenue (TTM)"
          value={revenue != null ? `${symbol}${(convert(revenue) / 1e9).toFixed(2)}B` : '—'}
          interpretation={revenue != null ? (revenue > 0 ? 'Total sales in the past 12 months' : 'Negative revenue — data may be unavailable') : 'Data unavailable'}
          trend={revenue != null && revenue > 0 ? 'up' : 'neutral'}
        />
        <MetricCard
          label="Net Income (TTM)"
          value={netIncome != null ? `${symbol}${(convert(netIncome) / 1e9).toFixed(2)}B` : '—'}
          interpretation={netIncome == null ? 'Data unavailable' : netIncome > 0 ? 'Company is profitable' : 'Company is running at a loss'}
          trend={netIncome != null && netIncome > 0 ? 'up' : 'down'}
        />
        <MetricCard
          label="Revenue Growth (YoY)"
          value={fmt(revGrowthYoY, '', '%', 1)}
          interpretation={revGrowthYoY == null ? 'Data unavailable' : revGrowthYoY > 15 ? 'Strong year-on-year revenue growth' : revGrowthYoY > 0 ? 'Steady growth vs last year' : 'Revenue declined vs last year'}
          trend={revGrowthYoY != null && revGrowthYoY > 0 ? 'up' : 'down'}
        />
        <MetricCard
          label="Profit Margin"
          value={fmt(profitMargin, '', '%', 1)}
          interpretation={profitMargin == null ? 'Data unavailable' : profitMargin > 20 ? 'High margin — very profitable business' : profitMargin > 10 ? 'Healthy profit margin' : profitMargin > 0 ? 'Thin margin — low pricing power' : 'Loss-making — costs exceed revenue'}
          trend={profitMargin != null && profitMargin > 10 ? 'up' : profitMargin != null && profitMargin > 0 ? 'warning' : 'down'}
        />
      </div>
    </div>
  )
}
