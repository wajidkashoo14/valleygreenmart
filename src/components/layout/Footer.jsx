import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader, Leaf } from 'lucide-react'
import { subscribeNewsletter } from '../../services/newsletterService'

// ── Social platforms ──────────────────────────────────────────────────────────
const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/valleygreenmart?igsh=dzVhY3gyc2V3aWJm',
    color: 'hover:bg-[#E1306C]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/18ZXBQYHQ9/',
    color: 'hover:bg-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919186361336',
    color: 'hover:bg-[#25D366]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '/',
    color: 'hover:bg-[#FF0000]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: '/',
    color: 'hover:bg-[#000000]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

const footerLinks = {
  'Quick Links': [
    { label: 'Home',         to: '/' },
    { label: 'All Products', to: '/products' },
    { label: 'Pan India',    to: '/products?panIndia=true' },
    { label: 'My Cart',      to: '/cart' },
    { label: 'Wishlist',     to: '/wishlist' },
  ],
  'Categories': [
    { label: 'Kashmiri Saffron', cat: 'Saffron' },
    { label: 'Premium Nuts',     cat: 'Nuts' },
    { label: 'Wild Forest Honey',cat: 'Honey' },
    { label: 'Fresh Vegetables', cat: 'Microgreens' },
    { label: 'Kashmiri Pickles', cat: 'Kashmiri Pickles' },
  ],
  'Help': [
    { label: 'About Us',        to: '/about' },
    { label: 'Shipping Policy', to: '/shipping-policy' },
    { label: 'Return Policy',   to: '/return-policy' },
    { label: 'Privacy Policy',  to: '/privacy-policy' },
    { label: 'Contact Us',      to: '/contact' },
  ],
}

export default function Footer() {
  const navigate = useNavigate()
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState('')
  const [status,  setStatus]  = useState('idle') // idle | loading | success | error

  const validateEmail = (val) => {
    if (!val.trim()) return 'Please enter your email address.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return 'Please enter a valid email address.'
    return ''
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    const err = validateEmail(email)
    if (err) { setError(err); return }
    setError('')
    setStatus('loading')
    try {
      await subscribeNewsletter(email.trim().toLowerCase())
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-green-900 text-white">

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-semibold">Stay fresh, stay informed 🌿</h3>
            <p className="text-green-300 text-sm mt-0.5">Seasonal updates, harvest news and exclusive offers.</p>
          </div>

          {status === 'success' ? (
            <div className="flex items-center gap-2.5 bg-green-700/50 border border-green-500/50 text-green-200 px-5 py-3 rounded-full text-sm font-medium">
              <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
              You're subscribed! Welcome to the valley 🌿
            </div>
          ) : (
            <form className="flex flex-col gap-1.5 w-full sm:w-auto" onSubmit={handleSubscribe} noValidate>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (error) setError('') }}
                  placeholder="your@email.com"
                  disabled={status === 'loading'}
                  className={`flex-1 sm:w-60 px-4 py-2.5 rounded-full bg-white/10 border text-sm placeholder:text-green-400/70 focus:outline-none transition-colors disabled:opacity-60 ${
                    error ? 'border-red-400/70 focus:border-red-400' : 'border-white/20 focus:border-green-300'
                  }`}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-400 hover:bg-green-300 disabled:bg-green-600 text-green-900 font-bold rounded-full text-sm transition-colors whitespace-nowrap"
                >
                  {status === 'loading'
                    ? <><Loader size={14} className="animate-spin" /> Sending…</>
                    : <><Send size={13} /> Subscribe</>
                  }
                </button>
              </div>
              {error && (
                <p className="flex items-center gap-1.5 text-red-300 text-xs px-1">
                  <AlertCircle size={12} /> {error}
                </p>
              )}
              {status === 'error' && !error && (
                <p className="flex items-center gap-1.5 text-red-300 text-xs px-1">
                  <AlertCircle size={12} /> Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* ── Main body ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">

          {/* Brand + contact + socials */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-md flex-shrink-0">
                <Leaf size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg leading-none">Valley Green Mart</span>
            </div>

            <p className="text-green-300 text-sm leading-relaxed max-w-xs mb-5">
              Bringing the pure taste of Kashmir to your table. Sourced directly from Himalayan farms, delivered with care.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-green-400 mb-6">
              <a
                href="https://maps.google.com/?q=Saida+Kadal+Bridge+Rainwari+Srinagar+Kashmir+190003"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>Saida Kadal Bridge, Rainwari,<br />Srinagar, Kashmir — 190003</span>
              </a>
              <a href="tel:+917780966909" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} className="text-green-500 flex-shrink-0" />
                <span>+91 77809 66909</span>
              </a>
              <a href="mailto:info@valleygreenmart.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} className="text-green-500 flex-shrink-0" />
                <span>info@valleygreenmart.com</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-green-500 flex-shrink-0" />
                <span>Mon–Sat, 8:00 AM – 8:00 PM</span>
              </div>
            </div>

            {/* ── Social icons ─────────────────────────────────────────── */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-3">
                Follow us
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className={`w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:border-transparent hover:scale-110 active:scale-95 ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-green-500 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-green-300 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => navigate(`/products?category=${encodeURIComponent(link.cat)}`)}
                        className="text-sm text-green-300 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-green-500">
            © {new Date().getFullYear()} Valley Green Mart. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-green-500 flex-wrap justify-center">
            <span className="flex items-center gap-1">🔒 Secure Payments</span>
            <span className="flex items-center gap-1">🚚 Fast Delivery</span>
            <span className="text-green-600 font-medium">Made with 🌿 in Kashmir</span>
          </div>
        </div>

      </div>
      {/* ── Developer credit strip ────────────────────────────────────────── */}
      <div className="bg-green-950/60 border-t border-white/5 py-2.5 text-center">
        <p className="text-[11px] text-green-600 tracking-wide">
          Designed &amp; Developed by{' '}
          <a
            href="https://wa.me/919186361336"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 font-semibold hover:text-green-300 transition-colors underline underline-offset-2 decoration-green-600 hover:decoration-green-400"
          >
            Wajid Kashoo
          </a>
        </p>
      </div>
    </footer>
  )
}
