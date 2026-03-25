import apiClient from '../lib/apiClient'
import type { Range } from '../types/app'

export interface YFCandle {
  s: 'ok' | 'no_data'
  t: number[]
  o: number[]
  h: number[]
  l: number[]
  c: number[]
  v: number[]
}

export async function getCandles(symbol: string, range: Range): Promise<YFCandle> {
  const { data } = await apiClient.get<YFCandle>(`/candles/${symbol}`, {
    params: { range },
  })
  return data
}
