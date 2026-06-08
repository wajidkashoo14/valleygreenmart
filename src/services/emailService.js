import emailjs from '@emailjs/browser'

const SERVICE_ID          = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID         = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
const PUBLIC_KEY          = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Send order confirmation email.
 * Sends to store owner always; also to customer if they provided an email.
 */
export async function sendOrderConfirmation({ form, cartProducts, total, subtotal, delivery, orderId, eta }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS env vars not configured — skipping email')
    return
  }

  // Plain-text item lines — safe in every email client, no HTML injection needed
  const items_list = cartProducts
    .map((p, i) => {
      const lineTotal = `₹${(p.price * p.qty).toLocaleString('en-IN')}`
      return `${i + 1}. ${p.name}\n   Qty: ${p.qty}   |   ${lineTotal}`
    })
    .join('\n\n')

  // Short summary for subject line e.g. "Kashmir Saffron + 2 more items"
  const first_product = cartProducts[0]?.name ?? ''
  const extra_count   = cartProducts.length - 1
  const order_summary = extra_count > 0
    ? `${first_product} + ${extra_count} more item${extra_count > 1 ? 's' : ''}`
    : first_product

  const placedAt    = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const STORE_EMAIL = import.meta.env.VITE_STORE_EMAIL || 'info@valleygreenmart.com'

  const baseParams = {
    order_id:        orderId,
    order_summary,
    customer_name:   `${form.firstName} ${form.lastName}`,
    customer_phone:  form.phone,
    customer_email:  form.email || 'Not provided',
    address:         `${form.address}, ${form.city}, ${form.state} — ${form.pin}`,
    items_list,                          // plain text, white-space:pre-line in template
    items_count:     String(cartProducts.length),
    subtotal:        `₹${(subtotal ?? total).toLocaleString('en-IN')}`,
    delivery_charge: delivery === 0 ? 'FREE' : `₹${delivery.toLocaleString('en-IN')}`,
    order_total:     `₹${total.toLocaleString('en-IN')}`,
    payment_method:  'Cash on Delivery',
    eta,
    placed_at:       placedAt,
  }

  // 1. Store owner — "New Order Received" only
  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    ...baseParams,
    to_email:      STORE_EMAIL,
    email_heading: 'New Order Received',
    email_note:    '',
  }, PUBLIC_KEY)

  // 2. Customer — "Your Order is Confirmed" only if:
  //    - they provided an email AND
  //    - it's not the same as the store email (avoids duplicate on owner's inbox)
  const customerEmail = form.email?.trim().toLowerCase()
  const storeEmail    = STORE_EMAIL.trim().toLowerCase()
  if (customerEmail && customerEmail.includes('@') && customerEmail !== storeEmail) {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      ...baseParams,
      to_email:      form.email,
      email_heading: 'Your Order is Confirmed',
      email_note:    'Thank you for shopping with Valley Green Mart. We will contact you on your phone number to confirm delivery timing.',
    }, PUBLIC_KEY)
  }
}

/**
 * Send contact-form message to the store owner.
 */
export async function sendContactMessage({ name, email, phone, subject, message }) {
  if (!SERVICE_ID || !CONTACT_TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS contact template not configured — skipping')
    return
  }
  return emailjs.send(
    SERVICE_ID,
    CONTACT_TEMPLATE_ID,
    {
      from_name:    name,
      from_email:   email,
      from_phone:   phone || 'Not provided',
      subject:      subject || 'General Enquiry',
      message,
      sent_at:      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    },
    PUBLIC_KEY
  )
}
