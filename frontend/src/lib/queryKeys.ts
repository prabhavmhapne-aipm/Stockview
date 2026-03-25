import type { Range } from '../types/app'

export const keys = {
  search:   (q: string)             => ['search', q] as const,
  quote:    (sym: string)           => ['quote', sym] as const,
  candles:  (sym: string, r: Range) => ['candles', sym, r] as const,
  profile:  (sym: string)           => ['profile', sym] as const,
  metrics:  (sym: string)           => ['metrics', sym] as const,
  news:     (sym: string)           => ['news', sym] as const,
  earnings: (sym: string)           => ['earnings', sym] as const,
  forex:     ()                      => ['forex'] as const,
  dividends: (sym: string)          => ['dividends', sym] as const,
}
