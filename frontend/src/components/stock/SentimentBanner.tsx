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

  return (
    <div className={`card px-5 py-3 border-l-2 ${border} flex items-center gap-3 flex-wrap`}>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
        <span className={`text-sm font-semibold ${color}`}>{label}</span>
      </div>
      <span className="text-xs text-text-3">news sentiment</span>
      <div className="ml-auto flex items-center gap-4 text-xs text-text-3">
        <span className="text-positive">{positiveCount} positive</span>
        <span className="text-negative">{negativeCount} negative</span>
        <span>{neutralCount} neutral</span>
        <span className="hidden sm:inline">· {total} articles</span>
      </div>
    </div>
  )
}
