import { Card, Typography } from '@mui/material'

function FilterComponent({ filterValue, setFilterValue }) {
  const filterOptions = ['Marca']
  const handleFilterChange = (filter) => {
    const updatedFilters = [...filterValue]
    if (updatedFilters.includes(filter)) {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1)
    } else {
      updatedFilters.push(filter)
    }
    setFilterValue(updatedFilters)
  }

  return (
    <Card sx={{
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      backgroundColor: 'background.secondary',
      zIndex: 0,
      marginTop: 1,

    }}
    >
      <div>
        <Typography variant='h10' fontWeight='bold'>
          Filtrar por:
          {' '}
          <br />
        </Typography>
        <Typography variant='h10' fontWeight='bold'>
          Marca
        </Typography>
        <Typography variant='h10' fontWeight='regular'>
          {filterOptions.map((filter) => (
            <label key={filter} htmlFor={filter} style={{ display: 'block' }}>

              <input
                type='checkbox'
                value={filter}
                checked={filterValue.includes(filter)}
                onChange={() => handleFilterChange(filter)}
              />
              {filter}
            </label>
          ))}
        </Typography>
      </div>
    </Card>

  )
}

export default FilterComponent
