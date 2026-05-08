import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, Shield, Leaf, Award } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import PageWrapper from '../components/ui/PageWrapper'

const FEATURES = [
  { icon: <Leaf size={20} />,   title: '100% Organic',      desc: 'Certified by NPOP',      color: 'text-green-600 bg-green-100' },
  { icon: <Truck size={20} />,  title: 'Free Delivery',     desc: 'On orders above ₹999',   color: 'text-blue-600 bg-blue-100' },
  { icon: <Shield size={20} />, title: 'Quality Guarantee', desc: 'Full refund if not fresh', color: 'text-amber-600 bg-amber-100' },
  { icon: <Award size={20} />,  title: 'GI Certified',      desc: 'Authentic Kashmir origin', color: 'text-purple-600 bg-purple-100' },
]

export default function Home() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')

  const featured   = PRODUCTS.filter(p => p.featured).slice(0, 8)
  const specials   = PRODUCTS.filter(p => ['Saffron','Shilajit','Honey','Kashmiri Pickles','Dry Fruit Basket'].includes(p.category))

  const goToCategory = (key) => {
    if (key === 'all') navigate('/products')
    else navigate(`/products?subcategory=${encodeURIComponent(key)}`)
  }

  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 min-h-[88vh] flex items-center">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1800&q=85&auto=format&fit=crop')" }}
        />
        {/* Grain texture */}
        <div className="hero-grain" />

        {/* Floating elements */}
        <motion.div animate={{ y: [0,-14,0] }} transition={{ repeat: Infinity, duration: 4, ease:'easeInOut' }}
          className="absolute top-20 right-[12%] w-20 h-20 rounded-full overflow-hidden opacity-30 border-2 border-white/20 hidden lg:block">
          <img src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&q=85&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div animate={{ y: [0,10,0] }} transition={{ repeat: Infinity, duration: 5, delay:1, ease:'easeInOut' }}
          className="absolute bottom-24 right-[20%] w-16 h-16 rounded-2xl overflow-hidden opacity-30 border-2 border-white/20 hidden lg:block">
          <img src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=200&q=85&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div animate={{ y: [0,-8,0] }} transition={{ repeat: Infinity, duration: 3.5, delay:0.5, ease:'easeInOut' }}
          className="absolute top-40 left-[8%] w-14 h-14 rounded-xl overflow-hidden opacity-25 border border-white/20 hidden xl:block">
          <img src="https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=200&q=85&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left content */}
          <div>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
              🌿 Farm-to-Door from Kashmir
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Pure from<br />the <span className="text-green-300 italic">Valley</span>,<br />
              <span className="text-3xl sm:text-4xl font-medium text-green-200 not-italic">Delivered Fresh</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              className="text-green-300 text-lg leading-relaxed max-w-md mb-8">
              Premium organic vegetables, fruits, dry fruits, saffron and specialty Kashmiri products — sourced directly from local farmers.
            </motion.p>

            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
              className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 bg-white text-green-900 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-green-50 active:scale-95 transition-all shadow-lg"
              >
                Shop Now <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/products?category=Saffron')}
                className="flex items-center gap-2 bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/10 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
              >
                🌸 Explore Saffron
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              {[['2,400+','Products'],['100%','Organic'],['48h','Fresh Delivery'],['4.9★','Customer Rating']].map(([val, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-white">{val}</div>
                  <div className="text-green-400 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product showcase */}
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3, duration:0.5 }}
            className="hidden lg:grid grid-cols-2 gap-3">
            {PRODUCTS.filter(p => p.featured).slice(0,4).map((p, i) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => navigate(`/products/${p.id}`)}
                className={`cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2' : ''}`}
              >
                <div className={`${i === 0 ? 'h-48' : 'h-36'} overflow-hidden`}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <div className="text-white font-semibold text-sm truncate">{p.name}</div>
                  <div className="text-green-300 text-xs">₹{p.price.toLocaleString()} {p.unit}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features strip ──────────────────────────────── */}
      <section className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.07 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center flex-shrink-0`}>{f.icon}</div>
              <div>
                <div className="font-semibold text-sm text-green-900">{f.title}</div>
                <div className="text-xs text-green-500">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Category grid ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1">Browse By</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-green-900">Shop Categories</h2>
          </div>
          <button onClick={() => navigate('/products')} className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors hidden sm:flex items-center gap-1">
            All products <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.key}
              initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay: i*0.05 }}
              whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
              onClick={() => goToCategory(cat.key)}
              className="group relative rounded-2xl overflow-hidden border border-green-100 aspect-[4/5] cursor-pointer"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center">
                <div className="text-xl mb-0.5">{cat.emoji}</div>
                <div className="text-xs font-bold">{cat.name}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Featured Products ───────────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1">Hand-picked</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-green-900">Featured Products</h2>
            </div>
            <button onClick={() => navigate('/products')} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-900">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Kashmir Specials banner ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative rounded-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&q=88&auto=format&fit=crop" alt="Kashmir Saffron" className="w-full h-56 sm:h-72 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/90 via-green-900/70 to-transparent flex items-center">
            <div className="px-8 sm:px-12 max-w-lg">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                🌸 GI Tagged · Pampore, Kashmir
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-3">World's Finest Saffron</h2>
              <p className="text-green-300 text-sm sm:text-base mb-5">Hand-picked from the golden fields of Pampore. ISO certified, lab-tested purity.</p>
              <button
                onClick={() => navigate('/products?category=Saffron')}
                className="flex items-center gap-2 bg-white text-green-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-green-50 transition-all"
              >
                Shop Saffron <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kashmir Specials ────────────────────────────── */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1">Authentic</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-green-900">Kashmir Specials</h2>
            </div>
            <button onClick={() => navigate('/products')} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-900">
              Explore all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {specials.slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-1">Reviews</p>
          <h2 className="font-display text-3xl font-bold text-green-900">What our customers say</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { name:'Arjun Sharma', city:'Delhi', review:`The Kashmir saffron is genuinely the finest I've ever tasted. Arrived in perfect packaging, completely authentic.`, rating:5, img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=85&auto=format&fit=crop&face' },
            { name:'Priya Nair', city:'Bangalore', review:'Mamra almonds are incredible — nothing like regular almonds. The whole dry fruit collection is worth every rupee.', rating:5, img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=85&auto=format&fit=crop&face' },
            { name:'Farida Khan', city:'Mumbai', review:'Ordered the wedding gift box for Eid — absolutely stunning packaging and the quality blew everyone away!', rating:5, img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=85&auto=format&fit=crop&face' },
          ].map((t, i) => (
            <motion.div key={t.name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}
              className="bg-white rounded-2xl border border-green-100 p-5 shadow-card">
              <div className="flex gap-0.5 mb-3">
                {Array.from({length: t.rating}).map((_, j) => <Star key={j} size={13} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-sm text-green-700 leading-relaxed mb-4 italic">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-green-900">{t.name}</div>
                  <div className="text-xs text-green-400">{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
