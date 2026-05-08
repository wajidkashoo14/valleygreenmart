import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShoppingBag, Heart, MapPin, LogOut, ChevronRight, Settings } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'

export default function UserMenu({ isOpen, onClose }) {
  const { user, logout } = useAuthStore()
  const toast = useToastStore()
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    if (isOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, onClose])

  const handleLogout = () => {
    logout()
    toast.add('👋 Signed out. See you soon!')
    onClose()
  }

  if (!user) return null

  const menuItems = [
    { icon: <ShoppingBag size={14} />, label: 'My Orders',  to: '/orders' },
    { icon: <Heart size={14} />,       label: 'Wishlist',   to: '/wishlist' },
    { icon: <MapPin size={14} />,      label: 'Addresses',  to: '/addresses' },
    { icon: <Settings size={14} />,    label: 'Settings',   to: '/settings' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-green-100 overflow-hidden z-50"
        >
          {/* User info */}
          <div className="flex items-center gap-3 p-4 bg-green-50 border-b border-green-100">
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-green-200" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-green-900 truncate">{user.name}</div>
              <div className="text-xs text-green-500 truncate">{user.email}</div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {menuItems.map(item => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-green-800 hover:bg-green-50 transition-colors group"
              >
                <span className="flex items-center gap-2.5 text-green-600">
                  {item.icon}
                  {item.label}
                </span>
                <ChevronRight size={12} className="text-green-300 group-hover:text-green-500 transition-colors" />
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-green-100 py-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
