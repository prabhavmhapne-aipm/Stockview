import { useQuery } from '@tanstack/react-query'
import { getCompanyNews } from '../api/news'
import { keys } from '../lib/queryKeys'
import { scoreSentiment } from '../lib/sentimentAnalyser'
import type { EnrichedNewsItem, SentimentSummary } from '../types/app'

export function useNews(symbol: string) {
  return useQuery({
    queryKey: keys.news(symbol),
    queryFn: () => getCompanyNews(symbol),
    enabled: !!symbol,
    staleTime: 5 * 60_000,
    select: (raw) => {
      const news: EnrichedNewsItem[] = raw
        .slice(0, 20)
        .map((item) => {
          const { score, label } = scoreSentiment(item.headline + ' ' + item.summary)
          return {
            id: item.id,
            headline: item.headline,
            summary: item.summary,
            source: item.source,
            url: item.url,
            image: item.image,
            datetime: item.datetime,
            sentimentScore: score,
            sentimentLabel: label,
          }
        })
        .sort((a, b) => b.datetime - a.datetime)

      const positiveCount = news.filter((n) => n.sentimentLabel === 'positive').length
      const negativeCount = news.filter((n) => n.sentimentLabel === 'negative').length
      const neutralCount = news.filter((n) => n.sentimentLabel === 'neutral').length
      const total = news.length || 1
      const overallRatio = positiveCount / total

      let overallLabel: SentimentSummary['overallLabel']
      if (overallRatio >= 0.5) overallLabel = 'Bullish'
      else if (overallRatio <= 0.3) overallLabel = 'Bearish'
      else overallLabel = 'Mixed'

      const sentiment: SentimentSummary = {
        positiveCount,
        negativeCount,
        neutralCount,
        overallRatio,
        overallLabel,
      }

      return { news, sentiment }
    },
  })
}
