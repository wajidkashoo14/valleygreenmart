import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../../data/products'

// ── Static suggestion pools ───────────────────────────────────────────────────
const TRENDING = [
  { label: 'Kashmir Saffron',   category: 'Saffron',   emoji: '🌸' },
  { label: 'Mamra Almonds',     category: 'Nuts',      emoji: '🥜' },
  { label: 'Wild Honey',        category: 'Honey',     emoji: '🍯' },
  { label: 'Shilajit',          category: 'Shilajit',  emoji: '🪨' },
  { label: 'Kashmiri Walnuts',  category: 'Nuts',      emoji: '🥜' },
  { label: 'A2 Ghee',           category: 'Dairy Items', emoji: '🧈' },
]

// Build a flat searchable index from products
const SEARCH_INDEX = PRODUCTS.map(p => ({
  id:       p.id,
  name:     p.name,
  category: p.category,
  origin:   p.origin,
  emoji:    p.emoji,
  price:    p.price,
  unit:     p.unit,
  image:    p.image,
  tags:     p.tags || [],
  // All searchable text lowercased
  _text: [p.name, p.category, p.origin, ...(p.tags || [])].join(' ').toLowerCase(),
}))

function getMatches(query) {
  if (!query || query.length < 1) return []
  const q = query.toLowerCase().trim()
  // Score: exact start > word start > contains
  return SEARCH_INDEX
    .map(p => {
      let score = 0
      if (p._text.startsWith(q))               score = 100
      else if (p.name.toLowerCase().startsWith(q)) score = 90
      else if (p.name.toLowerCase().includes(q))   score = 70
      else if (p._text.includes(q))                score = 40
      return { ...p, score }
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
}

// Highlight matching letters in a string
function Highlight({ text, query }) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-green-100 text-green-900 rounded font-bold not-italic px-0">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function SearchBar({ className = '', inputClassName = '', onClose }) {
  const [query,     setQuery]     = useState('')
  const [open,      setOpen]      = useState(false)
  const [cursor,    setCursor]    = useState(-1)  // keyboard nav index
  const [history,   setHistory]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('vgm_search_history') || '[]') }
    catch { return [] }
  })

  const inputRef    = useRef(null)
  const wrapperRef  = useRef(null)
  const navigate    = useNavigate()

  const matches = getMatches(query)
  const showSuggestions = open && (query.length >= 1 ? matches.length > 0 : true)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
        setCursor(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Reset cursor when matches change
  useEffect(() => { setCursor(-1) }, [query])

  const saveHistory = useCallback((term) => {
    setHistory(prev => {
      const next = [term, ...prev.filter(h => h !== term)].slice(0, 5)
      localStorage.setItem('vgm_search_history', JSON.stringify(next))
      return next
    })
  }, [])

  const clearHistory = (e) => {
    e.stopPropagation()
    setHistory([])
    localStorage.removeItem('vgm_search_history')
  }

  const goToProduct = (product) => {
    saveHistory(product.name)
    setQuery('')
    setOpen(false)
    setCursor(-1)
    onClose?.()
    navigate(`/products/${product.id}`)
  }

  const goToSearch = (term) => {
    const q = term || query
    if (!q.trim()) return
    saveHistory(q.trim())
    setQuery('')
    setOpen(false)
    setCursor(-1)
    onClose?.()
    navigate(`/products?search=${encodeURIComponent(q.trim())}`)
  }

  const goToCategory = (cat) => {
    setQuery('')
    setOpen(false)
    onClose?.()
    navigate(`/products?category=${encodeURIComponent(cat)}`)
  }

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const items = query.length >= 1 ? matches : TRENDING
    const total = items.length + (query.trim() ? 1 : 0) // +1 for "search all"

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor(c => Math.min(c + 1, total - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor(c => Math.max(c - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (cursor >= 0 && cursor < matches.length) {
        goToProduct(matches[cursor])
      } else {
        goToSearch(query)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setCursor(-1)
      inputRef.current?.blur()
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* ── Input ──────────────────────────────────────────────────────────── */}
      <div className={`flex items-center gap-2 bg-green-50 border rounded-full transition-all duration-200 ${
        open
          ? 'border-green-400 bg-white shadow-[0_0_0_4px_rgba(76,175,120,0.12)]'
          : 'border-transparent hover:border-green-200'
      }`}>
        <Search
          size={15}
          className={`absolute left-3.5 pointer-events-none transition-colors ${open ? 'text-green-600' : 'text-green-400'}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search saffron, honey, walnuts…"
          autoComplete="off"
          spellCheck={false}
          className={`w-full pl-10 pr-8 py-2.5 bg-transparent rounded-full text-sm text-green-900 placeholder:text-green-400 focus:outline-none font-body ${inputClassName}`}
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="absolute right-3 text-green-400 hover:text-green-700 transition-colors"
            >
              <X size={13} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Dropdown ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-green-100 overflow-hidden z-[60]"
            style={{ boxShadow: '0 16px 48px -4px rgba(0,0,0,0.14), 0 4px 12px -2px rgba(0,0,0,0.06)' }}
          >

            {/* ── Live product matches ──────────────────────────────────────── */}
            {query.length >= 1 && matches.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-4 pt-3 pb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                    Products ({matches.length})
                  </span>
                </div>
                {matches.map((product, i) => (
                  <button
                    key={product.id}
                    onMouseDown={() => goToProduct(product)}
                    onMouseEnter={() => setCursor(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors group ${
                      cursor === i ? 'bg-green-50' : 'hover:bg-green-50'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-green-50 ring-1 ring-green-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-green-900 truncate leading-tight">
                        <Highlight text={product.name} query={query} />
                      </div>
                      <div className="text-[11px] text-green-400 mt-0.5 flex items-center gap-1.5">
                        <span className="truncate">
                          <Highlight text={product.category} query={query} />
                        </span>
                        <span>·</span>
                        <span className="font-medium text-green-600">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="text-green-300">{product.unit}</span>
                      </div>
                    </div>
                    <ArrowRight size={12} className="text-green-300 group-hover:text-green-600 flex-shrink-0 transition-colors" />
                  </button>
                ))}
              </div>
            )}

            {/* ── "Search all results" row ─────────────────────────────────── */}
            {query.trim() && (
              <button
                onMouseDown={() => goToSearch(query)}
                onMouseEnter={() => setCursor(matches.length)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-t border-green-50 transition-colors ${
                  cursor === matches.length ? 'bg-green-50' : 'hover:bg-green-50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Search size={15} className="text-green-600" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-green-800">
                    Search for "<span className="text-green-600">{query}</span>"
                  </div>
                  <div className="text-[11px] text-green-400">Browse all matching products</div>
                </div>
                <ArrowRight size={12} className="text-green-400 ml-auto" />
              </button>
            )}

            {/* ── No results ───────────────────────────────────────────────── */}
            {query.length >= 2 && matches.length === 0 && (
              <div className="px-4 py-6 text-center">
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-sm font-semibold text-green-800">No matches for "{query}"</p>
                <p className="text-xs text-green-400 mt-1">Try: saffron, honey, walnuts, ghee…</p>
              </div>
            )}

            {/* ── Empty state: trending + history ─────────────────────────── */}
            {query.length === 0 && (
              <div className="p-3">

                {/* Search history */}
                {history.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between px-1 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-green-400 flex items-center gap-1.5">
                        <Clock size={10} /> Recent
                      </span>
                      <button
                        onMouseDown={clearHistory}
                        className="text-[10px] text-green-400 hover:text-red-400 transition-colors font-medium"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {history.map(h => (
                        <button
                          key={h}
                          onMouseDown={() => goToSearch(h)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 hover:bg-green-100 text-xs font-medium text-green-700 transition-colors border border-green-100"
                        >
                          <Clock size={9} className="text-green-400" />
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending */}
                <div>
                  <div className="flex items-center gap-1.5 px-1 mb-1.5">
                    <TrendingUp size={10} className="text-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                      Trending
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {TRENDING.map((t, i) => (
                      <button
                        key={t.label}
                        onMouseDown={() => goToCategory(t.category)}
                        className="w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-green-50 transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center text-sm flex-shrink-0 transition-colors">
                          {t.emoji}
                        </div>
                        <span className="text-[13px] font-medium text-green-800 group-hover:text-green-900 transition-colors">
                          {t.label}
                        </span>
                        <TrendingUp size={10} className="ml-auto text-green-300 group-hover:text-green-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category pills */}
                <div className="mt-3 pt-3 border-t border-green-50">
                  <div className="flex flex-wrap gap-1.5">
                    {['Vegetables', 'Fruits', 'Dry Fruits', 'Dairy Items', 'Special'].map(cat => (
                      <button
                        key={cat}
                        onMouseDown={() => navigate(`/products?subcategory=${encodeURIComponent(cat)}`)}
                        className="px-3 py-1 rounded-full text-[11px] font-semibold text-green-700 bg-green-50 border border-green-100 hover:bg-green-200 hover:border-green-300 transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
