import apiClient from '../lib/apiClient'

export async function getForexRate(): Promise<{ usdToEur: number }> {
  const { data } = await apiClient.get<{ usdToEur: number }>('/forex')
  return data
}
