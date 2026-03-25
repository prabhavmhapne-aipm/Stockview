import apiClient from '../lib/apiClient'
import type { StockMetrics } from '../types/finnhub'

export async function getMetrics(symbol: string): Promise<StockMetrics> {
  const { data } = await apiClient.get<StockMetrics>(`/metrics/${symbol}`)
  return data
}
