import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import { validateCheckoutForm } from '../context/authLogic'
import { createOrder } from '../context/orderLogic'
import { formatPrice } from '../data/products'

const ORDERS_KEY = 'shopmart_orders'

export default function Checkout() {
  const { user } = useAuth()
  const { lines, subtotal, shipping, total } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [errors, setErrors] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate(`/login?next=/checkout`)
      return
    }

    const errs = validateCheckoutForm(name, email, phone, address, city, state, pincode)
    if (errs.length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)

    const checkout = { phone, address, city, state, pincode, paymentMethod }
    const order = createOrder(user, checkout, { lines, subtotal, shipping, total })

    try {
      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
      orders.push(order)
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    } catch {}

    setSubmitting(false)
    navigate('/order-confirmation', { state: { order } })
  }

  if (lines.length === 0) {
    return (
      <main className="container section">
        <h1>Checkout</h1>
        <p style={{color: 'var(--text-muted)'}}>Your cart is empty. Add products before checking out.</p>
      </main>
    )
  }

  return (
    <main className="container section">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form onSubmit={handleSubmit}>
          <section className="checkout-section">
            <h2>Delivery details</h2>
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={submitting} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitting} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" disabled={submitting} />
            </div>
          </section>

          <section className="checkout-section">
            <h2>Shipping address</h2>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street and house number" disabled={submitting} />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)'}}>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} disabled={submitting} />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input id="state" type="text" value={state} onChange={(e) => setState(e.target.value)} disabled={submitting} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input id="pincode" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="6-digit code" disabled={submitting} />
            </div>
          </section>

          <section className="checkout-section">
            <h2>Payment method</h2>
            <div className="radio-group">
              <label><input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery</label>
              <label><input type="radio" name="payment" value="Card" checked={paymentMethod === 'Card'} onChange={(e) => setPaymentMethod(e.target.value)} /> Debit / Credit Card</label>
              <label><input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} /> UPI</label>
            </div>
            <p style={{fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--space-lg)'}}>Demo: No real payment processing</p>
          </section>

          {errors.length > 0 && (
            <div className="errors" role="alert">
              {errors.map((e, i) => <p key={i}>{e}</p>)}
            </div>
          )}

          <button type="submit" className="btn btn-accent" disabled={submitting} style={{width: '100%', fontSize: 'var(--text-lg)', padding: 'var(--space-md) var(--space-xl)'}}>
            {submitting ? 'Placing order...' : 'Place Order'}
          </button>
        </form>

        <aside className="summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {lines.map((l) => (
              <div key={l.product.id} className="order-item">
                <span>{l.product.name} × {l.quantity}</span>
                <span>{formatPrice(l.subtotal)}</span>
              </div>
            ))}
          </div>
          <div className="sum-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="sum-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
          <div className="sum-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
        </aside>
      </div>
    </main>
  )
}
