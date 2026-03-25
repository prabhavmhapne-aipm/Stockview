# Stockview — Architecture Document

## Overview

Stockview is a React SPA backed by an Express API server. The browser never talks to external APIs directly — all data fetching happens on the backend. The API key is server-side only and never reaches the browser.

```
Browser (React SPA)
    └── Express Backend (Node.js)
            ├── Finnhub API   → live price, metrics, news, earnings, profile, search
            └── Yahoo Finance → price chart (OHLCV history)
```

---

## Directory Structure

```
stockview/
├── .env                    ← API keys (never committed)
├── .env.example            ← template for new developers
├── .gitignore
│
├── backend/                ← Express API server
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts        ← entry point, loads dotenv, registers routes
│       ├── lib/
│       │   ├── finnhubClient.ts   ← Axios instance for Finnhub
│       │   └── yahooFinance.ts    ← Axios instance for Yahoo Finance
│       └── routes/
│           ├── quote.ts    ← GET /api/quote/:symbol
│           ├── profile.ts  ← GET /api/profile/:symbol
│           ├── candles.ts  ← GET /api/candles/:symbol?range=
│           ├── metrics.ts  ← GET /api/metrics/:symbol
│           ├── news.ts     ← GET /api/news/:symbol
│           ├── earnings.ts ← GET /api/earnings/:symbol
│           └── search.ts   ← GET /api/search?q=
│
├── frontend/               ← React SPA
│   ├── vite.config.ts      ← build config + dev proxy (/api → backend)
│   ├── tailwind.config.js  ← design tokens (colours, fonts, animations)
│   ├── package.json
│   └── src/
│       ├── main.tsx        ← app entry point, wraps everything in providers
│       ├── App.tsx         ← route definitions
│       ├── index.css       ← global styles, utility classes
│       │
│       ├── api/            ← HTTP calls to the backend (one file per resource)
│       ├── hooks/          ← data hooks (wraps TanStack Query, one per resource)
│       ├── components/     ← UI components
│       ├── pages/          ← full page views
│       ├── store/          ← global state (Zustand)
│       ├── lib/            ← shared utilities (apiClient, queryKeys, sentimentAnalyser)
│       └── types/          ← TypeScript types
│
├── data/                   ← planned (scripts, seeds, exports)
└── docs/
    ├── product.md
    └── architecture.md     ← this file
```

---

## Tech Stack

### Backend

| Layer | Tool | Why |
|---|---|---|
| Runtime | Node.js + TypeScript | Type safety, same language as frontend |
| Server | Express | Minimal, fast, well-understood |
| Dev runner | tsx watch | Hot reload without a build step |
| HTTP client | Axios | Interceptors for API key injection |
| Config | dotenv | Loads `.env` from project root at startup |

### Frontend

| Layer | Tool | Why |
|---|---|---|
| Framework | React 18 + TypeScript | Component model, type safety |
| Build tool | Vite 5 | Fast dev server, proxy support |
| Styling | Tailwind CSS | Design tokens, utility classes |
| Charts | Recharts | SVG-based, composable chart primitives |
| Data fetching | TanStack Query v5 | Caching, polling, loading/error states |
| Routing | React Router v6 | URL-based navigation (`/AAPL`, `/TSLA`) |
| Global state | Zustand | Active ticker + selected chart range |
| HTTP client | Axios | Base URL config, interceptors |
| Date utils | date-fns | Timestamp formatting for chart axes |
| Icons | Lucide React | Consistent stroke-weight icon set |

---

## Data Sources

### Finnhub (requires API key)

All financial data except price history. Free tier. 60 calls/minute. Key stored server-side in `/.env` as `FINNHUB_API_KEY` — never sent to the browser.

| Data | Finnhub endpoint | Backend route | Free? |
|---|---|---|---|
| Live quote | `GET /quote` | `/api/quote/:symbol` | ✅ |
| Company profile | `GET /stock/profile2` | `/api/profile/:symbol` | ✅ |
| Financial metrics | `GET /stock/metric?metric=all` | `/api/metrics/:symbol` | ✅ |
| Company news | `GET /company-news` | `/api/news/:symbol` | ✅ |
| Earnings history | `GET /stock/earnings` | `/api/earnings/:symbol` | ✅ |
| Symbol search | `GET /search` | `/api/search?q=` | ✅ |
| Price candles | `GET /stock/candle` | (not used — blocked on free tier) | ❌ |

### Yahoo Finance (no key needed)

Used only for the price chart. Free, no API key. The backend calls Yahoo Finance directly — no CORS issue server-side. A browser User-Agent header is required or Yahoo returns 429.

| Data | Yahoo endpoint | Backend route |
|---|---|---|
| OHLCV candles | `GET /v8/finance/chart/{symbol}` | `/api/candles/:symbol?range=` |

**Range mapping:**

| Range | Yahoo `range` | Yahoo `interval` |
|---|---|---|
| 1D | `1d` | `5m` |
| 1W | `5d` | `60m` |
| 1M | `1mo` | `1d` |
| 3M | `3mo` | `1d` |
| 1Y | `1y` | `1wk` |

The backend normalises Yahoo Finance's response into the same `{ s, t, o, h, l, c, v }` shape used throughout the frontend, filtering out null values (market-closed gaps).

---

## How a Page Load Works

When a user navigates to `/AAPL`:

```
1. React Router matches /:ticker → renders StockPage
2. StockPage reads 'AAPL' from URL params
3. useEffect sets activeTicker = 'AAPL' in Zustand store
4. Six data hooks fire in parallel (no waterfall):

   useQuote('AAPL')     → GET /api/quote/AAPL     → StockHeader (price)
   useProfile('AAPL')   → GET /api/profile/AAPL   → StockHeader (name, logo)
   useCandles('AAPL')   → GET /api/candles/AAPL   → PriceChart
   useMetrics('AAPL')   → GET /api/metrics/AAPL   → MetricsGrid
   useNews('AAPL')      → GET /api/news/AAPL      → NewsFeed + SentimentBanner
   useEarnings('AAPL')  → GET /api/earnings/AAPL  → EarningsChart

5. Each section renders independently:
   - While loading → shows Skeleton placeholder
   - On error      → shows ErrorCard with retry button
   - On success    → renders real data

6. useQuote polls automatically every 15 seconds for live price updates
```

In development, Vite proxies all `/api/*` requests from `localhost:5173` to the Express backend at `localhost:3001`. In production the frontend would be served from the same origin as the backend, or the proxy would be handled by a reverse proxy (e.g. Nginx).

---

## Caching Strategy

TanStack Query caches every response. Each resource has a different cache lifetime based on how often it changes:

| Data | Cache (staleTime) | Polling |
|---|---|---|
| Live quote | 10 seconds | Re-fetches every 15s |
| Price candles | 60 seconds | No |
| Financial metrics | 5 minutes | No |
| Company news | 5 minutes | No |
| Company profile | 24 hours | No |
| Earnings history | 24 hours | No |
| Search results | 60 seconds | No |

This keeps the app well within Finnhub's 60 calls/minute free tier limit, even when navigating between multiple stocks.

---

## State Management

Two pieces of global state live in Zustand (`src/store/tickerStore.ts`):

| State | Type | Set by | Read by |
|---|---|---|---|
| `activeTicker` | `string` | `StockPage` on mount | All data hooks |
| `selectedRange` | `'1D' \| '1W' \| '1M' \| '3M' \| '1Y'` | Range buttons in `PriceChart` | `useCandles` |

Everything else is local component state or comes directly from TanStack Query.

---

## Sentiment Analysis

News sentiment is calculated entirely client-side in `src/lib/sentimentAnalyser.ts`. No AI, no extra API call.

```
For each news article:
  1. Combine headline + summary into one string
  2. Lowercase and tokenise into words
  3. Count hits against two keyword lists:
     - ~45 positive words: beat, surged, upgrade, profit, record, approved...
     - ~45 negative words: miss, fell, downgrade, loss, recall, lawsuit...
  4. score = (positive_hits - negative_hits) / total_hits
  5. score > 0.1  → "positive"
     score < -0.1 → "negative"
     else         → "neutral"

Aggregate across all articles:
  positiveRatio ≥ 0.5 → banner shows "Bullish"
  positiveRatio ≤ 0.3 → banner shows "Bearish"
  else                → banner shows "Mixed"
```

**Limitation:** This is keyword matching, not understanding. It works well for formulaic financial headlines ("beat earnings", "raised guidance") but misses nuance and sarcasm.

**Next phase:** Replace with Claude API call from the backend for true AI sentiment.

---

## Plain-English Metric Interpretations

Each metric card shows a one-line plain-English interpretation. These are generated by simple rule-based functions in `src/components/stock/MetricsGrid.tsx`. No AI.

Examples:

```
P/E < 12        → "Trading cheap — potentially undervalued"
P/E 12–22       → "Fairly valued for its sector"
P/E 22–35       → "Priced at a premium — market expects growth"
P/E > 35        → "Expensive — high growth already priced in"

Beta < 0.7      → "Less volatile than the market — lower risk"
Beta 0.7–1.2    → "Moves roughly in line with the market"
Beta > 1.2      → "More volatile than the market — higher risk/reward"

ROE > 20%       → "Excellent — management generates strong returns"
ROE 10–20%      → "Solid returns on shareholder capital"
ROE < 10%       → "Below-average capital efficiency"
```

**Next phase:** Replace with AI-generated interpretations that factor in the company's sector, peer comparison, and recent trend.

---

## API Layer Structure

### Backend routes (`backend/src/routes/`)

Each route is an Express Router that calls the appropriate upstream API and returns normalised JSON.

```
routes/
├── quote.ts      GET /api/quote/:symbol      → calls Finnhub /quote
├── profile.ts    GET /api/profile/:symbol    → calls Finnhub /stock/profile2
├── candles.ts    GET /api/candles/:symbol    → calls Yahoo Finance /v8/finance/chart
├── metrics.ts    GET /api/metrics/:symbol    → calls Finnhub /stock/metric
├── news.ts       GET /api/news/:symbol       → calls Finnhub /company-news
├── earnings.ts   GET /api/earnings/:symbol   → calls Finnhub /stock/earnings
└── search.ts     GET /api/search?q=          → calls Finnhub /search
```

### Frontend API modules (`frontend/src/api/`)

Each module is a single async function — just the HTTP call and return type. No business logic.

```
api/
├── quote.ts        getQuote(symbol)           → FinnhubQuote
├── profile.ts      getProfile(symbol)         → FinnhubProfile
├── candles.ts      getCandles(symbol, range)  → YFCandle
├── metrics.ts      getMetrics(symbol)         → FinnhubMetrics
├── news.ts         getCompanyNews(symbol)     → FinnhubNews[]
├── earnings.ts     getEarnings(symbol)        → FinnhubEarnings[]
└── search.ts       searchSymbols(query)       → FinnhubSearchResult
```

All frontend API modules use `src/lib/apiClient.ts` — an Axios instance with `baseURL: '/api'` which proxies to the backend in dev.

---

## Component Tree

```
App
├── Navbar
│   └── SearchBar → SearchDropdown
│
├── HomePage  (route: /)
│   ├── Stock group cards (FAANG, Oil Majors, German Top 5)
│   └── Feature highlights
│
└── StockPage  (route: /:ticker)
    ├── StockHeader        ← useQuote + useProfile
    ├── SentimentBanner    ← useNews (aggregated)
    ├── PriceChart         ← useCandles
    ├── MetricsGrid        ← useMetrics
    │   └── MetricCard (×10)
    ├── EarningsChart      ← useEarnings
    └── NewsFeed           ← useNews
        └── NewsItem (×20)
```

---

## Environment Variables

| Variable | File | Used in |
|---|---|---|
| `FINNHUB_API_KEY` | `/.env` | `backend/src/lib/finnhubClient.ts` |

The key is read at request time (inside an Axios interceptor), not at module instantiation, so dotenv has time to load before it is needed.

The frontend has no environment variables. It talks only to `/api/*` on its own origin.

---

## Running Locally

Two processes must run simultaneously:

```bash
# Terminal 1 — backend (from backend/)
npm install
npm run dev       # starts at http://localhost:3001

# Terminal 2 — frontend (from frontend/)
npm install
npm run dev       # starts at http://localhost:5173
```

The `.env` file must be at the project root (`stockview/.env`). Vite reads it via `envDir: '..'`; the backend reads it via `dotenv.config({ path: '../../.env' })`.

Health check: `http://localhost:3001/health` → `{"status":"ok"}`

---

## What Is Not Built Yet

| Feature | Where it would live | Notes |
|---|---|---|
| AI Signal Card | `backend/src/routes/ai.ts` → Claude API | Phase 2 |
| "Should I be worried?" panel | `frontend/src/components/stock/` | Needs AI backend route |
| AI news sentiment | `backend/` → Claude API | Replaces keyword matcher |
| AI metric interpretations | `backend/` → Claude API | Replaces rule-based strings |
| Watchlist | `frontend/` + `backend/` | Needs auth + persistence |
| Portfolio tracker | `frontend/` + `backend/` | Needs auth + persistence |
| Production deployment | — | Yahoo Finance works server-side; no CORS issue in prod |
