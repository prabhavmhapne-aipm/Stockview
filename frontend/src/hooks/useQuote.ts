import { useQuery } from '@tanstack/react-query'
import { getQuote } from '../api/quote'
import { keys } from '../lib/queryKeys'

export function useQuote(symbol: string) {
  return useQuery({
    queryKey: keys.quote(symbol),
    queryFn: () => getQuote(symbol),
    enabled: !!symbol,
    staleTime: 10_000,
    refetchInterval: 15_000,
  })
}
