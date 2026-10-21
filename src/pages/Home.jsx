import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts, categories } from '../data/products'

const categoryIcons = { Electronics: '📱', Fashion: '👕', Shoes: '👟', Accessories: '🎒', Home: '🏠' }

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Discover quality essentials</h1>
          <p>Hand-picked products for electronics, fashion, and home. Fast delivery, easy returns, secure checkout.</p>
          <Link to="/shop" className="btn btn-accent">Shop Now</Link>
        </div>
      </section>

      <section className="container section">
        <h2>Shop by category</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <Link key={c} to={`/shop?category=${c}`} className="category-card">
              <span>{categoryIcons[c]}</span>
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2>Featured products</h2>
        <div className="product-grid">
          {getProducts().slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="container section">
        <div className="promo" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', color: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl)', textAlign: 'center'}}>
          <h2 style={{color: 'white', marginBottom: 'var(--space-lg)'}}>Free delivery on orders above ₹999</h2>
          <p style={{fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xl)', opacity: 0.95}}>Simple returns · Secure checkout · 24/7 support</p>
          <Link to="/shop" className="btn btn-accent">Explore all products</Link>
        </div>
      </section>
    </main>
  )
}
