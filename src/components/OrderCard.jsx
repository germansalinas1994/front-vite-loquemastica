import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderCard = ({ merchantOrderId, paymentId, status, amount }) => {
    const theme = useTheme();

    // Ajustes de estilo para la tarjeta
    const cardStyle = {
        height: '100%', // <-- Asegura que la tarjeta ocupe todo el espacio disponible en el Grid.
        boxShadow: 'none',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #E0F2F1', // Un tono más claro de verde para el borde
        p: 2, // Padding dentro de la tarjeta
        textAlign: 'center', // Centrar el contenido de la tarjeta
        [theme.breakpoints.up('md')]: {
            p: 12, // Padding más grande para pantallas medianas y grandes
            borderRadius: theme.shape.borderRadius,
        },
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}>
                <Grid item xs={12}>
                    {/* La tarjeta está dentro de un Grid para centrarla en la pantalla */}
                    <Card sx={cardStyle}>
                        <CardContent>
                            {/* El icono de verificación está centrado con textAlign en el estilo de la tarjeta */}
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 90 }} />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                ¡Listo tu pago ha sido acreditado!
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, mb:1, fontSize:'20px' }}>
                                Importe total:  {formatPrice(amount)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize:'15px' }}>
                                Operación : #{merchantOrderId}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1,fontSize:'15px'  }}>
                                Pago {status}
                            </Typography>

                            <Button variant="contained" color="success" sx={{ mt: 3,fontSize:'15px'  }}>
                                Ver Detalle
                            </Button>
                            {/* Aquí se pueden agregar más detalles del pedido si es necesario */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderCard;
