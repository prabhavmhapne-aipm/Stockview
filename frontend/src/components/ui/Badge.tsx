import type { SentimentLabel } from '../../types/app'

interface BadgeProps {
  variant: SentimentLabel | 'default'
  children: React.ReactNode
  size?: 'sm' | 'md'
}

const variantClass = {
  positive: 'tag tag-positive',
  negative: 'tag tag-negative',
  neutral:  'tag tag-default',
  default:  'tag tag-default',
}

export default function Badge({ variant, children }: BadgeProps) {
  return <span className={variantClass[variant]}>{children}</span>
}
