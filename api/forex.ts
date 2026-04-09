import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { data } = await axios.get('https://open.er-api.com/v6/latest/USD', { timeout: 8_000 })
    const rate: number = data.rates?.EUR
    if (!rate) throw new Error('EUR rate missing')
    res.json({ usdToEur: rate })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch forex rate' })
  }
}
