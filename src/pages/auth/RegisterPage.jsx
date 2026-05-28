import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Leaf, CheckCircle, AlertCircle, Check } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import AuthField from '../../components/auth/AuthField'
import PasswordStrength from '../../components/auth/PasswordStrength'

const BENEFITS = [
  'Track your orders in real time',
  'Save items to your wishlist',
  'Faster checkout with saved addresses',
  'Exclusive member-only deals',
  'Early access to seasonal products',
]

export default function RegisterPage() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', password: '', confirm: '', agree: false })
  const [errors, setErrors]     = useState({})
  const [showPass, setShowPass] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [success, setSuccess]   = useState(false)
  const nameRef                 = useRef(null)

  const { register, loginWithGoogle, isLoading, error, clearError, isLoggedIn } = useAuthStore()
  const toast    = useToastStore()
  const navigate = useNavigate()

  useEffect(() => { if (isLoggedIn) navigate('/', { replace: true }) }, [isLoggedIn]) // eslint-disable-line
  useEffect(() => { nameRef.current?.focus() }, [])

  const setField = (field) => (e) => {
    const val = field === 'agree' ? e.target.checked : e.target.value
    setForm(f => ({ ...f, [field]: val }))
    if (errors[field]) setErrors(er => { const n = { ...er }; delete n[field]; return n })
    if (error) clearError()
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim() || form.name.trim().length < 2)      errs.name    = 'Enter your full name (min. 2 characters)'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))        errs.email   = 'Enter a valid email address'
    if (form.phone && !form.phone.match(/^[+\d][\d\s-]{8,14}$/)) errs.phone = 'Enter a valid phone number'
    if (form.password.length < 6)                               errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm)                         errs.confirm  = 'Passwords do not match'
    if (!form.agree)                                            errs.agree    = 'You must agree to the terms'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const ok = await register(form.name.trim(), form.email, form.password, form.phone)
    if (ok) {
      setSuccess(true)
      toast.add('🎉 Account created! Welcome to Valley Green Mart.')
      setTimeout(() => navigate('/', { replace: true }), 1200)
    }
  }

  const handleGoogle = async () => {
    const ok = await loginWithGoogle()
    if (ok) { toast.add('✅ Registered with Google!'); navigate('/', { replace: true }) }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left: decorative panel ───────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[440px] flex-shrink-0 relative overflow-hidden bg-green-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 to-green-950/90" />

        <div className="relative z-10 flex flex-col h-full p-10">
          <Link to="/" className="flex items-center gap-2.5 mb-auto">
            <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
              <Leaf size={17} className="text-green-200" />
            </div>
            <div>
              <div className="font-display font-bold text-[15px] text-white">Valley Green Mart</div>
              <div className="text-[9px] text-green-400 uppercase tracking-widest">Srinagar · Kashmir</div>
            </div>
          </Link>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-400/20 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              🌿 Join 12,000+ happy customers
            </div>
            <h2 className="font-display text-3xl font-bold text-white leading-snug mb-6">
              Fresh, organic,<br/>
              <span className="text-green-300">straight from Kashmir.</span>
            </h2>

            <div className="space-y-3">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-green-500/30 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-green-300" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-green-200">{b}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {['Ahmad','Priya','Farida'].map((name, i) => (
                    <img key={i} src={`https://api.dicebear.com/7.x/personas/svg?seed=${name}&backgroundColor=d1ffe4,ffd1e4,d1e4ff`}
                      alt={name} className="w-8 h-8 rounded-full ring-2 ring-green-900 object-cover bg-white" />
                  ))}
                </div>
                <div className="text-yellow-400 text-sm">★★★★★</div>
              </div>
              <p className="text-xs text-green-200 italic leading-relaxed">
                "Best saffron and walnuts I've ever ordered. The quality is unmatched."
              </p>
              <p className="text-xs text-green-400 mt-1.5 font-medium">— Ahmad M., Delhi</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: form ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 bg-white overflow-y-auto">
        <div className="w-full max-w-md mx-auto">

          {/* Mobile logo */}
          <Link to="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-green-800 flex items-center justify-center">
              <Leaf size={15} className="text-white" />
            </div>
            <span className="font-display font-bold text-[14px] text-green-900">Valley Green Mart</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm">It's free. No spam, ever.</p>
          </motion.div>

          {/* Success */}
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
                <p className="font-semibold text-gray-900">Account created!</p>
                <p className="text-sm text-gray-400">Taking you to the homepage…</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={isLoading}
                className="mt-7 w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-sm font-semibold text-gray-700 transition-all hover:shadow-sm active:scale-[0.98] disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">or with email</span>
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

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <AuthField
                  ref={nameRef}
                  label="Full Name"
                  icon={<User size={15} />}
                  type="text"
                  placeholder="Ahmad Mir"
                  value={form.name}
                  onChange={setField('name')}
                  error={errors.name}
                  autoComplete="name"
                />

                {/* Email */}
                <AuthField
                  label="Email Address"
                  icon={<Mail size={15} />}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={setField('email')}
                  error={errors.email}
                  autoComplete="email"
                />

                {/* Phone (optional) */}
                <AuthField
                  label="Phone Number (optional)"
                  icon={<Phone size={15} />}
                  type="tel"
                  placeholder="+91 77809 66909"
                  value={form.phone}
                  onChange={setField('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                  hint="Used only for delivery updates"
                />

                {/* Password */}
                <div>
                  <AuthField
                    label="Password"
                    icon={<Lock size={15} />}
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={setField('password')}
                    error={errors.password}
                    autoComplete="new-password"
                    suffix={
                      <button type="button" onClick={() => setShowPass(v => !v)}
                        className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />
                  <PasswordStrength password={form.password} />
                </div>

                {/* Confirm password */}
                <AuthField
                  label="Confirm Password"
                  icon={<Lock size={15} />}
                  type={showConf ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={setField('confirm')}
                  error={errors.confirm}
                  autoComplete="new-password"
                  suffix={
                    <button type="button" onClick={() => setShowConf(v => !v)}
                      className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0">
                      {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  }
                />

                {/* T&C */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input type="checkbox" checked={form.agree} onChange={setField('agree')} className="sr-only" />
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        form.agree ? 'bg-green-600 border-green-600' : `border-gray-300 group-hover:border-green-400 ${errors.agree ? 'border-red-400' : ''}`
                      }`}>
                        {form.agree && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-green-700 font-medium hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-green-700 font-medium hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agree && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.agree}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg mt-1"
                >
                  {isLoading
                    ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><span>Create Account</span><ArrowRight size={15} /></>
                  }
                </motion.button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-green-700 font-semibold hover:text-green-900 transition-colors">
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
