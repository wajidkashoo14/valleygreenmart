import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Star, MapPin, Check } from 'lucide-react'
import { useCart, useWishlist } from '../../hooks'
import { formatPrice, getDiscount } from '../../utils'

const BADGE_STYLES = {
  Premium:    'bg-amber-500 text-white',
  Bestseller: 'bg-green-700 text-white',
  New:        'bg-sky-500 text-white',
  Rare:       'bg-purple-600 text-white',
  Gift:       'bg-rose-500 text-white',
  A2:         'bg-sky-600 text-white',
  Authentic:  'bg-earth-600 bg-amber-800 text-white',
  'GI Tagged':'bg-indigo-600 text-white',
  default:    'bg-green-700 text-white',
}

export default function ProductCard({ product, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError,  setImgError]  = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const { add: addToCart } = useCart()
  const { toggle, has }    = useWishlist()
  const wished             = has(product.id)
  const discount           = getDiscount(product.price, product.originalPrice)
  const badgeClass         = BADGE_STYLES[product.badge] ?? BADGE_STYLES.default

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/products/${product.id}`} className="group block h-full">
        <div className="bg-white rounded-2xl border border-green-100/80 overflow-hidden h-full flex flex-col"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >

          {/* ── Image zone ────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/40" style={{ height: 220 }}>

            {/* Skeleton shimmer while loading */}
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 skeleton" />
            )}

            {/* Product image */}
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              /* Emoji fallback when image fails */
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-50 to-green-100">
                <span className="text-6xl">{product.emoji || '🌿'}</span>
                <span className="text-xs text-green-400 font-medium">{product.category}</span>
              </div>
            )}

            {/* Subtle dark vignette at bottom — makes text readable & adds depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* ── Top-left badges ─────────────────────────────────────────── */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${badgeClass}`}>
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white shadow-sm">
                  −{discount}%
                </span>
              )}
            </div>

            {/* ── Wishlist button — always visible, top right ──────────────── */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
                wished
                  ? 'bg-rose-500 text-white scale-110'
                  : 'bg-white/90 backdrop-blur-sm text-green-600 hover:bg-rose-50 hover:text-rose-500 hover:scale-110'
              }`}
            >
              <Heart size={14} fill={wished ? 'currentColor' : 'none'} strokeWidth={2} />
            </button>

            {/* ── Add to cart — slides up on hover ────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.96 }}
                className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${
                  justAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-green-800 hover:bg-green-800 hover:text-white'
                }`}
              >
                <AnimatePresence mode="wait">
                  {justAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check size={14} strokeWidth={3} /> Added!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* ── Info zone ─────────────────────────────────────────────────── */}
          <div className="p-4 flex flex-col flex-1">

            {/* Origin */}
            <div className="flex items-center gap-1 mb-1.5">
              <MapPin size={9} className="text-green-400 flex-shrink-0" />
              <span className="text-[10px] text-green-400 font-medium truncate">{product.origin}</span>
            </div>

            {/* Product name */}
            <h3 className="font-semibold text-[14px] text-green-900 leading-snug line-clamp-2 mb-2 group-hover:text-green-700 transition-colors">
              {product.name}
            </h3>

            {/* Star rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={
                      i < Math.floor(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : i < product.rating
                        ? 'text-amber-300 fill-amber-300'
                        : 'text-gray-200 fill-gray-200'
                    }
                  />
                ))}
              </div>
              <span className="text-[10px] text-green-400 font-medium">
                {product.rating} <span className="text-green-300">({product.reviews})</span>
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Price row */}
            <div className="flex items-center justify-between mt-1">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[17px] font-bold text-green-900 leading-none">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-green-300 line-through leading-none">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-green-400 mt-0.5 block">{product.unit}</span>
              </div>

              {/* Quick add button */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={handleAddToCart}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 flex-shrink-0 ${
                  justAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-800 hover:bg-green-800 hover:text-white'
                }`}
              >
                {justAdded ? <Check size={14} strokeWidth={3} /> : '+'}
              </motion.button>
            </div>

            {/* Tags — show first 2 */}
            {product.tags?.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {product.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] font-semibold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
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
