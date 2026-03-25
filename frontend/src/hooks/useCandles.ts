import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { getCandles, type YFCandle } from '../api/candles'
import { keys } from '../lib/queryKeys'
import type { Range, CandlePoint } from '../types/app'

function formatTime(unix: number, range: Range): string {
  const d = new Date(unix * 1000)
  if (range === '1D') return format(d, 'HH:mm')
  if (range === '1W') return format(d, 'MMM d HH:mm')
  return format(d, 'MMM d')
}

export function useCandles(symbol: string, range: Range) {
  return useQuery({
    queryKey: keys.candles(symbol, range),
    queryFn: () => getCandles(symbol, range),
    enabled: !!symbol,
    staleTime: 60_000,
    select: (data: YFCandle): CandlePoint[] => {
      if (data.s !== 'ok' || !data.t) return []
      return data.t.map((t, i) => ({
        time: t,
        open: data.o[i],
        high: data.h[i],
        low: data.l[i],
        close: data.c[i],
        volume: data.v[i],
        timeLabel: formatTime(t, range),
      }))
    },
  })
}
