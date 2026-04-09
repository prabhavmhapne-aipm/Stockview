import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useSearch } from '../../hooks/useSearch'
import SearchDropdown from './SearchDropdown'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(t)
  }, [query])

  const { data: results = [], isFetching } = useSearch(debouncedQuery)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = useCallback((symbol: string) => {
    setQuery('')
    setDebouncedQuery('')
    setOpen(false)
    setSelectedIndex(-1)
    navigate(`/${symbol}`)
  }, [navigate])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, -1)) }
    else if (e.key === 'Enter' && selectedIndex >= 0) { e.preventDefault(); handleSelect(results[selectedIndex].symbol) }
    else if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2.5 bg-surface-1 border border-border rounded-xl px-3.5 py-2.5 focus-within:border-accent/60 focus-within:bg-surface-2 transition-all duration-150">
        <Search className="w-4 h-4 text-text-3 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search or ask a question"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setSelectedIndex(-1) }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-text-1 placeholder-text-3 text-sm outline-none min-w-0"
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false) }} className="flex-shrink-0">
            <X className="w-3.5 h-3.5 text-text-3 hover:text-text-2 transition-colors" />
          </button>
        )}
      </div>

      {open && query.length > 0 && (
        <SearchDropdown
          results={results}
          loading={isFetching}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          onHover={setSelectedIndex}
        />
      )}
    </div>
  )
}
