import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { useAuth0 } from '@auth0/auth0-react'
import { useCarrito } from '../../components/Cart/CarritoProvider'
import PositionedSnackbar from '../../components/PositionedSnackbar'
import { SucursalContext } from '../../components/User/SucursalContext'

const apiLocalKey = import.meta.env.VITE_APP_API_KEY
const sucursalGlobal = import.meta.env.VITE_APP_SUCURSAL_GENERICA

function Publicacion() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0()
  const { agregarAlCarrito } = useCarrito()
  const { sucursalSeleccionada } = useContext(SucursalContext)

  const { id } = useParams()
  const [publicacion, setPublicacion] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  const arrayQuantity = [1, 2, 3, 4, 5, 6]

  useEffect(() => {
    fetchPublicacion()
  }, [])

  const fetchPublicacion = async () => {
    try {
      const idPublicacion = parseInt(id)
      const response = await axios.get(`${apiLocalKey}/publicacion/${idPublicacion}`)
      setPublicacion(response.data.result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAgregarAlCarrito = () => {
    if (!isAuthenticated) {
      showSnackbar('Necesitas estar logueado para agregar al carrito')
    }
    if (isAuthenticated && sucursalSeleccionada == sucursalGlobal) {
      showSnackbar('Necesitas seleccionar una sucursal para agregar al carrito')
    }
    if (isAuthenticated && sucursalSeleccionada !== sucursalGlobal) {
      agregarAlCarrito({ id: publicacion.idPublicacion, cantidad: selectedQuantity })
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      showSnackbar('Necesitas estar logueado para realizar la compra')
    }
    if (isAuthenticated && sucursalSeleccionada == sucursalGlobal) {
      showSnackbar('Necesitas seleccionar una sucursal para realizar la compra')
    }

    if (isAuthenticated && sucursalSeleccionada !== sucursalGlobal) {
      const productoConCantidad = {
        ...publicacion,
        cantidad: selectedQuantity,
      }
      navigate('/checkout', { state: { productoSeleccionado: productoConCantidad } })
    }
  }

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
  })

  const handleSnackbarClose = () => {
    setSnackbarState((prev) => ({ ...prev, open: false }))
  }

  const showSnackbar = (message) => {
    setSnackbarState({ open: true, message })
  }

  const formatPrice = (price) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)

  const calculateInstallment = (price) => formatPrice(price / 12)

  return (
    <Grid container spacing={3} justifyContent='center'>
      {publicacion && (
        <Grid item xs={12} sm={10} md={8} lg={8}>
          <Card
            elevation={10}
            sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: 50, borderRadius: '15px',
            }}
          >

            <Grid container spacing={2}>
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <Box display='fixed' height={0.9} width={1} sx={{ backgroundColor: 'primary' }}>
                  <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: 0.8, margin: 5,
                  }}
                  >
                    <CardMedia
                      component='img'
                      image={publicacion.idProductoNavigation.urlImagen}
                      alt={publicacion.idProductoNavigation.descripcion}
                      sx={{
                        maxWidth: '100%', margin: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    />
                  </Box>
                </Box>

              </Grid>
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <Box
                  padding={2}
                  sx={{
                    display: 'flex', flexDirection: 'column', gap: 2, mt: 1,
                  }}
                >
                  <Typography variant='h4' fontWeight='bold'>{publicacion.idProductoNavigation.nombre}</Typography>
                  <Typography variant='body1' color='textSecondary'>
                    Categoria:
                    {' '}
                    {publicacion.idProductoNavigation.idCategoriaNavigation.nombre}
                  </Typography>
                  <Typography variant='h3' color='textSecondary' sx={{ marginTop: 1 }}>
                    {formatPrice(publicacion.precio)}
                  </Typography>
                  <Box display='flex' alignItems='center' flexWrap='wrap' width='100%'>
                    <Typography align='left' color='textSecondary' sx={{ fontSize: '1.2rem' }}>
                      Hasta
                      {' '}
                      <span style={{ fontWeight: 'bold' }}>12 cuotas</span>
                      {' '}
                      sin interés de&nbsp;
                    </Typography>
                    <Typography align='left' color='textPrimary' sx={{ fontSize: '1.4rem', fontWeight: 'bold', marginLeft: '0.5rem' }}>
                      {calculateInstallment(publicacion.precio)}
                    </Typography>
                  </Box>

                  <FormControl fullWidth variant='outlined' sx={{ maxWidth: '60%', marginTop: 3 }}>
                    <InputLabel>Cantidad</InputLabel>
                    <Select
                      value={selectedQuantity}
                      onChange={(event) => setSelectedQuantity(event.target.value)}
                      label='Cantidad'
                    >
                      {arrayQuantity.map((number) => (
                        <MenuItem key={number} value={number}>
                          {number}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant='body1' color='textSecondary'>
                      Unidades disponibles:
                      {' '}
                      {publicacion.stock}
                    </Typography>
                  </FormControl>
                  <Box mt={2} display='flex' flexDirection='column' gap={1} sx={{ maxWidth: '60%' }} mb={10}>
                    <Button
                      onClick={handleCheckout}
                      variant='contained'
                      color='secondary'
                      fullWidth
                      sx={{
                        fontSize: '1.2rem', textTransform: 'none', height: '65px', marginBottom: 1,
                      }}
                    >
                      Comprar ahora
                    </Button>
                    <Button onClick={handleAgregarAlCarrito} variant='outlined' color='secondary' fullWidth sx={{ fontSize: '1.2rem', textTransform: 'none', height: '65px' }}>
                      Agregar al carrito
                    </Button>

                  </Box>
                </Box>
              </Grid>
            </Grid>
            <CardContent sx={{ marginTop: 1, marginBottom: 15 }}>
              <Typography variant='h6'>Especificaciones técnicas:</Typography>
              <Typography variant='body1' color='textSecondary'>
                {publicacion.idProductoNavigation.descripcion}
              </Typography>
            </CardContent>
          </Card>
          <PositionedSnackbar
            open={snackbarState.open}
            handleClose={handleSnackbarClose}
            message={snackbarState.message}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default Publicacion
