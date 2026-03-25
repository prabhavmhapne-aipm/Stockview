import { useTickerStore } from '../store/tickerStore'
import { useForexRate } from '../hooks/useForexRate'

export function useCurrency() {
  const { currency } = useTickerStore()
  const { data: rate = 1 } = useForexRate()

  const multiplier = currency === 'EUR' ? rate : 1
  const symbol = currency === 'EUR' ? '€' : '$'

  return {
    currency,
    symbol,
    /** Multiply a USD amount by the exchange rate (no-op when currency is USD) */
    convert: (n: number) => n * multiplier,
  }
}
