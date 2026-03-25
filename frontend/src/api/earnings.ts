import apiClient from '../lib/apiClient'
import type { FinnhubEarnings } from '../types/finnhub'

export async function getEarnings(symbol: string): Promise<FinnhubEarnings[]> {
  const { data } = await apiClient.get<FinnhubEarnings[]>(`/earnings/${symbol}`)
  return data
}
