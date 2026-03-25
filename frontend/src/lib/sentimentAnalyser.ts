import type { SentimentLabel } from '../types/app'

const POSITIVE_WORDS = new Set([
  'beat', 'beats', 'exceeds', 'exceeded', 'surged', 'surge', 'rally', 'rallied',
  'upgrade', 'upgraded', 'raised', 'outperform', 'growth', 'profit', 'profits',
  'revenue', 'record', 'strong', 'bullish', 'buy', 'boost', 'gain', 'gains',
  'dividend', 'recovery', 'innovation', 'partnership', 'expansion', 'positive',
  'higher', 'rise', 'rose', 'above', 'better', 'breakthrough', 'launch',
  'approval', 'approved', 'wins', 'won', 'soared', 'soar', 'jumped', 'jump',
  'rallies', 'climbed', 'climb', 'hit', 'high', 'outperformed', 'exceeded',
  'rebound', 'rebounds', 'recover', 'recovered', 'upside', 'momentum',
  'strong', 'strength', 'optimistic', 'optimism', 'confident', 'confidence',
])

const NEGATIVE_WORDS = new Set([
  'miss', 'misses', 'missed', 'fell', 'fall', 'drop', 'dropped', 'decline',
  'declined', 'downgrade', 'downgraded', 'lowered', 'underperform', 'loss',
  'losses', 'weak', 'bearish', 'sell', 'cut', 'cuts', 'layoffs', 'lawsuit',
  'investigation', 'recall', 'debt', 'deficit', 'warning', 'lower', 'below',
  'worse', 'failed', 'fail', 'risk', 'concern', 'concerns', 'slump', 'slumped',
  'crash', 'plunged', 'volatile', 'volatility', 'uncertainty', 'uncertain',
  'disappointing', 'disappointed', 'disappoint', 'shortfall', 'restructuring',
  'writedown', 'impairment', 'bankruptcy', 'default', 'suspended', 'suspended',
  'penalty', 'fine', 'fined', 'probe', 'subpoena', 'allegations', 'fraud',
  'downside', 'headwinds', 'pressure', 'slowdown', 'slowdowns', 'contraction',
])

export interface SentimentResult {
  score: number
  label: SentimentLabel
}

export function scoreSentiment(text: string): SentimentResult {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  let positiveHits = 0
  let negativeHits = 0

  for (const word of words) {
    if (POSITIVE_WORDS.has(word)) positiveHits++
    if (NEGATIVE_WORDS.has(word)) negativeHits++
  }

  const total = positiveHits + negativeHits
  if (total === 0) return { score: 0, label: 'neutral' }

  const score = (positiveHits - negativeHits) / total

  let label: SentimentLabel
  if (score > 0.1) label = 'positive'
  else if (score < -0.1) label = 'negative'
  else label = 'neutral'

  return { score, label }
}
