import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cartContext'
import { addItem, changeQuantity, removeItem, cleanItems, getTotals } from './cartLogic'
import { getProductById } from '../data/products'

const STORAGE_KEY = 'shopmart_cart'

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return cleanItems(raw, (id) => Boolean(getProductById(id)))
  } catch {
    return [] // storage blocked or data corrupted: start with an empty cart
  }
}

export default function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  // Save every change so the cart survives a page refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable: cart still works until refresh */
    }
  }, [items])

  const value = useMemo(
    () => ({
      ...getTotals(items, getProductById),
      addToCart: (product, qty = 1) => setItems((c) => addItem(c, product.id, qty)),
      increase: (id) => setItems((c) => changeQuantity(c, id, 1)),
      decrease: (id) => setItems((c) => changeQuantity(c, id, -1)),
      remove: (id) => setItems((c) => removeItem(c, id)),
    }),
    [items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
