import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Leaf,
} from 'lucide-react'

import PageWrapper from '../components/ui/PageWrapper'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.5,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
})

const WHATSAPP_NUMBER = '919186361336'

const CONTACT_INFO = [
  {
    icon: <MapPin size={20} />,
    label: 'Visit Us',
    lines: ['Saida Kadal Bridge, Rainwari', 'Jammu & Kashmir — 190003'],
    color: 'bg-green-100 text-green-700',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email Us',
    lines: ['info@valleygreenmart.com', 'We reply within 24 hours'],
    href: 'mailto:info@valleygreenmart.com',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: <Phone size={20} />,
    label: 'Call / WhatsApp',
    lines: ['+91 77809 66909', 'Mon–Sat, 8 AM – 8 PM'],
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: <Clock size={20} />,
    label: 'Working Hours',
    lines: ['Monday – Saturday', '8:00 AM – 8:00 PM IST'],
    color: 'bg-amber-100 text-amber-700',
  },
]

const FAQS = [
  {
    q: 'How do I track my order?',
    a: "WhatsApp us your order number at +91 77809 66909 and we'll send you a live update.",
  },
  {
    q: 'What is the cut-off time for ordering?',
    a: 'Orders must be placed before 9 PM on the previous evening for next-day harvest and delivery.',
  },
  {
    q: 'Do you deliver outside Kashmir?',
    a: 'Yes! We deliver dry fruits, saffron, honey and non-perishable items pan-India. Fresh produce is local.',
  },
  {
    q: 'Can I place a bulk order for a wedding?',
    a: 'Absolutely. WhatsApp or email us with your requirements and we will prepare a custom quote.',
  },
]

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const set = field => e => {
    setForm(f => ({
      ...f,
      [field]: e.target.value,
    }))

    setErrors(err => {
      const n = { ...err }
      delete n[field]
      return n
    })
  }

  const validate = () => {
    const e = {}

    if (!form.name.trim()) {
      e.name = 'Name is required'
    }

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      e.email = 'Valid email required'
    }

    if (!form.message.trim()) {
      e.message = 'Message is required'
    }

    setErrors(e)

    return Object.keys(e).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSent(true)

      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    }, 1400)
  }

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hi! I have an enquiry about Valley Green Mart.'
    )

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <PageWrapper>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 py-14 sm:py-20 lg:py-24">
        <div className="hero-grain" />

        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Leaf size={11} />
            Get in Touch
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="
              font-display
              text-3xl
              sm:text-5xl
              lg:text-6xl
              font-bold
              text-white
              leading-tight
              mb-5
              px-1
            "
          >
            We'd Love to{' '}
            <span className="text-green-300">Hear From You</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="
              text-green-200/80
              text-sm
              sm:text-base
              leading-relaxed
              max-w-xl
              mx-auto
              px-2
            "
          >
            Have a question about our products, a bulk order enquiry,
            or just want to say hello? Reach out — we're always happy
            to help.
          </motion.p>

          {/* QUICK CONTACT */}
          <motion.div
            {...fadeUp(0.22)}
            className="
              flex flex-col
              sm:flex-row
              flex-wrap
              justify-center
              items-center
              gap-3
              mt-8
            "
          >
            <a
              href="mailto:info@valleygreenmart.com"
              className="flex max-w-full items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
            >
              <Mail
                size={14}
                className="flex-shrink-0"
              />

              <span className="truncate">
                info@valleygreenmart.com
              </span>
            </a>

            <button
              onClick={openWhatsApp}
              className="flex items-center gap-2 bg-[#25D366]/90 hover:bg-[#25D366] text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {CONTACT_INFO.map((info, i) => (
            <motion.div
              key={info.label}
              {...fadeUp(i * 0.07)}
            >
              {info.href ? (
                <a
                  href={info.href}
                  target={
                    info.href.startsWith('http')
                      ? '_blank'
                      : undefined
                  }
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl border border-green-100 p-4 sm:p-5 shadow-md hover:shadow-lg hover:border-green-300 transition-all h-full"
                >
                  <ContactCard info={info} />
                </a>
              ) : (
                <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-5 shadow-md h-full">
                  <ContactCard info={info} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[1fr_380px]
            gap-8
            lg:gap-12
            items-start
          "
        >
          {/* FORM */}
          <motion.div {...fadeUp(0)}>
            <div
              className="
                bg-white
                rounded-2xl
                sm:rounded-3xl
                border border-green-100
                p-4
                sm:p-6
                lg:p-8
                shadow-sm
              "
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-green-900 mb-2">
                Send Us a Message
              </h2>

              <p className="text-green-500 text-sm mb-7">
                Fill in the form and we'll get back to you within 24
                hours.
              </p>

              {sent ? (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle
                      size={32}
                      className="text-green-600"
                    />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-green-900">
                    Message Sent!
                  </h3>

                  <p className="text-green-500 text-sm max-w-xs">
                    Thank you for reaching out. We'll get back to you
                    within 24 hours.
                  </p>

                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm text-green-600 font-semibold hover:text-green-800 transition-colors underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* NAME + EMAIL */}
                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      gap-4
                    "
                  >
                    <Field
                      label="Full Name *"
                      placeholder="Ahmad Mir"
                      value={form.name}
                      onChange={set('name')}
                      error={errors.name}
                    />

                    <Field
                      label="Email Address *"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set('email')}
                      error={errors.email}
                    />
                  </div>

                  {/* PHONE + SUBJECT */}
                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      gap-4
                    "
                  >
                    <Field
                      label="Phone / WhatsApp"
                      type="tel"
                      placeholder="+91 77809 66909"
                      value={form.phone}
                      onChange={set('phone')}
                    />

                    <div>
                      <label className="block text-xs font-semibold text-green-700 mb-1.5">
                        Subject
                      </label>

                      <select
                        value={form.subject}
                        onChange={set('subject')}
                        className="w-full px-3.5 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900 focus:outline-none focus:border-green-400 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">
                          Select a topic…
                        </option>
                        <option>Product Enquiry</option>
                        <option>Order / Tracking</option>
                        <option>Bulk / Wedding Order</option>
                        <option>Return / Refund</option>
                        <option>Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="block text-xs font-semibold text-green-700 mb-1.5">
                      Message *
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help…"
                      value={form.message}
                      onChange={set('message')}
                      className={`w-full px-3.5 py-2.5 bg-green-50 border rounded-xl text-sm text-green-900 focus:outline-none focus:bg-white transition-all resize-none ${
                        errors.message
                          ? 'border-red-300 focus:border-red-400'
                          : 'border-green-200 focus:border-green-400'
                      }`}
                    />

                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 disabled:bg-green-300 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg active:scale-[0.98]"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* SIDEBAR */}
          <div className="space-y-5 w-full">
            {/* WHATSAPP */}
            <motion.div {...fadeUp(0.08)}>
              <div
                className="
                  rounded-2xl
                  p-5
                  sm:p-6
                  text-white
                "
                style={{
                  background:
                    'linear-gradient(135deg, #128C7E 0%, #25D366 100%)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle size={22} />
                  </div>

                  <div>
                    <div className="font-bold text-base">
                      WhatsApp Us
                    </div>

                    <div className="text-white/80 text-xs">
                      Fastest way to reach us
                    </div>
                  </div>
                </div>

                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  For order updates, product questions, or anything
                  else — WhatsApp is the quickest way to get a
                  response.
                </p>

                <button
                  onClick={openWhatsApp}
                  className="w-full bg-white text-green-800 font-bold py-2.5 rounded-xl text-sm hover:bg-green-50 transition-colors"
                >
                  Open WhatsApp Chat →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-green-50 border-t border-green-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            {...fadeUp(0)}
            className="text-center mb-8"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-green-900 mb-2">
              Find Us in Srinagar
            </h2>

            <p className="text-green-500 text-sm">
              Saida Kadal Bridge, Rainwari, Srinagar, Jammu &
              Kashmir — 190003
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="
              rounded-2xl
              overflow-hidden
              border border-green-200
              shadow-md
              h-[260px]
              sm:h-80
              lg:h-[420px]
              relative
            "
          >
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80&auto=format&fit=crop"
              alt="Srinagar"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center">
              <div
                className="
                  mx-4
                  w-full
                  max-w-[92%]
                  sm:max-w-md
                  bg-white
                  rounded-2xl
                  px-4
                  sm:px-6
                  py-4
                  shadow-xl
                  text-center
                "
              >
                <MapPin
                  size={28}
                  className="text-green-600 mx-auto mb-2"
                />

                <div className="font-bold text-green-900 text-base">
                  Valley Green Mart
                </div>

                <div className="text-green-500 text-xs mt-1">
                  Saida Kadal Bridge, Rainwari, Srinagar
                </div>

                <a
                  href="https://maps.google.com/?q=Saida+Kadal+Bridge+Rainwari+Srinagar+Kashmir+190003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

/* FIELD */
function Field({ label, error, ...inputProps }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-green-700 mb-1.5">
        {label}
      </label>

      <input
        {...inputProps}
        className={`w-full px-3.5 py-2.5 bg-green-50 border rounded-xl text-sm text-green-900 focus:outline-none focus:bg-white transition-all placeholder:text-green-300 ${
          error
            ? 'border-red-300 focus:border-red-400'
            : 'border-green-200 focus:border-green-400'
        }`}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}

/* CONTACT CARD */
function ContactCard({ info }) {
  return (
    <>
      <div
        className={`w-10 h-10 rounded-xl ${info.color} flex items-center justify-center mb-3`}
      >
        {info.icon}
      </div>

      <div className="text-[11px] font-bold uppercase tracking-wider text-green-400 mb-1.5">
        {info.label}
      </div>

      {info.lines.map((line, i) => (
        <div
          key={i}
          className={`
            break-words
            text-xs
            sm:text-sm
            leading-snug
            ${
              i === 0
                ? 'font-semibold text-green-900'
                : 'text-green-500'
            }
          `}
        >
          {line}
        </div>
      ))}
    </>
  )
}