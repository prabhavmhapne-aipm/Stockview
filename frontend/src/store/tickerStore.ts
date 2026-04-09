import { create } from 'zustand'
import type { Range } from '../types/app'

export type Currency = 'USD' | 'EUR'

interface TickerState {
  activeTicker: string
  selectedRange: Range
  currency: Currency
  setTicker: (ticker: string) => void
  setRange: (range: Range) => void
  setCurrency: (currency: Currency) => void
}

export const useTickerStore = create<TickerState>((set) => ({
  activeTicker: '',
  selectedRange: '1M',
  currency: 'EUR',
  setTicker: (ticker) => set({ activeTicker: ticker }),
  setRange: (range) => set({ selectedRange: range }),
  setCurrency: (currency) => set({ currency }),
}))
