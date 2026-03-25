import path from 'path'
import * as dotenv from 'dotenv'

// Load .env from project root before anything else
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import express from 'express'
import cors from 'cors'
import quoteRouter    from './routes/quote'
import profileRouter  from './routes/profile'
import candlesRouter  from './routes/candles'
import metricsRouter  from './routes/metrics'
import newsRouter     from './routes/news'
import earningsRouter from './routes/earnings'
import searchRouter   from './routes/search'
import forexRouter     from './routes/forex'
import dividendsRouter from './routes/dividends'

const app  = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/quote',    quoteRouter)
app.use('/api/profile',  profileRouter)
app.use('/api/candles',  candlesRouter)
app.use('/api/metrics',  metricsRouter)
app.use('/api/news',     newsRouter)
app.use('/api/earnings', earningsRouter)
app.use('/api/search',   searchRouter)
app.use('/api/forex',     forexRouter)
app.use('/api/dividends', dividendsRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`[Stockview backend] running on http://localhost:${PORT}`)
  console.log(`[Stockview backend] Finnhub key: ${process.env.FINNHUB_API_KEY ? 'loaded' : 'MISSING'}`)
})
