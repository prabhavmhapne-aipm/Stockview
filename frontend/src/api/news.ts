import apiClient from '../lib/apiClient'
import type { FinnhubNews } from '../types/finnhub'

export async function getCompanyNews(symbol: string): Promise<FinnhubNews[]> {
  const { data } = await apiClient.get<FinnhubNews[]>(`/news/${symbol}`)
  return data
}
