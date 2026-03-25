import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/profile'
import { keys } from '../lib/queryKeys'

export function useProfile(symbol: string) {
  return useQuery({
    queryKey: keys.profile(symbol),
    queryFn: () => getProfile(symbol),
    enabled: !!symbol,
    staleTime: 24 * 60 * 60_000,
  })
}
