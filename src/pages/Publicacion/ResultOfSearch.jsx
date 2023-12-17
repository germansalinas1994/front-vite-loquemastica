import { Card, Typography } from '@mui/material'
import React from 'react'

function ResultOfSearch({ searchResults }) {
  const totalResults = searchResults.length
  return (
    <Card sx={{
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      width: 300,
      height: 50,
      whiteSpace: 'nowrap',
      backgroundColor: 'background.secondary',
      zIndex: 1,

    }}
    >
      <Typography variant='h10' fontWeight='bold'>
        Resultados encontrados: &nbsp;
      </Typography>
      {' '}
      {totalResults}

    </Card>

  )
}

export default ResultOfSearch
