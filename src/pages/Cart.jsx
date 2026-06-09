import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Minus, Plus, Trash2, Tag, ArrowRight, ChevronLeft, MessageCircle } from 'lucide-react'
import { useCart } from '../hooks'
import { formatPrice } from '../utils'
import PageWrapper from '../components/ui/PageWrapper'
import useSEO from '../hooks/useSEO'

export default function Cart() {
  useSEO({ title: 'My Cart' })
  const navigate = useNavigate()
  const { cartProducts, subtotal, delivery, total, discountAmt, coupon, updateQty, remove, applyCoupon, removeCoupon } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleCoupon = (e) => {
    e.preventDefault()
    if (!couponInput.trim()) return
    const ok = applyCoupon(couponInput.trim())
    if (ok) { setCouponError(''); setCouponInput('') }
    else setCouponError('Invalid or expired code')
  }

  if (cartProducts.length === 0) return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingCart size={36} className="text-green-300" />
          </div>
          <h2 className="font-display text-2xl text-green-900 mb-2">Your cart is empty</h2>
          <p className="text-green-500 mb-6">Add some fresh products from Kashmir!</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
            <ChevronLeft size={16} /> Start Shopping
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart size={22} className="text-green-700" />
          <h1 className="font-display font-bold text-2xl text-green-900">Shopping Cart</h1>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">{cartProducts.length} item{cartProducts.length > 1 ? 's' : ''}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-4 sm:gap-6">
          {/* Cart items */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-card overflow-hidden">
            <AnimatePresence>
              {cartProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, paddingTop: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center gap-3 p-3 sm:gap-4 sm:p-5 ${i < cartProducts.length - 1 ? 'border-b border-green-50' : ''}`}
                >
                  <Link to={`/products/${product.id}`} className="w-20 h-20 rounded-xl overflow-hidden bg-green-50 flex-shrink-0 border border-green-100 hover:opacity-90 transition-opacity">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${product.id}`} className="font-semibold text-sm text-green-900 hover:text-green-700 transition-colors line-clamp-1">{product.name}</Link>
                    <p className="text-xs text-green-500 mt-0.5">📍 {product.origin}</p>
                    <p className="text-xs text-green-400 mt-0.5">{product.unit}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center border border-green-200 rounded-full overflow-hidden">
                        <button onClick={() => updateQty(product.id, product.qty - 1)} className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-green-900">{product.qty}</span>
                        <button onClick={() => updateQty(product.id, product.qty + 1)} className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-green-800">{formatPrice(product.price * product.qty)}</div>
                    <div className="text-xs text-green-400">{formatPrice(product.price)} each</div>
                    <button onClick={() => remove(product.id, product.name)} className="mt-3 p-1.5 rounded-lg text-green-300 hover:text-rose-400 hover:bg-rose-50 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="p-4 border-t border-green-50 bg-green-50/40">
              <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-800 transition-colors">
                <ChevronLeft size={14} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-green-100 shadow-card p-5">
              <h3 className="font-semibold text-green-900 mb-4">Order Summary</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-green-700">
                  <span>Subtotal ({cartProducts.length} items)</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discountAmt > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({coupon?.code})</span>
                    <span className="font-semibold">-{formatPrice(discountAmt)}</span>
                  </div>
                )}
                <div className="flex justify-between text-green-700">
                  <span>Delivery</span>
                  <span className={`font-semibold ${delivery === 0 ? 'text-green-600' : ''}`}>
                    {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                  </span>
                </div>
                {delivery === 0 && <p className="text-xs text-green-500">✓ Free delivery applied</p>}
                {delivery > 0 && <p className="text-xs text-green-400">Add {formatPrice(999 - subtotal)} more for free delivery</p>}
                <div className="flex justify-between text-green-900 font-bold text-base pt-3 border-t border-green-100">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Coupon */}
              {!coupon ? (
                <form onSubmit={handleCoupon} className="mt-4">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
                      <input
                        type="text" value={couponInput} onChange={e => { setCouponInput(e.target.value); setCouponError('') }}
                        placeholder="Promo code"
                        className="w-full pl-8 pr-3 py-2.5 text-sm border border-green-200 rounded-xl focus:outline-none focus:border-green-400 text-green-900 placeholder:text-green-300"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2.5 bg-green-100 hover:bg-green-200 text-green-800 text-sm font-semibold rounded-xl transition-colors">Apply</button>
                  </div>
                  {couponError && <p className="text-xs text-rose-500 mt-1">{couponError}</p>}
                  <p className="text-xs text-green-400 mt-1">Try: FRESH10, KASHMIR20, ORGANIC15</p>
                </form>
              ) : (
                <div className="mt-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                  <div>
                    <span className="text-xs font-bold text-green-700">{coupon.code}</span>
                    <span className="text-xs text-green-500 ml-1">— {coupon.discount}% off</span>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-rose-500 hover:text-rose-700 font-medium transition-colors">Remove</button>
                </div>
              )}

              <Link
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full mt-4 py-3.5 bg-green-800 hover:bg-green-700 text-white rounded-full font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
              >
                Proceed to Checkout <ArrowRight size={15} />
              </Link>

              {/* WhatsApp Order */}
              <button
                onClick={() => {
                  const lines = cartProducts.map(p => `• ${p.name} ×${p.qty} — ₹${(p.price * p.qty).toLocaleString('en-IN')}`).join('\n')
                  const msg = `Hi! I'd like to place an order:\n\n${lines}\n\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\nDelivery: ${delivery === 0 ? 'FREE' : '₹' + delivery}\nTotal: ₹${total.toLocaleString('en-IN')}\n\nPlease confirm availability.`
                  window.open(`https://wa.me/919186361336?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
                }}
                className="flex items-center justify-center gap-2 w-full mt-2 py-3 bg-[#25D366] hover:bg-[#1fbd5a] text-white rounded-full font-semibold text-sm transition-all hover:shadow-lg active:scale-[0.98]"
              >
                <MessageCircle size={16} /> Order via WhatsApp
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[['🔒', 'Secure', 'Payment'], ['🚚', 'Fast', 'Delivery'], ['✅', 'Quality', 'Guaranteed']].map(([icon, t, s]) => (
                <div key={t} className="bg-white rounded-xl border border-green-100 p-3 text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-[10px] font-bold text-green-800">{t}</div>
                  <div className="text-[9px] text-green-400">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
