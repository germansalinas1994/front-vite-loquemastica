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
            debugger;
            setPedidos(response.data.result);
            hideLoadingModal();
        } catch (error) {
            console.error(error);
            hideLoadingModal();
        }
    }

    const descargarFactura = async (idPedido) => {
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Response-Type': 'blob' // Indica que la respuesta es un archivo binario
            };
    
            const response = await axios.get(apiLocalKey + "/generarFactura/" + idPedido, { headers, responseType: 'blob' });
            debugger;
            
            // Crear un enlace URL para el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            
            // Crear un enlace temporal en el DOM para descargar el archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Factura.pdf'); // Nombre del archivo para descargar
            document.body.appendChild(link);
            link.click();
    
            // Limpiar y remover el enlace del DOM
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
    
            hideLoadingModal();
        } catch (error) {
            console.error(error);
            hideLoadingModal();
        }
    };
    

    return (
        <div>
            <Box sx={{ position: 'relative', minHeight: '100vh' }}>
                {pedidos.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                        <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se han realizado pedidos</Typography>
                    </Box>
                ) : (
                     <CardPedido pedidos={pedidos} descargarFactura={descargarFactura} />
                )}
            </Box>
        </div>
    );
}

export default Pedidos;
