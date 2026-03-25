import apiClient from '../lib/apiClient'
import type { FinnhubMetrics } from '../types/finnhub'

export async function getMetrics(symbol: string): Promise<FinnhubMetrics> {
  const { data } = await apiClient.get<FinnhubMetrics>(`/metrics/${symbol}`)
  return data
}
