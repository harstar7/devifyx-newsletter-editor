import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    textColor: '#1f2937',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  })

  const updateTheme = (updates) => {
    setTheme(prev => ({ ...prev, ...updates }))
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}