import type React from "react"
import { ThemeContext, useThemeManager } from "../hooks/useTheme"

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeManager = useThemeManager()

  return <ThemeContext.Provider value={themeManager}>{children}</ThemeContext.Provider>
}
