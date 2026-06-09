import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Clock, MessageCircle, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { getUserOrders } from '../services/orderService'
import { formatPrice } from '../utils'
import PageWrapper from '../components/ui/PageWrapper'
import useSEO from '../hooks/useSEO'

const STATUS_STYLES = {
  confirmed:  { label: 'Confirmed',   cls: 'bg-blue-100 text-blue-700' },
  processing: { label: 'Processing',  cls: 'bg-amber-100 text-amber-700' },
  shipped:    { label: 'Shipped',     cls: 'bg-purple-100 text-purple-700' },
  delivered:  { label: 'Delivered',   cls: 'bg-green-100 text-green-700' },
  cancelled:  { label: 'Cancelled',   cls: 'bg-red-100 text-red-700' },
}

function formatDate(ts) {
  if (!ts) return '—'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Orders() {
  useSEO({ title: 'My Orders' })
  const { user } = useAuthStore()
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    if (!user?.id) return
    getUserOrders(user.id)
      .then(setOrders)
      .catch(() => setError('Could not load orders. Please try again.'))
      .finally(() => setLoading(false))
  }, [user?.id])

  const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  if (loading) return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-green-100 p-5 animate-pulse space-y-3">
            <div className="h-4 bg-green-100 rounded-full w-1/3" />
            <div className="h-3 bg-green-100 rounded-full w-1/2" />
            <div className="h-3 bg-green-100 rounded-full w-1/4" />
          </div>
        ))}
      </div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-gradient-to-br from-green-950 to-green-900 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 text-white mb-1">
            <ShoppingBag size={22} />
            <h1 className="font-display text-2xl sm:text-3xl font-bold">My Orders</h1>
          </div>
          <p className="text-green-400 text-sm">Track and review all your past orders</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">{error}</div>
        )}

        {!loading && orders.length === 0 && !error && (
          <div className="text-center py-20">
            <Package size={48} className="text-green-200 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-green-900 mb-2">No orders yet</h3>
            <p className="text-green-500 text-sm mb-6">When you place an order it will appear here.</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-green-700 transition-colors">
              Start Shopping
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order, i) => {
            const status = STATUS_STYLES[order.status] ?? STATUS_STYLES.confirmed
            const open   = expanded[order.id]
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <button
                  onClick={() => toggle(order.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left hover:bg-green-50/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold text-green-900">{order.orderId}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${status.cls}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-green-500">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {formatDate(order.placedAt)}
                      </span>
                      <span>{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</span>
                      <span className="font-semibold text-green-700">
                        {formatPrice(order.pricing?.total)}
                      </span>
                    </div>
                  </div>
                  {open ? <ChevronUp size={16} className="text-green-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-green-400 flex-shrink-0" />}
                </button>

                {/* Expanded detail */}
                {open && (
                  <div className="border-t border-green-100 px-4 sm:px-5 pb-5 pt-4 space-y-4">

                    {/* Items */}
                    <div className="space-y-3">
                      {order.items?.map((item, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-green-50 flex-shrink-0 border border-green-100">
                            {item.image
                              ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center text-xl">🌿</div>
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-green-900 truncate">{item.name}</div>
                            <div className="text-xs text-green-400">Qty: {item.qty}</div>
                          </div>
                          <div className="text-sm font-bold text-green-800 flex-shrink-0">
                            {formatPrice(item.price * item.qty)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="bg-green-50 rounded-xl p-3 text-sm space-y-1.5">
                      <div className="flex justify-between text-green-600">
                        <span>Subtotal</span><span>{formatPrice(order.pricing?.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Delivery</span>
                        <span>{order.pricing?.delivery === 0 ? 'FREE' : formatPrice(order.pricing?.delivery)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-900 pt-1 border-t border-green-200">
                        <span>Total</span><span>{formatPrice(order.pricing?.total)}</span>
                      </div>
                    </div>

                    {/* Delivery address */}
                    <div className="text-xs text-green-500 leading-relaxed">
                      <span className="font-semibold text-green-700">Delivering to: </span>
                      {order.shippingAddress?.firstName} {order.shippingAddress?.lastName},{' '}
                      {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
                      {order.shippingAddress?.state} — {order.shippingAddress?.pin}
                    </div>

                    {/* WhatsApp help */}
                    <a
                      href={`https://wa.me/919186361336?text=${encodeURIComponent(`Hi! I need help with my order ${order.orderId}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fbd5a] text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors"
                    >
                      <MessageCircle size={13} /> Track / Get Help on WhatsApp
                    </a>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </PageWrapper>
  )
}
