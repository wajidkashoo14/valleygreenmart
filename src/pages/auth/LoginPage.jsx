import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Leaf, CheckCircle, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import AuthField from '../../components/auth/AuthField'

const SIDE_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=900&q=88&auto=format&fit=crop', caption: 'Hand-picked Kashmiri Saffron — the world\'s finest' },
  { url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=900&q=88&auto=format&fit=crop', caption: 'Wild forest honey from the Gurez Valley' },
  { url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=900&q=88&auto=format&fit=crop', caption: 'Premium Kashmiri Mamra almonds, GI certified' },
]

export default function LoginPage() {
  const [form, setForm]         = useState({ email: '', password: '', remember: false })
  const [errors, setErrors]     = useState({})
  const [showPass, setShowPass] = useState(false)
  const [success, setSuccess]   = useState(false)
  const [imgIdx, setImgIdx]     = useState(0)
  const emailRef                = useRef(null)

  const { login, loginWithGoogle, isLoading, error, clearError, isLoggedIn } = useAuthStore()
  const toast    = useToastStore()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from || '/'

  // If already logged in, redirect
  useEffect(() => { if (isLoggedIn) navigate(redirectTo, { replace: true }) }, [isLoggedIn]) // eslint-disable-line

  // Focus email on mount
  useEffect(() => { emailRef.current?.focus() }, [])

  // Cycle background image
  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % SIDE_IMAGES.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Clear server error when user types
  const setField = (field) => (e) => {
    const val = field === 'remember' ? e.target.checked : e.target.value
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(er => { const n = { ...er }; delete n[field]; return n })
    if (error) clearError()
  }

  const validate = () => {
    const errs = {}
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email address'
    if (!form.password) errs.password = 'Password is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const ok = await login(form.email, form.password)
    if (ok) {
      setSuccess(true)
      toast.add('👋 Welcome back!')
      setTimeout(() => navigate(redirectTo, { replace: true }), 900)
    }
  }

  const handleGoogle = async () => {
    const ok = await loginWithGoogle()
    if (ok) {
      toast.add('✅ Signed in with Google!')
      navigate(redirectTo, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left: form panel ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">

          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-10 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
              <Leaf size={18} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-green-900 leading-tight">Valley Green Mart</div>
              <div className="text-[10px] text-green-500 uppercase tracking-widest">Srinagar · Kashmir</div>
            </div>
          </Link>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm">
              Sign in to your account to continue shopping.
            </p>
          </motion.div>

          {/* Redirect notice */}
          {location.state?.from && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl text-sm"
            >
              <AlertCircle size={15} className="flex-shrink-0" />
              Please sign in to access that page.
            </motion.div>
          )}

          {/* Success state */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex flex-col items-center gap-3 py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <CheckCircle size={32} className="text-green-600" />
                </motion.div>
                <p className="font-semibold text-gray-900">Signed in successfully!</p>
                <p className="text-sm text-gray-400">Redirecting you now…</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>

              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={isLoading}
                className="mt-8 w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-sm font-semibold text-gray-700 transition-all hover:shadow-sm active:scale-[0.98] disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">or sign in with email</span>
                <div className="flex-1 h-px bg-gray-100" />
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <AuthField
                  ref={emailRef}
                  label="Email Address"
                  icon={<Mail size={15} />}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={setField('email')}
                  error={errors.email}
                  autoComplete="email"
                />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-green-700">Password</label>
                    <Link to="/forgot-password" className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <AuthField
                    icon={<Lock size={15} />}
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={setField('password')}
                    error={errors.password}
                    autoComplete="current-password"
                    suffix={
                      <button type="button" onClick={() => setShowPass(v => !v)}
                        className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={setField('remember')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      form.remember ? 'bg-green-600 border-green-600' : 'border-gray-300 group-hover:border-green-400'
                    }`}>
                      {form.remember && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">Remember me for 30 days</span>
                </label>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg mt-2"
                >
                  {isLoading
                    ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><span>Sign In</span><ArrowRight size={15} /></>
                  }
                </motion.button>
              </form>

              {/* Register link */}
              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-700 font-semibold hover:text-green-900 transition-colors">
                  Create one free
                </Link>
              </p>

              {/* Demo hint */}
              <div className="mt-8 bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-green-700 mb-2">🧪 Demo credentials</p>
                <div className="space-y-1 text-xs text-green-600 font-mono">
                  <p>Email: <span className="font-bold">demo@valleygreenmart.in</span></p>
                  <p>Password: <span className="font-bold">demo123</span></p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, email: 'demo@valleygreenmart.in', password: 'demo123' }))}
                  className="mt-2.5 text-xs font-semibold text-green-700 hover:text-green-900 underline transition-colors"
                >
                  Auto-fill credentials →
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Right: image panel (hidden on mobile) ────────────────────────────── */}
      <div className="hidden lg:flex w-[520px] flex-shrink-0 relative overflow-hidden">
        {/* Cycling background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIdx}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SIDE_IMAGES[imgIdx].url})` }}
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/40 to-green-900/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
              <Leaf size={15} className="text-green-200" />
            </div>
            <span className="text-white/80 text-sm font-medium">Valley Green Mart</span>
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={imgIdx}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                className="text-white/80 text-sm italic mb-6 leading-relaxed"
              >
                "{SIDE_IMAGES[imgIdx].caption}"
              </motion.p>
            </AnimatePresence>

            <h2 className="font-display text-3xl font-bold text-white leading-snug mb-4">
              Pure from the Valley,<br/>
              <span className="text-green-300">Delivered Fresh.</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '🌿', title: '100% Organic', sub: 'NPOP Certified' },
                { emoji: '🚚', title: 'Free Delivery', sub: 'Above ₹999' },
                { emoji: '⭐', title: '4.9 / 5 Stars', sub: '12,000+ reviews' },
                { emoji: '🔒', title: 'Secure Checkout', sub: 'Bank-level encryption' },
              ].map(f => (
                <div key={f.title} className="flex items-start gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <span className="text-base">{f.emoji}</span>
                  <div>
                    <div className="text-xs font-semibold text-white">{f.title}</div>
                    <div className="text-[10px] text-green-300 mt-0.5">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Image dots */}
            <div className="flex gap-1.5 mt-6">
              {SIDE_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`h-1 rounded-full transition-all ${i === imgIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
