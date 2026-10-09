import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { MAX_QTY } from '../context/cartLogic'

export default function CartItem({ product, quantity, subtotal, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <Link to={`/product/${product.id}`} className="thumb" aria-label={`View ${product.name}`}>
        {product.image}
      </Link>
      <div className="cart-info">
        <Link to={`/product/${product.id}`} className="cart-name">{product.name}</Link>
        <span style={{color: 'var(--text-muted)', fontSize: 'var(--text-sm)'}}>{formatPrice(product.price)} each</span>
      </div>
      <div className="qty">
        <button aria-label={`Decrease quantity of ${product.name}`} onClick={onDecrease} disabled={quantity <= 1}>−</button>
        <span>{quantity}</span>
        <button aria-label={`Increase quantity of ${product.name}`} onClick={onIncrease} disabled={quantity >= MAX_QTY}>+</button>
      </div>
      <strong className="line-total">{formatPrice(subtotal)}</strong>
      <button className="btn btn-outline btn-small" onClick={onRemove}>Remove</button>
    </div>
  )
}
