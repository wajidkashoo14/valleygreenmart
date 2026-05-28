import { motion } from 'framer-motion'
import { Truck, Clock, MapPin, AlertTriangle, Package, PhoneCall, CheckCircle } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

const Card = ({ icon, title, children, delay = 0, dark = false }) => (
  <motion.div
    {...fadeUp(delay)}
    className={`rounded-2xl border p-6 sm:p-8 shadow-sm ${
      dark ? 'bg-green-900 border-green-800' : 'bg-white border-green-100'
    }`}
  >
    <h2 className={`font-display text-xl font-bold mb-5 flex items-center gap-3 ${dark ? 'text-white' : 'text-green-900'}`}>
      <span className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${dark ? 'bg-green-700 text-green-200' : 'bg-green-100 text-green-700'}`}>
        {icon}
      </span>
      {title}
    </h2>
    {children}
  </motion.div>
)

const Bullet = ({ children, dark = false }) => (
  <li className={`flex items-start gap-3 text-sm leading-relaxed ${dark ? 'text-green-200' : 'text-green-700'}`}>
    <CheckCircle size={14} className={`flex-shrink-0 mt-0.5 ${dark ? 'text-green-400' : 'text-green-500'}`} />
    <span dangerouslySetInnerHTML={{ __html: children }} />
  </li>
)

export default function ShippingPolicy() {
  return (
    <PageWrapper>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-950 to-green-800 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
            <Truck size={11} /> Delivery
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Shipping Policy
          </motion.h1>
          <motion.p {...fadeUp(0.14)} className="text-green-200/80 text-sm sm:text-base leading-relaxed">
            Everything you need to know about how we deliver fresh Kashmir produce to your doorstep.
          </motion.p>
        </div>
      </section>

      {/* Highlight Strip */}
      <section className="bg-green-50 border-b border-green-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🚚', title: '3–4 Days',       sub: 'Standard delivery' },
              { icon: '🌿', title: 'Farm Fresh',      sub: 'Harvested to order' },
              { icon: '📍', title: 'Pan India',       sub: 'We deliver nationwide' },
              { icon: '💬', title: 'WhatsApp Updates',sub: 'Real-time tracking' },
            ].map((s, i) => (
              <motion.div key={s.title} {...fadeUp(i * 0.06)}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-display font-bold text-green-900 text-base">{s.title}</div>
                <div className="text-xs text-green-400 mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-5">

        <Card icon={<Truck size={17} />} title="Delivery Timeline" delay={0}>
          <p className="text-green-700 text-sm leading-relaxed mb-4">
            We aim to provide <strong>next 3–4 days delivery</strong> for most orders. Delivery timelines may vary due to weather conditions, traffic, or unforeseen circumstances.
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
            <strong>⚠️ Important:</strong> Because we work closely with farmers and harvest based on orders, the cut-off time for each delivery day is <strong>9 PM on the previous evening</strong>. Orders placed after the cut-off will be scheduled for the next available delivery slot.
          </div>
        </Card>

        <Card icon={<Clock size={17} />} title="Order Cut-off Schedule" delay={0.04}>
          <p className="text-green-600 text-sm mb-4">To ensure your order is harvested and packed fresh, please order before these times:</p>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm border-collapse min-w-[300px]">
              <thead>
                <tr className="bg-green-800 text-white">
                  <th className="text-left px-5 py-3 rounded-tl-xl text-xs font-semibold uppercase tracking-wide">Delivery Day</th>
                  <th className="text-left px-5 py-3 rounded-tr-xl text-xs font-semibold uppercase tracking-wide">Order Before</th>
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
                    <td className="px-5 py-3 font-semibold text-green-900">{day}</td>
                    <td className="px-5 py-3 text-green-600">{cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card icon={<MapPin size={17} />} title="Delivery Address" delay={0.04}>
          <p className="text-green-700 text-sm mb-4">Customers are responsible for ensuring the delivery address provided is accurate and complete.</p>
          <ul className="space-y-2 pl-1">
            {[
              'Any changes to the delivery address must be communicated <strong>before placing the order or before the cut-off time</strong>',
              'Orders will be delivered to the address provided at the time of ordering — requests to change afterwards may not be accommodated',
              'Valley Green Mart shall not be responsible for delays or failed deliveries due to incorrect address details',
              'In case of delivery failure due to incorrect address, <strong>re-delivery charges may apply</strong>',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
        </Card>

        <Card icon={<Package size={17} />} title="Customer Responsibilities" delay={0.04}>
          <p className="text-green-600 text-sm mb-4">Customers are responsible for:</p>
          <ul className="space-y-2 pl-1 mb-5">
            {[
              'Providing accurate delivery details at the time of ordering',
              'Being available to receive the order at the delivery address',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
          <p className="text-green-600 text-sm mb-3">If delivery fails due to incorrect details or unavailability:</p>
          <ul className="space-y-2 pl-1">
            {[
              'Re-delivery charges may apply',
              'In certain cases, order value may be forfeited as per policy',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
        </Card>

        <Card icon={<AlertTriangle size={17} />} title="Unattended Deliveries" delay={0.04}>
          <p className="text-green-700 text-sm leading-relaxed mb-4">
            If the customer is not available at the time of delivery, the order may be left outside the door or at the premises in a delivery bag.
          </p>
          <p className="text-green-700 text-sm leading-relaxed mb-4">
            By placing the order, the customer agrees to this arrangement and acknowledges that once the order is delivered to the provided address, the <strong>responsibility transfers to the customer</strong>.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
            Valley Green Mart shall not be liable for any loss, damage, or quality issues arising after such delivery.
          </div>
        </Card>

        <Card icon={<Package size={17} />} title="Product Nature & Availability" delay={0.04}>
          <p className="text-green-700 text-sm mb-4">Our products, especially fruits and vegetables, are natural and seasonal. Availability depends on harvest conditions, weather, and sourcing.</p>
          <ul className="space-y-2 pl-1">
            {[
              'We may limit quantities or remove items if required due to harvest constraints',
              'Natural variations in size, shape, color, and taste are expected — minor marks or dullness do not indicate poor quality',
              'Images on the platform are indicative and may not exactly match the delivered product',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
        </Card>

        {/* Contact */}
        <Card icon={<PhoneCall size={17} />} title="Questions?" delay={0.04} dark>
          <p className="text-green-300 text-sm mb-4">For any delivery-related questions or issues, reach us at:</p>
          <div className="space-y-2 text-sm text-green-200">
            <div><strong className="text-white">Valley Green Mart</strong></div>
            <div>🌐 <a href="http://www.valleygreenmart.com" className="underline hover:text-white transition-colors">www.valleygreenmart.com</a></div>
            <div>✉️ <a href="mailto:info@valleygreenmart.com" className="underline hover:text-white transition-colors">info@valleygreenmart.com</a></div>
            <div>💬 WhatsApp available on the website</div>
          </div>
        </Card>

      </section>
    </PageWrapper>
  )
}
