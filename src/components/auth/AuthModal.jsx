import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Eye, EyeOff, Mail, Lock, User, Phone,
  ArrowRight, Leaf, CheckCircle, AlertCircle,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'

const SIDE_IMAGES = [
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=85&auto=format&fit=crop',
]

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }) {
  const [tab, setTab]               = useState(defaultTab)
  const [showPass, setShowPass]     = useState(false)
  const [showConf, setShowConf]     = useState(false)
  const [imgIdx, setImgIdx]         = useState(0)
  const [form, setForm]             = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' })
  const [errors, setErrors]         = useState({})
  const [success, setSuccess]       = useState(false)
  const firstInputRef               = useRef(null)

  const { login, register, loginWithGoogle, isLoading, error, clearError } = useAuthStore()
  const toast = useToastStore()

  // Sync tab with prop
  useEffect(() => { setTab(defaultTab) }, [defaultTab])

  // Reset form & errors when tab changes
  useEffect(() => {
    clearError()
    setErrors({})
    setSuccess(false)
    setForm({ name: '', email: '', password: '', confirmPassword: '', phone: '' })
    setTimeout(() => firstInputRef.current?.focus(), 120)
  }, [tab]) // eslint-disable-line

  // Cycle background image
  useEffect(() => {
    if (!isOpen) return
    const t = setInterval(() => setImgIdx(i => (i + 1) % SIDE_IMAGES.length), 4000)
    return () => clearInterval(t)
  }, [isOpen])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  const setField = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => { const n = { ...er }; delete n[field]; return n })
  }

  const validate = () => {
    const errs = {}
    if (tab === 'register' && !form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email address'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (tab === 'register' && form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (tab === 'login') {
      const ok = await login(form.email, form.password)
      if (ok) {
        setSuccess(true)
        setTimeout(() => { toast.add('👋 Welcome back! Happy shopping.'); onClose(); setSuccess(false) }, 800)
      }
    } else {
      const ok = await register(form.name, form.email, form.password)
      if (ok) {
        setSuccess(true)
        setTimeout(() => { toast.add('🎉 Account created! Welcome to Valley Green Mart.'); onClose(); setSuccess(false) }, 800)
      }
    }
  }

  const handleGoogle = async () => {
    const ok = await loginWithGoogle()
    if (ok) { toast.add('👋 Signed in with Google!'); onClose() }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-950/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 32 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-[820px] bg-white rounded-3xl shadow-[0_32px_80px_-8px_rgba(0,0,0,0.35)] overflow-hidden flex"
            onClick={e => e.stopPropagation()}
          >
            {/* ── Left: decorative image panel ──────────────────────────────── */}
            <div className="hidden md:flex w-[340px] flex-shrink-0 relative flex-col">
              {/* Cycling background */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIdx}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${SIDE_IMAGES[imgIdx]})` }}
                />
              </AnimatePresence>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-900/60 via-green-900/40 to-green-950/90" />

              {/* Content over image */}
              <div className="relative z-10 flex flex-col h-full p-7">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <Leaf size={18} className="text-green-200" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[15px] text-white leading-tight">Valley Green Mart</div>
                    <div className="text-[9px] text-green-300 uppercase tracking-widest">Srinagar, Kashmir</div>
                  </div>
                </div>

                {/* Middle tagline */}
                <div className="mt-auto mb-8">
                  <h2 className="font-display text-2xl font-bold text-white leading-snug mb-3">
                    Pure from the Valley,<br />
                    <span className="text-green-300">Delivered Fresh.</span>
                  </h2>
                  <p className="text-green-200 text-sm leading-relaxed">
                    Join 12,000+ families enjoying authentic Kashmir produce straight from the farm.
                  </p>
                </div>

                {/* Trust badges */}
                <div className="space-y-2">
                  {[
                    { icon: '🌿', text: '100% Organic & Certified' },
                    { icon: '🚚', text: 'Free delivery above ₹999' },
                    { icon: '⭐', text: 'Rated 4.9/5 by 12k+ customers' },
                  ].map(b => (
                    <div key={b.text} className="flex items-center gap-2.5 text-xs text-green-100">
                      <span>{b.icon}</span>
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* Image dots */}
                <div className="flex gap-1.5 mt-5">
                  {SIDE_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === imgIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: form panel ──────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col overflow-y-auto max-h-[90vh]">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600 hover:text-green-900 transition-all"
              >
                <X size={15} />
              </button>

              <div className="p-7 pb-8 flex flex-col flex-1">
                {/* Mobile logo (shown only when image panel hidden) */}
                <div className="flex items-center gap-2 mb-5 md:hidden">
                  <div className="w-8 h-8 bg-green-800 rounded-xl flex items-center justify-center">
                    <Leaf size={15} className="text-white" />
                  </div>
                  <span className="font-display font-bold text-[14px] text-green-900">Valley Green Mart</span>
                </div>

                {/* Heading */}
                <div className="mb-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="font-display text-2xl font-bold text-green-900">
                        {tab === 'login' ? 'Welcome back 👋' : 'Create account 🌿'}
                      </h2>
                      <p className="text-green-500 text-sm mt-1">
                        {tab === 'login'
                          ? 'Sign in to access your orders and wishlist.'
                          : 'Join us for fresh organic produce from Kashmir.'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Tab switcher */}
                <div className="flex bg-green-50 rounded-2xl p-1 gap-1 mb-5">
                  {['login', 'register'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`relative flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                        tab === t ? 'text-green-900' : 'text-green-500 hover:text-green-700'
                      }`}
                    >
                      {tab === t && (
                        <motion.div
                          layoutId="tab-bg"
                          className="absolute inset-0 bg-white rounded-xl shadow-sm"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{t === 'login' ? 'Sign In' : 'Register'}</span>
                    </button>
                  ))}
                </div>

                {/* Server error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4 overflow-hidden"
                    >
                      <AlertCircle size={15} className="flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success overlay */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-3 py-8 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
                      >
                        <CheckCircle size={32} className="text-green-600" />
                      </motion.div>
                      <p className="font-semibold text-green-900">You're in!</p>
                      <p className="text-sm text-green-500">Redirecting you…</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!success && (
                  <>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3.5 flex-1">
                      <AnimatePresence>
                        {tab === 'register' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <AuthField
                              ref={firstInputRef}
                              label="Full Name" icon={<User size={15} />} type="text"
                              placeholder="Ahmad Mir" value={form.name} onChange={setField('name')} error={errors.name}
                              autoComplete="name"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AuthField
                        ref={tab === 'login' ? firstInputRef : null}
                        label="Email Address" icon={<Mail size={15} />} type="email"
                        placeholder="you@example.com" value={form.email} onChange={setField('email')} error={errors.email}
                        autoComplete="email"
                      />

                      <AnimatePresence>
                        {tab === 'register' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <AuthField
                              label="Phone (optional)" icon={<Phone size={15} />} type="tel"
                              placeholder="+91 98765 43210" value={form.phone} onChange={setField('phone')}
                              autoComplete="tel"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AuthField
                        label="Password" icon={<Lock size={15} />}
                        type={showPass ? 'text' : 'password'}
                        placeholder={tab === 'login' ? '••••••••' : 'Min. 6 characters'}
                        value={form.password} onChange={setField('password')} error={errors.password}
                        autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                        suffix={
                          <button type="button" onClick={() => setShowPass(v => !v)}
                            className="text-green-400 hover:text-green-700 transition-colors flex-shrink-0">
                            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        }
                      />

                      <AnimatePresence>
                        {tab === 'register' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <AuthField
                              label="Confirm Password" icon={<Lock size={15} />}
                              type={showConf ? 'text' : 'password'}
                              placeholder="Repeat password" value={form.confirmPassword}
                              onChange={setField('confirmPassword')} error={errors.confirmPassword}
                              autoComplete="new-password"
                              suffix={
                                <button type="button" onClick={() => setShowConf(v => !v)}
                                  className="text-green-400 hover:text-green-700 transition-colors flex-shrink-0">
                                  {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                              }
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {tab === 'login' && (
                        <div className="flex justify-end">
                          <button type="button" className="text-xs text-green-500 hover:text-green-800 transition-colors">
                            Forgot password?
                          </button>
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white py-3 rounded-2xl font-semibold text-sm transition-all hover:shadow-lg active:scale-[0.98] mt-2"
                      >
                        {isLoading ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            {tab === 'login' ? 'Sign In' : 'Create Account'}
                            <ArrowRight size={15} />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                      <div className="flex-1 h-px bg-green-100" />
                      <span className="text-xs text-green-400 font-medium">or continue with</span>
                      <div className="flex-1 h-px bg-green-100" />
                    </div>

                    {/* Google OAuth */}
                    <button
                      type="button"
                      onClick={handleGoogle}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2.5 border border-green-200 hover:border-green-300 hover:bg-green-50/80 py-3 rounded-2xl text-sm font-semibold text-green-800 transition-all hover:shadow-sm active:scale-[0.98]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>

                    {/* Switch tab */}
                    <p className="text-center text-xs text-green-500 mt-4">
                      {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                      <button
                        type="button"
                        onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
                        className="text-green-800 font-bold hover:underline transition-colors"
                      >
                        {tab === 'login' ? 'Register free' : 'Sign in'}
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── AuthField with forwardRef for focus management ────────────────────────────
import { forwardRef } from 'react'
const AuthField = forwardRef(function AuthField({ label, icon, suffix, error, ...inputProps }, ref) {
  return (
    <div>
      <label className="block text-xs font-semibold text-green-700 mb-1.5">{label}</label>
      <div className={`flex items-center gap-2.5 border rounded-2xl px-3.5 py-2.5 transition-all bg-white ${
        error
          ? 'border-red-300 bg-red-50/30 focus-within:border-red-400'
          : 'border-green-200 focus-within:border-green-400 focus-within:bg-green-50/20 focus-within:shadow-[0_0_0_3px_rgba(76,175,120,0.12)]'
      }`}>
        <span className={`flex-shrink-0 ${error ? 'text-red-400' : 'text-green-400'}`}>{icon}</span>
        <input
          ref={ref}
          {...inputProps}
          className="flex-1 text-sm text-green-900 placeholder:text-green-300 bg-transparent outline-none font-body min-w-0"
        />
        {suffix}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500 mt-1.5 pl-1 flex items-center gap-1 overflow-hidden"
          >
            <AlertCircle size={11} className="flex-shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})
