import { useState, useEffect } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Box } from '@mui/material';

export const MercadoPagoButton = ({ carrito, productoIndividual }) => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

    initMercadoPago(publicKey, { locale: 'es-AR' });

    const customization = {
        visual: {
            buttonBackground: 'black',
            borderRadius: '6px',
            horizontalpadding: '200px',
        },
    }

    const [preferenceId, setpreferenceId] = useState(null);


    const transformarProducto = producto => ({
        id: producto.idPublicacion,
        cantidad: producto.cantidad
    });


    useEffect(() => {
        const fetchPreferenceId = async () => {
            debugger;
            const dataToSend = productoIndividual ? [transformarProducto(productoIndividual)] : carrito.map(transformarProducto); // Si es un carrito, transforma cada producto

            debugger;
            let responseapi = await axios.post(apiLocalKey + '/publicacionesCarritoMP', dataToSend);
            setpreferenceId(responseapi.data.result.data);
        };

        fetchPreferenceId();
    }, [carrito, productoIndividual, apiLocalKey]);

    return (
        <>
            <Box maxWidth={0.35} sx={{
                margin: '0 auto', // Esto centrará horizontalmente el Box
                textAlign: 'center', // Esto centrará el contenido dentro del Box
            }} >
                {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={customization} />}

            </Box>

        </>
    );
};
