import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck, Eye, EyeOff, Package, Users, TrendingUp,
  Clock, Search, ChevronDown, ChevronUp, RefreshCw, LogOut
} from 'lucide-react'
import { getAllOrders } from '../../services/orderService'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'vgm@admin2025'

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
  return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatPrice(v) {
  if (v == null) return '—'
  return `₹${Number(v).toLocaleString('en-IN')}`
}

/* ─── Login Screen ─── */
function LoginScreen({ onAuth }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState(false)

  const attempt = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onAuth(); setErr(false) }
    else { setErr(true); setPw('') }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 to-green-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-green-900 mx-auto mb-5">
          <ShieldCheck size={26} className="text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-green-900 text-center mb-1">Admin Panel</h1>
        <p className="text-green-500 text-sm text-center mb-6">Valley Green Mart — restricted access</p>

        <form onSubmit={attempt} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false) }}
              placeholder="Enter password"
              autoFocus
              className={`w-full border rounded-xl px-4 py-3 text-sm text-green-900 placeholder:text-green-300 focus:outline-none transition-colors pr-10 ${err ? 'border-red-400 bg-red-50' : 'border-green-200 focus:border-green-500'}`}
            />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {err && <p className="text-xs text-red-500">Incorrect password. Try again.</p>}
          <button type="submit" className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  )
}

/* ─── Stat Card ─── */
function Stat({ icon, label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-green-100 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-green-400">{icon}<span className="text-xs font-semibold text-green-500">{label}</span></div>
      <div className="text-2xl font-bold text-green-900">{value}</div>
      {sub && <div className="text-xs text-green-400 mt-0.5">{sub}</div>}
    </div>
  )
}

/* ─── Main Panel ─── */
function Panel() {
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [search,  setSearch]  = useState('')
  const [expanded, setExpanded] = useState({})
  const [authed,  setAuthed]  = useState(true)

  const load = () => {
    setLoading(true)
    getAllOrders()
      .then(setOrders)
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    return (
      o.orderId?.toLowerCase().includes(q) ||
      o.customer?.name?.toLowerCase().includes(q) ||
      o.customer?.phone?.includes(q) ||
      o.shippingAddress?.city?.toLowerCase().includes(q)
    )
  })

  // Stats
  const totalRevenue = orders.reduce((s, o) => s + (o.pricing?.total || 0), 0)
  const uniqueCustomers = new Set(orders.map(o => o.customer?.phone)).size
  const todayCount = orders.filter(o => {
    if (!o.placedAt) return false
    const d = o.placedAt.toDate ? o.placedAt.toDate() : new Date(o.placedAt)
    const today = new Date()
    return d.toDateString() === today.toDateString()
  }).length

  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-green-950 to-green-900 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck size={18} />
          <span className="font-display font-bold text-lg">Admin Panel</span>
          <span className="text-green-400 text-sm hidden sm:block">— Valley Green Mart</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="flex items-center gap-1.5 text-green-400 hover:text-white text-xs font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10">
            <RefreshCw size={13} /> Refresh
          </button>
          <button onClick={() => setAuthed(false)} className="flex items-center gap-1.5 text-green-400 hover:text-white text-xs font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat icon={<Package size={16} />} label="Total Orders" value={orders.length} />
          <Stat icon={<TrendingUp size={16} />} label="Revenue" value={formatPrice(totalRevenue)} />
          <Stat icon={<Users size={16} />} label="Customers" value={uniqueCustomers} />
          <Stat icon={<Clock size={16} />} label="Today" value={todayCount} sub="orders placed" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-400" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name, phone, city…"
            className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-xl text-sm text-green-900 placeholder:text-green-300 focus:outline-none focus:border-green-400"
          />
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">{error}</div>}

        {/* Orders table */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-green-100 flex items-center justify-between">
            <h2 className="font-semibold text-green-900">
              Orders <span className="text-green-400 text-sm font-normal">({filtered.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-green-400 text-sm">No orders found.</div>
          ) : (
            <div className="divide-y divide-green-50">
              {filtered.map(order => {
                const st = STATUS_STYLES[order.status] ?? STATUS_STYLES.confirmed
                const open = expanded[order.id]
                return (
                  <div key={order.id}>
                    <button
                      onClick={() => toggle(order.id)}
                      className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-left hover:bg-green-50/50 transition-colors"
                    >
                      {/* Order ID + status */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-mono text-sm font-bold text-green-900">{order.orderId}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                        </div>
                        <div className="text-xs text-green-400 flex flex-wrap gap-x-3 gap-y-0.5">
                          <span>{order.customer?.name}</span>
                          <span>{order.customer?.phone}</span>
                          <span>{formatDate(order.placedAt)}</span>
                        </div>
                      </div>
                      {/* Total */}
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-green-800 text-sm">{formatPrice(order.pricing?.total)}</div>
                        <div className="text-xs text-green-400">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</div>
                      </div>
                      {open ? <ChevronUp size={14} className="text-green-400 flex-shrink-0" /> : <ChevronDown size={14} className="text-green-400 flex-shrink-0" />}
                    </button>

                    {open && (
                      <div className="bg-green-50/40 border-t border-green-100 px-4 sm:px-5 py-4 space-y-4">
                        {/* Items */}
                        <div className="space-y-2">
                          {order.items?.map((item, j) => (
                            <div key={j} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-green-100">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-green-50 flex-shrink-0 border border-green-100">
                                {item.image
                                  ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  : <div className="w-full h-full flex items-center justify-center text-lg">🌿</div>
                                }
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-green-900 truncate">{item.name}</div>
                                <div className="text-xs text-green-400">Qty: {item.qty} × {formatPrice(item.price)}</div>
                              </div>
                              <div className="text-sm font-bold text-green-800">{formatPrice(item.price * item.qty)}</div>
                            </div>
                          ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {/* Pricing */}
                          <div className="bg-white rounded-xl p-3 border border-green-100 text-sm space-y-1.5">
                            <div className="font-semibold text-green-700 mb-2">Pricing</div>
                            <div className="flex justify-between text-green-600"><span>Subtotal</span><span>{formatPrice(order.pricing?.subtotal)}</span></div>
                            <div className="flex justify-between text-green-600">
                              <span>Delivery</span>
                              <span>{order.pricing?.delivery === 0 ? 'FREE' : formatPrice(order.pricing?.delivery)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-green-900 pt-1.5 border-t border-green-100"><span>Total</span><span>{formatPrice(order.pricing?.total)}</span></div>
                          </div>

                          {/* Address */}
                          <div className="bg-white rounded-xl p-3 border border-green-100 text-sm">
                            <div className="font-semibold text-green-700 mb-2">Shipping Address</div>
                            <p className="text-green-600 leading-relaxed text-xs">
                              {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}<br />
                              {order.shippingAddress?.address}<br />
                              {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.pin}<br />
                              📞 {order.shippingAddress?.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="text-green-400">Payment: <span className="font-semibold text-green-700 capitalize">{order.paymentMethod || '—'}</span></span>
                          {order.customer?.email && <span className="text-green-400">Email: <span className="font-semibold text-green-700">{order.customer.email}</span></span>}
                          <a
                            href={`https://wa.me/${order.customer?.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${order.customer?.name}, your order ${order.orderId} is being processed. We'll update you shortly! — Valley Green Mart`)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1fbd5a] text-white px-3 py-1.5 rounded-full font-semibold transition-colors"
                          >
                            📲 WhatsApp Customer
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />
  return <Panel />
}
