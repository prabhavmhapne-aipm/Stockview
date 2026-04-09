import { TrendingUp, TrendingDown, Globe, RefreshCw } from 'lucide-react'
import type { FinnhubProfile, FinnhubQuote } from '../../types/finnhub'
import Skeleton from '../ui/Skeleton'
import { useCurrency } from '../../lib/currency'
import { STOCK_IDENTIFIERS } from '../../data/stockIdentifiers'

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
                  {STOCK_IDENTIFIERS[ticker] && (
                    <>
                      <span className="tag tag-default">WKN {STOCK_IDENTIFIERS[ticker].wkn}</span>
                      <span className="tag tag-default">ISIN {STOCK_IDENTIFIERS[ticker].isin}</span>
                    </>
                  )}
                  {profile?.exchange && <span className="tag tag-default">{profile.exchange}</span>}
                  {profile?.finnhubIndustry && <span className="tag tag-default">{profile.finnhubIndustry}</span>}
                  {profile?.weburl && (
                    <a href={profile.weburl} target="_blank" rel="noreferrer"
                      className="text-xs text-white/50 hover:text-accent transition-colors flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Website
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* OHLC strip + Live price */}
      {!quoteLoading && quote && (
        <div className="mt-5 pt-4 border-t border-border flex items-center gap-4">
          {/* Live price — far left */}
          <div className="flex flex-col items-start gap-1 flex-shrink-0 pr-4 border-r border-border w-52">
            <div className="flex items-center gap-2.5">
              <span className="text-[2.6rem] font-bold font-mono text-text-1 tabular-nums leading-none">
                {symbol}{fmt(quote?.c !== undefined ? convert(quote.c) : undefined)}
              </span>
              <span className="live-dot" title="Live price" />
              {quoteUpdating && <RefreshCw className="w-4 h-4 text-white/50 animate-spin" />}
            </div>
            <div className={`flex items-center gap-1.5 text-base font-medium ${isUp ? 'text-positive' : 'text-negative'}`}>
              {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="tabular-nums">
                {isUp ? '+' : '-'}{symbol}{fmt(Math.abs(convert(quote?.d ?? 0)))} ({isUp ? '+' : ''}{fmt(quote?.dp)}%)
              </span>
            </div>
            {profile?.marketCapitalization && (
              <span className="text-sm text-white/50 tabular-nums">
                Mkt Cap {fmtMarketCap(convert(profile.marketCapitalization), symbol)}
              </span>
            )}
          </div>

          <div className="flex justify-start gap-8 flex-1">
            {([
              { label: 'Open',  value: quote.o  },
              { label: 'High',  value: quote.h  },
              { label: 'Low',   value: quote.l  },
              { label: 'Close', value: quote.pc },
            ] as const).map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-medium text-white/50 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-mono font-semibold text-text-1 tabular-nums">{symbol}{fmt(convert(value))}</p>
              </div>
            ))}
          </div>

          {/* Trading panel */}
          {(() => {
            const mid = convert(quote.c)
            const spread = mid * 0.0005
            const sellPrice = mid - spread
            const buyPrice  = mid + spread
            return (
              <div className="flex-shrink-0 pl-4 border-l border-border flex flex-col gap-2 w-80">
                {/* Set up now header */}
                <div className="flex items-stretch gap-3 bg-[#102e28] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-center w-12 bg-[#1a4a3e] flex-shrink-0 px-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent">
                    <path d="M1.5 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22.5 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1.5 10M22.5 14l-4.14 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  </div>
                  <div className="flex flex-col gap-0.5 py-1">
                    <span className="text-lg text-accent leading-tight">Set up now</span>
                    <span className="text-sm text-white/40 leading-tight">Savings plan</span>
                  </div>
                </div>
                {/* Sell / Buy buttons */}
                <div className="flex gap-2">
                  <button className="flex flex-col items-center py-3 rounded-lg bg-[#3d1a1a] hover:bg-[#4d2020] transition-colors flex-1">
                    <span className="text-sm font-bold text-negative">Sell</span>
                    <span className="text-xs font-mono text-white/50 tabular-nums mt-0.5">{symbol}{fmt(sellPrice)}</span>
                  </button>
                  <button className="flex flex-col items-center py-3 rounded-lg bg-accent hover:opacity-90 transition-opacity flex-1">
                    <span className="text-sm font-bold text-black">Buy</span>
                    <span className="text-xs font-mono text-black/60 tabular-nums mt-0.5">{symbol}{fmt(buyPrice)}</span>
                  </button>
                </div>
              </div>
            )
          })()}

        </div>
      )}
    </div>
  )
}
