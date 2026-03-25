export type Range = '1D' | '1W' | '1M' | '3M' | '1Y'

export type SentimentLabel = 'positive' | 'negative' | 'neutral'

export interface EnrichedNewsItem {
  id: number
  headline: string
  summary: string
  source: string
  url: string
  image: string
  datetime: number
  sentimentScore: number
  sentimentLabel: SentimentLabel
}

export interface SentimentSummary {
  positiveCount: number
  negativeCount: number
  neutralCount: number
  overallRatio: number
  overallLabel: 'Bullish' | 'Mixed' | 'Bearish'
}

export interface CandlePoint {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  timeLabel: string
}
