import apiClient from '../lib/apiClient'
import type { FinnhubDividend } from '../types/finnhub'

export async function getDividends(symbol: string): Promise<FinnhubDividend[]> {
  const { data } = await apiClient.get<FinnhubDividend[]>(`/dividends/${symbol}`)
  return data
}
