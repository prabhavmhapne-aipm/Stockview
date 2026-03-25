import { useQuery } from '@tanstack/react-query'
import { getMetrics } from '../api/metrics'
import { keys } from '../lib/queryKeys'

export function useMetrics(symbol: string) {
  return useQuery({
    queryKey: keys.metrics(symbol),
    queryFn: () => getMetrics(symbol),
    enabled: !!symbol,
    staleTime: 5 * 60_000,
  })
}
