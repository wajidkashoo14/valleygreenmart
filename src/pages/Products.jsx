import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import PageWrapper from '../components/ui/PageWrapper'

const CATS  = [...new Set(PRODUCTS.map(p => p.category))]
const SORTS  = [
  { value: 'default',    label: 'Default' },
  { value: 'price-low',  label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
]

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [loading, setLoading]   = useState(true)
  const [sort, setSort]         = useState('default')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [minRating, setMinRating] = useState(0)
  const [selectedCats, setSelectedCats] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [localSearch, setLocalSearch] = useState('')

  const urlCategory   = params.get('category') || ''
  const urlSubcat     = params.get('subcategory') || ''
  const urlSearch     = params.get('search') || ''

  // Simulate loading
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t) }, [urlCategory, urlSubcat, urlSearch])

  // Sync URL cat to sidebar selection
  useEffect(() => {
    if (urlCategory) setSelectedCats([urlCategory])
    else setSelectedCats([])
  }, [urlCategory])

  const filtered = useMemo(() => {
    let data = [...PRODUCTS]
    const search = urlSearch || localSearch
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    if (urlSubcat) data = data.filter(p => p.subcategory === urlSubcat)
    if (selectedCats.length) data = data.filter(p => selectedCats.includes(p.category))
    data = data.filter(p => p.price <= maxPrice && p.rating >= minRating)
    if (sort === 'price-low')  data.sort((a,b) => a.price - b.price)
    if (sort === 'price-high') data.sort((a,b) => b.price - a.price)
    if (sort === 'rating')     data.sort((a,b) => b.rating - a.rating)
    return data
  }, [urlCategory, urlSubcat, urlSearch, localSearch, selectedCats, maxPrice, minRating, sort])

  const toggleCat = (cat) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
    // Clear URL category when manually toggling
    const p = new URLSearchParams(params)
    p.delete('category')
    setParams(p)
  }

  const reset = () => {
    setSelectedCats([]); setMaxPrice(5000); setMinRating(0); setSort('default')
    setParams({})
  }

  const pageTitle = urlSearch ? `Results for "${urlSearch}"` : urlSubcat || urlCategory || 'All Products'

  const Sidebar = () => (
    <div className="bg-white rounded-2xl border border-green-100 shadow-card p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-green-900">Filters</h3>
        <button onClick={reset} className="text-xs text-green-600 hover:text-green-800 font-medium">Reset all</button>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">Category</p>
        <div className="space-y-1.5">
          {CATS.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat)}
                onChange={() => toggleCat(cat)}
                className="w-4 h-4 accent-green-600 rounded"
              />
              <span className="text-sm text-green-700 group-hover:text-green-900 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-green-400">Max Price</p>
          <span className="text-sm font-semibold text-green-800">₹{maxPrice.toLocaleString()}</span>
        </div>
        <input type="range" min={50} max={5000} step={50} value={maxPrice}
          onChange={e => setMaxPrice(+e.target.value)}
          className="w-full accent-green-600" />
        <div className="flex justify-between text-xs text-green-400 mt-1"><span>₹50</span><span>₹5,000</span></div>
      </div>

      {/* Rating */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">Min Rating</p>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map(r => (
            <button key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${minRating === r ? 'bg-green-800 text-white border-green-800' : 'border-green-200 text-green-700 hover:border-green-400'}`}>
              {r === 0 ? 'All' : `${r}★+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <PageWrapper>
      {/* Header */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <nav className="text-xs text-green-400 mb-2 flex items-center gap-1.5">
            <a href="/" className="hover:text-green-700 transition-colors cursor-pointer">Home</a>
            <span>/</span>
            <span className="text-green-700 font-medium">{pageTitle}</span>
          </nav>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-green-900">{pageTitle}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Mobile filter toggle */}
          <button onClick={() => setSidebarOpen(v => !v)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-green-200 rounded-xl text-sm font-semibold text-green-800 hover:bg-green-50 transition-colors">
            <SlidersHorizontal size={15} /> Filters
            {(selectedCats.length > 0 || minRating > 0 || maxPrice < 5000) && (
              <span className="w-5 h-5 bg-green-800 text-white rounded-full text-[10px] flex items-center justify-center">
                {selectedCats.length + (minRating > 0 ? 1 : 0) + (maxPrice < 5000 ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Search */}
          <div className="flex-1 min-w-[160px] max-w-xs relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
            <input type="text" value={localSearch} onChange={e => setLocalSearch(e.target.value)}
              placeholder="Search within results…"
              className="w-full pl-8 pr-3 py-2.5 bg-green-50 border border-transparent rounded-xl text-sm outline-none focus:border-green-300 text-green-900 placeholder:text-green-400 font-body" />
          </div>

          {/* Active filters */}
          {selectedCats.map(c => (
            <button key={c} onClick={() => toggleCat(c)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors">
              {c} <X size={11} />
            </button>
          ))}

          {/* Sort */}
          <div className="relative ml-auto">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-green-200 rounded-xl text-sm text-green-800 font-semibold outline-none cursor-pointer hover:border-green-400 transition-colors font-body">
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" />
          </div>

          <span className="text-sm text-green-500 font-medium whitespace-nowrap">
            {loading ? '...' : `${filtered.length} products`}
          </span>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="relative w-72 h-full bg-cream overflow-y-auto p-4 shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-green-900">Filters</h3>
                <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center"><X size={16} /></button>
              </div>
              <Sidebar />
            </motion.div>
          </div>
        )}

        {/* Layout */}
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24"><Sidebar /></div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-bold text-green-900 mb-2">No products found</h3>
                <p className="text-green-500 text-sm mb-5">Try adjusting your filters or search term.</p>
                <button onClick={reset} className="px-6 py-2.5 bg-green-800 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
