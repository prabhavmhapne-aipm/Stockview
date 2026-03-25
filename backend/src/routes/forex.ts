import { Router } from 'express'
import axios from 'axios'

const router = Router()

// open.er-api.com — free, no key, updates every 24h
router.get('/', async (_req, res) => {
  try {
    const { data } = await axios.get('https://open.er-api.com/v6/latest/USD', { timeout: 8_000 })
    const rate: number = data.rates?.EUR
    if (!rate) throw new Error('EUR rate missing')
    res.json({ usdToEur: rate })
  } catch (err) {
    console.error('[forex] Failed to fetch rate:', err)
    res.status(500).json({ error: 'Failed to fetch forex rate' })
  }
})

export default router
