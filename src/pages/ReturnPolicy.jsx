import { motion } from 'framer-motion'
import { RotateCcw, Clock, Leaf, PhoneCall, AlertCircle, CheckCircle } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

const SectionCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-green-100 p-6 sm:p-8 shadow-sm ${className}`}>
    {children}
  </div>
)

const SectionHeading = ({ icon, children }) => (
  <h2 className="font-display text-xl sm:text-2xl font-bold text-green-900 mb-5 flex items-center gap-3">
    <span className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
      {icon}
    </span>
    {children}
  </h2>
)

const BulletList = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-green-700 text-sm leading-relaxed">
        <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
        <span dangerouslySetInnerHTML={{ __html: item }} />
      </li>
    ))}
  </ul>
)

export default function ReturnPolicy() {
  return (
    <PageWrapper>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-950 to-green-800 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
            <RotateCcw size={11} /> Policies
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Cancellation, Returns & Refund
          </motion.h1>
          <motion.p {...fadeUp(0.14)} className="text-green-200/80 text-sm sm:text-base leading-relaxed">
            At Valley Green Mart, we work closely with farmers and harvest based on orders. This helps us deliver fresh, clean produce — but also means we request your cooperation with cancellations and returns.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-6">

        {/* Order Cancellation & Postponement */}
        <motion.div {...fadeUp(0)}>
          <SectionCard>
            <SectionHeading icon={<Clock size={17} />}>Order Cancellation & Postponement</SectionHeading>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                  Before Cut-off Time
                </h3>
                <BulletList items={[
                  'Orders can be cancelled or postponed <strong>before the cut-off time (9 PM on the previous day of delivery)</strong>',
                  'Requests can be made via Email: <strong>info@valleygreenmart.com</strong>',
                  'Or via <strong>WhatsApp</strong>',
                ]} />
              </div>

              <div className="border-t border-green-100 pt-5">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <AlertCircle size={15} className="text-amber-500" />
                  After Cut-off Time
                </h3>
                <p className="text-green-600 text-sm mb-3">Once the cut-off time has passed:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <div className="font-semibold text-amber-800 text-sm mb-2">🥦 Perishable Items</div>
                    <div className="text-amber-700 text-xs leading-relaxed">Fruits, vegetables, greens: <strong>50% of the item value will be charged</strong> — harvesting and procurement are already initiated based on your order.</div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <div className="font-semibold text-green-800 text-sm mb-2">📦 Non-Perishable Items</div>
                    <div className="text-green-700 text-xs leading-relaxed"><strong>No cancellation charges</strong> apply for non-perishable items after cut-off.</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* Cut-off Time Table */}
        <motion.div {...fadeUp(0.05)}>
          <SectionCard>
            <SectionHeading icon={<Clock size={17} />}>Delivery Cut-off Times</SectionHeading>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse min-w-[320px]">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="text-left px-5 py-3 rounded-tl-xl font-semibold text-xs uppercase tracking-wide">Delivery Day</th>
                    <th className="text-left px-5 py-3 rounded-tr-xl font-semibold text-xs uppercase tracking-wide">Order Cut-off Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Tuesday',   'Monday 9 PM'],
                    ['Wednesday', 'Tuesday 9 PM'],
                    ['Thursday',  'Wednesday 9 PM'],
                    ['Friday',    'Thursday 9 PM'],
                    ['Saturday',  'Friday 9 PM'],
                    ['Sunday',    'Saturday 9 PM'],
                  ].map(([day, cutoff], i) => (
                    <tr key={day} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50/50'}>
                      <td className="px-5 py-3 text-green-900 font-semibold">{day}</td>
                      <td className="px-5 py-3 text-green-600">{cutoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-green-400 mt-4 italic">Orders placed after cut-off will be treated as the next available delivery slot.</p>
          </SectionCard>
        </motion.div>

        {/* Made-to-Order */}
        <motion.div {...fadeUp(0.05)}>
          <SectionCard>
            <SectionHeading icon={<Leaf size={17} />}>Special Note on Made-to-Order Products</SectionHeading>
            <p className="text-green-600 text-sm leading-relaxed mb-4">
              Some items (certain value-added products) are prepared specifically after your order is placed.
            </p>
            <BulletList items={[
              'Cancellation or changes must be made <strong>before 6 PM on the previous day of delivery</strong>',
              'Post this time, cancellations may not be possible as preparation would have already begun',
              'These products will be clearly mentioned in the description as <strong>"made to order"</strong> on the website',
            ]} />
          </SectionCard>
        </motion.div>

        {/* Returns at Delivery */}
        <motion.div {...fadeUp(0.05)}>
          <SectionCard>
            <SectionHeading icon={<RotateCcw size={17} />}>Returns at the Time of Delivery</SectionHeading>
            <p className="text-green-600 text-sm mb-4">If you are unhappy with any product at the time of delivery:</p>
            <BulletList items={[
              'You may <strong>return it immediately</strong> to the delivery partner',
              'Please mention the reason on the delivery sheet or inform us via WhatsApp',
            ]} />

            <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-5">
              <h4 className="font-semibold text-green-800 text-sm mb-2 flex items-center gap-2">
                <Leaf size={13} /> A Note on Organic Produce
              </h4>
              <p className="text-green-600 text-xs leading-relaxed mb-3">Organic produce is not grown for cosmetic perfection.</p>
              <BulletList items={[
                'It may look different from supermarket produce',
                'Minor marks, dullness, or natural color variations are normal',
                'In many cases, the inside quality is far better',
              ]} />
              <p className="text-green-600 text-xs mt-3 italic">We encourage you to try the product before deciding. However, if you are genuinely not satisfied, we will take it back or refund.</p>
            </div>
          </SectionCard>
        </motion.div>

        {/* Post-Delivery Returns */}
        <motion.div {...fadeUp(0.05)}>
          <SectionCard>
            <SectionHeading icon={<AlertCircle size={17} />}>Post-Delivery Returns (Quality Issues)</SectionHeading>
            <p className="text-green-600 text-sm mb-5">If you notice an issue after delivery:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 text-sm mb-3">🥦 Fruits & Vegetables</h4>
                <BulletList items={[
                  'Report within <strong>48 hours</strong> of delivery',
                  'Share photo/video via WhatsApp or email',
                ]} />
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 text-sm mb-3">📦 Non-Perishable Items</h4>
                <BulletList items={[
                  'Report within <strong>7 days</strong> of delivery',
                  'Product must be <strong>unused</strong>',
                  'Must be in <strong>original packaging</strong>',
                  'Opened products reviewed case-by-case',
                ]} />
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* Refunds */}
        <motion.div {...fadeUp(0.05)}>
          <SectionCard>
            <SectionHeading icon={<CheckCircle size={17} />}>Refunds</SectionHeading>
            <p className="text-green-600 text-sm mb-4">Once your request is verified, refunds will be processed as:</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="font-bold text-green-800 text-sm mb-1">🏪 Store Credit (Default)</div>
                <div className="text-green-600 text-xs">Processed within <strong>1–2 working days</strong></div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="font-bold text-blue-800 text-sm mb-1">💳 Original Payment Method</div>
                <div className="text-blue-600 text-xs">On request — processed within <strong>3–7 working days</strong></div>
              </div>
            </div>

            <div className="border-t border-green-100 pt-5">
              <h4 className="font-semibold text-green-800 text-sm mb-3">⚠️ Important Notes</h4>
              <BulletList items={[
                'Refunds are issued only for genuine quality issues or errors on our part',
                'We do not accept returns based purely on: appearance preferences, size or shape variations, or natural ripeness differences',
                'For non-perishables, product return is mandatory for refunds',
              ]} />
            </div>
          </SectionCard>
        </motion.div>

        {/* Contact */}
        <motion.div {...fadeUp(0.05)}>
          <SectionCard className="bg-green-900 border-green-800">
            <SectionHeading icon={<PhoneCall size={17} />}>
              <span className="text-white">Contact Us</span>
            </SectionHeading>
            <p className="text-green-300 text-sm mb-4">For any issues or support:</p>
            <div className="space-y-2 text-sm text-green-200">
              <div><strong className="text-white">Valley Green Mart</strong></div>
              <div>🌐 <a href="http://www.valleygreenmart.com" className="underline hover:text-white transition-colors">www.valleygreenmart.com</a></div>
              <div>✉️ <a href="mailto:info@valleygreenmart.com" className="underline hover:text-white transition-colors">info@valleygreenmart.com</a></div>
              <div>💬 WhatsApp available on the website</div>
            </div>
          </SectionCard>
        </motion.div>

      </section>
    </PageWrapper>
  )
}
