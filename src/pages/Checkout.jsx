import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MapPin, CreditCard, Truck, Check, ShoppingBag, Tag } from 'lucide-react'
import { useCart } from '../hooks'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'
import { formatPrice } from '../utils'
import PageWrapper from '../components/ui/PageWrapper'

const STEPS = ['Address', 'Payment', 'Review']

export default function Checkout() {
  const [step, setStep] = useState(0)
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [payMethod, setPayMethod] = useState('cod')
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', address: '', city: 'Srinagar', pin: '', state: 'Jammu & Kashmir' })

  const { cartProducts, subtotal, delivery, total, discountAmt, coupon, clearCart } = useCart()
  const { user } = useAuthStore()
  const toast = useToastStore()
  const navigate = useNavigate()

  const setField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handlePlaceOrder = async () => {
    setPlacing(true)
    await new Promise(r => setTimeout(r, 1600))
    clearCart()
    setPlacing(false)
    setPlaced(true)
    toast.add('🎉 Order placed successfully!')
    setTimeout(() => navigate('/'), 3000)
  }

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
          <p className="text-green-600 mb-2">Thank you for your order.</p>
          <p className="text-green-500 text-sm">Redirecting to home in a moment…</p>
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
                    i < step ? 'bg-green-600 text-white' :
                    i === step ? 'bg-green-800 text-white ring-4 ring-green-200' :
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

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-card overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="addr" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin size={18} className="text-green-600" />
                    <h2 className="font-semibold text-green-900">Delivery Address</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First Name" value={form.firstName} onChange={setField('firstName')} placeholder="Ahmad" />
                    <Field label="Last Name" value={form.lastName} onChange={setField('lastName')} placeholder="Mir" />
                    <Field label="Phone" value={form.phone} onChange={setField('phone')} placeholder="+91 98765 43210" type="tel" />
                    <Field label="PIN Code" value={form.pin} onChange={setField('pin')} placeholder="190001" />
                    <div className="sm:col-span-2">
                      <Field label="Address" value={form.address} onChange={setField('address')} placeholder="House No, Street, Locality" />
                    </div>
                    <Field label="City" value={form.city} onChange={setField('city')} placeholder="Srinagar" />
                    <div>
                      <label className="block text-xs font-semibold text-green-700 mb-1.5">State</label>
                      <select value={form.state} onChange={setField('state')} className="w-full px-3 py-2.5 border border-green-200 rounded-xl text-sm text-green-900 focus:outline-none focus:border-green-400 bg-white font-body">
                        <option>Jammu &amp; Kashmir</option>
                        <option>Delhi</option>
                        <option>Punjab</option>
                        <option>Maharashtra</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => setStep(1)} className="mt-6 w-full sm:w-auto flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-md">
                    Continue to Payment <ChevronRight size={15} />
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <CreditCard size={18} className="text-green-600" />
                    <h2 className="font-semibold text-green-900">Payment Method</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 'cod', emoji: '💵', label: 'Cash on Delivery', sub: 'Pay when delivered' },
                      { id: 'upi', emoji: '📱', label: 'UPI / PhonePe / GPay', sub: 'Instant payment' },
                      { id: 'card', emoji: '💳', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                      { id: 'nb', emoji: '🏦', label: 'Net Banking', sub: 'All major banks' },
                    ].map(m => (
                      <button
                        key={m.id}
                        onClick={() => setPayMethod(m.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          payMethod === m.id ? 'border-green-600 bg-green-50' : 'border-green-100 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${payMethod === m.id ? 'bg-green-100' : 'bg-green-50'}`}>{m.emoji}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-green-900">{m.label}</div>
                          <div className="text-xs text-green-500">{m.sub}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${payMethod === m.id ? 'border-green-600 bg-green-600' : 'border-green-300'}`}>
                          {payMethod === m.id && <div className="w-full h-full rounded-full bg-white scale-50" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep(0)} className="px-6 py-3 border border-green-200 rounded-full text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors">Back</button>
                    <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-md">
                      Review Order <ChevronRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="p-6">
                  <h2 className="font-semibold text-green-900 mb-5 flex items-center gap-2">
                    <Check size={18} className="text-green-600" /> Review Order
                  </h2>
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
                        <div className="font-bold text-sm text-green-800">{formatPrice(p.price * p.qty)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-sm space-y-2 mb-6">
                    <div className="flex justify-between text-green-700"><span>Address</span><span className="text-right text-xs font-medium max-w-[160px]">{form.firstName} {form.lastName}, {form.address}, {form.city}</span></div>
                    <div className="flex justify-between text-green-700"><span>Payment</span><span className="font-medium capitalize">{payMethod === 'cod' ? 'Cash on Delivery' : payMethod.toUpperCase()}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-3 border border-green-200 rounded-full text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors">Back</button>
                    <motion.button
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white py-3.5 rounded-full font-semibold text-sm transition-all disabled:bg-green-400"
                    >
                      {placing ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Place Order — {formatPrice(total)} <ChevronRight size={15} /></>}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-card p-5 h-fit sticky top-24">
            <h3 className="font-semibold text-green-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cartProducts.map(p => (
                <div key={p.id} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-green-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-green-900 truncate">{p.name}</div>
                    <div className="text-[10px] text-green-400">×{p.qty}</div>
                  </div>
                  <div className="text-xs font-bold text-green-800">{formatPrice(p.price * p.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-green-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-green-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discountAmt > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discountAmt)}</span></div>}
              <div className="flex justify-between text-green-600"><span>Delivery</span><span className={delivery === 0 ? 'text-green-500 font-semibold' : ''}>{delivery === 0 ? 'FREE' : formatPrice(delivery)}</span></div>
              <div className="flex justify-between text-green-900 font-bold text-base pt-2 border-t border-green-100"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-green-700 mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full px-3 py-2.5 border border-green-200 rounded-xl text-sm text-green-900 placeholder:text-green-300 focus:outline-none focus:border-green-400 transition-colors font-body bg-white"
      />
    </div>
  )
}
