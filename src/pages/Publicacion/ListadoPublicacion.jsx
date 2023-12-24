import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CardPublicacion from '../../components/Publicacion/CardPublicacion';
import { Card } from '@mui/material';
import ThemeContext from '../../layout/ThemeContext';
import LoadingModal from '../../components/LoadingModal';
import { SucursalContext } from '../../components/User/SucursalContext';
import Swal from 'sweetalert2';



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

                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo cargar las publicaciones',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })

            }
        };

        fetchPublicaciones();
    }, [sucursalSeleccionada]);


    return (
            <Grid container spacing={2}  sx={{  ml:1 ,justifyContent:'center', maxWidth: 1, backgroundColor: 'primary', mb: 15 }}>
                <CardPublicacion publicaciones={publicaciones} />
            </Grid>


    )
}

export default ListadoPublicacion