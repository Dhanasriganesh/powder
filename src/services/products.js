import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'

const PRODUCTS_COL = 'products'

export async function fetchProducts(filters = {}) {
  // filters: { category, size, search, limitCount }
  const colRef = collection(db, PRODUCTS_COL)
  const parts = []
  if (filters.category && filters.category !== 'all') {
    parts.push(where('category', '==', filters.category))
  }
  // simple ordering by name; adjust as needed
  parts.push(orderBy('name'))
  if (filters.limitCount) parts.push(limit(filters.limitCount))
  const q = query(colRef, ...parts)
  const snap = await getDocs(q)
  let products = snap.docs.map(d => ({ id: d.id, ...d.data() }))

  // client search filter
  if (filters.search) {
    const key = String(filters.search).toLowerCase()
    products = products.filter(p =>
      p.name?.toLowerCase().includes(key) ||
      p.description?.toLowerCase().includes(key) ||
      p.ingredients?.toLowerCase().includes(key) ||
      p.category?.toLowerCase().includes(key)
    )
  }
  return products
}

export async function fetchProductById(id) {
  const ref = doc(db, PRODUCTS_COL, String(id))
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function fetchRelated(product, count = 4) {
  if (!product) return []
  const items = await fetchProducts({ category: product.category, limitCount: count + 1 })
  return items.filter(p => p.id !== product.id).slice(0, count)
}


