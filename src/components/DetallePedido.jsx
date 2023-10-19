import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const DetallePedido = ({ items, checkout, mostrarControles = true }) => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    }

    let total = 0;
    items.forEach(item => {
        total += item.precio * item.cantidad;
    });



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', width: '40%', ml: '2%' /* margen izquierdo ajustado */ }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', padding: 3, borderRadius: 3 }}>
                <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Detalles del Pedido</Typography>
                <Divider sx={{ marginBottom: '20px', mt: 1 }} />
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

                    <Button
                        variant="contained"
                        color="primary"
                        // onClick={() => { handleMercadopago() }}
                        onClick={checkout}
                        sx={{
                            marginTop: '20px',
                            textTransform: 'none', // Elimina las mayúsculas
                            alignSelf: 'center',
                            padding: '12px 50px', // Agrega más padding
                            fontSize: '1.2em'     // Aumenta el tamaño de la fuente
                        }}
                    >
                        Continuar compra
                    </Button>
                )}


            </Card>
        </Box>

    );
}

export default DetallePedido;
