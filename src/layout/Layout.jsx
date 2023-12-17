import React, { useState, useEffect } from 'react'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import theme from './theme'
import darkTheme from './darkTheme'
import NavBar from './NavBar'
import ThemeContext from './ThemeContext'
import Footer from './Footer'

function Layout({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme ? JSON.parse(storedTheme) : false
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkTheme))
  }, [isDarkTheme])

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme)
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : theme}>
        <CssBaseline />
        <Box sx={{
          display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between', padding: '2em', marginTop: '4em',
        }}
        >
          <NavBar>
            {children}
          </NavBar>
        </Box>

        <Box sx={{ flex: '1 0 auto' }} />
        {' '}
        {/* Este Box empujará el footer hacia abajo */}
        <Footer />
      </ThemeProvider>
    </ThemeContext.Provider>

  )
}

export default Layout
