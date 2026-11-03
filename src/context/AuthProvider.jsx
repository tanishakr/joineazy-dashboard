import useLocalStorage from '../hooks/useLocalStorage'
import { AuthContext } from './AuthContext'
import { users } from '../data/seedData'

export function AuthProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useLocalStorage('currentUserId', null)

  // Find the full user object from the saved id (or null if nobody is logged in)
  const currentUser = users.find((u) => u.id === currentUserId) || null

  function login(userId) {
    setCurrentUserId(userId)
  }

  function logout() {
    setCurrentUserId(null)
  }

  const value = { currentUser, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}