import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { categories } from '../data/products'
import { useCart } from '../context/useCart'
import { useAuth } from '../context/useAuth'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { count } = useCart()
  const { user, logout } = useAuth()
  const close = () => setOpen(false)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
    close()
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={close}>Veyora</Link>

        <button 
          className="burger" 
          aria-label="Toggle menu" 
          aria-expanded={open} 
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop</NavLink>

          <div className="dropdown">
            <span className="dropdown-label" tabIndex={0}>Categories</span>
            <div className="dropdown-menu">
              {categories.map((c) => (
                <Link key={c} to={`/shop?category=${c}`} onClick={close}>{c}</Link>
              ))}
            </div>
          </div>

          <form className="search" onSubmit={handleSearch} role="search">
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search..." 
              aria-label="Search products" 
            />
            <button type="submit" aria-label="Search">🔍</button>
          </form>

          <NavLink to="/cart" onClick={close}>
            🛒 Cart <span style={{fontSize: '12px'}}>({count})</span>
          </NavLink>

          {user ? (
            <>
              <span className="user-name">{user.name}</span>
              <button className="nav-btn" onClick={() => { logout(); close(); }}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={close}>Login</NavLink>
              <NavLink to="/signup" onClick={close}>Sign up</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
