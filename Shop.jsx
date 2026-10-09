import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts, categories } from '../data/products'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const urlCategory = params.get('category') || 'All'
  const category = categories.includes(urlCategory) ? urlCategory : 'All'

  const visible = getProducts().filter(
    (p) => (category === 'All' || p.category === category) && 
           (!query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
  )

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <main className="container section">
      <h1>Shop</h1>

      <input
        className="shop-search"
        type="search"
        value={query}
        onChange={(e) => update('q', e.target.value)}
        placeholder="Search by name or category..."
        aria-label="Search products"
      />

      <div className="chips">
        {['All', ...categories].map((c) => (
          <button
            key={c}
            className={`chip ${c === category ? 'active' : ''}`}
            onClick={() => update('category', c === 'All' ? '' : c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="count" aria-live="polite">
        {visible.length === 0 ? 'No products found' : `${visible.length} product${visible.length !== 1 ? 's' : ''}`}
      </p>

      {visible.length ? (
        <div className="product-grid">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="empty">
          <p>No products match your search.</p>
          <Link className="btn" to="/shop">Clear filters</Link>
        </div>
      )}
    </main>
  )
}
