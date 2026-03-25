interface PageShellProps {
  children: React.ReactNode
  className?: string
}

export default function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 ${className}`}>
      {children}
    </main>
  )
}
