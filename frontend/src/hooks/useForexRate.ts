import { useQuery } from '@tanstack/react-query'
import { getForexRate } from '../api/forex'
import { keys } from '../lib/queryKeys'

export function useForexRate() {
  return useQuery({
    queryKey: keys.forex(),
    queryFn: getForexRate,
    staleTime: 60 * 60 * 1000, // 1 hour — rate doesn't move that fast
    select: (d) => d.usdToEur,
  })
}
