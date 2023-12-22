import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid, useTheme } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; // Ícono de cruz para error
import { Link } from "react-router-dom";

const OrderRejectedCard = ({ merchantOrderId, paymentId, status }) => {
    const theme = useTheme();

    // Ajustes de estilo para la tarjeta
    const cardStyle = {
        height: '100%', // <-- Asegura que la tarjeta ocupe todo el espacio disponible en el Grid.
        borderRadius: 5, 
        boxShadow:5, 
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #FFCDD2', // Un tono claro de rojo para el borde
        p: 2, // Padding dentro de la tarjeta
        textAlign: 'center', // Centrar el contenido de la tarjeta
        [theme.breakpoints.up('md')]: {
            p: 12, // Padding más grande para pantallas medianas y grandes
            borderRadius: theme.shape.borderRadius,
        },
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}>
                <Grid item xs={12}>
                    <Card sx={cardStyle}>
                        <CardContent>
                            <HighlightOffIcon color="error" sx={{ fontSize: 90 }} />
                            <Typography variant="h5" component="div" sx={{ mt: 2, color: 'red' }}>
                                Hubo un problema con tu pago
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1,fontSize:'15px'  }}>
                                Operación: #{merchantOrderId}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1,fontSize:'15px'  }}>
                                Pago {status}
                            </Typography>
                            <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
                                <Button variant="contained" sx={{ mt: 3, backgroundColor: 'main', fontSize:'15px'  }}>
                                    Intentar de nuevo
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderRejectedCard;
