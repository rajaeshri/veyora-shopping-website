import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { validateLoginForm } from '../context/authLogic'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/shop'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateLoginForm(email, password)
    if (errs.length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    const result = login(email, password)
    setSubmitting(false)

    if (result.success) {
      navigate(next)
    } else {
      setErrors([result.error])
    }
  }

  return (
    <main className="container section">
      <div className="form-box">
        <h1>Welcome back</h1>
        <p style={{color: 'var(--text-muted)', marginBottom: 'var(--space-xl)'}}>Sign in to your Veyora account</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={submitting}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-group">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                disabled={submitting}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="errors" role="alert">
              {errors.map((e, i) => <p key={i}>{e}</p>)}
            </div>
          )}

          <button type="submit" className="btn btn-accent" disabled={submitting} style={{width: '100%'}}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="form-link">
          New to Veyora? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </main>
  )
}
