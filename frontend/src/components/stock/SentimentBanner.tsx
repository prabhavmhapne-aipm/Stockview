import type { SentimentSummary } from '../../types/app'
import Skeleton from '../ui/Skeleton'

interface SentimentBannerProps {
  sentiment?: SentimentSummary
  loading: boolean
}

const config = {
  Bullish: { label: 'Bullish',        color: 'text-positive', dot: 'bg-positive', border: 'border-l-positive/60' },
  Mixed:   { label: 'Mixed signals',  color: 'text-text-2',   dot: 'bg-text-3',   border: 'border-l-border'      },
  Bearish: { label: 'Bearish',        color: 'text-negative', dot: 'bg-negative', border: 'border-l-negative/60' },
}

export default function SentimentBanner({ sentiment, loading }: SentimentBannerProps) {
  if (loading) return <Skeleton className="h-12 w-full" />
  if (!sentiment) return null

  const { positiveCount, negativeCount, neutralCount, overallLabel } = sentiment
  const total = positiveCount + negativeCount + neutralCount
  const { label, color, dot, border } = config[overallLabel]

  const posW = Math.round((positiveCount / total) * 100)
  const negW = Math.round((negativeCount / total) * 100)
  const neuW = 100 - posW - negW

  return (
    <div className="card px-5 py-3 flex flex-col justify-center gap-2.5 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-text-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap">AI-powered News Sentiment</span>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
          <span className={`text-xs font-semibold ${color}`}>{label}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-text-2 whitespace-nowrap">
          <span className="text-positive">{positiveCount} positive</span>
          <span className="text-negative">{negativeCount} negative</span>
          <span>{neutralCount} neutral</span>
          <a href="#news-feed" className="hidden sm:inline hover:text-accent transition-colors underline underline-offset-2">{total} articles</a>
        </div>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden w-full">
        <div className="bg-positive" style={{ width: `${posW}%` }} />
        <div className="bg-negative" style={{ width: `${negW}%` }} />
        <div className="bg-text-3" style={{ width: `${neuW}%` }} />
      </div>
    </div>
  )
}
