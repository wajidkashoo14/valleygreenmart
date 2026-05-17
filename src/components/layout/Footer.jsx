import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const footerLinks = {
  'Quick Links': [
    { label: 'Home', to: '/' },
    { label: 'All Products', to: '/products' },
    { label: 'My Cart', to: '/cart' },
    { label: 'Wishlist', to: '/wishlist' },
  ],
  'Categories': [
    { label: 'Kashmiri Saffron', cat: 'Saffron' },
    { label: 'Premium Nuts', cat: 'Nuts' },
    { label: 'Wild Forest Honey', cat: 'Honey' },
    { label: 'Fresh Vegetables', cat: 'Microgreens' },
    { label: 'Kashmiri Pickles', cat: 'Kashmiri Pickles' },
  ],
  'Help': [
    { label: 'About Us', to: '/' },
    { label: 'Shipping Policy', to: '/' },
    { label: 'Return Policy', to: '/' },
    { label: 'Privacy Policy', to: '/' },
    { label: 'Contact Us', to: '/' },
  ],
}

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-green-900 text-white">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold">Stay fresh, stay informed 🌿</h3>
            <p className="text-green-300 text-sm mt-1">Get seasonal updates, harvest news and exclusive offers.</p>
          </div>
          <form className="flex gap-2 w-full sm:w-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm placeholder:text-green-300 focus:outline-none focus:border-green-300 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-green-400 hover:bg-green-300 text-green-900 font-semibold rounded-full text-sm transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-xl">🌿</div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">Valley Green Mart</div>
                <div className="text-xs text-green-400 uppercase tracking-widest">Srinagar, Kashmir</div>
              </div>
            </div>
            <p className="text-green-300 text-sm leading-relaxed max-w-xs">
              Bringing the pure taste of Kashmir to your table. Sourced directly from Himalayan farms, delivered with care and love.
            </p>
            <div className="mt-5 space-y-2 text-sm text-green-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-green-500 flex-shrink-0" />
                <span>Saida Kadal Bridge Rainwari Srinagar Kashmir 190003</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-green-500 flex-shrink-0" />
                <span>+91 77809 66909</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-green-500 flex-shrink-0" />
                <span>info@valleygreenmart.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-green-500 flex-shrink-0" />
                <span>Mon–Sat, 8:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-green-500 mb-4">{title}</h4>
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

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-green-500">
            © 2026 Valley Green Mart. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-green-500">
            <span>🔒 Secure Payments</span>
            <span>🚚 Fast Delivery</span>
            <span className="text-green-600">Made with 🌿 in Kashmir</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
