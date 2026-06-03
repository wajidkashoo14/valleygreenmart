import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Star, MapPin, Check, Calendar } from 'lucide-react'
import { useCart, useWishlist } from '../../hooks'
import { formatPrice, getDiscount } from '../../utils'

const BADGE_STYLES = {
  Premium:       'bg-amber-500 text-white',
  Bestseller:    'bg-green-700 text-white',
  New:           'bg-sky-500 text-white',
  Rare:          'bg-purple-600 text-white',
  Gift:          'bg-rose-500 text-white',
  A2:            'bg-sky-600 text-white',
  Authentic:     'bg-amber-800 text-white',
  'GI Tagged':   'bg-indigo-600 text-white',
  'Pan India':   'bg-sky-600 text-white',
  'Coming Soon': 'bg-zinc-600 text-white',
  default:       'bg-green-700 text-white',
}

export default function ProductCard({ product, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError,  setImgError]  = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const { add: addToCart } = useCart()
  const { toggle, has }    = useWishlist()
  const wished             = has(product.id)
  const discount           = getDiscount(product.price, product.originalPrice)
  const activeBadge        = product.comingSoon ? 'Coming Soon' : product.badge
  const badgeClass         = BADGE_STYLES[activeBadge] ?? BADGE_STYLES.default

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.comingSoon) return
    addToCart(product.id, 1, product.name)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product.id, product.name)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={product.comingSoon ? {} : { y: -4 }}
      /* FIX 1: Added `relative z-0 hover:z-10` to prevent Framer Motion's stacking context from overlapping other cards in the grid */
      className="h-full relative z-0 hover:z-10"
    >
      <Link to={`/products/${product.id}`} className="group block h-full">
        <div
          className="bg-white rounded-xl sm:rounded-2xl border border-green-100 overflow-hidden h-full flex flex-col"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >

          {/* ── Image ───────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/40 aspect-[4/3]">

            {!imgLoaded && !imgError && <div className="absolute inset-0 skeleton" />}

            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                } ${product.comingSoon ? 'grayscale-[30%] opacity-80' : ''}`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-green-50 to-green-100">
                <span className="text-4xl sm:text-5xl">{product.emoji || '🌿'}</span>
                <span className="text-[10px] text-green-400 font-medium">{product.category}</span>
              </div>
            )}

            {!product.comingSoon && (
              /* FIX 2: Added `pointer-events-none` so this gradient overlay doesn't steal the hover state from the mouse */
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {activeBadge && (
                <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide shadow-sm ${badgeClass}`}>
                  {activeBadge}
                </span>
              )}
              {discount && !product.comingSoon && (
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-red-500 text-white shadow-sm">
                  −{discount}%
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 ${
                wished
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 backdrop-blur-sm text-green-600 hover:bg-rose-50 hover:text-rose-500'
              }`}
            >
              <Heart size={12} className="sm:hidden" fill={wished ? 'currentColor' : 'none'} strokeWidth={2} />
              <Heart size={14} className="hidden sm:block" fill={wished ? 'currentColor' : 'none'} strokeWidth={2} />
            </button>

            {/* Add to cart hover bar */}
            {/* FIX 3 Note: I removed `hidden sm:block` here so it appears on mobile too. If you prefer this pop-up to ONLY be on desktop, add `hidden sm:block` back to this div. */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <button
                onClick={handleAddToCart}
                disabled={product.comingSoon}
                className={`w-full py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-lg ${
                  product.comingSoon
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none'
                    : justAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-green-800 hover:bg-green-800 hover:text-white'
                }`}
              >
                {product.comingSoon ? (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> Coming Soon
                  </span>
                ) : justAdded ? (
                  <AnimatePresence mode="wait">
                    <motion.span key="added" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                      <Check size={13} strokeWidth={3} /> Added!
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                      <ShoppingCart size={13} /> Add to Cart
                    </motion.span>
                  </AnimatePresence>
                )}
              </button>
            </div>
          </div>

          {/* ── Info zone ─────────────────────────────────────────────────── */}
          <div className="p-2.5 sm:p-3.5 flex flex-col flex-1">

            {/* Origin */}
            <div className="flex items-center gap-1 mb-1">
              <MapPin size={8} className="text-green-400 flex-shrink-0 sm:hidden" />
              <MapPin size={9} className="text-green-400 flex-shrink-0 hidden sm:block" />
              <span className="text-[9px] sm:text-[10px] text-green-400 font-medium truncate leading-none">
                {product.origin}
              </span>
            </div>

            {/* Name */}
            <h3 className="font-semibold text-[12px] sm:text-[13.5px] text-green-900 leading-snug line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-green-700 transition-colors">
              {product.name}
            </h3>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={9} className={`sm:hidden ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className={`hidden sm:block ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                ))}
              </div>
              <span className="text-[9px] sm:text-[10px] text-green-400 font-medium">
                {product.rating}
                <span className="hidden sm:inline text-green-300"> ({product.reviews})</span>
              </span>
            </div>

            <div className="flex-1" />

            {/* ── Price + CTA row ──────────────────────────────────────────── */}
            <div className="flex items-center justify-between gap-1 mt-1">

              {/* Left: price or coming soon pill */}
              <div className="min-w-0">
                {product.comingSoon ? (
                  <span className="text-[10px] sm:text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-lg inline-block">
                    Available Soon
                  </span>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-[13px] sm:text-[15px] font-bold text-green-900 leading-none">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[9px] sm:text-[11px] text-green-300 line-through leading-none">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[8px] sm:text-[10px] text-green-400 mt-0.5 block truncate">
                      {product.unit}
                    </span>
                  </>
                )}
              </div>

              {/* Right: add button */}
              <motion.button
                whileTap={product.comingSoon ? {} : { scale: 0.85 }}
                onClick={handleAddToCart}
                disabled={product.comingSoon}
                aria-label={product.comingSoon ? 'Coming soon' : 'Add to cart'}
                className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold transition-all duration-200 ${
                  product.comingSoon
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    : justAdded
                    ? 'bg-green-500 text-white active:scale-90'
                    : 'bg-green-100 text-green-800 hover:bg-green-800 hover:text-white active:scale-90'
                }`}
              >
                {product.comingSoon ? (
                  <>
                    <Calendar size={11} className="sm:hidden" />
                    <Calendar size={13} className="hidden sm:block" />
                  </>
                ) : justAdded ? (
                  <>
                    <Check size={12} strokeWidth={3} className="sm:hidden" />
                    <Check size={14} strokeWidth={3} className="hidden sm:block" />
                  </>
                ) : (
                  <>
                    <span className="text-base leading-none sm:hidden">+</span>
                    <span className="text-lg leading-none hidden sm:block">+</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Tags — desktop only */}
            {!product.comingSoon && product.tags?.length > 0 && (
              <div className="hidden sm:flex gap-1.5 mt-2.5 flex-wrap">
                {product.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] font-semibold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      </Link>
    </motion.div>
  )
}