import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById, formatPrice } from '../data/products'
import { useCart } from '../context/useCart'
import { MAX_QTY } from '../context/cartLogic'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1500)
    return () => clearTimeout(t)
  }, [added])

  if (!product) {
    return (
      <main className="container section">
        <h1>Product not found</h1>
        <p style={{color: 'var(--text-muted)'}}>This product does not exist or was removed.</p>
        <Link className="btn" to="/shop">Back to Shop</Link>
      </main>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
  }

  return (
    <main className="container section">
      <Link to="/shop" style={{color: 'var(--primary)', fontWeight: 600, marginBottom: 'var(--space-lg)', display: 'block'}}>← Back to Shop</Link>
      <div className="details">
        <div className="product-image big">{product.image}</div>
        <div>
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="rating">★ {product.rating} (Highly rated)</p>
          <p className="big-price">{formatPrice(product.price)}</p>
          <p style={{color: 'var(--text-muted)', lineHeight: 'var(--leading-relaxed)'}}>{product.fullDescription}</p>

          <div className="form-group">
            <label htmlFor="qty">Quantity</label>
            <div className="qty">
              <button aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button aria-label="Increase quantity" onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn btn-accent" onClick={handleAddToCart}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link className="btn btn-outline" to="/shop">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
