import { useEffect } from 'react'
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

        {/* Sentiment banner */}
        <SentimentBanner
          sentiment={newsData?.sentiment}
          loading={newsLoading}
        />

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
          <NewsFeed ticker={symbol} />
        </div>

      </div>
    </PageShell>
  )
}
