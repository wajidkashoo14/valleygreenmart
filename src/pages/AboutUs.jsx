import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Heart, Globe, ShieldCheck, Users, Sprout } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function AboutUs() {
  return (
    <PageWrapper>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 py-20 sm:py-28">
        <div className="hero-grain" />
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            <Leaf size={12} /> Our Story
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            About <span className="text-green-300">Valley Green Mart</span>
          </motion.h1>
          <motion.p {...fadeUp(0.16)} className="text-green-200/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Born in the heart of the Himalayas, bringing the authentic, untainted essence of Kashmir to the rest of the world.
          </motion.p>
        </div>
      </section>

      {/* ── Our Roots ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Sprout size={13} /> Our Roots
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-green-900 leading-tight mb-5">
              From the Heart of the Himalayas
            </h2>
            <p className="text-green-700 text-base leading-relaxed mb-4">
              Born in the heart of the Himalayas, <strong>Valley Green Mart</strong> was founded with a single, passionate mission: to bring the authentic, untainted essence of Kashmir to the rest of the world.
            </p>
            <p className="text-green-700 text-base leading-relaxed">
              Kashmir isn't just a place; it's a tradition of purity, and we believe that everyone deserves a taste of the <em>"Paradise on Earth."</em>
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=88&auto=format&fit=crop"
                alt="Kashmir Valley"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 border border-green-100">
              <div className="font-display text-2xl font-bold text-green-900 leading-none">100%</div>
              <div className="text-xs text-green-500 font-semibold mt-1">Authentically Sourced</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────────────── */}
      <section className="bg-green-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Globe size={13} /> What We Do
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-green-900">
              We Specialise in Kashmir's Finest
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: '🏔️',
                title: 'For Our Local Patrons',
                desc: 'We provide the freshest Veggies, Fruits, Dry Vegetable & Dry fruits, ensuring that the bounty of our fertile lands reaches your kitchen with its nutrients intact.',
              },
              {
                icon: '🌍',
                title: 'For the World Beyond the Mountains',
                desc: "We act as a bridge, delivering Kashmir's world-famous dry fruits — Almonds, Walnuts, Saffron, Honey, Shilajit, Apricots & many more — directly to your doorstep, no matter where you are.",
              },
            ].map((card, i) => (
              <motion.div key={card.title} {...fadeUp(i * 0.1)}
                className="bg-white rounded-2xl p-7 border border-green-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-display text-xl font-bold text-green-900 mb-3">{card.title}</h3>
                <p className="text-green-600 leading-relaxed text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Valley Green Promise ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck size={13} /> Our Promise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-green-900">
            The Valley Green Promise
          </h2>
          <p className="text-green-500 mt-3 max-w-xl mx-auto text-sm">
            At Valley Green Mart, we don't just sell produce; we curate an experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <Heart size={22} />,
              title: 'Authentic Sourcing',
              desc: 'We work directly with local farmers and orchards, ensuring that every product is 100% authentic and ethically sourced.',
            },
            {
              icon: <ShieldCheck size={22} />,
              title: 'Purity Guaranteed',
              desc: 'From the sun-drying of traditional Hokh Syun (dried vegetables) to the vacuum-packing of our nuts, we maintain the highest standards of hygiene and quality.',
            },
            {
              icon: <Users size={22} />,
              title: 'Sustaining Heritage',
              desc: 'By choosing us, you are supporting the local Kashmiri farming community and helping preserve agricultural traditions that have thrived for centuries.',
            },
          ].map((item, i) => (
            <motion.div key={item.title} {...fadeUp(i * 0.1)}
              className="group text-center p-7 bg-white rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-100 group-hover:bg-green-800 text-green-700 group-hover:text-white flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-green-900 mb-3">{item.title}</h3>
              <p className="text-green-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Our Vision ───────────────────────────────────────────────────── */}
      <section className="bg-green-900 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 text-green-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Globe size={13} /> Our Vision
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              The Global Window into Kashmir's<br className="hidden sm:block" /> Rich Culinary Heritage
            </h2>
            <p className="text-green-300 text-base leading-relaxed max-w-2xl mx-auto mb-8">
              To become the global window into Kashmir's rich culinary heritage, making "Valley Green Mart" a household name for purity, health, and authentic Himalayan flavor.
            </p>
            <blockquote className="border-t border-green-700 pt-8 mt-2">
              <p className="font-display text-xl sm:text-2xl italic text-green-200 leading-relaxed">
                "From the pristine orchards of the Valley, straight to your home.<br className="hidden sm:block" />
                Taste the purity, experience the tradition."
              </p>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────────── */}
      <section className="border-b border-green-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '100%', label: 'Authentic Sourcing' },
              { value: '50+',  label: 'Local Farmers' },
              { value: '18+',  label: 'Premium Products' },
              { value: '4.9★', label: 'Customer Rating' },
            ].map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.08)}>
                <div className="font-display text-3xl font-bold text-green-900">{s.value}</div>
                <div className="text-xs text-green-400 font-semibold mt-1 uppercase tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <motion.div {...fadeUp(0)}>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-green-900 mb-4">
            Ready to taste the Valley?
          </h2>
          <p className="text-green-500 mb-8 text-sm">
            Explore our curated selection of premium Kashmiri produce.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg text-sm"
          >
            Shop Now <span>→</span>
          </Link>
        </motion.div>
      </section>

    </PageWrapper>
  )
}
