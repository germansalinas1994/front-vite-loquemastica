import { Button, Card } from '@mui/material'
import React, { useState } from 'react'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = () => {
    // Simulate an API call with setTimeout to fetch search results
    // Replace this with your actual API endpoint and fetch logic
    setTimeout(() => {
      const mockApiResponse = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
      ]
      setSearchResults(mockApiResponse)
    }, 1000) // Simulate a delay of 1 second (1000 milliseconds)
  }

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
      marginBottom: 1,

    }}
    >
      {' '}
      <div>
        <input
          type='text'
          placeholder='Buscar producto'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button onClick={handleSearch} color='secondary' variant='contained' size='small' sx={{ marginLeft: 2 }}>
          Search

        </Button>
      </div>

    </Card>

  )
}

export default SearchBar
