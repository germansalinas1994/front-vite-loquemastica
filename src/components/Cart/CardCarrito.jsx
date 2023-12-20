import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import DetallePedido from '../DetallePedido';
// implementacion api mercado pago 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
const CardCarrito = ({ publicacionesCarrito, disminuir, aumentar, eliminar, vaciar }) => {

    const navigate = useNavigate();
    // implementacion api mercado pago 
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

    initMercadoPago(publicKey);





    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    }



    const handleCheckout = async () => {
        navigate('/checkout', { state: { carrito: publicacionesCarrito } });
    }



    let total = 0;
    publicacionesCarrito.forEach(publicacion => {
        debugger;
        total += publicacion.idProductoNavigation.precio * publicacion.cantidad;
    });

    if (publicacionesCarrito.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se han agregado productos al carrito</Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {/* Card a la izquierda */}
            <Grid item xs={12} md={6}>
               

                        {publicacionesCarrito.map((publicacion) => (
                            <Card key={publicacion.idPublicacion} sx={{ display: 'flex', marginBottom: '20px', borderRadius: 3, height: ' 190px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'contain',
                                        margin: 'auto 10px auto 20px'
                                    }}
                                    image={publicacion.idProductoNavigation.urlImagen}
                                    alt={publicacion.idProductoNavigation.nombre}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h5">{publicacion.idProductoNavigation.nombre}</Typography>
                                    <Typography variant="body1" sx={{ marginTop: '5px', fontWeight: 'bold' }}>
                                        {formatPrice(publicacion.idProductoNavigation.precio)}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                        <IconButton onClick={() => disminuir(publicacion.idPublicacion)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography>{publicacion.cantidad}</Typography>
                                        <IconButton onClick={() => aumentar(publicacion.idPublicacion)}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            sx={{ marginLeft: 'auto', color: 'red' }}
                                            onClick={() => eliminar(publicacion.idPublicacion)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>

                            </Card>

                        ))}
                        <Button
                            sx={{
                                margin: '20px auto 0',
                                display: 'block'
                            }}
                            variant="outlined"
                            color="primary"
                            onClick={vaciar}
                        >
                            Vaciar Carrito
                        </Button>
   
            </Grid>
            {/* aca separe la logica de la parte derecha en un componente nuevo, esto es para que pueda ser consumido desde el carrito y el comprar ahora */}

            <DetallePedido items={publicacionesCarrito} checkout={handleCheckout} />

        </Grid>





    );
}

export default CardCarrito;





















