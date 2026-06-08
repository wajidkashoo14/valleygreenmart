import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 500)
    }, 1200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-green-900"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Leaf logo */}
            <motion.div
              animate={{ rotate: [0, -8, 8, -4, 0] }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center shadow-2xl border border-white/20"
            >
              <span className="text-5xl select-none">🌿</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-white text-2xl font-bold tracking-wide">Valley Green Mart</h1>
              <p className="text-green-300 text-sm mt-1 tracking-widest uppercase">Pure · From Kashmir</p>
            </motion.div>
          </motion.div>

          {/* Bottom loading bar */}
          <motion.div
            className="absolute bottom-10 w-24 h-0.5 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-green-300 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: 'linear', delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
