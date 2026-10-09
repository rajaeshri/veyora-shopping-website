import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../context/useCart'
import { formatPrice } from '../data/products'
import { FREE_SHIPPING_MIN } from '../context/cartLogic'

export default function Cart() {
  const { lines, subtotal, shipping, total, increase, decrease, remove } = useCart()

  if (lines.length === 0) {
    return (
      <main className="container section">
        <h1>Your Cart</h1>
        <div className="empty">
          <p>Your cart is empty.</p>
          <Link className="btn btn-accent" to="/shop">Continue Shopping</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container section">
      <h1>Your Cart</h1>
      <div className="cart-layout">
        <div>
          {lines.map((l) => (
            <CartItem
              key={l.product.id}
              product={l.product}
              quantity={l.quantity}
              subtotal={l.subtotal}
              onIncrease={() => increase(l.product.id)}
              onDecrease={() => decrease(l.product.id)}
              onRemove={() => remove(l.product.id)}
            />
          ))}
        </div>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="sum-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="sum-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p>Add {formatPrice(FREE_SHIPPING_MIN - subtotal)} for free shipping.</p>
          )}
          <div className="sum-row total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="btn-group">
            <Link className="btn btn-accent" to="/checkout">Proceed to Checkout</Link>
            <Link className="btn btn-outline" to="/shop">Continue Shopping</Link>
          </div>
        </aside>
      </div>
    </main>
  )
}
