import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Star, MapPin, Shield, Truck, ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useCart, useWishlist } from '../hooks'
import { formatPrice, getDiscount } from '../utils'
import PageWrapper from '../components/ui/PageWrapper'
import ProductCard from '../components/ui/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = PRODUCTS.find(p => p.id === Number(id) || p.slug === id)

  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [addedAnim, setAddedAnim] = useState(false)

  const { add: addToCart } = useCart()
  const { toggle, has } = useWishlist()
  const wished = product ? has(product.id) : false
  const discount = product ? getDiscount(product.price, product.originalPrice) : null

  if (!product) return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-display text-2xl text-green-900 mb-2">Product not found</h2>
        <p className="text-green-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
          <ChevronLeft size={16} /> Browse Products
        </Link>
      </div>
    </PageWrapper>
  )

  const related = PRODUCTS.filter(p => p.id !== product.id && p.subcategory === product.subcategory).slice(0, 4)
  const allImages = product.images?.length ? product.images : [product.image]

  const handleAdd = () => {
    addToCart(product.id, qty, product.name)
    setAddedAnim(true)
    setTimeout(() => setAddedAnim(false), 1800)
  }

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <div className="border-b border-green-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm">
          <Link to="/" className="text-green-500 hover:text-green-700 transition-colors">Home</Link>
          <ChevronRight size={13} className="text-green-300" />
          <Link to="/products" className="text-green-500 hover:text-green-700 transition-colors">Products</Link>
          <ChevronRight size={13} className="text-green-300" />
          <button onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}`)} className="text-green-500 hover:text-green-700 transition-colors">{product.category}</button>
          <ChevronRight size={13} className="text-green-300" />
          <span className="text-green-800 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Images */}
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 aspect-square mb-3 border border-green-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={allImages[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImg === i ? 'border-green-600 shadow-md' : 'border-green-100 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}`)}
                className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors"
              >
                <MapPin size={11} /> {product.origin}
              </button>
              {product.inStock
                ? <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">✓ In Stock</span>
                : <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">Out of Stock</span>
              }
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl text-green-900 leading-tight mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-green-200 fill-green-200'} />
                ))}
              </div>
              <span className="text-sm font-semibold text-green-800">{product.rating}</span>
              <span className="text-sm text-green-400">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-bold text-green-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-green-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-sm text-green-500 mb-5">{product.unit} · {product.weight}</p>

            <p className="text-green-700 leading-relaxed mb-6 text-[15px]">{product.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map(t => (
                <span key={t} className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full">
                  <Check size={10} className="text-green-500" /> {t}
                </span>
              ))}
            </div>

            {/* Qty + Actions */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-0 border border-green-200 rounded-full overflow-hidden bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-bold text-green-900 text-sm">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-sm text-green-500">Total: <span className="font-bold text-green-800">{formatPrice(product.price * qty)}</span></span>
            </div>

            <div className="flex gap-3 mb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all ${
                  addedAnim
                    ? 'bg-green-600 text-white'
                    : 'bg-green-800 hover:bg-green-700 text-white hover:shadow-lg'
                } disabled:bg-green-200 disabled:cursor-not-allowed`}
              >
                <AnimatePresence mode="wait">
                  {addedAnim
                    ? <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2"><Check size={16} /> Added!</motion.span>
                    : <motion.span key="add" className="flex items-center gap-2"><ShoppingCart size={16} /> Add to Cart</motion.span>
                  }
                </AnimatePresence>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggle(product.id, product.name)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                  wished
                    ? 'border-rose-400 bg-rose-50 text-rose-500'
                    : 'border-green-200 hover:border-rose-300 hover:bg-rose-50 text-green-400 hover:text-rose-400'
                }`}
              >
                <Heart size={18} className={wished ? 'fill-rose-400' : ''} />
              </motion.button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Truck size={15} />, title: 'Free Delivery', sub: 'On orders ₹999+' },
                { icon: <Shield size={15} />, title: 'Quality Guarantee', sub: 'Full refund if not fresh' },
              ].map(f => (
                <div key={f.title} className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 border border-green-100">
                  <span className="text-green-600">{f.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-green-800">{f.title}</div>
                    <div className="text-[10px] text-green-500">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display font-bold text-2xl text-green-900 mb-6">You may also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  )
}
