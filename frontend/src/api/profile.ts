import apiClient from '../lib/apiClient'
import type { FinnhubProfile } from '../types/finnhub'

export async function getProfile(symbol: string): Promise<FinnhubProfile> {
  const { data } = await apiClient.get<FinnhubProfile>(`/profile/${symbol}`)
  return data
}
