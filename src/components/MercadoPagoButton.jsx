import { useState, useEffect } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Cookies from 'js-cookie';

export const MercadoPagoButton = ({ carrito, productoIndividual }) => {
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
        debugger;
        setLoading(true);
    
        try {
            const dataToSend = productoIndividual ? [transformarProducto(productoIndividual)] : carrito.map(transformarProducto);
            const responseapi = await axios.post(apiLocalKey + '/publicacionesCarritoMP', dataToSend, {
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
            <Box maxWidth={0.35} sx={{
                margin: '0 auto', // Esto centrará horizontalmente el Box
                textAlign: 'center', // Esto centrará el contenido dentro del Box
            }} >
                <LoadingButton
                    loading={loading}
                    onClick={() => handleCheckOutMercadoPago()} variant="contained" sx={{
                        marginTop: '35px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', backgroundColor: 'primary', width: '80%', height: '60px', textTransform: 'none'
                    }}>IR AL PAGO</LoadingButton>
            </Box>



        </>
    );
};
