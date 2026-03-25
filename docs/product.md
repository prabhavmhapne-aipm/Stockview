# Stockview — Product Document

## The Problem

Existing stock platforms (Yahoo Finance, Moneycontrol, Zerodha) are built for people who already know what they're looking at. A non-expert opens them and sees a wall of numbers, jargon, and noise. They close the tab no more informed than when they opened it.

At the same time, dashboards like worldmonitor.app show that you *can* display dense real-time information in a way that feels alive, curated, and immediately scannable — if the design is right.

There is no tool that combines the intelligence density of a professional dashboard with the plain-English clarity that a non-expert actually needs.

---

## The User

**Primary:** Non-expert retail investors — people who own a few stocks (or are considering buying one), want to stay informed, but don't have a finance background. They don't know what beta means. They don't know if a P/E of 28 is good or bad. They just want to know: *is this stock worth holding?*

**Secondary:** Casual followers — people tracking a watchlist without actively trading.

---

## The Core Idea

> One page per stock. Everything you need to know. Nothing you don't. Written for humans.

Three principles drive every design decision:

1. **Signal over data** — Show what matters, not everything that exists.
2. **Plain English first** — Every number gets a plain-English interpretation. "P/E: 28.4x" becomes "Priced at a premium — typical for high-growth tech."
3. **Real-time feel** — The page feels alive. Prices pulse. News velocity is visible. Things that changed recently are flagged.

---

## UI/UX Direction

### References
- **worldmonitor.app** — Panel-based real-time intelligence dashboard. Severity-coded signals. Visual pulse on live data. News clustering with velocity (+X/hr). Multi-source confirmation badges. The page feels alive.
- **Scalable Capital** — Clean card-based layout. Strong typography. Minimal clutter. Accessible to non-experts. Nothing intimidating. Mobile-first.

### Design Language
- Dark background, white/light text, strong typographic hierarchy
- Colour used semantically: green = good/positive, amber = watch, red = concern
- Cards with clear labels, one key number, and one plain-English interpretation line
- Live data shows a subtle pulse animation to signal real-time
- No jargon without explanation — every metric has a tooltip or inline context
- Collapsed "deep dive" sections for users who want more detail

---

## Page Structure (per stock)

```
┌─────────────────────────────────────────────────────────┐
│  SIGNAL CARD                                            │
│  AI-generated 3-bullet summary of what matters today   │
│  "Beat earnings by 12%. Analysts upgraded 3x. But      │
│   debt has doubled — worth watching."                   │
└─────────────────────────────────────────────────────────┘

┌───────────────────────┐  ┌──────────────────────────────┐
│  LIVE PRICE           │  │  SHOULD I BE WORRIED?        │
│  ₹2,847  ▲ +1.4%     │  │  🟢 Earnings: Beating        │
│  "Up today with the   │  │  🟡 Valuation: Stretched     │
│   broader market"     │  │  🔴 Debt: Rising fast        │
└───────────────────────┘  └──────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  KEY SIGNALS (4–5 cards)                                │
│  Each: metric name / value / plain-English meaning      │
│  e.g. "Earnings per share: ₹84 — Profitable & growing" │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  PRICE CHART  (1D / 1W / 1M / 3M / 1Y)                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  NEWS DIGEST                                            │
│  Clustered stories · velocity badge (+4/hr)             │
│  Sentiment per cluster · multi-source confirmation      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  DEEP DIVE  [collapsed by default]                      │
│  Full metrics table · Earnings history · Filings        │
└─────────────────────────────────────────────────────────┘
```

---

## Key Features

### 1. AI Signal Card *(differentiator)*
The first thing a user sees. A short, jargon-free AI-generated summary of what matters about this stock right now — written like a knowledgeable friend explaining it over coffee. 3 bullets max. Updated daily.

Example output:
> - Infosys beat earnings estimates by 8% last quarter — better than expected.
> - Three analysts upgraded the stock in the past month, suggesting confidence.
> - Revenue growth has slowed for two quarters in a row — worth keeping an eye on.

### 2. "Should I Be Worried?" Panel *(differentiator)*
A traffic-light status panel with 4–6 key flags. Each flag is one plain-English sentence. Green = fine, amber = watch, red = concern. Non-experts get instant signal without needing to interpret anything.

Flags checked:
- Earnings trend (beating or missing estimates)
- Valuation vs. sector peers (cheap / fair / expensive)
- Debt trend (stable / rising / high)
- Analyst sentiment (upgrades/downgrades in last 90 days)
- News sentiment this week
- Price vs. 52-week range (near high / mid / near low)

### 3. Plain-English Metrics
Every metric card shows:
- The metric name (simple label)
- The value
- One plain-English interpretation line (colour-coded)

No raw jargon. "Beta: 1.4" becomes "Moves more than the market — higher risk, higher potential."

### 4. Live Price with Context
Real-time price with a pulse animation. Below the price, a single sentence explains *why* it moved today (AI-generated, based on news + market context).

### 5. News Digest (worldmonitor-style)
- Stories clustered by topic
- Velocity badge: "+4 articles this hour" signals a developing story
- Multi-source confirmation: "Reported by 6 sources"
- Per-cluster sentiment (bullish / neutral / bearish)
- Articles the user should read vs. background noise — clearly separated

### 6. Price Chart
Clean area chart with range selector. No excessive indicators. Just the price story.

### 7. Deep Dive (collapsed)
Full financial metrics, earnings history table/chart, and raw data — for users who want to go deeper. Hidden by default so it doesn't overwhelm.

---

## Stock Universe (v1)

Rather than covering every stock, Stockview launches with three focused groups — enough breadth to be useful, tight enough to be curated well.

### FAANG (US Tech)
Meta (META), Apple (AAPL), Amazon (AMZN), Netflix (NFLX), Alphabet (GOOGL)

### Oil Majors (Global Energy)
ExxonMobil (XOM), Chevron (CVX), Shell (SHEL), BP (BP), TotalEnergies (TTE)

### German Top 5 (DAX)
SAP (SAP), Siemens (SIE.DE), Allianz (ALV.DE), Deutsche Telekom (DTE.DE), BMW (BMW.DE)

These three groups cover US tech, global energy, and European blue chips — giving non-expert investors a clean starting point across different sectors and geographies.

---

## What Makes This Different

| Feature | Yahoo Finance | Moneycontrol | **Stockview** |
|---|---|---|---|
| Plain English explanations | ✗ | ✗ | ✅ |
| AI-generated summary | ✗ | ✗ | ✅ |
| "Should I be worried?" view | ✗ | ✗ | ✅ |
| News velocity / clustering | ✗ | ✗ | ✅ |
| Designed for non-experts | ✗ | ✗ | ✅ |
| Real-time feel (pulse, badges) | partial | partial | ✅ |
| Clean, uncluttered UI | ✗ | ✗ | ✅ |
| Mobile-first | partial | partial | ✅ |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS (dark theme, Scalable Capital-inspired) |
| Charts | Recharts |
| Data fetching | TanStack Query v5 |
| State | Zustand |
| AI summaries | Claude API (Anthropic) |
| Stock data | Finnhub API (global) + NSE/BSE API (Indian market) |

---

## Directory Structure

```
stockview/
├── frontend/     React + TypeScript SPA
├── backend/      API server — AI summaries, data aggregation, caching
├── data/         Scripts, seeds, market data exports
└── docs/
    └── product.md
```

---

## Roadmap

### Phase 1 — Foundation (current)
- [x] Stock search
- [x] Live price + chart
- [x] Financial metrics
- [x] News feed with sentiment
- [x] Earnings history

### Phase 2 — Differentiation
- [ ] AI Signal Card (Claude API integration)
- [ ] "Should I be worried?" panel
- [ ] Plain-English metric interpretations
- [ ] News clustering with velocity badges
- [ ] Redesign UI to Scalable Capital aesthetic

### Phase 3 — Expand Universe
- [ ] Add more sectors (EV, AI, Pharma, Finance)
- [ ] Add more European markets (FTSE, CAC40)
- [ ] Sector benchmarking (compare vs S&P500, DAX)

### Phase 4 — Growth
- [ ] Watchlist with daily digest
- [ ] Price alerts in plain English
- [ ] Portfolio P&L tracker
- [ ] Mobile app
