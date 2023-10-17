import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// implementacion api mercado pago 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react';


const CardCarrito = ({ publicacionesCarrito, disminuir, aumentar, eliminar }) => {

    // implementacion api mercado pago 
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;
    initMercadoPago(publicKey);

    const [preferenceId, setpreferenceId] = useState(null);
    const [prefetenceStatus, setpreferenceStatus] = useState(null);
    const [wallet, setWallet] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    }

    let total = 0;
    publicacionesCarrito.forEach(publicacion => {
        total += publicacion.precio * publicacion.cantidad;
    });

    if (publicacionesCarrito.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se han agregado productos al carrito</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Mitad izquierda con productos agregados */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', width: '40%', ml: '5%' }}>
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
                                {formatPrice(publicacion.precio)}
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
            </Box>

            {/* Mitad derecha con detalles del producto agregado */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', width: '40%', mr: '10%' }}>
                <Card sx={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', padding: 3, borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>Detalles del Pedido</Typography>
                    <Divider sx={{ marginBottom: '20px', mt: 1 }} />
                    {publicacionesCarrito.map((publicacion) => (
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
                    <Button
                        variant="contained"
                        color="primary"
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

                    <Wallet initialization={{
                        preferenceId: "178444398-7c738640-eaac-4512-b2fe-0f240dcd94eb"
                    }} />


                </Card>
            </Box>
        </Box>
    );
}

export default CardCarrito;
