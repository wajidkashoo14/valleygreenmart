import { AnimatePresence, motion } from 'framer-motion'
import { useToastStore } from '../../store/toastStore'
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react'

const icons = {
  success: <CheckCircle size={15} className="text-green-400 flex-shrink-0" />,
  error:   <AlertCircle  size={15} className="text-red-400 flex-shrink-0" />,
  info:    <Info         size={15} className="text-blue-400 flex-shrink-0" />,
}

export default function Toast() {
  const { toasts, remove } = useToastStore()

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="pointer-events-auto flex items-start gap-2.5 bg-green-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10"
          >
            {icons[t.type] || icons.success}
            <span className="text-sm font-medium flex-1 leading-snug">{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
            >
              <X size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
