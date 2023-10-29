import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

const DetallePedido = ({ items, checkout, mostrarControles = true }) => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    }

    let total = 0;
    items.forEach(item => {
        total += item.precio * item.cantidad;
    });



    return (
        <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, maxWidth: '80%', ml: 10 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Detalles del Pedido</Typography>
                    <Divider sx={{ marginBottom: '20px', mt: 2 }} />
                    {items.map((publicacion) => (
                        <Box key={publicacion.idPublicacion} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginTop: '10px' }}>
                            <Typography variant="body1" sx={{ fontSize: '1.1em' }}>{publicacion.idProductoNavigation.nombre} ({publicacion.cantidad})</Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.1em' }}> {formatPrice(publicacion.precio * publicacion.cantidad)}</Typography>
                        </Box>
                    ))}
                    <Divider sx={{ mt: 5 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{formatPrice(total)}</Typography>
                    </Box>
                    {mostrarControles && (

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={checkout}
                                sx={{
                                    textTransform: 'none', // Elimina las mayúsculas
                                    padding: '12px 50px', // Agrega más padding
                                    fontSize: '1.2em'     // Aumenta el tamaño de la fuente
                                }}
                            >
                                Continuar compra
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Grid>



    );
}

export default DetallePedido;
