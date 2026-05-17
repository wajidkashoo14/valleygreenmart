import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'

const WHATSAPP_NUMBER = '919186361336'

const QUICK_MESSAGES = [
  {
    emoji: '🌸',
    label: 'Ask about Saffron',
    msg: 'Hi! I want to know more about your Kashmir Saffron (Kesar). Can you share details?',
  },
  {
    emoji: '🛒',
    label: 'Track my order',
    msg: 'Hi! I placed an order on Valley Green Mart and would like to track it.',
  },
  {
    emoji: '🎁',
    label: 'Bulk / Wedding order',
    msg: 'Hi! I am interested in placing a bulk order for a wedding. Can you help?',
  },
  {
    emoji: '💬',
    label: 'General enquiry',
    msg: 'Hi! I have a question about Valley Green Mart.',
  },
]

function openWhatsApp(msg) {
  const encoded = encodeURIComponent(msg)

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`,
    '_blank',
    'noopener,noreferrer'
  )
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="fixed bottom-5 right-4 sm:right-5 z-[99999] pointer-events-none"
      style={{
        bottom: 'max(20px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="relative pointer-events-auto flex flex-col items-end gap-3">

        {/* Chat Panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 28,
              }}
              className="w-[calc(100vw-2rem)] max-w-[320px] rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  '0 20px 60px -4px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              {/* Header */}
              <div className="bg-[#25D366] px-4 py-4 flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                    🌿
                  </div>

                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm leading-tight">
                    Valley Green Mart
                  </div>

                  <div className="text-white/80 text-xs mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" />
                    Typically replies in minutes
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    w-7
                    h-7
                    rounded-full
                    bg-white/15
                    hover:bg-white/25
                    flex
                    items-center
                    justify-center
                    text-white
                    transition-colors
                    flex-shrink-0
                  "
                >
                  <X size={13} />
                </button>
              </div>

              {/* Body */}
              <div
                className="bg-[#ece5dd] px-3 pt-4 pb-3"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='p' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23c4b8ab' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23p)'/%3E%3C/svg%3E")`,
                }}
              >
                {/* Welcome */}
                <div className="flex items-end gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-sm flex-shrink-0">
                    🌿
                  </div>

                  <div
                    className="
                      bg-white
                      rounded-2xl
                      rounded-bl-sm
                      px-3.5
                      py-2.5
                      max-w-[220px]
                    "
                    style={{
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                  >
                    <p className="text-[13px] text-gray-800 leading-snug">
                      👋 Hi there! How can we help you today?
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1 text-right">
                      {new Date().toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}{' '}
                      ✓✓
                    </p>
                  </div>
                </div>

                {/* Quick Buttons */}
                <div className="space-y-2">
                  {QUICK_MESSAGES.map((qm) => (
                    <motion.button
                      key={qm.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openWhatsApp(qm.msg)}
                      className="
                        w-full
                        flex
                        items-center
                        gap-2.5
                        bg-white
                        hover:bg-green-50
                        border
                        border-green-100
                        hover:border-green-300
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        transition-all
                        group
                      "
                      style={{
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      }}
                    >
                      <span className="text-base flex-shrink-0">
                        {qm.emoji}
                      </span>

                      <span
                        className="
                          text-[12.5px]
                          font-medium
                          text-gray-700
                          group-hover:text-green-800
                          flex-1
                          leading-tight
                        "
                      >
                        {qm.label}
                      </span>

                      <Send
                        size={11}
                        className="
                          text-gray-300
                          group-hover:text-green-500
                          transition-colors
                          flex-shrink-0
                        "
                      />
                    </motion.button>
                  ))}
                </div>

                <p className="text-center text-[10px] text-gray-400 mt-3">
                  Powered by WhatsApp · End-to-end encrypted
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <div className="relative">

          {/* Pulse Rings */}
          {!open && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-[#25D366]"
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full bg-[#25D366]"
                animate={{
                  scale: [1, 1.35],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.4,
                }}
              />
            </>
          )}

          {/* Main Button */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="
              relative
              w-12
              h-12
              sm:w-14
              sm:h-14
              rounded-full
              flex
              items-center
              justify-center
              text-white
            "
            style={{
              background:
                'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              boxShadow:
                '0 6px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)',
            }}
            aria-label="Chat on WhatsApp"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="wa"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Desktop Tooltip */}
          {!open && (
            <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.5,
                  duration: 0.4,
                }}
                className="
                  bg-gray-900
                  text-white
                  text-xs
                  font-medium
                  px-2.5
                  py-1.5
                  rounded-lg
                  whitespace-nowrap
                "
              >
                Chat with us!

                <div
                  className="
                    absolute
                    right-0
                    top-1/2
                    -translate-y-1/2
                    translate-x-1
                    w-2
                    h-2
                    bg-gray-900
                    rotate-45
                  "
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}