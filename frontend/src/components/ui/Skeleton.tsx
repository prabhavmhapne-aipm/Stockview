interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`skeleton rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}
