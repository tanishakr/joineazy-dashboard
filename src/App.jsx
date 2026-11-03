import useTheme from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="bg-surface border border-line rounded-xl p-6 text-center">
        <h1 className="text-3xl font-bold text-primary">Joineazy Dashboard</h1>
        <p className="text-muted mt-2">Current theme: {theme}</p>
      </div>
      <button
        onClick={toggleTheme}
        className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg"
      >
        Toggle theme
      </button>
    </div>
  )
}

export default App