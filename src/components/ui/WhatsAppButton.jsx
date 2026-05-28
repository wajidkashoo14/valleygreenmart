import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'

const WHATSAPP_NUMBER = '919186361336'

const QUICK_MESSAGES = [
  { emoji: '🌸', label: 'Ask about Saffron',    msg: "Hi! I want to know more about your Kashmir Saffron (Kesar). Can you share details?" },
  { emoji: '🛒', label: 'Track my order',       msg: "Hi! I placed an order on Valley Green Mart and would like to track it." },
  { emoji: '🎁', label: 'Bulk / Wedding order', msg: "Hi! I am interested in placing a bulk order for a wedding. Can you help?" },
  { emoji: '💬', label: 'General enquiry',      msg: "Hi! I have a question about Valley Green Mart." },
]

function openWA(msg) {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
    '_blank', 'noopener,noreferrer'
  )
}

// WhatsApp SVG logo (official)
const WaIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

export default function WhatsAppButton() {
  const [open, setOpen]         = useState(false)
  const [mounted, setMounted]   = useState(false)

  // Ensure the button is always mounted client-side (avoids SSR flash)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <>
      {/* ── Backdrop (closes panel on mobile tap-outside) ─────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Wrapper — always fixed bottom-right, guaranteed visible ──────── */}
      <div
        className="fixed z-50"
        style={{
          bottom: '20px',
          right:  '16px',
          // Explicit pixel values so nothing in the layout can override them
        }}
      >
        <div className="flex flex-col items-end gap-3">

          {/* ── Chat panel ─────────────────────────────────────────────────── */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 16, originX: 1, originY: 1 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.88,  y: 16 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                onClick={e => e.stopPropagation()}
                style={{
                  width: 'min(300px, calc(100vw - 32px)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px -4px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.12)',
                }}
              >
                {/* ── Header ─────────────────────────────────────────────── */}
                <div style={{ background: '#25D366', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}>🌿</div>
                    {/* Online dot */}
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 12, height: 12, borderRadius: '50%',
                      background: 'white', border: '2px solid #25D366',
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: 14, lineHeight: 1.3 }}>
                      Valley Green Mart
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', display: 'inline-block' }} />
                      Typically replies in minutes
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', flexShrink: 0,
                    }}
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* ── Body ───────────────────────────────────────────────── */}
                <div style={{ background: '#ece5dd', padding: '14px 12px 12px' }}>
                  {/* Message bubble */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 12 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: '#25D366', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14,
                    }}>🌿</div>
                    <div style={{
                      background: 'white', borderRadius: '16px 16px 16px 4px',
                      padding: '10px 14px', maxWidth: 220,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}>
                      <p style={{ fontSize: 13, color: '#111', lineHeight: 1.4, margin: 0 }}>
                        👋 Hi there! How can we help you today?
                      </p>
                      <p style={{ fontSize: 10, color: '#aaa', margin: '4px 0 0', textAlign: 'right' }}>
                        {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} ✓✓
                      </p>
                    </div>
                  </div>

                  {/* Quick messages */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {QUICK_MESSAGES.map(qm => (
                      <button
                        key={qm.label}
                        onClick={() => { openWA(qm.msg); setOpen(false) }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                          background: 'white', border: '1px solid #e0f0e8',
                          borderRadius: 12, padding: '10px 12px', cursor: 'pointer',
                          textAlign: 'left', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f0faf4'}
                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                      >
                        <span style={{ fontSize: 16, flexShrink: 0 }}>{qm.emoji}</span>
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: '#333', flex: 1, lineHeight: 1.3 }}>
                          {qm.label}
                        </span>
                        <Send size={11} color="#aaa" style={{ flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>

                  <p style={{ textAlign: 'center', fontSize: 10, color: '#aaa', marginTop: 10 }}>
                    Powered by WhatsApp · End-to-end encrypted
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── FAB button ──────────────────────────────────────────────────── */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* Pulse rings — only when closed */}
            {!open && (
              <>
                <motion.div
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: '#25D366', pointerEvents: 'none',
                  }}
                  animate={{ scale: [1, 1.65], opacity: [0.45, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: '#25D366', pointerEvents: 'none',
                  }}
                  animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                />
              </>
            )}

            <motion.button
              onClick={() => setOpen(v => !v)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Chat on WhatsApp"
              style={{
                position: 'relative',
                width: 56, height: 56,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                boxShadow: '0 6px 24px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.2)',
                flexShrink: 0,
                touchAction: 'manipulation',   // prevents 300ms tap delay on iOS
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: 90,   opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex' }}
                  >
                    <X size={22} color="white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="wa"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex' }}
                  >
                    <WaIcon />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Tooltip — desktop only, fades in after 2s */}
            {!open && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.4 }}
                style={{
                  position: 'absolute',
                  right: 'calc(100% + 12px)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#111',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '6px 12px',
                  borderRadius: 8,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                }}
                className="hidden sm:block"   // hide tooltip on tiny phones — saves space
              >
                Chat with us!
                {/* Arrow */}
                <span style={{
                  position: 'absolute',
                  right: -4, top: '50%', transform: 'translateY(-50%)',
                  width: 8, height: 8, background: '#111', rotate: '45deg',
                }} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
