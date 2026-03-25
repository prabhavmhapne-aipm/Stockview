import { AlertTriangle } from 'lucide-react'

interface ErrorCardProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorCard({ message = 'Something went wrong', onRetry }: ErrorCardProps) {
  return (
    <div className="card p-6 flex flex-col items-center gap-3 text-center">
      <AlertTriangle className="w-8 h-8 text-negative" />
      <p className="text-text-2 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-accent hover:text-accent-light transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}
