// Pure cart functions (no React). Cart items are stored as { id, quantity }.
export const MAX_QTY = 10
export const FREE_SHIPPING_MIN = 999
export const SHIPPING_FEE = 99

const clamp = (q) => Math.min(MAX_QTY, Math.max(1, q))

// Adds a product, or increases its quantity if it is already in the cart.
export function addItem(items, id, qty = 1) {
  if (items.some((i) => i.id === id)) {
    return items.map((i) => (i.id === id ? { ...i, quantity: clamp(i.quantity + qty) } : i))
  }
  return [...items, { id, quantity: clamp(qty) }]
}

export const changeQuantity = (items, id, delta) =>
  items.map((i) => (i.id === id ? { ...i, quantity: clamp(i.quantity + delta) } : i))

export const removeItem = (items, id) => items.filter((i) => i.id !== id)

// Makes sure data read from localStorage is safe to use.
export function cleanItems(raw, productExists) {
  if (!Array.isArray(raw)) return []
  const seen = new Set()
  const result = []
  for (const i of raw) {
    // Skip null/undefined items and items without proper structure
    if (!i || typeof i !== 'object') continue
    const id = Number(i.id)
    const quantity = Number(i.quantity)
    if (Number.isInteger(id) && id > 0 && Number.isInteger(quantity) && quantity > 0 && productExists(id) && !seen.has(id)) {
      seen.add(id)
      result.push({ id, quantity: clamp(quantity) })
    }
  }
  return result
}

export function getTotals(items, getProduct) {
  const lines = items
    .map((i) => ({ product: getProduct(i.id), quantity: i.quantity }))
    .filter((l) => l.product)
    .map((l) => ({ ...l, subtotal: l.product.price * l.quantity }))
  const subtotal = lines.reduce((sum, l) => sum + l.subtotal, 0)
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE
  const count = lines.reduce((sum, l) => sum + l.quantity, 0)
  return { lines, subtotal, shipping, total: subtotal + shipping, count }
}
