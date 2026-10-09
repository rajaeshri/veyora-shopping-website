import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useCart } from '../context/useCart'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1200)
    return () => clearTimeout(t)
  }, [added])

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image" aria-label={`View ${product.name}`}>
        {product.image}
      </Link>
      <p className="category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="short">{product.shortDescription}</p>
      <p className="rating" aria-label={`Rating ${product.rating} out of 5`}>★ {product.rating}</p>
      <p className="price">{formatPrice(product.price)}</p>
      <div className="card-actions">
        <button className="btn btn-accent btn-small" onClick={handleAdd}>
          {added ? '✓ Added' : 'Add to Cart'}
        </button>
        <Link className="btn btn-outline btn-small" to={`/product/${product.id}`}>Details</Link>
      </div>
    </article>
  )
}
