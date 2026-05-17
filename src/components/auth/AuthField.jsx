import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const AuthField = forwardRef(function AuthField(
  { label, icon, suffix, error, hint, ...inputProps },
  ref
) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-green-700 mb-1.5">
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-3 transition-all bg-white ${
          error
            ? 'border-red-300 bg-red-50/40 focus-within:border-red-400 focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
            : 'border-gray-200 focus-within:border-green-400 focus-within:bg-green-50/20 focus-within:shadow-[0_0_0_3px_rgba(76,175,120,0.12)]'
        }`}
      >
        {icon && (
          <span className={`flex-shrink-0 ${error ? 'text-red-400' : 'text-green-400'}`}>
            {icon}
          </span>
        )}
        <input
          ref={ref}
          {...inputProps}
          className="flex-1 text-sm text-gray-900 placeholder:text-gray-400 bg-transparent outline-none font-body min-w-0"
        />
        {suffix}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="text-xs text-red-500 flex items-center gap-1.5 overflow-hidden"
          >
            <AlertCircle size={11} className="flex-shrink-0" />
            {error}
          </motion.p>
        )}
        {!error && hint && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs text-gray-400 mt-1.5"
          >
            {hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

export default AuthField
