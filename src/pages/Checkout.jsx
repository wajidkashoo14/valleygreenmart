import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MapPin, CreditCard, Truck, Check, ShoppingBag, AlertCircle, Clock } from 'lucide-react'
import { useCart } from '../hooks'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'
import { formatPrice } from '../utils'
import { getDeliveryETA } from '../utils/deliveryEta'
import { saveOrder } from '../services/orderService'
import { sendOrderConfirmation } from '../services/emailService'
import PageWrapper from '../components/ui/PageWrapper'

const STEPS = ['Address', 'Payment', 'Review']

const PAYMENT_METHODS = [
  { id: 'cod',     label: 'Cash on Delivery', icon: '💵', sub: 'Pay when your order arrives',    available: true  },
  { id: 'upi',     label: 'UPI',              icon: '📱', sub: 'GPay, PhonePe, Paytm & more',    available: false },
  { id: 'card',    label: 'Debit / Credit Card', icon: '💳', sub: 'Visa, Mastercard, RuPay',      available: false },
  { id: 'netbank', label: 'Net Banking',       icon: '🏦', sub: 'All major banks supported',      available: false },
]

export default function Checkout() {
  const [step,     setStep]     = useState(0)
  const [placing,  setPlacing]  = useState(false)
  const [placed,   setPlaced]   = useState(false)
  const [payMethod, setPayMethod] = useState('cod')
  const [errors,   setErrors]   = useState({})

  const [orderId, setOrderId] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName:  '',
    phone:     '',
    email:     '',
    address:   '',
    city:      'Srinagar',
    pin:       '',
    state:     'Jammu & Kashmir',
  })

  const navigate  = useNavigate()
  const toast     = useToastStore()
  const { cartProducts, subtotal, delivery, total, discountAmt, clearCart } = useCart()
  const { user }  = useAuthStore()

  const eta = getDeliveryETA(form.state)

  // Redirect to cart if cart is empty (but not after placing an order)
  useEffect(() => {
    if (!placed && !placing && cartProducts.length === 0) navigate('/cart', { replace: true })
  }, [cartProducts.length, placed, placing])

  const setField = k => e => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    // Clear error on type
    if (errors[k]) setErrors(er => { const n = { ...er }; delete n[k]; return n })
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateAddress = () => {
    const e = {}
    if (!form.firstName.trim())                          e.firstName = 'First name is required'
    if (!form.lastName.trim())                           e.lastName  = 'Last name is required'
    if (!form.phone.trim())                              e.phone     = 'Phone number is required'
    else if (!/^[+\d][\d\s\-()]{7,15}$/.test(form.phone)) e.phone   = 'Enter a valid phone number'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
                                                         e.email     = 'Enter a valid email address'
    if (!form.address.trim())                            e.address   = 'Address is required'
    if (!form.city.trim())                               e.city      = 'City is required'
    if (!form.pin.trim())                                e.pin       = 'PIN code is required'
    else if (!/^\d{6}$/.test(form.pin))                  e.pin       = 'Enter a valid 6-digit PIN'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleContinueToPayment = () => {
    if (validateAddress()) setStep(1)
  }

  // ── Place order ─────────────────────────────────────────────────────────────
  const handlePlaceOrder = async () => {
    setPlacing(true)
    try {
      const newOrderId = `VGM-${Date.now()}`
      setOrderId(newOrderId)

      // Save to Firestore
      await saveOrder({
        user, form, cartProducts, total, subtotal, delivery,
        payMethod, orderId: newOrderId,
      }).catch(err => console.error('Firestore save failed:', err))

      // Send confirmation email (fire-and-forget)
      sendOrderConfirmation({
        form, cartProducts, total, subtotal, delivery,
        orderId: newOrderId, eta: eta.label,
      }).catch(err => console.warn('Email send failed:', err))

      setPlaced(true)   // set BEFORE clearCart so useEffect sees placed=true
      clearCart()
      toast.add('🎉 Order placed successfully!')
    } finally {
      setPlacing(false)
    }
  }

  // ── Order placed screen ──────────────────────────────────────────────────────
  // Auto-redirect home 5s after order placed
  useEffect(() => {
    if (!placed) return
    const t = setTimeout(() => navigate('/', { replace: true }), 5000)
    return () => clearTimeout(t)
  }, [placed])

  if (placed) return (
    <PageWrapper>
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" strokeWidth={3} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-3xl font-bold text-green-900 mb-3">Order Placed! 🎉</h2>
          <p className="text-green-500 text-xs font-mono mb-4">{orderId}</p>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Clock size={14} /> Expected delivery: {eta.label}
          </div>
          {form.email ? (
            <p className="text-green-600 mb-2">
              Order confirmation sent to <span className="font-semibold">{form.email}</span>
            </p>
          ) : (
            <p className="text-green-600 mb-2">We'll contact you on <span className="font-semibold">{form.phone}</span> to confirm.</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-green-800 hover:bg-green-700 text-white rounded-full font-semibold text-sm transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-3 border border-green-300 hover:bg-green-50 text-green-700 rounded-full font-semibold text-sm transition-colors"
            >
              View My Orders
            </button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

        {/* Header + stepper */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl text-green-900 mb-5 flex items-center gap-2">
            <ShoppingBag size={22} className="text-green-700" /> Checkout
          </h1>
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${i <= step ? 'text-green-800' : 'text-green-300'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step    ? 'bg-green-600 text-white' :
                    i === step  ? 'bg-green-800 text-white ring-4 ring-green-200' :
                                  'bg-green-100 text-green-400'
                  }`}>
                    {i < step ? <Check size={12} strokeWidth={3} /> : i + 1}
                  </div>
                  <span className="hidden sm:inline">{s}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-12 sm:w-16 h-0.5 mx-2 transition-colors ${i < step ? 'bg-green-600' : 'bg-green-100'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-4 sm:gap-6">

          {/* ── Form panel ──────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">

              {/* Step 0 — Address */}
              {step === 0 && (
                <motion.div key="addr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin size={18} className="text-green-600" />
                    <h2 className="font-semibold text-green-900">Delivery Address</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Field label="First Name *"  value={form.firstName} onChange={setField('firstName')} placeholder="First Name"      error={errors.firstName} />
                    <Field label="Last Name *"   value={form.lastName}  onChange={setField('lastName')}  placeholder="Last Name"       error={errors.lastName} />
                    <Field label="Phone *"       value={form.phone}     onChange={setField('phone')}     placeholder="+91 77809 66909" error={errors.phone} type="tel" />
                    <Field
                      label="Email (for order confirmation)"
                      value={form.email}
                      onChange={setField('email')}
                      placeholder="you@example.com"
                      error={errors.email}
                      type="email"
                      hint="Optional — we'll send your order receipt here"
                    />
                    <Field label="PIN Code *"    value={form.pin}       onChange={setField('pin')}       placeholder="190003"          error={errors.pin} maxLength={6} />
                    <div className="sm:col-span-2">
                      <Field label="Address *" value={form.address} onChange={setField('address')} placeholder="House No, Street, Locality" error={errors.address} />
                    </div>
                    <Field label="City *" value={form.city} onChange={setField('city')} placeholder="Srinagar" error={errors.city} />
                    <div>
                      <label className="block text-xs font-semibold text-green-700 mb-1.5">State</label>
                      <select
                        value={form.state}
                        onChange={setField('state')}
                        className="w-full px-3 py-2.5 border border-green-200 rounded-xl text-sm text-green-900 focus:outline-none focus:border-green-400 bg-white font-body"
                      >
                        <option>Jammu &amp; Kashmir</option>
                        <option>Delhi</option>
                        <option>Punjab</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>Chandigarh</option>
                        <option>Uttar Pradesh</option>
                        <option>Rajasthan</option>
                        <option>Maharashtra</option>
                        <option>Karnataka</option>
                        <option>Tamil Nadu</option>
                        <option>West Bengal</option>
                        <option>Gujarat</option>
                        <option>Andhra Pradesh</option>
                        <option>Telangana</option>
                        <option>Kerala</option>
                        <option>Madhya Pradesh</option>
                        <option>Bihar</option>
                        <option>Odisha</option>
                        <option>Assam</option>
                        <option>Jharkhand</option>
                        <option>Chhattisgarh</option>
                        <option>Goa</option>
                      </select>
                    </div>
                  </div>

                  {/* ETA banner */}
                  <div className={`mt-5 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border ${
                    eta.fast
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    <Clock size={15} className="flex-shrink-0" />
                    <span>Estimated delivery to <strong>{form.state || 'your state'}</strong>: <strong>{eta.label}</strong></span>
                  </div>

                  <button
                    onClick={handleContinueToPayment}
                    className="mt-4 w-full sm:w-auto flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-md"
                  >
                    Continue to Payment <ChevronRight size={15} />
                  </button>
                </motion.div>
              )}

              {/* Step 1 — Payment */}
              {step === 1 && (
                <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <CreditCard size={18} className="text-green-600" />
                    <h2 className="font-semibold text-green-900">Payment Method</h2>
                  </div>

                  <div className="space-y-3">
                    {PAYMENT_METHODS.map(m => (
                      <button
                        key={m.id}
                        onClick={() => m.available && setPayMethod(m.id)}
                        disabled={!m.available}
                        className={`relative w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          !m.available
                            ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-70'
                            : payMethod === m.id
                            ? 'border-green-600 bg-green-50'
                            : 'border-green-100 hover:border-green-300'
                        }`}
                      >
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                          !m.available ? 'bg-gray-100 grayscale' : payMethod === m.id ? 'bg-green-100' : 'bg-green-50'
                        }`}>
                          {m.icon}
                        </div>

                        {/* Label + sub */}
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm ${!m.available ? 'text-gray-400' : 'text-green-900'}`}>
                            {m.label}
                          </div>
                          <div className={`text-xs mt-0.5 ${!m.available ? 'text-gray-300' : 'text-green-500'}`}>
                            {m.available ? m.sub : 'Coming soon'}
                          </div>
                        </div>

                        {/* Coming Soon badge */}
                        {!m.available && (
                          <span className="flex-shrink-0 text-[9px] font-bold bg-zinc-200 text-zinc-500 px-2 py-1 rounded-full uppercase tracking-wide">
                            Soon
                          </span>
                        )}

                        {/* Radio dot */}
                        {m.available && (
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            payMethod === m.id ? 'border-green-600 bg-green-600' : 'border-green-300'
                          }`}>
                            {payMethod === m.id && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* COD notice */}
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2 text-xs text-amber-700">
                    <Truck size={14} className="flex-shrink-0 mt-0.5" />
                    <span>For Cash on Delivery, please keep exact change ready at the time of delivery.</span>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(0)} className="px-6 py-3 border border-green-200 rounded-full text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors">
                      Back
                    </button>
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-md">
                      Review Order <ChevronRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Review */}
              {step === 2 && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="p-5 sm:p-6">
                  <h2 className="font-semibold text-green-900 mb-5 flex items-center gap-2">
                    <Check size={18} className="text-green-600" /> Review Order
                  </h2>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {cartProducts.map(p => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-green-50 border border-green-100">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-green-900 truncate">{p.name}</div>
                          <div className="text-xs text-green-500">Qty: {p.qty}</div>
                        </div>
                        <div className="font-bold text-sm text-green-800 flex-shrink-0">{formatPrice(p.price * p.qty)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Summary info */}
                  <div className="bg-green-50 rounded-xl p-4 text-sm space-y-2.5 mb-6">
                    <div className="flex justify-between gap-3">
                      <span className="text-green-500 flex-shrink-0">Delivering to</span>
                      <span className="text-green-900 font-medium text-right text-xs">
                        {form.firstName} {form.lastName}, {form.address}, {form.city} — {form.pin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">Phone</span>
                      <span className="text-green-900 font-medium">{form.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">Payment</span>
                      <span className="text-green-900 font-medium">💵 Cash on Delivery</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-green-200">
                      <span className="text-green-500 flex items-center gap-1"><Clock size={12} /> ETA</span>
                      <span className={`font-semibold text-xs px-2 py-1 rounded-full ${eta.fast ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {eta.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-3 border border-green-200 rounded-full text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors">
                      Back
                    </button>
                    <motion.button
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white py-3.5 rounded-full font-semibold text-sm transition-all disabled:bg-green-400"
                    >
                      {placing
                        ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <>Place Order — {formatPrice(total)} <ChevronRight size={15} /></>
                      }
                    </motion.button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Order summary sidebar ────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 h-fit lg:sticky lg:top-24">
            <h3 className="font-semibold text-green-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cartProducts.map(p => (
                <div key={p.id} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-green-50 border border-green-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-green-900 truncate">{p.name}</div>
                    <div className="text-[10px] text-green-400">×{p.qty}</div>
                  </div>
                  <div className="text-xs font-bold text-green-800 flex-shrink-0">{formatPrice(p.price * p.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-green-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-green-600">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span><span>-{formatPrice(discountAmt)}</span>
                </div>
              )}
              <div className="flex justify-between text-green-600">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-green-500 font-semibold' : ''}>
                  {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                </span>
              </div>
              <div className="flex justify-between text-green-600 text-xs">
                <span className="flex items-center gap-1"><Clock size={11} /> ETA</span>
                <span className={`font-semibold ${eta.fast ? 'text-green-600' : 'text-amber-600'}`}>{eta.label}</span>
              </div>
              <div className="flex justify-between text-green-900 font-bold text-base pt-2 border-t border-green-100">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}

// ── Reusable form field ──────────────────────────────────────────────────────
function Field({ label, error, hint, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-green-700 mb-1.5">{label}</label>
      <input
        {...props}
        className={`w-full px-3 py-2.5 border rounded-xl text-sm text-green-900 placeholder:text-green-300 focus:outline-none transition-colors font-body bg-white ${
          error
            ? 'border-red-300 focus:border-red-400'
            : 'border-green-200 focus:border-green-400'
        }`}
      />
      {hint && !error && (
        <p className="mt-1 text-[11px] text-green-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} className="flex-shrink-0" /> {error}
        </p>
      )}
    </div>
  )
}