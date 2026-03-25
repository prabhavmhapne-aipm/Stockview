import { TrendingUp, TrendingDown, Globe, RefreshCw } from 'lucide-react'
import type { FinnhubProfile, FinnhubQuote } from '../../types/finnhub'
import Skeleton from '../ui/Skeleton'
import { useCurrency } from '../../lib/currency'

interface StockHeaderProps {
  ticker: string
  profile?: FinnhubProfile
  quote?: FinnhubQuote
  profileLoading: boolean
  quoteLoading: boolean
  quoteUpdating: boolean
}

function fmt(n?: number, decimals = 2) {
  if (n === undefined || n === null || isNaN(n)) return '—'
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function fmtMarketCap(n: number | undefined, sym: string) {
  if (!n) return '—'
  if (n >= 1_000_000) return `${sym}${(n / 1_000_000).toFixed(2)}T`
  if (n >= 1_000)     return `${sym}${(n / 1_000).toFixed(2)}B`
  return `${sym}${n.toFixed(2)}M`
}

export default function StockHeader({ ticker, profile, quote, profileLoading, quoteLoading, quoteUpdating }: StockHeaderProps) {
  const { symbol, convert } = useCurrency()
  const isUp = (quote?.d ?? 0) >= 0

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">

        {/* Logo + identity */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {profileLoading ? (
            <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
              {profile?.logo
                ? <img src={profile.logo} alt={profile.name} className="w-full h-full object-contain p-1.5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                : <span className="text-lg font-bold text-accent">{ticker[0]}</span>
              }
            </div>
          )}

          <div className="min-w-0">
            {profileLoading ? (
              <><Skeleton className="h-5 w-44 mb-2" /><Skeleton className="h-3.5 w-28" /></>
            ) : (
              <>
                <h1 className="text-lg font-bold text-text-1 truncate">{profile?.name || ticker}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs font-mono font-semibold text-accent">{ticker}</span>
                  {profile?.exchange && <span className="tag tag-default">{profile.exchange}</span>}
                  {profile?.finnhubIndustry && <span className="tag tag-default">{profile.finnhubIndustry}</span>}
                  {profile?.weburl && (
                    <a href={profile.weburl} target="_blank" rel="noreferrer"
                      className="text-xs text-text-3 hover:text-accent transition-colors flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Website
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Live price */}
        <div className="flex flex-col sm:items-end gap-1">
          {quoteLoading ? (
            <><Skeleton className="h-9 w-32 mb-1" /><Skeleton className="h-5 w-24" /></>
          ) : (
            <>
              <div className="flex items-center gap-2.5">
                <span className="text-[2rem] font-bold font-mono text-text-1 tabular-nums leading-none">
                  {symbol}{fmt(quote?.c !== undefined ? convert(quote.c) : undefined)}
                </span>
                <span className="live-dot" title="Live price" />
                {quoteUpdating && <RefreshCw className="w-3.5 h-3.5 text-text-3 animate-spin" />}
              </div>

              <div className={`flex items-center gap-1.5 text-sm font-medium ${isUp ? 'text-positive' : 'text-negative'}`}>
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span className="tabular-nums">
                  {isUp ? '+' : '-'}{symbol}{fmt(Math.abs(convert(quote?.d ?? 0)))} ({isUp ? '+' : ''}{fmt(quote?.dp)}%)
                </span>
              </div>

              {profile?.marketCapitalization && (
                <span className="text-xs text-text-3 tabular-nums">
                  Mkt Cap {fmtMarketCap(convert(profile.marketCapitalization), symbol)}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* OHLC strip */}
      {!quoteLoading && quote && (
        <div className="mt-5 pt-4 border-t border-border grid grid-cols-4 gap-4">
          {([
            { label: 'Open',  value: quote.o  },
            { label: 'High',  value: quote.h  },
            { label: 'Low',   value: quote.l  },
            { label: 'Close', value: quote.pc },
          ] as const).map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-medium text-text-3 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-mono font-semibold text-text-1 tabular-nums">{symbol}{fmt(convert(value))}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
