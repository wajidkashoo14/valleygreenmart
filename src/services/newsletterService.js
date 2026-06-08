import { db } from './firebase'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'

/**
 * Save newsletter subscriber to Firestore.
 * Collection: subscribers
 * Prevents duplicate entries for the same email.
 */
export async function subscribeNewsletter(email) {
  const ref = collection(db, 'subscribers')

  // Check for existing subscription
  const existing = await getDocs(query(ref, where('email', '==', email)))
  if (!existing.empty) {
    // Already subscribed — treat as success silently
    return { alreadySubscribed: true }
  }

  await addDoc(ref, {
    email,
    subscribedAt: serverTimestamp(),
    source: 'footer_form',
  })

  return { alreadySubscribed: false }
}
