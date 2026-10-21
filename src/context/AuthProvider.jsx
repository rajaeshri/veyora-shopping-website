import { useEffect, useState, useCallback } from 'react'
import { AuthContext } from './authContext'
import { hashPassword, verifyPassword } from './authLogic'

const USERS_STORAGE_KEY = 'shopmart_users'
const SESSION_STORAGE_KEY = 'shopmart_user'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export default function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(loadUser)

  // Save users and current user to storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    } catch {}
  }, [users])

  useEffect(() => {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
    } catch {}
  }, [user])

  const signup = useCallback(
    (name, email, password) => {
      const existing = users.find((u) => u.email === email)
      if (existing) return { success: false, error: 'Email already registered' }
      const newUser = { name, email, passwordHash: hashPassword(password) }
      setUsers((u) => [...u, newUser])
      setUser({ name, email })
      return { success: true }
    },
    [users]
  )

  const login = useCallback(
    (email, password) => {
      const found = users.find((u) => u.email === email)
      if (!found) return { success: false, error: 'Email not found' }
      if (!verifyPassword(password, found.passwordHash)) return { success: false, error: 'Wrong password' }
      setUser({ name: found.name, email: found.email })
      return { success: true }
    },
    [users]
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = {
    user,
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
