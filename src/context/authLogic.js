// Pure auth functions (no React)
export const MIN_PASSWORD_LEN = 6

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateLoginForm(email, password) {
  const errors = []
  if (!email.trim()) errors.push('Email is required')
  else if (!isValidEmail(email)) errors.push('Invalid email format')
  if (!password) errors.push('Password is required')
  return errors
}

export function validateSignupForm(name, email, password, confirmPassword) {
  const errors = []
  if (!name.trim()) errors.push('Name is required')
  if (!email.trim()) errors.push('Email is required')
  else if (!isValidEmail(email)) errors.push('Invalid email format')
  if (!password) errors.push('Password is required')
  else if (password.length < MIN_PASSWORD_LEN) errors.push(`Password must be at least ${MIN_PASSWORD_LEN} characters`)
  if (!confirmPassword) errors.push('Confirm password')
  else if (password !== confirmPassword) errors.push('Passwords do not match')
  return errors
}

export function validateCheckoutForm(name, email, phone, address, city, state, pincode) {
  const errors = []
  if (!name.trim()) errors.push('Name is required')
  if (!email.trim()) errors.push('Email is required')
  else if (!isValidEmail(email)) errors.push('Invalid email format')
  if (!phone.trim()) errors.push('Phone is required')
  else if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) errors.push('Phone must be 10 digits')
  if (!address.trim()) errors.push('Address is required')
  if (!city.trim()) errors.push('City is required')
  if (!state.trim()) errors.push('State is required')
  if (!pincode.trim()) errors.push('Pincode is required')
  else if (!/^\d{6}$/.test(pincode)) errors.push('Pincode must be 6 digits')
  return errors
}

export function hashPassword(password) {
  // NOT a real hash. For demo only. Real apps need bcrypt on the backend.
  return btoa(password)
}

export function verifyPassword(password, hash) {
  return btoa(password) === hash
}

export function generateOrderID() {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase()
}
