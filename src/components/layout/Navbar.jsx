import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, Heart, Search, Menu, X, ChevronDown,
  Leaf, LogIn, ArrowRight, Sparkles, MapPin,
} from 'lucide-react'
import { useCart, useWishlist } from '../../hooks'
import { useAuthStore } from '../../store/authStore'
import { MEGA_MENU } from '../../data/products'
import UserMenu from '../auth/UserMenu'
import SearchBar from '../ui/SearchBar'

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [megaOpen,      setMegaOpen]      = useState(false)
  const [activeCol,     setActiveCol]     = useState(MEGA_MENU[0].title)
  const [searchOpen,    setSearchOpen]    = useState(false)
  const [userMenuOpen,  setUserMenuOpen]  = useState(false)
  const [headerH,       setHeaderH]       = useState(88)

  const closeTimer = useRef(null)
  const headerRef  = useRef(null)
  const navigate   = useNavigate()
  const location   = useLocation()

  const { totalItems }       = useCart()
  const { count: wishCount } = useWishlist()
  const { user, isLoggedIn } = useAuthStore()

  // Measure header height for mega panel positioning
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderH(headerRef.current.getBoundingClientRect().height)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (headerRef.current) ro.observe(headerRef.current)
    return () => ro.disconnect()
  }, [searchOpen])

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    clearTimeout(closeTimer.current)
    setMegaOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  // ← REMOVED: the broken searchRef.current?.focus() useEffect
  // SearchBar handles its own focus internally

  // Close mobile menu on desktop resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Mega menu hover intent
  const openMega = useCallback((colTitle) => {
    clearTimeout(closeTimer.current)
    setActiveCol(colTitle ?? MEGA_MENU[0].title)
    setMegaOpen(true)
  }, [])

  const schedulClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 160)
  }, [])

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current)
  }, [])

  const goToCategory = (cat) => {
    if (!cat || cat === 'pan-india' || cat === 'Pan India' || cat === 'Pan India 🚚') {
      navigate('/products?panIndia=true')
    } else {
      navigate(`/products?category=${encodeURIComponent(cat)}`)
    }
    clearTimeout(closeTimer.current)
    setMegaOpen(false)
    setMobileOpen(false)
  }

  const currentCol = MEGA_MENU.find(c => c.title === activeCol) ?? MEGA_MENU[0]
  const navTop = headerH

  return (
    <>
      <div ref={headerRef}>

        {/* Announcement bar */}
        <div className="bg-green-900 text-white text-[10px] sm:text-xs py-1.5 sm:py-2 text-center tracking-wide select-none hidden sm:block">
          <span className="opacity-60">🌿 Free delivery on orders above ₹999 &nbsp;·&nbsp; </span>
          <span className="text-green-300 font-semibold">Sourced directly from Kashmir's farms</span>
          <span className="opacity-60"> &nbsp;·&nbsp; COD Available</span>
        </div>

        {/* Main header */}
        <header className={`border-b transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-green-100'
            : 'bg-[#fdfcf8] border-green-100/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center gap-3">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group mr-2" aria-label="Valley Green Mart home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                <Leaf size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="hidden sm:block font-display font-bold text-[16px] text-green-900 leading-none whitespace-nowrap">
                Valley Green Mart
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <NavPill to="/" label="Home" />
              <button
                onMouseEnter={() => openMega(MEGA_MENU[0].title)}
                onMouseLeave={schedulClose}
                onClick={() => { navigate('/products'); setMegaOpen(false) }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all select-none ${
                  location.pathname === '/products' || megaOpen
                    ? 'bg-green-100 text-green-900'
                    : 'text-green-800 hover:bg-green-50'
                }`}
              >
                Shop
                <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-green-500">
                  <ChevronDown size={13} strokeWidth={2.5} />
                </motion.span>
              </button>
              <NavPill to="/wishlist" label="Wishlist" />
            </nav>

            {/* Desktop search */}
            <div className="hidden md:block flex-1 max-w-sm">
              <SearchBar />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 ml-auto lg:ml-0">

              {/* Mobile search toggle */}
              <button
                onClick={() => setSearchOpen(v => !v)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-green-700 hover:bg-green-100 transition-colors"
              >
                <Search size={17} />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative w-9 h-9 rounded-full flex items-center justify-center text-green-700 hover:bg-green-100 transition-colors">
                <Heart size={17} />
                <AnimatePresence>
                  {wishCount > 0 && (
                    <motion.span key={wishCount} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -top-0.5 -right-0.5 w-[17px] h-[17px] bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishCount > 9 ? '9+' : wishCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative flex items-center gap-1.5 bg-green-800 hover:bg-green-700 text-white pl-3.5 pr-4 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-md active:scale-[0.97]">
                <ShoppingCart size={15} />
                <span className="hidden sm:inline">Cart</span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="w-[18px] h-[18px] bg-white text-green-800 text-[9px] font-bold rounded-full flex items-center justify-center">
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Auth — re-renders correctly when isLoggedIn changes */}
              <div className="relative">
                {isLoggedIn && user ? (
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full hover:bg-green-50 border border-transparent hover:border-green-200 transition-all"
                  >
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-green-200" />
                    <span className="hidden sm:block text-sm font-medium text-green-800 max-w-[72px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={12} className={`text-green-400 transition-transform duration-200 hidden sm:block ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-1.5 pl-3 pr-4 py-2 rounded-full border border-green-200 hover:border-green-400 hover:bg-green-50 text-green-800 text-sm font-semibold transition-all"
                  >
                    <LogIn size={15} />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>
                )}
                <UserMenu isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-green-700 hover:bg-green-100 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
                    : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile search bar — SearchBar handles its own focus */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden border-t border-green-100 md:hidden bg-white"
              >
                <div className="p-3">
                  <SearchBar onClose={() => setSearchOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* Mega Dropdown */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ top: navTop }}
            className="fixed left-0 right-0 z-40 hidden lg:block"
            onMouseEnter={cancelClose}
            onMouseLeave={schedulClose}
          >
            <div className="h-2 w-full" />
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-white rounded-2xl overflow-hidden border border-green-100 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)]">
                <div className="flex" style={{ minHeight: 340 }}>

                  {/* Left tabs */}
                  <div className="w-[210px] flex-shrink-0 bg-gradient-to-b from-green-50 to-green-50/30 border-r border-green-100 py-3">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-400 px-4 pb-2">All Categories</p>
                    {MEGA_MENU.map(col => (
                      <button
                        key={col.title}
                        onMouseEnter={() => { cancelClose(); setActiveCol(col.title) }}
                        onClick={() => { navigate(col.panIndia ? '/products?panIndia=true' : `/products?subcategory=${encodeURIComponent(col.title)}`); setMegaOpen(false) }}
                        className={`relative w-full flex items-center gap-3 px-4 py-3 text-left transition-all group ${activeCol === col.title ? 'bg-white shadow-sm' : 'hover:bg-white/70'}`}
                      >
                        {activeCol === col.title && (
                          <motion.div layoutId="mega-indicator" className="absolute left-0 top-2 bottom-2 w-[3px] bg-green-600 rounded-r-full" />
                        )}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-all ${activeCol === col.title ? 'bg-green-100 scale-110' : 'bg-white group-hover:bg-green-50'}`}>
                          {col.emoji}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`text-[13px] font-semibold leading-tight truncate ${activeCol === col.title ? 'text-green-900' : 'text-green-700 group-hover:text-green-900'}`}>
                            {col.title}
                          </div>
                          <div className="text-[10px] text-green-400 mt-0.5">{col.items.length} item{col.items.length !== 1 ? 's' : ''}</div>
                        </div>
                        {activeCol === col.title && <ArrowRight size={11} className="text-green-400 flex-shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {/* Center panel */}
                  <div className="flex-1 p-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div key={currentCol.title} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-display font-bold text-lg text-green-900 flex items-center gap-2">
                              <span>{currentCol.emoji}</span>{currentCol.title}
                            </h3>
                            {currentCol.promo && <p className="text-xs text-green-500 mt-0.5">{currentCol.promo.desc}</p>}
                          </div>
                          <button
                            onClick={() => { navigate(currentCol.panIndia ? '/products?panIndia=true' : `/products?subcategory=${encodeURIComponent(currentCol.title)}`); setMegaOpen(false) }}
                            className="flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                          >
                            View all <ArrowRight size={11} />
                          </button>
                        </div>
                        <div className={`grid gap-3 ${currentCol.items.length <= 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                          {currentCol.items.map((item, i) => (
                            <motion.button
                              key={item.category}
                              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.18 }}
                              onClick={() => goToCategory(item.category)}
                              className="flex items-center gap-3 p-3 rounded-xl border border-green-100 hover:border-green-300 hover:bg-green-50/80 transition-all text-left group cursor-pointer"
                            >
                              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-green-50 ring-1 ring-green-100 group-hover:ring-green-300 transition-all">
                                <img src={item.image} alt={item.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div>
                                <div className="font-semibold text-[13px] text-green-900 group-hover:text-green-700 leading-tight">{item.label}</div>
                                <div className="text-[11px] text-green-400 mt-0.5">{item.desc}</div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                        {currentCol.promo && (
                          <div className={`mt-4 bg-gradient-to-r ${currentCol.color} border border-green-200/50 rounded-xl px-4 py-2.5 flex items-center gap-2`}>
                            <Sparkles size={13} className="text-green-600 flex-shrink-0" />
                            <span className="text-xs font-bold text-green-800">{currentCol.promo.label}</span>
                            <span className="text-xs text-green-600 ml-0.5">— {currentCol.promo.desc}</span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right strip */}
                  <div className="w-[170px] flex-shrink-0 bg-green-900 border-l border-green-800 px-5 py-5 flex flex-col gap-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-400">Why Us</p>
                    {[
                      { icon: '🌿', title: '100% Organic',    sub: 'NPOP Certified' },
                      { icon: '🚚', title: 'Free Delivery',   sub: 'Orders ₹999+' },
                      { icon: '❄️', title: 'Fresh Guarantee', sub: 'Or full refund' },
                      { icon: '⭐', title: '4.9 / 5 Stars',   sub: '12k+ reviews' },
                    ].map(f => (
                      <div key={f.title} className="flex items-start gap-2.5">
                        <span className="text-base leading-none mt-0.5">{f.icon}</span>
                        <div>
                          <div className="text-[12px] font-semibold text-white leading-tight">{f.title}</div>
                          <div className="text-[10px] text-green-400 mt-0.5">{f.sub}</div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-auto border-t border-green-800 pt-4">
                      <p className="text-[9px] uppercase tracking-wider text-green-500 mb-2 font-bold">Top Pick</p>
                      <button onClick={() => { navigate('/products/1'); setMegaOpen(false) }} className="w-full text-left group">
                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2">
                          <img src="/products/saffron-product.webp" alt="Saffron" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="text-[11px] font-semibold text-white">Kashmir Saffron</div>
                        <div className="text-[10px] text-green-400 mt-0.5">From ₹4,800/g</div>
                      </button>
                    </div>
                    <button onClick={() => { navigate('/products'); setMegaOpen(false) }} className="w-full py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-xl transition-colors">
                      Browse All →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] max-w-[100vw] bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-green-100 bg-green-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center shadow-md flex-shrink-0">
                    <Leaf size={15} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-display font-bold text-[14px] text-green-900 leading-none">Valley Green Mart</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full hover:bg-green-100 flex items-center justify-center text-green-700">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {!isLoggedIn ? (
                  <div className="flex gap-2 mb-5">
                    <button onClick={() => { navigate('/login'); setMobileOpen(false) }} className="flex-1 py-2.5 border border-green-200 rounded-xl text-sm font-semibold text-green-800 hover:bg-green-50 transition-colors">Sign In</button>
                    <button onClick={() => { navigate('/register'); setMobileOpen(false) }} className="flex-1 py-2.5 bg-green-800 rounded-xl text-sm font-semibold text-white hover:bg-green-700 transition-colors">Register</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-5 p-3 bg-green-50 rounded-xl">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full ring-2 ring-green-200" />
                    <div>
                      <div className="font-semibold text-sm text-green-900">{user.name}</div>
                      <div className="text-xs text-green-500">{user.email}</div>
                    </div>
                  </div>
                )}

                <div className="space-y-0.5 mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 px-2 mb-2">Navigation</p>
                  <MobileLink to="/" onClick={() => setMobileOpen(false)}>🏠 Home</MobileLink>
                  <MobileLink to="/products" onClick={() => setMobileOpen(false)}>🛍️ All Products</MobileLink>
                  <MobileLink to="/wishlist" onClick={() => setMobileOpen(false)}>
                    ♡ Wishlist
                    {wishCount > 0 && <span className="ml-auto bg-rose-100 text-rose-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{wishCount}</span>}
                  </MobileLink>
                  <MobileLink to="/cart" onClick={() => setMobileOpen(false)}>
                    🛒 Cart
                    {totalItems > 0 && <span className="ml-auto bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">{totalItems}</span>}
                  </MobileLink>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 px-2 mb-3">Browse Categories</p>
                  {MEGA_MENU.map(col => (
                    <div key={col.title} className="mb-4">
                      <div className="flex items-center gap-1.5 px-2 mb-2">
                        <span>{col.emoji}</span>
                        <p className="text-xs font-semibold text-green-700">{col.title}</p>
                      </div>
                      <div className="space-y-1">
                        {col.items.map(item => (
                          <button key={item.category} onClick={() => goToCategory(item.category)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors group text-left">
                            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-green-100">
                              <img src={item.image} alt={item.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold text-green-900 leading-tight">{item.label}</div>
                              <div className="text-[11px] text-green-400">{item.desc}</div>
                            </div>
                            <ArrowRight size={13} className="ml-auto text-green-300 group-hover:text-green-600" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-green-100 p-4 bg-green-50">
                <div className="flex items-center gap-1.5 text-xs text-green-600 justify-center">
                  <MapPin size={11} />
                  <span>Saida Kadal Bridge, Rainawari, Srinagar</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function NavPill({ to, label }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link to={to} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active ? 'bg-green-100 text-green-900' : 'text-green-800 hover:bg-green-50'}`}>
      {label}
    </Link>
  )
}

function MobileLink({ to, onClick, children }) {
  return (
    <Link to={to} onClick={onClick} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-green-800 hover:bg-green-50 transition-colors">
      {children}
    </Link>
  )
}