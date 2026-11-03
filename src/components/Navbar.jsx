import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'

function Navbar() {
  const { currentUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-surface border-b border-line px-4 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold text-primary">Joineazy</h1>

      <div className="flex items-center gap-3">
        {currentUser && (
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{currentUser.name}</p>
            <p className="text-xs text-muted capitalize">{currentUser.role}</p>
          </div>
        )}

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="border border-line rounded-lg px-3 py-1.5 hover:bg-page"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {currentUser && (
          <button
            onClick={logout}
            className="bg-primary hover:bg-primary-hover text-white rounded-lg px-3 py-1.5 text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar