import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Phone, MapPin, Lock, LogOut, Camera,
  CheckCircle, AlertCircle, Eye, EyeOff, ShoppingBag,
  Heart, Edit3, Save, X, Trash2, Shield, Menu,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import PageWrapper from '../../components/ui/PageWrapper'
import AuthField from '../../components/auth/AuthField'
import PasswordStrength from '../../components/auth/PasswordStrength'

const TABS = [
  { key: 'profile',  label: 'My Profile',      icon: <User size={15} /> },
  { key: 'password', label: 'Change Password',  icon: <Lock size={15} /> },
  { key: 'orders',   label: 'Orders',           icon: <ShoppingBag size={15} /> },
  { key: 'account',  label: 'Account',          icon: <Shield size={15} /> },
]

const MOCK_ORDERS = []


const STATUS_STYLE = {
  Delivered:  'bg-green-100 text-green-700',
  Processing: 'bg-amber-100 text-amber-700',
  Shipped:    'bg-blue-100 text-blue-700',
  Cancelled:  'bg-red-100 text-red-600',
}

export default function ProfilePage() {
  const { user, updateProfile, changePassword, logout, isLoading, error, clearError } = useAuthStore()
  const { clearCart }          = useCartStore()
  const { clear: clearWish }   = useWishlistStore()
  const toast    = useToastStore()
  const navigate = useNavigate()

  const [tab,         setTab]         = useState('profile')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editing,     setEditing]     = useState(false)
  const [saved,       setSaved]       = useState(false)

  const [profileForm,   setProfileForm]   = useState({
    name:    user?.name    || '',
    phone:   user?.phone   || '',
    address: user?.address || '',
    city:    user?.city    || '',
    pincode: user?.pincode || '',
  })
  const [profileErrors, setProfileErrors] = useState({})

  const [passForm,    setPassForm]    = useState({ current: '', newPass: '', confirm: '' })
  const [passErrors,  setPassErrors]  = useState({})
  const [passSuccess, setPassSuccess] = useState(false)
  const [showCurr,    setShowCurr]    = useState(false)
  const [showNew,     setShowNew]     = useState(false)

  if (!user) return null

  // ── Profile ───────────────────────────────────────────────────────────────
  const setProfileField = field => e => {
    setProfileForm(f => ({ ...f, [field]: e.target.value }))
    setProfileErrors(er => { const n = { ...er }; delete n[field]; return n })
  }

  const validateProfile = () => {
    const errs = {}
    if (!profileForm.name.trim() || profileForm.name.trim().length < 2) errs.name = 'Full name is required'
    if (profileForm.phone && !profileForm.phone.match(/^[+\d][\d\s-]{8,14}$/)) errs.phone = 'Enter a valid phone number'
    setProfileErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleProfileSave = async e => {
    e.preventDefault()
    if (!validateProfile()) return
    const ok = await updateProfile(profileForm)
    if (ok) {
      setSaved(true)
      setEditing(false)
      toast.add('✅ Profile updated successfully!')
      setTimeout(() => setSaved(false), 2500)
    }
  }

  // ── Password ──────────────────────────────────────────────────────────────
  const setPassField = field => e => {
    setPassForm(f => ({ ...f, [field]: e.target.value }))
    setPassErrors(er => { const n = { ...er }; delete n[field]; return n })
    clearError()
  }

  const validatePass = () => {
    const errs = {}
    if (!passForm.current)                     errs.current = 'Enter your current password'
    if (passForm.newPass.length < 6)           errs.newPass = 'Min. 6 characters'
    if (passForm.newPass !== passForm.confirm) errs.confirm = 'Passwords do not match'
    setPassErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePassChange = async e => {
    e.preventDefault()
    if (!validatePass()) return
    const ok = await changePassword(passForm.current, passForm.newPass)
    if (ok) {
      setPassSuccess(true)
      setPassForm({ current: '', newPass: '', confirm: '' })
      toast.add('🔒 Password changed successfully!')
      setTimeout(() => setPassSuccess(false), 3000)
    }
  }

  // ── Logout — MUST be awaited so Firebase clears state before navigate ─────
  const handleLogout = () => {
    navigate('/', { replace: true })
    logout()
    toast.add('👋 Signed out. See you soon!')
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) return
    clearCart()
    clearWish()
    await logout()
    toast.add('Account deleted.', 'info')
    navigate('/', { replace: true })
  }

  const changeTab = key => { setTab(key); setSidebarOpen(false) }

  return (
    <PageWrapper>
      <div className="bg-green-50 min-h-screen">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="bg-white border-b border-green-100 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">

            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="lg:hidden w-9 h-9 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-700 hover:bg-green-100 transition-colors flex-shrink-0"
            >
              <Menu size={16} />
            </button>

            <div className="relative flex-shrink-0">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-4 ring-green-100" />
              <button className="absolute -bottom-0.5 -right-0.5 w-5 h-5 sm:w-6 sm:h-6 bg-green-700 rounded-full flex items-center justify-center shadow border-2 border-white hover:bg-green-600 transition-colors">
                <Camera size={9} className="text-white" />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="font-display text-base sm:text-lg font-bold text-green-900 truncate">{user.name}</h1>
              <p className="text-xs text-green-500 truncate">{user.email}</p>
              {user.provider === 'google' && (
                <span className="inline-block mt-0.5 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">Google Account</span>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs sm:text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 hover:bg-red-50 px-2.5 sm:px-4 py-2 rounded-xl transition-all"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* ── Mobile sidebar overlay ─────────────────────────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="fixed left-0 top-0 bottom-0 z-30 w-64 bg-white shadow-2xl lg:hidden flex flex-col"
              >
                <div className="p-4 border-b border-green-100 flex items-center justify-between">
                  <span className="font-semibold text-sm text-green-900">Navigation</span>
                  <button onClick={() => setSidebarOpen(false)} className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center">
                    <X size={14} />
                  </button>
                </div>
                <div className="p-3 space-y-1 flex-1">
                  {TABS.map(t => (
                    <button key={t.key} onClick={() => changeTab(t.key)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${tab === t.key ? 'bg-green-800 text-white' : 'text-green-700 hover:bg-green-50'}`}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-8 flex gap-5 lg:gap-6 items-start">

          {/* Desktop sidebar */}
          <aside className="hidden lg:flex flex-col w-52 flex-shrink-0 gap-4">
            <div className="bg-white rounded-2xl border border-green-100 p-2 space-y-0.5">
              {TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${tab === t.key ? 'bg-green-800 text-white' : 'text-green-700 hover:bg-green-50'}`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-green-100 p-4 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-400">Quick Stats</p>
              {[
                { icon: <ShoppingBag size={12} />, label: 'Orders',   value: MOCK_ORDERS.length },
                { icon: <Heart size={12} />,       label: 'Wishlist', value: useWishlistStore.getState().items.size },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-green-600 text-xs">{s.icon}{s.label}</span>
                  <span className="font-bold text-green-900 text-sm">{s.value}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Mobile tab pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 lg:hidden">
              {TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 border transition-all ${
                    tab === t.key ? 'bg-green-800 text-white border-green-800' : 'bg-white text-green-700 border-green-200 hover:border-green-400'
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* Profile */}
              {tab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-display text-lg sm:text-xl font-bold text-green-900">Personal Information</h2>
                      {!editing
                        ? <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-green-700 border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-xl transition-all"><Edit3 size={12} /> Edit</button>
                        : <button onClick={() => { setEditing(false); setProfileErrors({}) }} className="flex items-center gap-1 text-xs text-gray-500"><X size={13} /> Cancel</button>
                      }
                    </div>

                    <AnimatePresence>
                      {saved && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-4 overflow-hidden">
                          <CheckCircle size={14} /> Profile updated!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleProfileSave} className="space-y-3 sm:space-y-4" noValidate>
                      <AuthField label="Full Name" icon={<User size={14} />} type="text" placeholder="Your full name"
                        value={profileForm.name} onChange={setProfileField('name')} error={profileErrors.name} disabled={!editing} />

                      <div>
                        <label className="block text-xs font-semibold text-green-700 mb-1.5">Email Address</label>
                        <div className="flex items-center gap-2.5 border border-gray-100 rounded-xl px-3 py-2.5 bg-gray-50">
                          <Mail size={14} className="text-gray-300 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</span>
                          <span className="ml-auto text-[9px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100 flex-shrink-0">Verified</span>
                        </div>
                      </div>

                      <AuthField label="Phone Number" icon={<Phone size={14} />} type="tel" placeholder="+91 77809 66909"
                        value={profileForm.phone} onChange={setProfileField('phone')} error={profileErrors.phone} disabled={!editing} />
                      <AuthField label="Delivery Address" icon={<MapPin size={14} />} type="text" placeholder="House No, Street, Locality"
                        value={profileForm.address} onChange={setProfileField('address')} disabled={!editing} />

                      <div className="grid grid-cols-2 gap-3">
                        <AuthField label="City" type="text" placeholder="Srinagar"
                          value={profileForm.city} onChange={setProfileField('city')} disabled={!editing} />
                        <AuthField label="PIN Code" type="text" placeholder="190003"
                          value={profileForm.pincode} onChange={setProfileField('pincode')} disabled={!editing} />
                      </div>

                      {editing && (
                        <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                        >
                          {isLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={13} /> Save Changes</>}
                        </motion.button>
                      )}
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Password */}
              {tab === 'password' && (
                <motion.div key="password" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-6">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-green-900 mb-1">Change Password</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mb-5">Choose a strong, unique password.</p>

                    {user.provider === 'google' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-blue-700 flex items-start gap-2 mb-4">
                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                        Google accounts use Google's authentication. Password cannot be changed here.
                      </div>
                    )}

                    <AnimatePresence>
                      {passSuccess && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-4 overflow-hidden">
                          <CheckCircle size={14} /> Password changed!
                        </motion.div>
                      )}
                      {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4 overflow-hidden">
                          <AlertCircle size={14} />{error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handlePassChange} className="space-y-3 sm:space-y-4 max-w-md" noValidate>
                      <AuthField label="Current Password" icon={<Lock size={14} />} type={showCurr ? 'text' : 'password'} placeholder="Your current password"
                        value={passForm.current} onChange={setPassField('current')} error={passErrors.current} disabled={user.provider === 'google'}
                        suffix={<button type="button" onClick={() => setShowCurr(v => !v)} className="text-gray-400 hover:text-gray-700 flex-shrink-0">{showCurr ? <EyeOff size={14} /> : <Eye size={14} />}</button>} />
                      <div>
                        <AuthField label="New Password" icon={<Lock size={14} />} type={showNew ? 'text' : 'password'} placeholder="Min. 6 characters"
                          value={passForm.newPass} onChange={setPassField('newPass')} error={passErrors.newPass} disabled={user.provider === 'google'}
                          suffix={<button type="button" onClick={() => setShowNew(v => !v)} className="text-gray-400 hover:text-gray-700 flex-shrink-0">{showNew ? <EyeOff size={14} /> : <Eye size={14} />}</button>} />
                        <PasswordStrength password={passForm.newPass} />
                      </div>
                      <AuthField label="Confirm New Password" icon={<Lock size={14} />} type="password" placeholder="Repeat new password"
                        value={passForm.confirm} onChange={setPassField('confirm')} error={passErrors.confirm} disabled={user.provider === 'google'} />
                      <button type="submit" disabled={isLoading || user.provider === 'google'}
                        className="flex items-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-200 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all">
                        {isLoading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Lock size={13} /> Update Password</>}
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Orders */}
              {tab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-6">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-green-900 mb-5">Order History</h2>
                    {MOCK_ORDERS.length === 0 ? (
                      <div className="text-center py-10">
                        <ShoppingBag size={36} className="text-green-200 mx-auto mb-3" />
                        <p className="font-semibold text-green-800 text-sm">No orders yet</p>
                        <Link to="/products" className="text-sm font-semibold text-green-700 underline mt-2 block">Browse Products</Link>
                      </div>
                    ) : (
                      <div className="space-y-3 sm:space-y-4">
                        {MOCK_ORDERS.map(order => (
                          <div key={order.id} className="border border-green-100 rounded-xl p-3 sm:p-4 hover:border-green-300 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-xs sm:text-sm text-green-900">#{order.id}</span>
                                <span className="text-[10px] sm:text-xs text-gray-400">{order.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[order.status]}`}>{order.status}</span>
                                <span className="font-bold text-green-900 text-xs sm:text-sm">₹{order.total.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-500 mb-2.5">{order.items.join(' · ')}</p>
                            <div className="flex gap-2">
                              <button className="text-[10px] sm:text-xs font-semibold text-green-700 border border-green-200 hover:border-green-400 px-2.5 py-1.5 rounded-lg transition-all">View Details</button>
                              <button className="text-[10px] sm:text-xs font-semibold text-green-700 border border-green-200 hover:border-green-400 px-2.5 py-1.5 rounded-lg transition-all">Reorder</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Account */}
              {tab === 'account' && (
                <motion.div key="account" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-6 mb-4">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-green-900 mb-1">Account Security</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">Manage your account security.</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm"><Mail size={13} className="text-green-600" /><span className="font-medium text-green-800">Email verified</span></div>
                        <span className="text-[9px] sm:text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">✓ Active</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm"><Lock size={13} className="text-gray-400" /><span className="font-medium text-gray-600">Two-factor auth</span></div>
                        <span className="text-[9px] sm:text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Coming soon</span>
                      </div>
                    </div>
                    <button onClick={handleLogout}
                      className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-all">
                      <LogOut size={13} /> Sign out of all devices
                    </button>
                  </div>

                  <div className="bg-red-50 rounded-2xl border border-red-200 p-4 sm:p-6">
                    <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-1 text-sm sm:text-base"><Trash2 size={15} /> Danger Zone</h3>
                    <p className="text-xs sm:text-sm text-red-600 mb-4">Permanently delete your account and all data. This cannot be undone.</p>
                    <button onClick={handleDeleteAccount}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-800 border border-red-300 hover:border-red-500 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all">
                      <Trash2 size={13} /> Delete My Account
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}