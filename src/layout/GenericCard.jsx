import React, { useContext } from 'react'
import { Card } from '@mui/material'
import ThemeContext from './ThemeContext'

function GenericCard({ children }) {
  const { isDarkTheme } = useContext(ThemeContext)
  return (
    <Card
      container
      sx={{
        backgroundColor: isDarkTheme ? '#000000' : '#F5F5F5',
        borderRadius: 2,
        padding: '20px 10px',
        display: 'flex',
        justifyContent: 'center', // Center the child components horizontally
        alignItems: 'center', // Center the child components vertically
      }}
    >
      {children}
    </Card>
  )
}

export default GenericCard
