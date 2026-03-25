import apiClient from '../lib/apiClient'
import type { FinnhubQuote } from '../types/finnhub'

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
  const { data } = await apiClient.get<FinnhubQuote>(`/quote/${symbol}`)
  return data
}
