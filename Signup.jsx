import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { validateSignupForm } from '../context/authLogic'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateSignupForm(name, email, password, confirmPassword)
    if (errs.length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    const result = signup(name, email, password)
    setSubmitting(false)

    if (result.success) {
      navigate('/shop')
    } else {
      setErrors([result.error])
    }
  }

  return (
    <main className="container section">
      <div className="form-box">
        <h1>Create account</h1>
        <p style={{color: 'var(--text-muted)', marginBottom: 'var(--space-xl)'}}>Join Veyora for faster checkout</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              disabled={submitting}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={submitting}
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
            <small style={{color: 'var(--text-muted)'}}>Minimum 6 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••"
              disabled={submitting}
            />
          </div>

          {errors.length > 0 && (
            <div className="errors" role="alert">
              {errors.map((e, i) => <p key={i}>{e}</p>)}
            </div>
          )}

          <button type="submit" className="btn btn-accent" disabled={submitting} style={{width: '100%'}}>
            {submitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="form-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
