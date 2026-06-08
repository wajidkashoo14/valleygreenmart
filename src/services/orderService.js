import { db } from './firebase'
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'

/**
 * Save a placed order to Firestore.
 * Collection: orders/{orderId}
 * Also upserts the customer profile under: customers/{uid or phone}
 */
export async function saveOrder({ user, form, cartProducts, total, subtotal, delivery, payMethod, orderId }) {
  const orderData = {
    orderId,
    placedAt: serverTimestamp(),
    status: 'confirmed',
    customer: {
      uid:       user?.id   || null,
      name:      `${form.firstName} ${form.lastName}`.trim(),
      email:     user?.email || null,
      phone:     form.phone,
    },
    shippingAddress: {
      firstName: form.firstName,
      lastName:  form.lastName,
      address:   form.address,
      city:      form.city,
      state:     form.state,
      pin:       form.pin,
      phone:     form.phone,
    },
    items: cartProducts.map(p => ({
      id:       p.id,
      name:     p.name,
      qty:      p.qty,
      price:    p.price,
      image:    p.image,
    })),
    pricing: { subtotal, delivery, total },
    paymentMethod: payMethod,
  }

  // Save order
  await setDoc(doc(db, 'orders', orderId), orderData)

  // Upsert customer record (keyed by uid if logged in, else by phone)
  const customerKey = user?.id || `phone_${form.phone.replace(/\D/g, '')}`
  await setDoc(
    doc(db, 'customers', customerKey),
    {
      uid:       user?.id   || null,
      name:      `${form.firstName} ${form.lastName}`.trim(),
      email:     user?.email || null,
      phone:     form.phone,
      lastAddress: orderData.shippingAddress,
      lastOrderAt: serverTimestamp(),
      // merge so we don't overwrite existing orders count etc.
    },
    { merge: true }
  )

  return orderData
}
