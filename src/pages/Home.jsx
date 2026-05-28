import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, Shield, Leaf, Award } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import PageWrapper from '../components/ui/PageWrapper'
import KashmirCarousel from '../components/ui/KashmirCarousel'

const FEATURES = [
  { icon: <Leaf size={18} />,   title: '100% Organic',       desc: 'Certified by NPOP',        color: 'text-green-600 bg-green-100' },
  { icon: <Truck size={18} />,  title: 'Free Delivery',      desc: 'Orders above ₹999',        color: 'text-blue-600 bg-blue-100' },
  { icon: <Shield size={18} />, title: 'Quality Guarantee',  desc: 'Full refund if not fresh', color: 'text-amber-600 bg-amber-100' },
  { icon: <Award size={18} />,  title: 'GI Certified',       desc: 'Authentic Kashmir origin', color: 'text-purple-600 bg-purple-100' },
]

const wiv = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Home() {
  const navigate = useNavigate()
  const featured  = PRODUCTS.filter(p => p.featured && !p.panIndia).slice(0, 8)
  const specials  = PRODUCTS.filter(p =>
    ['Saffron', 'Shilajit', 'Honey', 'Kashmiri Pickles', 'Dry Fruit Basket'].includes(p.category) && !p.panIndia
  )
  const panIndia  = PRODUCTS.filter(p => p.panIndia)

  return (
    <PageWrapper>

      {/* ── FULL-WIDTH CAROUSEL HERO ────────────────────────────────────── */}
      <section className="w-full">
        <KashmirCarousel />
      </section>

      {/* ── Hero text strip below carousel ──────────────────────────────── */}
      <section className="bg-gradient-to-br from-green-950 to-green-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left — tagline + CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-green-200 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4"
              >
                🌿 Farm-to-Door from Kashmir
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                className="font-display font-bold text-white leading-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
              >
                Pure from the{' '}
                <span className="text-green-300 italic">Valley</span>,<br />
                <span className="text-green-200 font-medium" style={{ fontSize: '0.65em' }}>
                  Delivered Fresh to Your Door
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="text-green-300/80 text-sm sm:text-base leading-relaxed mb-6 max-w-lg"
              >
                Premium organic vegetables, fruits, dry fruits, saffron and specialty Kashmiri
                products — sourced directly from local farmers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => navigate('/products')}
                  className="flex items-center gap-2 bg-white text-green-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm hover:bg-green-50 active:scale-95 transition-all shadow-lg"
                >
                  Shop Now <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => navigate('/products?category=Saffron')}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/25 hover:border-white/50 hover:bg-white/15 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm transition-all"
                >
                  🌸 Explore Saffron
                </button>
              </motion.div>
            </div>

            {/* Right — stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {[
                { val: '2,400+', label: 'Products',        emoji: '📦' },
                { val: '100%',   label: 'Organic',         emoji: '🌿' },
                { val: '48h',    label: 'Fresh Delivery',  emoji: '🚚' },
                { val: '4.9★',   label: 'Customer Rating', emoji: '⭐' },
              ].map(({ val, label, emoji }) => (
                <div
                  key={label}
                  className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 text-center hover:bg-white/12 transition-colors"
                >
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white leading-none">{val}</div>
                  <div className="text-green-400 text-xs mt-1 font-medium">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features strip ───────────────────────────────────────────────── */}
      <section className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...wiv(i * 0.06)}
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl hover:bg-green-50 transition-colors"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${f.color} flex items-center justify-center flex-shrink-0`}>
                  {f.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-xs sm:text-sm text-green-900 leading-tight">{f.title}</div>
                  <div className="text-[10px] sm:text-xs text-green-500 truncate">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category grid ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="flex items-end justify-between mb-5 sm:mb-8">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-green-500 mb-0.5 sm:mb-1">Browse By</p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-green-900">Shop Categories</h2>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="text-xs sm:text-sm font-semibold text-green-700 hover:text-green-900 transition-colors flex items-center gap-1"
          >
            All <ArrowRight size={12} className="sm:hidden" />
            <span className="hidden sm:inline">products</span> <ArrowRight size={13} className="hidden sm:block" />
          </button>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.key}
              {...wiv(i * 0.05)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => cat.key === 'all' ? navigate('/products') : cat.key === 'pan-india' ? navigate('/products?panIndia=true') : navigate(`/products?subcategory=${encodeURIComponent(cat.key)}`)}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-green-100 aspect-[4/5] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white text-center">
                <div className="text-lg sm:text-xl mb-0.5">{cat.emoji}</div>
                <div className="text-[10px] sm:text-xs font-bold leading-tight">{cat.name}</div>
                <div className="text-[9px] sm:text-[10px] text-white/60 hidden sm:block">{cat.count} items</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-5 sm:mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-green-500 mb-0.5 sm:mb-1">Hand-picked</p>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-green-900">Featured Products</h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          {/* Mobile view-all */}
          <div className="mt-6 text-center sm:hidden">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 border border-green-200 text-green-700 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-green-50 transition-colors"
            >
              View all products <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Saffron full-width banner ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div {...wiv(0)} className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=88&auto=format&fit=crop"
            alt="Kashmir Saffron"
            className="w-full object-cover"
            style={{ height: 'clamp(180px, 30vw, 320px)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/92 via-green-900/70 to-transparent flex items-center">
            <div className="px-5 sm:px-8 lg:px-12 max-w-lg">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">
                🌸 GI Tagged · Pampore, Kashmir
              </div>
              <h2 className="font-display font-bold text-white mb-2 sm:mb-3" style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)' }}>
                World's Finest Saffron
              </h2>
              <p className="text-green-300 text-xs sm:text-sm sm:text-base mb-3 sm:mb-5 hidden xs:block">
                Hand-picked from the golden fields of Pampore. ISO certified, lab-tested purity.
              </p>
              <button
                onClick={() => navigate('/products?category=Saffron')}
                className="flex items-center gap-2 bg-white text-green-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-green-50 active:scale-95 transition-all"
              >
                Shop Saffron <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Kashmir Specials ──────────────────────────────────────────────── */}
      <section className="bg-green-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-5 sm:mb-8">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-green-500 mb-0.5 sm:mb-1">Authentic</p>
              <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-green-900">Kashmir Specials</h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors"
            >
              Explore all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {specials.slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 border border-green-200 text-green-700 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-green-50 transition-colors"
            >
              See all specials <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Pan India Delivery Section ─────────────────────────────────────── */}
      <section className="w-full bg-gradient-to-br from-sky-950 via-sky-900 to-green-900 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-sky-200 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                🚚 Delivered Anywhere in India
              </div>
              <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)' }}>
                Pan India Products
              </h2>
              <p className="text-sky-300 text-xs sm:text-sm mt-1.5 max-w-lg">
                Premium Kashmir dry fruits, saffron and honey — vacuum-sealed and shipped to your doorstep across India.
              </p>
            </div>
            <button
              onClick={() => navigate('/products?panIndia=true')}
              className="flex items-center gap-2 bg-white text-sky-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-sky-50 active:scale-95 transition-all whitespace-nowrap self-start sm:self-auto"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 mb-8">
            {[
              { icon: '📦', title: 'Vacuum Sealed', sub: 'Freshness preserved' },
              { icon: '🚚', title: 'Pan India',     sub: '5-7 day delivery' },
              { icon: '🔒', title: '100% Authentic', sub: 'Direct from Kashmir' },
            ].map(f => (
              <div key={f.title} className="bg-white/10 border border-white/15 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl mb-1">{f.icon}</div>
                <div className="text-white font-bold text-xs sm:text-sm">{f.title}</div>
                <div className="text-sky-300 text-[10px] sm:text-xs mt-0.5 hidden sm:block">{f.sub}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {panIndia.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>


      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-7 sm:mb-10">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-green-500 mb-0.5 sm:mb-1">Reviews</p>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-green-900">What our customers say</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {[
            { name: 'Arjun Sharma', city: 'Delhi',     star: 5, text: 'The Kashmir saffron is genuinely the finest I\'ve ever tasted. Arrived in perfect packaging, completely authentic.',        img: 'https://api.dicebear.com/7.x/personas/svg?seed=Arjun&backgroundColor=d1ffe4' },
            { name: 'Priya Nair',   city: 'Bangalore', star: 5, text: 'Mamra almonds are incredible — nothing like regular almonds. The whole dry fruit collection is worth every rupee.',     img: 'https://api.dicebear.com/7.x/personas/svg?seed=Priya&backgroundColor=ffd1e4' },
            { name: 'Farida Khan',  city: 'Mumbai',    star: 5, text: 'Ordered the wedding gift box for Eid — absolutely stunning packaging and the quality blew everyone away!',             img: 'https://api.dicebear.com/7.x/personas/svg?seed=Farida&backgroundColor=d1e4ff' },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              {...wiv(i * 0.1)}
              className="bg-white rounded-xl sm:rounded-2xl border border-green-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-2 sm:mb-3">
                {Array.from({ length: t.star }).map((_, j) => (
                  <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-green-700 leading-relaxed mb-3 sm:mb-4 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img src={t.img} alt={t.name} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-green-900">{t.name}</div>
                  <div className="text-[10px] sm:text-xs text-green-400">{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Newsletter strip ──────────────────────────────────────────────── */}
      <section className="bg-green-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <motion.div {...wiv(0)}>
            <div className="text-3xl mb-3">🌿</div>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
              Stay Fresh, Stay Informed
            </h2>
            <p className="text-green-300 text-sm mb-6">
              Get seasonal updates, harvest news and exclusive offers.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-green-400 text-sm focus:outline-none focus:border-green-300 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-400 hover:bg-green-300 text-green-950 font-bold rounded-full text-sm transition-colors whitespace-nowrap active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    </PageWrapper>
  )
}
