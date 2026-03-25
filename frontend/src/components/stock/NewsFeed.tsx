import { useNews } from '../../hooks/useNews'
import NewsItem from './NewsItem'
import Skeleton from '../ui/Skeleton'
import ErrorCard from '../ui/ErrorCard'

interface NewsFeedProps {
  ticker: string
}

export default function NewsFeed({ ticker }: NewsFeedProps) {
  const { data, isLoading, isError, refetch } = useNews(ticker)

  return (
    <div className="card flex flex-col h-full">
      <div className="px-5 py-4 border-b border-border flex items-center">
        <h2 className="text-sm font-semibold text-text-1">News</h2>
        {data?.news.length !== undefined && (
          <span className="ml-auto text-xs text-text-3">{data.news.length} articles</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '600px' }}>
        {isLoading ? (
          <div className="flex flex-col gap-2 p-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-3">
                <Skeleton className="w-16 h-16 flex-shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-4">
            <ErrorCard message="Failed to load news" onRetry={refetch} />
          </div>
        ) : !data?.news.length ? (
          <div className="flex flex-col items-center justify-center py-12 text-text-3">
            <Newspaper className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No recent news found</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border">
            {data.news.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
