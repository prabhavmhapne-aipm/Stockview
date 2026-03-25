import { useQuery } from '@tanstack/react-query'
import { getEarnings } from '../api/earnings'
import { keys } from '../lib/queryKeys'

export function useEarnings(symbol: string) {
  return useQuery({
    queryKey: keys.earnings(symbol),
    queryFn: () => getEarnings(symbol),
    enabled: !!symbol,
    staleTime: 24 * 60 * 60_000,
    select: (data) => [...data].reverse(),
  })
}
