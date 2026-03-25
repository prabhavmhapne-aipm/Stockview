import { useQuery } from '@tanstack/react-query'
import { searchSymbols } from '../api/search'
import { keys } from '../lib/queryKeys'

export function useSearch(query: string) {
  return useQuery({
    queryKey: keys.search(query),
    queryFn: () => searchSymbols(query),
    enabled: query.trim().length >= 1,
    staleTime: 60_000,
    select: (data) =>
      data.result
        .filter((r) => r.type === 'Common Stock' || r.type === 'ETP')
        .slice(0, 8),
  })
}
