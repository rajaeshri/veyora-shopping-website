import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong className="logo">Veyora</strong>
          <p>Premium essentials, delivered with care. Free shipping on orders over ₹999.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Account</Link>
        </div>
      </div>
      <p className="copy">© 2026 Veyora. Internship project showcasing modern e-commerce design.</p>
    </footer>
  )
}
