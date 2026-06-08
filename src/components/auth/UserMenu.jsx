import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, ShoppingBag, Heart, LogOut,
  ChevronRight, Settings, Star,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import { useCartStore } from '../../store/cartStore'

export default function UserMenu({ isOpen, onClose }) {
  const { user, logout }   = useAuthStore()
  const { clearCart }      = useCartStore()
  const toast              = useToastStore()
  const navigate           = useNavigate()
  const ref                = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    if (isOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onClose])

  const handleLogout = () => {
    navigate('/', { replace: true })
    onClose()
    logout()
    toast.add('👋 Signed out successfully. See you soon!')
  }

  if (!user) return null

  const navItems = [
    { icon: <User size={14} />,       label: 'My Profile',    to: '/profile',  desc: 'Edit your details' },
    { icon: <ShoppingBag size={14} />, label: 'My Orders',    to: '/profile',  desc: 'Track & reorder' },
    { icon: <Heart size={14} />,       label: 'Wishlist',     to: '/wishlist', desc: `${0} saved items` },
    { icon: <Star size={14} />,        label: 'Reviews',      to: '/profile',  desc: 'Your feedback' },
    { icon: <Settings size={14} />,    label: 'Settings',     to: '/profile',  desc: 'Preferences & more' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl border border-green-100 overflow-hidden z-50"
          style={{ boxShadow: '0 16px 48px -4px rgba(0,0,0,0.14), 0 4px 16px -2px rgba(0,0,0,0.06)' }}
        >
          {/* User card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 px-4 py-4 border-b border-green-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-green-900 truncate">{user.name}</div>
                <div className="text-xs text-green-500 truncate">{user.email}</div>
              </div>
            </div>
            <Link
              to="/profile"
              onClick={onClose}
              className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-green-700 bg-white hover:bg-green-50 border border-green-200 py-1.5 rounded-lg transition-colors"
            >
              <User size={11} /> View Profile
            </Link>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className="group flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center flex-shrink-0 transition-colors text-green-600">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-green-900 leading-tight">{item.label}</div>
                  <div className="text-[10px] text-green-400">{item.desc}</div>
                </div>
                <ChevronRight size={11} className="text-green-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-green-100 p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <LogOut size={13} />
              </div>
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
