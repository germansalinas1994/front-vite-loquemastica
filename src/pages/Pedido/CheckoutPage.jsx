// Componente CheckoutPage
import { useLocation } from 'react-router-dom';
import DetallePedido from '../../components/DetallePedido';
import { useCarrito } from '../../components/Cart/CarritoProvider';
import { MercadoPagoButton } from '../../components/MercadoPagoButton';
import { Grid, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Button } from '@mui/material';


const CheckoutPage = () => {
    const carrito = useCarrito().carrito;

    const location = useLocation();
    const productoSeleccionado = location.state?.productoSeleccionado;
    const carritoDesdeNavegacion = location.state?.carrito;




    return (
        <Grid container spacing={2}>
            {/* Card a la izquierda */}
            <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6">¿Cómo querés recibir o retirar tu compra?</Typography>
                        <Typography variant="body1" sx={{ marginBottom: '20px' }}>Domicilio</Typography>
                        <Typography variant="body2" sx={{ marginBottom: '20px' }}>Calle 40 735</Typography>
                        <Typography variant="body2" sx={{ marginBottom: '20px' }}>C.P. 1900 - La Plata, Buenos Aires</Typography>
                        <Typography variant="body2" sx={{ marginBottom: '20px' }}>German Salinas - 2214202798</Typography>

                        {/* Radio buttons para elección de envío */}
                        <FormControl component="fieldset" sx={{ marginTop: '20px', textAlign: 'center' }}>
                            <RadioGroup name="shippingOption" defaultValue="domicilio">
                                <FormControlLabel value="domicilio" control={<Radio />} label="Llega el sábado a tu domicilio - Gratis" />
                                <FormControlLabel value="sucursal" control={<Radio />} label="Llega el lunes a tu domicilio - Gratis" />
                            </RadioGroup>
                        </FormControl>

                        {/* Botón de MercadoPago */}
                        <MercadoPagoButton carrito={carritoDesdeNavegacion} productoIndividual={productoSeleccionado} />
                    </CardContent>
                </Card>
            </Grid>


            {/* Card a la derecha */}
            <DetallePedido items={carritoDesdeNavegacion || [productoSeleccionado]} mostrarControles={false} />
        </Grid>

    );

};

export default CheckoutPage;
