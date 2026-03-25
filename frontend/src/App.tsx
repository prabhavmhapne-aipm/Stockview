import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import StockPage from './pages/StockPage'
import LivePage from './pages/LivePage'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-0 text-text-1">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/:ticker" element={<StockPage />} />
      </Routes>
    </div>
  )
}
