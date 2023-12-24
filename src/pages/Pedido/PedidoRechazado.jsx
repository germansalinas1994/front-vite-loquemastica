import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import OrderRejectedCard from '../../components/OrderRejectedCard';
import LoadingModal from '../../components/LoadingModal';

const PedidoRechazado = () => {
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        showLoadingModal();
        const query = new URLSearchParams(location.search);
        const merchantOrderId = query.get('merchant_order_id');
        const paymentId = query.get('payment_id');
        const status = query.get('status');
        let estado = '';

        if (status === 'rejected') {
            estado = 'Rechazado';
        }

        const details = {
            merchantOrderId: merchantOrderId,
            paymentId: paymentId,
            status: estado
        };

        setOrderDetails(details);
        hideLoadingModal();
    }, [location.search]);

    return (
        <Container component="main" maxWidth="sml">
            {orderDetails && (
                <OrderRejectedCard
                    merchantOrderId={orderDetails.merchantOrderId}
                    paymentId={orderDetails.paymentId}
                    status={orderDetails.status}
                />
            )}
        </Container>
    );
};

export default PedidoRechazado;
