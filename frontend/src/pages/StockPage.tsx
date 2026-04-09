import { useEffect } from 'react'
import { Info } from 'lucide-react'
import { useParams, Navigate } from 'react-router-dom'
import { useTickerStore } from '../store/tickerStore'
import { useQuote } from '../hooks/useQuote'
import { useProfile } from '../hooks/useProfile'
import { useNews } from '../hooks/useNews'
import PageShell from '../components/layout/PageShell'
import StockHeader from '../components/stock/StockHeader'
import PriceChart from '../components/stock/PriceChart'
import MetricsGrid from '../components/stock/MetricsGrid'
import SentimentBanner from '../components/stock/SentimentBanner'
import NewsFeed from '../components/stock/NewsFeed'
import EarningsChart from '../components/stock/EarningsChart'
import DividendChart from '../components/stock/DividendChart'

export default function StockPage() {
  const { ticker = '' } = useParams<{ ticker: string }>()
  const symbol = ticker.toUpperCase()

  const { setTicker } = useTickerStore()

  useEffect(() => {
    if (symbol) setTicker(symbol)
  }, [symbol, setTicker])

  const { data: quote, isLoading: quoteLoading, isFetching: quoteUpdating } = useQuote(symbol)
  const { data: profile, isLoading: profileLoading } = useProfile(symbol)
  const { data: newsData, isLoading: newsLoading } = useNews(symbol)

  if (!symbol) return <Navigate to="/" replace />

  // Deterministic fake Scalable user sentiment per ticker
  const seed = symbol.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const buying  = 40 + (seed % 35)
  const selling = 10 + ((seed * 3) % 25)
  const holding = 100 - buying - selling

  return (
    <PageShell>
      <div className="flex flex-col gap-5">
        {/* Header: company info + live price */}
        <StockHeader
          ticker={symbol}
          profile={profile}
          quote={quote}
          profileLoading={profileLoading}
          quoteLoading={quoteLoading}
          quoteUpdating={quoteUpdating && !quoteLoading}
        />

        {/* Sentiment + Scalable users — single row */}
        <div className="flex items-stretch gap-3">
          <div className="flex-1 min-w-0">
            <SentimentBanner sentiment={newsData?.sentiment} loading={newsLoading} />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2.5 px-5 py-3 rounded-xl border border-border bg-surface-1 text-sm">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 relative group/tip">
                <span className="text-text-2 uppercase tracking-wider font-medium">Scalable Users</span>
                <Info className="w-3 h-3 text-white/40 hover:text-accent cursor-help flex-shrink-0" />
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-surface-0 border border-border rounded-xl p-3 hidden group-hover/tip:block z-50 shadow-2xl pointer-events-none">
                  <p className="text-[11px] text-white/80 leading-relaxed">Based on the trading activity of Scalable Capital's clients who have purchased this financial instrument. It does not factor in any personal circumstances and is not an investment advice.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px]">
                <span className="text-positive font-semibold">{buying}% <span className="text-text-2 font-normal">Buying</span></span>
                <span className="text-negative font-semibold">{selling}% <span className="text-text-2 font-normal">Selling</span></span>
                <span className="text-text-1 font-semibold">{holding}% <span className="text-text-2 font-normal">Holding</span></span>
              </div>
            </div>
            <div className="flex h-1.5 rounded-full overflow-hidden w-full">
              <div className="bg-positive" style={{ width: `${buying}%` }} />
              <div className="bg-negative" style={{ width: `${selling}%` }} />
              <div className="bg-text-3" style={{ width: `${holding}%` }} />
            </div>
          </div>
        </div>

        {/* Chart */}
        <PriceChart />

        {/* Metrics */}
        <MetricsGrid ticker={symbol} />

        {/* Earnings + Dividends | News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <EarningsChart ticker={symbol} />
            <DividendChart ticker={symbol} />
          </div>
          <div id="news-feed"><NewsFeed ticker={symbol} /></div>
        </div>

      </div>
    </PageShell>
  )
}
