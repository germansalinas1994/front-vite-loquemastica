import { useState, useEffect } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Cookies from 'js-cookie';

export const MercadoPagoButton = ({ carrito, productoIndividual, habilitaPago, domicilioSeleccionado }) => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;
    const [loading, setLoading] = useState(false);


    initMercadoPago(publicKey, { locale: 'es-AR' });





    const transformarProducto = producto => ({
        id: producto.idPublicacion,
        cantidad: producto.cantidad
    });




    const handleCheckOutMercadoPago = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);


        try {
            const dataToSend = productoIndividual ? [transformarProducto(productoIndividual)] : carrito.map(transformarProducto);
            const data = {
                idDomicilio: domicilioSeleccionado,
                publicaciones: dataToSend
            };

            const responseapi = await axios.post(apiLocalKey + '/publicacionesCarritoMP', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Abre el pago de MercadoPago en la misma ventana
            window.location.href = responseapi.data.result.data;
        } catch (error) {
            console.error("Error al realizar el checkout:", error);
            // Manejar el error (mostrar mensaje al usuario, etc.)
        } finally {
            setLoading(false);
        }
    }




    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

                <LoadingButton
                    loading={loading}
                    onClick={() => handleCheckOutMercadoPago()} variant="contained"
                    disabled={habilitaPago} // Habilita o deshabilita el botón
                    sx={{
                        marginTop: '20px',
                        textTransform: 'none', // Elimina las mayúsculas
                        padding: '12px 50px', // Agrega más padding
                        fontSize: '1.2em',     // Aumenta el tamaño de la fuente
                        color:'white'
                    }}>
                    Pagar con MercadoPago
                </LoadingButton>
            </Box>



        </>
    );
};
