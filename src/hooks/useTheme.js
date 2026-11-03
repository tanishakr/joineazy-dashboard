import { useState, useEffect } from 'react'

function useTheme() {
  // Start with the saved theme, or 'light' if nothing is saved
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )

  // Runs whenever `theme` changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}

export default useTheme