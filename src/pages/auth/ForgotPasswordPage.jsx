import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, ArrowRight, Leaf, CheckCircle, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import AuthField from '../../components/auth/AuthField'
import PasswordStrength from '../../components/auth/PasswordStrength'

const STEPS = ['email', 'otp', 'reset', 'done']

export default function ForgotPasswordPage() {
  const [step, setStep]         = useState('email')
  const [email, setEmail]       = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [otp, setOtp]           = useState(['', '', '', '', '', ''])
  const [otpErr, setOtpErr]     = useState('')
  const [demoOtp, setDemoOtp]   = useState('')
  const [newPass, setNewPass]   = useState('')
  const [confPass, setConfPass] = useState('')
  const [passErr, setPassErr]   = useState('')
  const [showPass, setShowPass] = useState(false)
  const otpRefs                 = useRef([])
  const emailRef                = useRef(null)

  const { forgotPassword, verifyOtp, resetPassword, isLoading, error, clearError } = useAuthStore()
  const toast    = useToastStore()
  const navigate = useNavigate()

  useEffect(() => { emailRef.current?.focus() }, [])

  // ── Step 1: Request OTP ──────────────────────────────────────────────────
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    clearError()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailErr('Enter a valid email address')
      return
    }
    const result = await forgotPassword(email)
    if (result) {
      setDemoOtp(result.otp) // show the OTP in UI for demo purposes
      setStep('otp')
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
      toast.add('📬 OTP sent! Check the console for the demo code.')
    }
  }

  // ── OTP input handler ────────────────────────────────────────────────────
  const handleOtpChange = (i, val) => {
    const digits = val.replace(/\D/g, '').slice(0, 1)
    const next = [...otp]
    next[i] = digits
    setOtp(next)
    setOtpErr('')
    if (digits && i < 5) otpRefs.current[i + 1]?.focus()
  }

  const handleOtpKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      otpRefs.current[5]?.focus()
    }
    e.preventDefault()
  }

  // ── Step 2: Verify OTP ───────────────────────────────────────────────────
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    clearError()
    const code = otp.join('')
    if (code.length < 6) { setOtpErr('Please enter the complete 6-digit code'); return }
    const ok = await verifyOtp(email, code)
    if (ok) { setStep('reset') }
  }

  // ── Step 3: Reset Password ───────────────────────────────────────────────
  const handleResetSubmit = async (e) => {
    e.preventDefault()
    clearError()
    if (newPass.length < 6) { setPassErr('Password must be at least 6 characters'); return }
    if (newPass !== confPass) { setPassErr('Passwords do not match'); return }
    const ok = await resetPassword(email, otp.join(''), newPass)
    if (ok) {
      setStep('done')
      toast.add('🔒 Password reset successfully!')
    }
  }

  const stepIndex = STEPS.indexOf(step)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-800 flex items-center justify-center shadow">
            <Leaf size={18} className="text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-green-900">Valley Green Mart</div>
            <div className="text-[9px] text-green-500 uppercase tracking-widest text-center">Srinagar · Kashmir</div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.1)] border border-green-100 overflow-hidden">

          {/* Progress bar */}
          {step !== 'done' && (
            <div className="h-1 bg-green-100">
              <motion.div
                className="h-full bg-green-600 rounded-full"
                animate={{ width: `${((stepIndex) / 3) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}

          <div className="p-8">
            <AnimatePresence mode="wait">

              {/* ── Step 1: Email ─────────────────────────────────────────── */}
              {step === 'email' && (
                <motion.div key="email" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                    <Mail size={22} className="text-green-700" />
                  </div>
                  <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Forgot password?</h1>
                  <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset code.</p>

                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                        <AlertCircle size={15} />{error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
                    <AuthField
                      ref={emailRef}
                      label="Email Address"
                      icon={<Mail size={15} />}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailErr(''); clearError() }}
                      error={emailErr}
                      autoComplete="email"
                    />
                    <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg">
                      {isLoading
                        ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><span>Send Reset Code</span><ArrowRight size={15} /></>}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* ── Step 2: OTP ──────────────────────────────────────────── */}
              {step === 'otp' && (
                <motion.div key="otp" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <button onClick={() => setStep('email')} className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800 mb-5 transition-colors">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                    <span className="text-xl">📬</span>
                  </div>
                  <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Enter the code</h1>
                  <p className="text-gray-500 text-sm mb-2">
                    We sent a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>
                  </p>

                  {/* Demo OTP banner */}
                  {demoOtp && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-amber-700">🧪 Demo Mode</p>
                        <p className="text-xs text-amber-600 mt-0.5">Your OTP: <span className="font-mono font-bold text-amber-800 text-base">{demoOtp}</span></p>
                      </div>
                      <button onClick={() => {
                        setOtp(demoOtp.split(''))
                        setTimeout(() => otpRefs.current[5]?.focus(), 50)
                      }} className="text-xs font-bold text-amber-700 hover:text-amber-900 underline">
                        Auto-fill
                      </button>
                    </div>
                  )}

                  <AnimatePresence>
                    {(error || otpErr) && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                        <AlertCircle size={15} />{error || otpErr}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleOtpSubmit} noValidate>
                    {/* OTP boxes */}
                    <div className="flex gap-2 mb-5" onPaste={handleOtpPaste}>
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={el => otpRefs.current[i] = el}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(i, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(i, e)}
                          className={`flex-1 aspect-square text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                            digit
                              ? 'border-green-500 bg-green-50 text-green-900'
                              : 'border-gray-200 text-gray-900 focus:border-green-400 focus:bg-green-50/30'
                          }`}
                        />
                      ))}
                    </div>

                    <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg">
                      {isLoading
                        ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><span>Verify Code</span><ArrowRight size={15} /></>}
                    </motion.button>
                  </form>

                  <button
                    onClick={handleEmailSubmit.bind(null, { preventDefault: () => {} })}
                    className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
                  >
                    Didn't receive it? <span className="text-green-700 font-semibold">Resend code</span>
                  </button>
                </motion.div>
              )}

              {/* ── Step 3: New password ──────────────────────────────────── */}
              {step === 'reset' && (
                <motion.div key="reset" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                    <Lock size={22} className="text-green-700" />
                  </div>
                  <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Set new password</h1>
                  <p className="text-gray-500 text-sm mb-6">Choose a strong password for your account.</p>

                  <AnimatePresence>
                    {(error || passErr) && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                        <AlertCircle size={15} />{error || passErr}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleResetSubmit} className="space-y-4" noValidate>
                    <div>
                      <AuthField
                        label="New Password"
                        icon={<Lock size={15} />}
                        type={showPass ? 'text' : 'password'}
                        placeholder="Min. 6 characters"
                        value={newPass}
                        onChange={e => { setNewPass(e.target.value); setPassErr(''); clearError() }}
                        autoComplete="new-password"
                        suffix={
                          <button type="button" onClick={() => setShowPass(v => !v)} className="text-gray-400 hover:text-gray-700 transition-colors">
                            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        }
                      />
                      <PasswordStrength password={newPass} />
                    </div>
                    <AuthField
                      label="Confirm Password"
                      icon={<Lock size={15} />}
                      type="password"
                      placeholder="Repeat password"
                      value={confPass}
                      onChange={e => { setConfPass(e.target.value); setPassErr(''); clearError() }}
                      error={passErr && confPass ? passErr : ''}
                      autoComplete="new-password"
                    />
                    <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg">
                      {isLoading
                        ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><span>Reset Password</span><ArrowRight size={15} /></>}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* ── Step 4: Done ─────────────────────────────────────────── */}
              {step === 'done' && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5"
                  >
                    <CheckCircle size={40} className="text-green-600" />
                  </motion.div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Password reset!</h2>
                  <p className="text-gray-500 text-sm mb-8">Your password has been updated. You can now sign in with your new password.</p>
                  <Link to="/login"
                    className="flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg">
                    Sign In Now <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          <Link to="/login" className="text-green-700 font-semibold hover:text-green-900 transition-colors flex items-center gap-1 justify-center">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
