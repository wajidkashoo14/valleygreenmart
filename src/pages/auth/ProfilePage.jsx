import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Phone, MapPin, Lock, LogOut, Camera,
  CheckCircle, AlertCircle, Eye, EyeOff, ShoppingBag,
  Heart, Edit3, Save, X, Trash2, Shield
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import PageWrapper from '../../components/ui/PageWrapper'
import AuthField from '../../components/auth/AuthField'
import PasswordStrength from '../../components/auth/PasswordStrength'

const TABS = [
  { key: 'profile',  label: 'My Profile',    icon: <User size={16} /> },
  { key: 'password', label: 'Change Password', icon: <Lock size={16} /> },
  { key: 'orders',   label: 'Orders',          icon: <ShoppingBag size={16} /> },
  { key: 'account',  label: 'Account',         icon: <Shield size={16} /> },
]

// Mock order history
const MOCK_ORDERS = [
  { id: 'VGM-2841', date: '2 May 2025', status: 'Delivered', total: 5920, items: ['Kashmir Saffron (1g)', 'Wild Forest Honey (500g)'] },
  { id: 'VGM-2790', date: '18 Apr 2025', status: 'Delivered', total: 1630, items: ['Kashmiri Walnuts (500g)', 'Desi Cow A2 Ghee (500ml)'] },
  { id: 'VGM-2712', date: '3 Apr 2025',  status: 'Delivered', total: 2400, items: ['Premium Dry Fruit Wedding Box'] },
]

const STATUS_STYLE = {
  Delivered:  'bg-green-100 text-green-700',
  Processing: 'bg-amber-100 text-amber-700',
  Shipped:    'bg-blue-100 text-blue-700',
  Cancelled:  'bg-red-100 text-red-600',
}

export default function ProfilePage() {
  const { user, updateProfile, changePassword, logout, isLoading, error, clearError } = useAuthStore()
  const { clearCart }      = useCartStore()
  const { clear: clearWish } = useWishlistStore()
  const toast    = useToastStore()
  const navigate = useNavigate()

  const [tab, setTab]         = useState('profile')
  const [editing, setEditing] = useState(false)
  const [saved, setSaved]     = useState(false)

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name:    user?.name    || '',
    phone:   user?.phone   || '',
    address: user?.address || '',
    city:    user?.city    || '',
    pincode: user?.pincode || '',
  })
  const [profileErrors, setProfileErrors] = useState({})

  // Password form
  const [passForm, setPassForm]   = useState({ current: '', newPass: '', confirm: '' })
  const [passErrors, setPassErrors] = useState({})
  const [passSuccess, setPassSuccess] = useState(false)
  const [showCurr, setShowCurr]   = useState(false)
  const [showNew, setShowNew]     = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  // ── Profile update ───────────────────────────────────────────────────────
  const setProfileField = (field) => (e) => {
    setProfileForm(f => ({ ...f, [field]: e.target.value }))
    if (profileErrors[field]) setProfileErrors(er => { const n = { ...er }; delete n[field]; return n })
  }

  const validateProfile = () => {
    const errs = {}
    if (!profileForm.name.trim() || profileForm.name.trim().length < 2) errs.name = 'Full name is required'
    if (profileForm.phone && !profileForm.phone.match(/^[+\d][\d\s-]{8,14}$/)) errs.phone = 'Enter a valid phone number'
    setProfileErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleProfileSave = async (e) => {
    e.preventDefault()
    if (!validateProfile()) return
    const ok = await updateProfile(profileForm)
    if (ok) {
      setSaved(true)
      setEditing(false)
      toast.add('✅ Profile updated successfully!')
      setTimeout(() => setSaved(false), 2000)
    }
  }

  // ── Password change ──────────────────────────────────────────────────────
  const setPassField = (field) => (e) => {
    setPassForm(f => ({ ...f, [field]: e.target.value }))
    if (passErrors[field]) setPassErrors(er => { const n = { ...er }; delete n[field]; return n })
    clearError()
  }

  const validatePass = () => {
    const errs = {}
    if (!passForm.current)              errs.current = 'Enter your current password'
    if (passForm.newPass.length < 6)    errs.newPass = 'Password must be at least 6 characters'
    if (passForm.newPass !== passForm.confirm) errs.confirm = 'Passwords do not match'
    setPassErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePassChange = async (e) => {
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

  // ── Logout ───────────────────────────────────────────────────────────────
  const handleLogout = () => {
    logout()
    toast.add('👋 Signed out. See you soon!')
    navigate('/')
  }

  // ── Delete account ───────────────────────────────────────────────────────
  const handleDeleteAccount = () => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) return
    clearCart()
    clearWish()
    logout()
    toast.add('Account deleted.', 'info')
    navigate('/')
  }

  return (
    <PageWrapper>
      <div className="bg-green-50 min-h-screen">

        {/* Header */}
        <div className="bg-white border-b border-green-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-green-100"
              />
              <button className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center shadow border-2 border-white hover:bg-green-600 transition-colors">
                <Camera size={10} className="text-white" />
              </button>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-green-900">{user.name}</h1>
              <p className="text-sm text-green-500">{user.email}</p>
              <p className="text-xs text-green-400 mt-0.5">
                Member since {new Date(user.joinedAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                {user.provider === 'google' && <span className="ml-2 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-semibold">Google</span>}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto flex items-center gap-2 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar tabs ─────────────────────────────────────────────── */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-green-100 p-2 space-y-0.5">
              {TABS.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    tab === t.key
                      ? 'bg-green-800 text-white'
                      : 'text-green-700 hover:bg-green-50'
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-2xl border border-green-100 p-4 mt-4 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-green-400">Quick Stats</p>
              {[
                { icon: <ShoppingBag size={13} />, label: 'Orders', value: MOCK_ORDERS.length },
                { icon: <Heart size={13} />, label: 'Wishlist', value: useWishlistStore.getState().items.size },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-green-600">{s.icon}{s.label}</span>
                  <span className="font-bold text-green-900">{s.value}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* ── Main panel ───────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">

              {/* Profile Tab */}
              {tab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-xl font-bold text-green-900">Personal Information</h2>
                      {!editing ? (
                        <button
                          onClick={() => setEditing(true)}
                          className="flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-900 border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-xl transition-all"
                        >
                          <Edit3 size={13} /> Edit
                        </button>
                      ) : (
                        <button
                          onClick={() => { setEditing(false); setProfileErrors({}) }}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} /> Cancel
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {saved && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-5">
                          <CheckCircle size={15} /> Profile updated successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleProfileSave} className="space-y-4" noValidate>
                      <AuthField
                        label="Full Name"
                        icon={<User size={15} />}
                        type="text"
                        placeholder="Your full name"
                        value={profileForm.name}
                        onChange={setProfileField('name')}
                        error={profileErrors.name}
                        disabled={!editing}
                      />

                      {/* Email — read only */}
                      <div>
                        <label className="block text-xs font-semibold text-green-700 mb-1.5">Email Address</label>
                        <div className="flex items-center gap-2.5 border border-gray-100 rounded-xl px-3.5 py-3 bg-gray-50">
                          <Mail size={15} className="text-gray-300 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{user.email}</span>
                          <span className="ml-auto text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Verified</span>
                        </div>
                      </div>

                      <AuthField
                        label="Phone Number"
                        icon={<Phone size={15} />}
                        type="tel"
                        placeholder="+91 77809 66909"
                        value={profileForm.phone}
                        onChange={setProfileField('phone')}
                        error={profileErrors.phone}
                        disabled={!editing}
                      />

                      <AuthField
                        label="Delivery Address"
                        icon={<MapPin size={15} />}
                        type="text"
                        placeholder="House No, Street, Locality"
                        value={profileForm.address}
                        onChange={setProfileField('address')}
                        disabled={!editing}
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <AuthField
                          label="City"
                          type="text"
                          placeholder="Srinagar"
                          value={profileForm.city}
                          onChange={setProfileField('city')}
                          disabled={!editing}
                        />
                        <AuthField
                          label="PIN Code"
                          type="text"
                          placeholder="190001"
                          value={profileForm.pincode}
                          onChange={setProfileField('pincode')}
                          disabled={!editing}
                        />
                      </div>

                      {editing && (
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-md"
                        >
                          {isLoading
                            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : <><Save size={14} /> Save Changes</>}
                        </motion.button>
                      )}
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Password Tab */}
              {tab === 'password' && (
                <motion.div key="password" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-6">
                    <h2 className="font-display text-xl font-bold text-green-900 mb-1">Change Password</h2>
                    <p className="text-sm text-gray-500 mb-6">Choose a strong, unique password for your account.</p>

                    {user.provider === 'google' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700 flex items-center gap-2 mb-4">
                        <AlertCircle size={15} />
                        Google accounts use Google's authentication. Password cannot be changed here.
                      </div>
                    )}

                    <AnimatePresence>
                      {passSuccess && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-5">
                          <CheckCircle size={15} /> Password changed successfully!
                        </motion.div>
                      )}
                      {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-5">
                          <AlertCircle size={15} />{error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handlePassChange} className="space-y-4 max-w-md" noValidate>
                      <AuthField
                        label="Current Password"
                        icon={<Lock size={15} />}
                        type={showCurr ? 'text' : 'password'}
                        placeholder="Your current password"
                        value={passForm.current}
                        onChange={setPassField('current')}
                        error={passErrors.current}
                        disabled={user.provider === 'google'}
                        suffix={
                          <button type="button" onClick={() => setShowCurr(v => !v)} className="text-gray-400 hover:text-gray-700 transition-colors">
                            {showCurr ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        }
                      />
                      <div>
                        <AuthField
                          label="New Password"
                          icon={<Lock size={15} />}
                          type={showNew ? 'text' : 'password'}
                          placeholder="Min. 6 characters"
                          value={passForm.newPass}
                          onChange={setPassField('newPass')}
                          error={passErrors.newPass}
                          disabled={user.provider === 'google'}
                          suffix={
                            <button type="button" onClick={() => setShowNew(v => !v)} className="text-gray-400 hover:text-gray-700 transition-colors">
                              {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          }
                        />
                        <PasswordStrength password={passForm.newPass} />
                      </div>
                      <AuthField
                        label="Confirm New Password"
                        icon={<Lock size={15} />}
                        type="password"
                        placeholder="Repeat new password"
                        value={passForm.confirm}
                        onChange={setPassField('confirm')}
                        error={passErrors.confirm}
                        disabled={user.provider === 'google'}
                      />
                      <motion.button
                        type="submit"
                        disabled={isLoading || user.provider === 'google'}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-200 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-md"
                      >
                        {isLoading
                          ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          : <><Lock size={14} /> Update Password</>}
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Orders Tab */}
              {tab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-6">
                    <h2 className="font-display text-xl font-bold text-green-900 mb-6">Order History</h2>
                    <div className="space-y-4">
                      {MOCK_ORDERS.map((order) => (
                        <div key={order.id} className="border border-green-100 rounded-xl p-4 hover:border-green-300 transition-colors">
                          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                            <div>
                              <span className="font-semibold text-sm text-green-900">#{order.id}</span>
                              <span className="text-xs text-gray-400 ml-3">{order.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status]}`}>
                                {order.status}
                              </span>
                              <span className="font-bold text-green-900 text-sm">₹{order.total.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 leading-relaxed">
                            {order.items.join(' · ')}
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button className="text-xs font-semibold text-green-700 hover:text-green-900 border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-lg transition-all">
                              View Details
                            </button>
                            <button className="text-xs font-semibold text-green-700 hover:text-green-900 border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-lg transition-all">
                              Reorder
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {MOCK_ORDERS.length === 0 && (
                      <div className="text-center py-12">
                        <ShoppingBag size={40} className="text-green-200 mx-auto mb-3" />
                        <p className="font-semibold text-green-800">No orders yet</p>
                        <p className="text-sm text-green-500 mt-1 mb-4">Start shopping to see your orders here.</p>
                        <Link to="/products" className="text-sm font-semibold text-green-700 underline">Browse Products</Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Account / Danger Tab */}
              {tab === 'account' && (
                <motion.div key="account" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                  <div className="bg-white rounded-2xl border border-green-100 p-6 mb-4">
                    <h2 className="font-display text-xl font-bold text-green-900 mb-1">Account Security</h2>
                    <p className="text-sm text-gray-500 mb-5">Manage your account security and sessions.</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="flex items-center gap-2.5 text-sm">
                          <Mail size={14} className="text-green-600" />
                          <span className="font-medium text-green-800">Email verified</span>
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">✓ Active</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2.5 text-sm">
                          <Lock size={14} className="text-gray-400" />
                          <span className="font-medium text-gray-600">Two-factor auth</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Coming soon</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-5 flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <LogOut size={14} /> Sign out of all devices
                    </button>
                  </div>

                  <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                    <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-1">
                      <Trash2 size={16} /> Danger Zone
                    </h3>
                    <p className="text-sm text-red-600 mb-4">
                      Permanently delete your account and all associated data. This cannot be undone.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 border border-red-300 hover:border-red-500 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <Trash2 size={14} /> Delete My Account
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
