import * as React from 'react'
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Typography } from '@mui/material'
import CardPublicacion from '../../components/Publicacion/CardPublicacion'
import LoadingModal from '../../components/LoadingModal'
import GenericCard from '../../layout/GenericCard'
import ResultOfSearch from './ResultOfSearch'
import FilterComponent from './FilterComponent'
import SearchBar from './SearchBar'

function ListadoPublicacion() {
  const apiLocalKey = import.meta.env.VITE_APP_API_KEY
  const { showLoadingModal, hideLoadingModal } = LoadingModal()
  const [publicaciones, setPublicaciones] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    // Lógica para obtener las Publicaciones
    const fetchPublicaciones = async () => {
      showLoadingModal()

      try {
        const response = await axios.get(`${apiLocalKey}/publicaciones`)
        console.log(response)

        setPublicaciones(response.data.result.data)
        hideLoadingModal() // <-- Ocultar el modal cuando la operación ha concluido
        // hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
      } catch (error) {
        hideLoadingModal() // <-- Ocultar el modal cuando la operación ha concluido
        console.log(error)
      }
    }

    fetchPublicaciones()
  }, [])

  console.log(publicaciones)

  if (publicaciones.length === 0) {
    return (
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',
      }}
      >
        <Typography variant='h5' sx={{ marginBottom: '20px' }}>No se han agregado publicaciones</Typography>
      </Box>
    )
  }
  if (publicaciones && publicaciones.length > 0) {
    return (
      <GenericCard>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <SearchBar />
          <ResultOfSearch searchResults={publicaciones} />
          <FilterComponent filterValue={filterValue} setFilterValue={setFilterValue} />
        </div>
        <Grid
          container
          spacing={2}
          justifyContent='center'
          sx={{
            display: 'flex', maxWidth: 1, backgroundColor: 'primary', mb: 15,
          }}
        >
          <CardPublicacion publicaciones={publicaciones} />
        </Grid>
      </GenericCard>

    )
  }
}

export default ListadoPublicacion
