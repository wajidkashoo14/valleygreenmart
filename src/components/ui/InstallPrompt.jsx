import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show on 2nd+ visit
    const visits = Number(localStorage.getItem('vgm_visit_count') || 0) + 1
    localStorage.setItem('vgm_visit_count', String(visits))

    const dismissed = localStorage.getItem('vgm_install_dismissed')
    if (dismissed) return

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (visits >= 2) {
        setTimeout(() => setShow(true), 3000)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShow(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem('vgm_install_dismissed', '1')
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-50 bg-white rounded-2xl shadow-2xl border border-green-100 p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-green-800 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🌿</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-900 leading-tight">Install Valley Green Mart</p>
            <p className="text-xs text-green-500 mt-0.5">Faster ordering, works offline</p>
          </div>
          <button
            onClick={handleInstall}
            className="flex items-center gap-1.5 bg-green-800 text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-green-700 transition-colors flex-shrink-0"
          >
            <Download size={12} /> Add
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 text-green-400 hover:text-green-600 transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
