import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import axios from 'axios';
import OrderCard from '../../components/OrderCard';
import LoadingModal from '../../components/LoadingModal';
import { useCarrito } from '../../components/Cart/CarritoProvider'; // importo el hook que me permite acceder al estado global del carrito

const apiLocalKey = import.meta.env.VITE_APP_API_KEY

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const OrderStatusPage = () => {

    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const {vaciarCarrito } = useCarrito();


    let query = useQuery();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica

        //si el pago fue aprobado, vacio el carrito
        vaciarCarrito();    
        localStorage.removeItem('carrito');

        const merchantOrderId = query.get('merchant_order_id');
        const paymentId = query.get('payment_id');
        const status = query.get('status');

        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`
                };       
                
                debugger;
                
                const response = await axios.get(apiLocalKey + "/getOrderMercadoPago",
                {
                    headers: headers,
                    params: {
                        merchantOrderId: merchantOrderId,
                        paymentId: paymentId,
                        status: status
                    }

                },
              );
                setOrderDetails(response.data.result);
                hideLoadingModal(); // <-- Ocultar el modal cuando la operación asincrónica finalice
            } catch (error) {
                hideLoadingModal(); // <-- Ocultar el modal cuando la operación asincrónica finalice
            }
        };

        fetchOrderDetails();
    }, []);

    return (
        <Container component="main" maxWidth="sml">
            {orderDetails ? (
                <OrderCard
                    merchantOrderId={orderDetails.orden_MercadoPago}
                    paymentId={orderDetails.pago.idPagoMercadoPago}
                    status={orderDetails.pago.estadoPago}
                    amount={orderDetails.total}
                // Añade aquí más props según los datos que recibas y necesites pasar
                />
            ) : null}
        </Container>
    );
};

export default OrderStatusPage;
