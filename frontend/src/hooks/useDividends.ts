import { useQuery } from '@tanstack/react-query'
import { getDividends } from '../api/dividends'
import { keys } from '../lib/queryKeys'

export function useDividends(symbol: string) {
  return useQuery({
    queryKey: keys.dividends(symbol),
    queryFn: () => getDividends(symbol),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!symbol,
  })
}
