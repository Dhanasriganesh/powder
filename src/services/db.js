import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

// Contacts
export async function saveContactMessage(message) {
  // message: { name, email, phone, subject, message }
  return await addDoc(collection(db, 'contact_messages'), {
    ...message,
    createdAt: serverTimestamp(),
  })
}

// Orders
export async function saveOrder(order) {
  // order: { orderId, paymentId, items, totals, deliveryInfo, shippingAddress, user }
  const id = order.orderId || undefined
  if (id) {
    const ref = doc(db, 'orders', String(id))
    await setDoc(ref, { ...order, createdAt: serverTimestamp() }, { merge: true })
    return ref
  }
  return await addDoc(collection(db, 'orders'), {
    ...order,
    createdAt: serverTimestamp(),
  })
}

// Carts (optional snapshot per user)
export async function saveCartSnapshot(userId, items) {
  if (!userId) return null
  return await addDoc(collection(db, 'users', String(userId), 'carts'), {
    items,
    createdAt: serverTimestamp(),
  })
}

// Favorites (toggle/save)
export async function saveFavorite(userId, productId) {
  if (!userId) return null
  const ref = doc(collection(db, 'users', String(userId), 'favorites'))
  await setDoc(ref, { productId, createdAt: serverTimestamp() })
  return ref
}
