import { useState, useEffect } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

export const MercadoPagoButton = ({ carrito, productoIndividual }) => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;

    initMercadoPago(publicKey);

    const [preferenceId, setpreferenceId] = useState(null);


    const transformarProducto = producto => ({
        id: producto.idPublicacion,
        cantidad: producto.cantidad
    });


    useEffect(() => {
        const fetchPreferenceId = async () => {
            debugger;
            const dataToSend = productoIndividual ? [transformarProducto(productoIndividual)]: carrito.map(transformarProducto); // Si es un carrito, transforma cada producto

            debugger;
            let responseapi = await axios.post(apiLocalKey + '/publicacionesCarritoMP', dataToSend);
            setpreferenceId(responseapi.data.result.data);
        };

        fetchPreferenceId();
    }, [carrito, productoIndividual, apiLocalKey]);

    return (
        <>
            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
        </>
    );
};
