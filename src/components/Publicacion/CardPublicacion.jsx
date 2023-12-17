import {
  Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Box,
} from '@mui/material'
import { Link } from 'react-router-dom'

// ESTAS SON LAS TARJETAS DE LAS PUBLICACIONES DE LOS PRODUCTOS QUE SE RECORRE EN EL LISTADO

function CardPublicacion({ publicaciones }) {
  // Helper function to format price with commas and decimals
  const formatPrice = (price) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)

  // Helper function to calculate price per installment
  const calculateInstallment = (price) => formatPrice(price / 12)

  return (
    <>
      {publicaciones.map((p) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={p.idPublicacion} mb={5}>
          <Card
            sx={{
              height: '100%', // <-- Asegura que la tarjeta ocupe todo el espacio disponible en el Grid.
              margin: '20px',
              cursor: 'pointer',
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'column',
              '&:hover': { boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)' },
              backgroundColor: 'background.secondary',
            }}
          >

            <CardActionArea
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
              }}
            >
              <Link to={`/publicacion/${p.idPublicacion}`} style={{ color: 'inherit', textDecoration: 'none' }}>

                <Typography variant='h5' align='center' sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
                  {p.idProductoNavigation.nombre}
                </Typography>

                <Box sx={{
                  display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '200px',
                }}
                >
                  <CardMedia
                    component='img'
                    image={p.idProductoNavigation.urlImagen}
                    sx={{ maxWidth: '80%', maxHeight: '80%' }}
                  />
                </Box>

                <CardContent>

                  <Typography align='center' color='secondary' sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                    {formatPrice(p.precio)}
                  </Typography>
                  <Typography align='center' color='textSecondary' sx={{ fontSize: '1.0rem' }}>
                    Hasta 12 cuotas sin interés de
                    <b>{calculateInstallment(p.precio)}</b>
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>

          </Card>

        </Grid>
      ))}
    </>
  )
}

export default CardPublicacion
