import { Link, useLocation } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useEffect, useState } from 'react'

const ORDERS_KEY = 'shopmart_orders'

export default function OrderConfirmation() {
  const location = useLocation()
  const [order, setOrder] = useState(location.state?.order || null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!order) {
      try {
        const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
        if (orders.length > 0) {
          setOrder(orders[orders.length - 1])
        } else {
          setNotFound(true)
        }
      } catch {
        setNotFound(true)
      }
    }
  }, [order])

  if (notFound || !order) {
    return (
      <main className="container section">
        <h1>Order not found</h1>
        <p style={{color: 'var(--text-muted)'}}>No recent order found. Start shopping to place a new order.</p>
        <Link className="btn btn-accent" to="/shop">Continue Shopping</Link>
      </main>
    )
  }

  return (
    <main className="container section">
      <div className="confirmation">
        <div className="confirmation-header">
          <span className="success-icon">✓</span>
          <h1>Order Confirmed!</h1>
          <p style={{color: 'var(--text-muted)', fontSize: 'var(--text-lg)'}}>Thank you for your purchase, {order.userName}.</p>
        </div>

        <div className="confirmation-content">
          <section className="confirm-section">
            <h2>Order Details</h2>
            <div className="detail-row">
              <span>Order ID</span>
              <strong style={{fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)'}}>{order.id}</strong>
            </div>
            <div className="detail-row">
              <span>Order Date</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span>Payment</span>
              <span>{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</span>
            </div>
          </section>

          <section className="confirm-section">
            <h2>Delivery Address</h2>
            <p style={{margin: 'var(--space-sm) 0', lineHeight: 'var(--leading-relaxed)'}}>
              {order.address}<br/>
              {order.city}, {order.state} {order.pincode}<br/>
              <strong>Phone: {order.phone}</strong>
            </p>
          </section>

          <section className="confirm-section">
            <h2>Order Summary</h2>
            {order.items.map((l) => (
              <div key={l.product.id} className="order-item">
                <span>{l.product.name} × {l.quantity}</span>
                <span>{formatPrice(l.subtotal)}</span>
              </div>
            ))}
            <div className="sum-row"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="sum-row"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span></div>
            <div className="sum-row total"><span>Total Amount</span><span>{formatPrice(order.total)}</span></div>
          </section>

          <p className="info-text">Confirmation email sent to <strong>{order.userEmail}</strong></p>
        </div>

        <Link className="btn btn-accent" to="/shop">Continue Shopping</Link>
      </div>
    </main>
  )
}
