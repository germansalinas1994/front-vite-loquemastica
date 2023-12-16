import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CardPublicacion from '../../components/Publicacion/CardPublicacion';
import { Card } from '@mui/material';
import ThemeContext from '../../layout/ThemeContext';
import LoadingModal from '../../components/LoadingModal';
import { SucursalContext } from '../../components/User/SucursalContext';



const ListadoPublicacion = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const { isDarkTheme } = useContext(ThemeContext);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();

    const { sucursalSeleccionada } = useContext(SucursalContext);



    const [publicaciones, setPublicaciones] = useState([]);


    useEffect(() => {
        // Lógica para obtener las Publicaciones
        const fetchPublicaciones = async () => {
            // showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica
            showLoadingModal();

            try {
                // const token = localStorage.getItem('token');
                // const headers = {
                //     Authorization: `Bearer ${token}`
                // };
                // debugger;
                
                const response = await axios.get(apiLocalKey + '/publicaciones', {
                    // headers: headers,
                    params: { sucursal: sucursalSeleccionada }
                });
                // const response = await axios.get(apiLocalKey + '/publicaciones', {params: {sucursal: sucursalSeleccionada}},);
                setPublicaciones(response.data.result.data)
                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                // hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

            } catch (error) {

                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                console.log(error);
            }
        };

        fetchPublicaciones();
    }, [sucursalSeleccionada]);


    return (

        <Card container sx={{
            backgroundColor: isDarkTheme ? '#000000' : '#F5F5F5',
            borderRadius: 2,
            padding: '20px 10px', display: 'flex'
        }}>
            {/* //el flexgrow es para que se estire y ocupe todo el espacio disponible */}
            <Grid container spacing={2} justifyContent="center" sx={{ display: 'flex', maxWidth: 1, backgroundColor: 'primary', mb: 15 }}>
                <CardPublicacion publicaciones={publicaciones} />
            </Grid>
        </Card>

    )
}

export default ListadoPublicacion