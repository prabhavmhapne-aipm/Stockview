import { formatDistanceToNow } from 'date-fns'
import { ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import type { EnrichedNewsItem } from '../../types/app'

interface NewsItemProps {
  item: EnrichedNewsItem
}

export default function NewsItem({ item }: NewsItemProps) {
  const timeAgo = formatDistanceToNow(new Date(item.datetime * 1000), { addSuffix: true })

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="flex gap-3 p-3 rounded-xl hover:bg-surface-2 transition-colors group"
    >
      {item.image && (
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-2">
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-1 font-medium leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {item.headline}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-xs text-text-3">{item.source}</span>
          <span className="text-xs text-text-3">·</span>
          <span className="text-xs text-text-3">{timeAgo}</span>
          <Badge variant={item.sentimentLabel}>
            {item.sentimentLabel.charAt(0).toUpperCase() + item.sentimentLabel.slice(1)}
          </Badge>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-text-3 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}
