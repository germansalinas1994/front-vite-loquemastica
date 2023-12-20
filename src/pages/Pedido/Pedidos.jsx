import { useEffect, useState } from "react";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";
import { Box, TextField, Typography } from "@mui/material";
import CardPedido from "../../components/CardPedido";

const Pedidos = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const [pedidos, setPedidos] = useState([]);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();

    useEffect(() => {
        getPedidos();
    }, []);

    const getPedidos = async () => {
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(apiLocalKey + "/pedidos", { headers });
            setPedidos(response.data.result);
            hideLoadingModal();
        } catch (error) {
            console.error(error);
            hideLoadingModal();
        }
    }

    const handleDetallePedido = (idPedido) => {
        console.log(`Detalle del pedido ${idPedido}`);
    }

    return (
        <div>
            <Box sx={{ position: 'relative', minHeight: '100vh' }}>
                {pedidos.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                        <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se han realizado pedidos</Typography>
                    </Box>
                ) : (
                    <>

                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            
                            <CardPedido pedidos={pedidos} detallePedido={handleDetallePedido} />
                        </Box>
                    </> 
                )}
            </Box>
        </div>
    );
}

export default Pedidos;
