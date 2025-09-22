import { useState, useEffect, createContext, useContext } from "react"
import { type Theme, lightTheme, darkTheme } from "../styles/theme"
import { StyleManager } from "../styles/styleUtils"

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  styleManager: StyleManager
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const useThemeManager = () => {
  const [isDark, setIsDark] = useState(false)
  const [theme, setTheme] = useState<Theme>(lightTheme)
  const [styleManager] = useState(() => new StyleManager(lightTheme))

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark)

    if (shouldUseDark) {
      setIsDark(true)
      setTheme(darkTheme)
      styleManager.switchTheme(darkTheme)
    }
  }, [styleManager])

  const toggleTheme = () => {
    const newIsDark = !isDark
    const newTheme = newIsDark ? darkTheme : lightTheme

    setIsDark(newIsDark)
    setTheme(newTheme)
    styleManager.switchTheme(newTheme)

    localStorage.setItem("theme", newIsDark ? "dark" : "light")
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    styleManager.switchTheme(newTheme)

    // Determine if it's a dark theme based on background color
    const isDarkTheme = newTheme.colors.background === darkTheme.colors.background
    setIsDark(isDarkTheme)
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
  }

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme: handleSetTheme,
    styleManager,
  }
}

export { ThemeContext }
