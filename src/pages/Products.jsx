import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, Search, Package } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import PageWrapper from '../components/ui/PageWrapper'
import useSEO from '../hooks/useSEO'

// Build category list from products (exclude duplicates)
const ALL_CATS = [...new Set(PRODUCTS.map(p => p.category))].sort()

const SORTS = [
  { value: 'default',    label: 'Default' },
  { value: 'price-low',  label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Highest Rated' },
]

export default function Products() {
  useSEO({ title: 'Shop Products', description: 'Browse our full range of organic Kashmiri products — Saffron, Walnuts, Honey, Shilajit, Dry Fruits and more.' })
  const [params, setParams]       = useSearchParams()
  const [loading, setLoading]     = useState(true)
  const [sort, setSort]           = useState('default')
  const [maxPrice, setMaxPrice]   = useState(5000)
  const [minRating, setMinRating] = useState(0)
  const [selectedCats, setSelectedCats] = useState([])
  const [showPanIndia, setShowPanIndia] = useState(false) // pan india filter state
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [localSearch, setLocalSearch]   = useState('')

  // Read URL params
  const urlCategory = params.get('category')   || ''
  const urlSubcat   = params.get('subcategory') || ''
  const urlSearch   = params.get('search')      || ''
  const urlPanIndia = params.get('panIndia')    === 'true'

  // Simulate loading on filter change
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [urlCategory, urlSubcat, urlSearch, urlPanIndia])

  // Sync URL params → local state
  useEffect(() => {
    if (urlCategory) setSelectedCats([urlCategory])
    else if (!urlSubcat && !urlPanIndia) setSelectedCats([])
  }, [urlCategory])

  useEffect(() => {
    setShowPanIndia(urlPanIndia)
  }, [urlPanIndia])

  // ── Core filter logic ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let data = [...PRODUCTS]

    // Search
    const q = (urlSearch || localSearch).toLowerCase().trim()
    if (q) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      )
    }

    // Pan India filter — triggered by URL param, sidebar toggle, or subcategory='pan-india'
    const isPanIndia = urlPanIndia || showPanIndia || urlSubcat === 'pan-india'
    if (isPanIndia) {
      data = data.filter(p => p.panIndia === true)
    } else {
      // Subcategory from URL (excluding pan-india which is handled above)
      if (urlSubcat && urlSubcat !== 'pan-india') {
        data = data.filter(p => p.subcategory === urlSubcat)
      }
      // Category checkboxes from sidebar
      if (selectedCats.length > 0) {
        data = data.filter(p => selectedCats.includes(p.category))
      }
    }

    // Price & rating
    data = data.filter(p => p.price <= maxPrice && p.rating >= minRating)

    // Sort
    if (sort === 'price-low')  data.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') data.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     data.sort((a, b) => b.rating - a.rating)

    return data
  }, [urlCategory, urlSubcat, urlSearch, urlPanIndia, localSearch, selectedCats, showPanIndia, maxPrice, minRating, sort])

  // ── Helpers ────────────────────────────────────────────────────────────────
  const toggleCat = (cat) => {
    setShowPanIndia(false) // clear pan india when selecting a category
    setSelectedCats(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
    const p = new URLSearchParams(params)
    p.delete('category')
    p.delete('panIndia')
    setParams(p)
  }

  const togglePanIndia = () => {
    const next = !showPanIndia
    setShowPanIndia(next)
    setSelectedCats([]) // clear other category filters
    const p = new URLSearchParams(params)
    if (next) {
      p.set('panIndia', 'true')
      p.delete('category')
      p.delete('subcategory')
    } else {
      p.delete('panIndia')
    }
    setParams(p)
  }

  const reset = () => {
    setSelectedCats([])
    setShowPanIndia(false)
    setMaxPrice(5000)
    setMinRating(0)
    setSort('default')
    setLocalSearch('')
    setParams({})
  }

  const activeFilterCount =
    selectedCats.length +
    (showPanIndia ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (maxPrice < 5000 ? 1 : 0)

  const isPanIndiaPage = showPanIndia || urlPanIndia || urlSubcat === 'pan-india'
  const pageTitle = urlSearch
    ? `Results for "${urlSearch}"`
    : isPanIndiaPage
    ? 'Pan India Products 🚚'
    : urlSubcat || urlCategory || 'All Products'

  // ── Sidebar (shared desktop + mobile) ─────────────────────────────────────
  const Sidebar = () => (
    <div className="bg-white rounded-2xl border border-green-100 shadow-card p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-green-900">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={reset} className="text-xs text-green-600 hover:text-red-500 font-semibold transition-colors">
            Reset ({activeFilterCount})
          </button>
        )}
      </div>

      {/* ── Pan India toggle ────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">Delivery Zone</p>
        <button
          onClick={togglePanIndia}
          className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border-2 text-left transition-all ${
            isPanIndiaPage
              ? 'bg-sky-50 border-sky-400 text-sky-800'
              : 'bg-white border-green-100 text-green-700 hover:border-green-300 hover:bg-green-50'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base ${
            isPanIndiaPage ? 'bg-sky-100' : 'bg-green-50'
          }`}>
            🚚
          </div>
          <div>
            <div className="font-semibold text-sm leading-tight">Pan India</div>
            <div className="text-[10px] text-green-400 mt-0.5">Ships anywhere in India</div>
          </div>
          <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isPanIndiaPage ? 'bg-sky-500 border-sky-500' : 'border-green-300'
          }`}>
            {isPanIndiaPage && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </button>
      </div>

      {/* ── Category checkboxes ─────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">Category</p>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {ALL_CATS.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat)}
                onChange={() => toggleCat(cat)}
                className="w-4 h-4 accent-green-600 rounded flex-shrink-0"
              />
              <span className="text-sm text-green-700 group-hover:text-green-900 transition-colors leading-tight">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Price range ─────────────────────────────────────────────────── */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-green-400">Max Price</p>
          <span className="text-sm font-semibold text-green-800">
            ₹{maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range" min={50} max={5000} step={50} value={maxPrice}
          onChange={e => setMaxPrice(+e.target.value)}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-green-400 mt-1">
          <span>₹50</span><span>₹5,000</span>
        </div>
      </div>

      {/* ── Min rating ─────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">Min Rating</p>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                minRating === r
                  ? 'bg-green-800 text-white border-green-800'
                  : 'border-green-200 text-green-700 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              {r === 0 ? 'All' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <PageWrapper>
      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <nav className="text-xs text-green-400 mb-2 flex items-center gap-1.5">
            <a href="/" className="hover:text-green-700 transition-colors">Home</a>
            <span>/</span>
            <span className="text-green-700 font-medium truncate">{pageTitle}</span>
          </nav>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-green-900">
              {pageTitle}
            </h1>
            {isPanIndiaPage && (
              <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold">
                <Package size={11} /> Ships across India
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">

        {/* ── Toolbar ─────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 flex-wrap">

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2.5 border border-green-200 rounded-xl text-sm font-semibold text-green-800 hover:bg-green-50 transition-colors"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden xs:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-green-800 text-white rounded-full text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick Pan India toggle pill — always visible in toolbar */}
          <button
            onClick={togglePanIndia}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              isPanIndiaPage
                ? 'bg-sky-600 text-white border-sky-600'
                : 'border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-400'
            }`}
          >
            🚚 Pan India
            {isPanIndiaPage && <X size={12} />}
          </button>

          {/* Inline search */}
          <div className="flex-1 min-w-[140px] max-w-xs relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-8 pr-3 py-2.5 bg-green-50 border border-transparent rounded-xl text-sm outline-none focus:border-green-300 text-green-900 placeholder:text-green-400 font-body"
            />
          </div>

          {/* Active category pills */}
          {selectedCats.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCat(cat)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors"
            >
              {cat} <X size={11} />
            </button>
          ))}

          {/* Sort */}
          <div className="relative ml-auto">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="appearance-none pl-3 pr-7 py-2.5 bg-white border border-green-200 rounded-xl text-xs sm:text-sm text-green-800 font-semibold outline-none cursor-pointer hover:border-green-400 transition-colors font-body"
            >
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" />
          </div>

          <span className="text-xs sm:text-sm text-green-500 font-medium whitespace-nowrap">
            {loading ? '…' : `${filtered.length} item${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        {/* ── Mobile sidebar overlay ───────────────────────────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="relative w-72 max-w-[85vw] h-full bg-cream overflow-y-auto p-4 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-bold text-green-900">Filters</h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <Sidebar />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── Layout: sidebar + grid ───────────────────────────────────────── */}
        <div className="flex gap-4 lg:gap-6">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 xl:w-56 flex-shrink-0">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-bold text-green-900 mb-2">
                  No products found
                </h3>
                <p className="text-green-500 text-sm mb-5">
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={reset}
                  className="px-6 py-2.5 bg-green-800 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
              >
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
