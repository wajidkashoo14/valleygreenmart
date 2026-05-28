import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

// ── Seed the demo user so it works on first visit ────────────────────────────
const DB_KEY = 'vgm_user_db'
function hashPassword(pw) {
  let h = 0
  for (let i = 0; i < pw.length; i++) { h = Math.imul(31, h) + pw.charCodeAt(i) | 0 }
  return String(h >>> 0)
}
try {
  const db = JSON.parse(localStorage.getItem(DB_KEY) || '{}')
  const DEMO_EMAIL = 'demo@valleygreenmart.in'
  if (!db[DEMO_EMAIL]) {
    db[DEMO_EMAIL] = {
      id:           'usr_demo_001',
      name:         'Demo User',
      email:        DEMO_EMAIL,
      phone:        '+91 77809 66909',
      avatar:       'https://api.dicebear.com/7.x/initials/svg?seed=Demo+User&backgroundColor=2d7a50&textColor=ffffff&fontSize=36',
      address:      'Saida Kadal Bridge, Rainwari',
      city:         'Srinagar',
      pincode:      '190003',
      joinedAt:     '2024-01-01T00:00:00.000Z',
      provider:     'email',
      passwordHash: hashPassword('demo123'),
    }
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  }
} catch (_) {}
// ─────────────────────────────────────────────────────────────────────────────

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
