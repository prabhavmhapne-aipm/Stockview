import apiClient from '../lib/apiClient'
import type { FinnhubSearchResult } from '../types/finnhub'

export async function searchSymbols(query: string): Promise<FinnhubSearchResult> {
  const { data } = await apiClient.get<FinnhubSearchResult>('/search', {
    params: { q: query },
  })
  return data
}
