import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    url: '/hero/safron.jfif',
    title: 'Saffron Fields of Pampore',
    sub: 'Pampore, Kashmir — The Saffron Capital',
    tag: '🌸 Kashmir Kesar · GI Tagged',
    cta: 'Shop Saffron',
    ctaLink: '/products?category=Saffron',
    color: 'from-purple-950/85 via-purple-900/40',
  },
  {
    id: 2,
    url: '/hero/dallake.jfif',
    title: 'Dal Lake Floating Market',
    sub: 'Srinagar, Kashmir — Dawn vegetable market on water',
    tag: '🚣 Fresh Produce · Harvested Daily',
    cta: 'Shop Vegetables',
    ctaLink: '/products?subcategory=Vegetables',
    color: 'from-blue-950/85 via-blue-900/40',
  },
  {
    id: 3,
    url: '/hero/walnut.avif',
    title: 'Walnut Orchards of Shopian',
    sub: 'Shopian, Kashmir — Walnut Capital of Asia',
    tag: '🥜 Kagzi Walnuts · Omega-3 Rich',
    cta: 'Shop Nuts',
    ctaLink: '/products?category=Nuts',
    color: 'from-amber-950/85 via-amber-900/40',
  },
  {
    id: 4,
    url: '/hero/himaliya.jfif',
    title: 'Valley Farms in the Himalayas',
    sub: 'Kashmir Valley — 1,800m above sea level',
    tag: '🏔️ Organic Farming · NPOP Certified',
    cta: 'Explore All',
    ctaLink: '/products',
    color: 'from-green-950/85 via-green-900/40',
  },
  {
    id: 5,
    url: '/hero/honey.webp',
    title: 'Wild Himalayan Honey',
    sub: 'Gurez Valley — Raw & unfiltered forest harvest',
    tag: '🍯 Wild Honey · No Added Sugar',
    cta: 'Shop Honey',
    ctaLink: './products?category=Honey',
    color: 'from-yellow-950/85 via-yellow-900/40',
  },
  {
    id: 6,
    url: '/hero/puresafron.webp',
    title: 'Pure Kashmir Saffron (Kesar)',
    sub: 'Pampore · ISO Certified · Lab Tested',
    tag: "✨ World's Finest Spice",
    cta: 'Shop Saffron',
    ctaLink: '/products?category=Saffron',
    color: 'from-red-950/85 via-red-900/40',
  },
]

const INTERVAL = 4000

export default function KashmirCarousel() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)

  const timer = useRef(null)
  const touchX = useRef(null)

  const go = useCallback((to, d) => {
    setDir(d)
    setIdx((to + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => go(idx + 1, 1), [idx, go])
  const prev = useCallback(() => go(idx - 1, -1), [idx, go])

  useEffect(() => {
    if (paused) return
    timer.current = setTimeout(() => {
      setDir(1)
      setIdx(i => (i + 1) % SLIDES.length)
    }, INTERVAL)
    return () => clearTimeout(timer.current)
  }, [idx, paused])

  const slide = SLIDES[idx]

  return (
    <div
      className="relative w-full overflow-hidden bg-green-950"
      style={{ height: 'clamp(320px, 70vw, 720px)' }}
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
      {/* Slides */}
      <AnimatePresence mode="sync" custom={dir}>
        <motion.div
          key={slide.id}
          custom={dir}
          variants={{
            enter: d => ({ opacity: 0, x: d > 0 ? '6%' : '-6%' }),
            center: { opacity: 1, x: 0 },
            exit: d => ({ opacity: 0, x: d > 0 ? '-6%' : '6%' }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
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
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
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

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`txt-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 pt-20 sm:px-6 sm:pb-8 lg:px-12 lg:pb-12"
        >
          {/* Tag */}
          <div className="inline-flex max-w-full items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white/95 px-3 py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-3">
            <span className="truncate">{slide.tag}</span>
          </div>

          {/* Title */}
          <h2
            className="font-bold text-white leading-tight mb-2 drop-shadow-lg max-w-[95%] sm:max-w-2xl"
            style={{ fontSize: 'clamp(1.2rem, 5vw, 3rem)' }}
          >
            {slide.title}
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 text-[11px] sm:text-sm md:text-base mb-4 sm:mb-5 drop-shadow max-w-xs sm:max-w-md md:max-w-lg leading-relaxed line-clamp-2">
            {slide.sub}
          </p>

          {/* CTA */}
          <a
            href={slide.ctaLink}
            onClick={e => {
              e.preventDefault()
              window.location.href = slide.ctaLink
            }}
            className="inline-flex items-center gap-2 bg-white text-green-900 font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[11px] sm:text-sm hover:bg-green-50 active:scale-95 transition-all shadow-lg"
          >
            {slide.cta} →
          </a>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-3 lg:left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full bg-black/20 hover:bg-black/40 active:bg-black/50 backdrop-blur-sm border border-white/10 text-white transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-2 sm:right-3 lg:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full bg-black/20 hover:bg-black/40 active:bg-black/50 backdrop-blur-sm border border-white/10 text-white transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />
      </button>

      {/* Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          height: 6,
          lineHeight: 0,
        }}
      >
        {SLIDES.map((_, i) => (
          <span
            key={i}
            onClick={() => go(i, i > idx ? 1 : -1)}
            role="button"
            aria-label={`Go to slide ${i + 1}`}
            style={{
              display: 'inline-block',
              width: i === idx ? 16 : 6,
              height: 6,
              minWidth: i === idx ? 16 : 6,
              maxWidth: i === idx ? 16 : 6,
              minHeight: 6,
              maxHeight: 6,
              borderRadius: 9999,
              backgroundColor: 'white',
              opacity: i === idx ? 1 : 0.4,
              transition: 'width 0.3s ease, opacity 0.3s ease',
              flexShrink: 0,
              alignSelf: 'center',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              boxSizing: 'content-box',
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/25 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] font-bold px-2.5 py-1 rounded-full hidden sm:block">
        {idx + 1} / {SLIDES.length}
      </div>
    </div>
  )
}