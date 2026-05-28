import { motion } from 'framer-motion'
import { Shield, Eye, Share2, Lock, Cookie, UserCheck, Trash2, Link, Baby, RefreshCw, PhoneCall } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

const Section = ({ icon, title, children, delay = 0 }) => (
  <motion.div {...fadeUp(delay)} className="bg-white rounded-2xl border border-green-100 p-6 sm:p-8 shadow-sm">
    <h2 className="font-display text-xl font-bold text-green-900 mb-5 flex items-center gap-3">
      <span className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      {title}
    </h2>
    {children}
  </motion.div>
)

const Bullet = ({ children }) => (
  <li className="flex items-start gap-3 text-green-700 text-sm leading-relaxed">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
    <span>{children}</span>
  </li>
)

const SubSection = ({ title, items }) => (
  <div className="mb-5">
    <h3 className="font-semibold text-green-800 text-sm mb-2">{title}</h3>
    <ul className="space-y-1.5 pl-1">{items.map((it, i) => <Bullet key={i}>{it}</Bullet>)}</ul>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <PageWrapper>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-950 to-green-800 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5">
            <Shield size={11} /> Privacy
          </motion.div>
          <motion.h1 {...fadeUp(0.08)} className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </motion.h1>
          <motion.p {...fadeUp(0.14)} className="text-green-200/80 text-sm sm:text-base">
            Privacy Policy for <strong className="text-white">valleygreenmart.com</strong><br />
            <span className="text-green-300 text-xs">Effective Date: 15-Apr-2026</span>
          </motion.p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <motion.div {...fadeUp(0)} className="bg-green-50 border border-green-200 rounded-2xl p-6 text-sm text-green-700 leading-relaxed">
          <strong>Valley Green Mart</strong> ("we", "our", "us") operates the website <a href="http://www.valleygreenmart.com" className="font-semibold text-green-800 underline">www.valleygreenmart.com</a> and related mobile applications (collectively, the "Platform"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information.
        </motion.div>
      </section>

      {/* Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-5">

        <Section icon={<Eye size={17} />} title="Information We Collect" delay={0}>
          <SubSection title="Personal Information" items={['Name', 'Phone number', 'Email address', 'Delivery address', 'Billing information']} />
          <SubSection title="Transaction Information" items={['Order details', 'Payment method (processed securely via third-party payment gateways)']} />
          <SubSection title="Technical Information" items={['IP address', 'Device type', 'Browser type', 'Usage data (pages visited, time spent)']} />
          <SubSection title="Communication Data" items={['Messages shared via WhatsApp, email, or customer support']} />
        </Section>

        <Section icon={<UserCheck size={17} />} title="How We Use Your Information" delay={0.04}>
          <ul className="space-y-1.5 pl-1">
            {[
              'Process and deliver your orders',
              'Communicate order updates and support requests',
              'Send important service-related messages',
              'Improve our website, products, and services',
              'Share updates about seasonal produce, offers, or announcements (only if you opt in)',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
        </Section>

        <Section icon={<Share2 size={17} />} title="WhatsApp Communication" delay={0.04}>
          <p className="text-green-600 text-sm mb-4">By providing your phone number and placing an order on our Platform, you consent to receive communications from us on WhatsApp. These may include:</p>
          <ul className="space-y-1.5 pl-1 mb-4">
            {[
              'Order confirmations and delivery updates',
              'Customer support messages',
              'Important service-related notifications',
              'Updates on seasonal produce, product availability, and announcements (only if you have opted in)',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
            You can opt out of non-essential communications at any time by messaging us on WhatsApp or contacting us at <strong>info@valleygreenmart.com</strong>
          </div>
        </Section>

        <Section icon={<Share2 size={17} />} title="Sharing of Information" delay={0.04}>
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm font-semibold text-green-800 mb-4">
            🔒 We do not sell your personal data.
          </div>
          <p className="text-green-600 text-sm mb-3">We may share your data with:</p>
          <ul className="space-y-1.5 pl-1">
            {[
              'Delivery partners for order fulfillment',
              'Payment gateway providers for secure transactions',
              'Service providers (e.g., hosting, analytics tools)',
              'Legal authorities if required by law',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
        </Section>

        <Section icon={<Lock size={17} />} title="Data Security" delay={0.04}>
          <p className="text-green-700 text-sm leading-relaxed mb-3">
            We take reasonable measures to protect your data from unauthorized access, misuse, or disclosure.
          </p>
          <p className="text-green-500 text-sm italic">
            However, no method of transmission over the internet is 100% secure.
          </p>
        </Section>

        <Section icon={<Cookie size={17} />} title="Cookies & Tracking" delay={0.04}>
          <p className="text-green-600 text-sm mb-4">We use cookies to:</p>
          <ul className="space-y-1.5 pl-1 mb-4">
            {['Improve website functionality', 'Understand user behavior', 'Enhance user experience'].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
          <p className="text-green-500 text-xs">You can control cookies through your browser settings.</p>
        </Section>

        <Section icon={<UserCheck size={17} />} title="Your Rights" delay={0.04}>
          <p className="text-green-600 text-sm mb-4">
            Under applicable laws (including India's <strong>Digital Personal Data Protection Act, 2023</strong>), you have the right to:
          </p>
          <ul className="space-y-1.5 pl-1 mb-4">
            {[
              'Access your personal data',
              'Request correction or deletion',
              'Withdraw consent for marketing communications',
            ].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
          <p className="text-green-500 text-xs">To exercise these rights, contact us at: <strong>info@valleygreenmart.com</strong></p>
        </Section>

        <Section icon={<Trash2 size={17} />} title="Data Retention" delay={0.04}>
          <p className="text-green-600 text-sm mb-3">We retain your information only as long as necessary to:</p>
          <ul className="space-y-1.5 pl-1">
            {['Fulfill orders', 'Comply with legal obligations', 'Resolve disputes'].map((it, i) => <Bullet key={i}>{it}</Bullet>)}
          </ul>
        </Section>

        <Section icon={<Link size={17} />} title="Third-Party Links" delay={0.04}>
          <p className="text-green-700 text-sm leading-relaxed">
            Our Platform may contain links to third-party websites. We are not responsible for their privacy practices.
          </p>
        </Section>

        <Section icon={<Baby size={17} />} title="Children's Privacy" delay={0.04}>
          <p className="text-green-700 text-sm leading-relaxed">
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect data from children.
          </p>
        </Section>

        <Section icon={<RefreshCw size={17} />} title="Updates to This Policy" delay={0.04}>
          <p className="text-green-700 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.
          </p>
        </Section>

        {/* Contact */}
        <motion.div {...fadeUp(0.04)} className="bg-green-900 rounded-2xl p-6 sm:p-8 border border-green-800">
          <h2 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-green-700 text-green-200 flex items-center justify-center">
              <PhoneCall size={17} />
            </span>
            Contact Us
          </h2>
          <div className="space-y-2 text-sm text-green-200">
            <div><strong className="text-white">Valley Green Mart</strong></div>
            <div>🌐 <a href="http://www.valleygreenmart.com" className="underline hover:text-white transition-colors">www.valleygreenmart.com</a></div>
            <div>✉️ <a href="mailto:info@valleygreenmart.com" className="underline hover:text-white transition-colors">info@valleygreenmart.com</a></div>
            <div>💬 WhatsApp available on the website</div>
          </div>
        </motion.div>

      </section>
    </PageWrapper>
  )
}
