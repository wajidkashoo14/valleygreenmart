import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=1600&q=92&auto=format&fit=crop',
    title: 'Saffron Fields of Pampore',
    sub: 'Pampore, Kashmir — The Saffron Capital',
    tag: '🌸 Kashmir Kesar · GI Tagged',
    cta: 'Shop Saffron',
    ctaLink: '/products?category=Saffron',
    color: 'from-purple-950/85 via-purple-900/40',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1600&q=92&auto=format&fit=crop',
    title: 'Dal Lake Floating Market',
    sub: 'Srinagar, Kashmir — Dawn vegetable market on water',
    tag: '🚣 Fresh Produce · Harvested Daily',
    cta: 'Shop Vegetables',
    ctaLink: '/products?subcategory=Vegetables',
    color: 'from-blue-950/85 via-blue-900/40',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1604548737895-dc44b1e1ef39?w=1600&q=92&auto=format&fit=crop',
    title: 'Walnut Orchards of Shopian',
    sub: 'Shopian, Kashmir — Walnut Capital of Asia',
    tag: '🥜 Kagzi Walnuts · Omega-3 Rich',
    cta: 'Shop Nuts',
    ctaLink: '/products?category=Nuts',
    color: 'from-amber-950/85 via-amber-900/40',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=1600&q=92&auto=format&fit=crop',
    title: 'Valley Farms in the Himalayas',
    sub: 'Kashmir Valley — 1,800m above sea level',
    tag: '🏔️ Organic Farming · NPOP Certified',
    cta: 'Explore All',
    ctaLink: '/products',
    color: 'from-green-950/85 via-green-900/40',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=1600&q=92&auto=format&fit=crop',
    title: 'Wild Himalayan Honey',
    sub: 'Gurez Valley — Raw & unfiltered forest harvest',
    tag: '🍯 Wild Honey · No Added Sugar',
    cta: 'Shop Honey',
    ctaLink: '/products?category=Honey',
    color: 'from-yellow-950/85 via-yellow-900/40',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=92&auto=format&fit=crop',
    title: 'Pure Kashmir Saffron (Kesar)',
    sub: 'Pampore · ISO Certified · Lab Tested',
    tag: '✨ World\'s Finest Spice',
    cta: 'Shop Saffron',
    ctaLink: '/products?category=Saffron',
    color: 'from-red-950/85 via-red-900/40',
  },
]

const INTERVAL = 2000

export default function KashmirCarousel() {
  const [idx,    setIdx]    = useState(0)
  const [dir,    setDir]    = useState(1)
  const [paused, setPaused] = useState(false)
  const timer   = useRef(null)
  const touchX  = useRef(null)

  const go = useCallback((to, d) => {
    setDir(d)
    setIdx((to + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => go(idx + 1,  1), [idx, go])
  const prev = useCallback(() => go(idx - 1, -1), [idx, go])

  useEffect(() => {
    if (paused) return
    timer.current = setTimeout(() => { setDir(1); setIdx(i => (i + 1) % SLIDES.length) }, INTERVAL)
    return () => clearTimeout(timer.current)
  }, [idx, paused])

  const slide = SLIDES[idx]

  return (
    <div
      className="relative w-full overflow-hidden bg-green-950"
      style={{ height: 'clamp(300px, 58vw, 680px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 44) dx < 0 ? next() : prev()
        touchX.current = null
      }}
    >
      {/* ── Slides ──────────────────────────────────────────────────────── */}
      <AnimatePresence mode="sync" custom={dir}>
        <motion.div
          key={slide.id}
          custom={dir}
          variants={{
            enter:  d => ({ opacity: 0, x: d > 0 ? '6%' : '-6%' }),
            center: {    opacity: 1, x: 0 },
            exit:   d => ({ opacity: 0, x: d > 0 ? '-6%' : '6%' }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Ken-Burns zoom */}
          <motion.img
            src={slide.url}
            alt={slide.title}
            loading="eager"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1.12 }}
            transition={{ duration: (INTERVAL + 800) / 1000, ease: 'linear' }}
          />
          {/* Gradient overlay — dark on left/bottom, transparent top-right */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* ── Top progress bar ─────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2 sm:p-3">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="flex-1 h-0.5 sm:h-1 rounded-full overflow-hidden bg-white/20 cursor-pointer"
            onClick={() => go(i, i > idx ? 1 : -1)}
          >
            {i === idx && !paused ? (
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              />
            ) : (
              <div className={`h-full ${i < idx ? 'bg-white/80' : 'bg-transparent'}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Text content ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`txt-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-6 pt-16 sm:p-8 lg:p-12"
        >
          {/* Tag badge */}
          <div className="inline-flex max-w-full items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white/95 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3">
            <span className="truncate">{slide.tag}</span>
          </div>

          {/* Title */}
          <h2 className="font-display font-bold text-white leading-tight mb-2 drop-shadow-lg"
            style={{ fontSize: 'clamp(1.3rem, 4vw, 2.8rem)' }}>
            {slide.title}
          </h2>

          {/* Sub */}
          <p className="text-white/70 text-xs sm:text-sm mb-4 sm:mb-5 drop-shadow max-w-md">
            {slide.sub}
          </p>

          {/* CTA */}
          <a
            href={slide.ctaLink}
            onClick={e => { e.preventDefault(); window.location.href = slide.ctaLink }}
            className="inline-flex items-center gap-2 bg-white text-green-900 font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm hover:bg-green-50 active:scale-95 transition-all shadow-lg"
          >
            {slide.cta} →
          </a>
        </motion.div>
      </AnimatePresence>

      {/* ── Arrow buttons ─────────────────────────────────────────────────── */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-90"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-90"
      >
        <ChevronRight size={18} />
      </button>

      {/* ── Dot indicators ────────────────────────────────────────────────── */}
      <div className="absolute bottom-3 sm:bottom-5 right-4 sm:right-8 z-20 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > idx ? 1 : -1)}
            className="transition-all duration-300 rounded-full bg-white"
            style={{
              width:   i === idx ? 22 : 6,
              height:  6,
              opacity: i === idx ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ─────────────────────────────────────────────────── */}
      <div className="absolute top-4 right-4 z-20 bg-black/25 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] font-bold px-2.5 py-1 rounded-full hidden sm:block">
        {idx + 1} / {SLIDES.length}
      </div>
    </div>
  )
}
