import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CardPublicacion from '../../components/Publicacion/CardPublicacion';
import { Box, Button, Typography } from '@mui/material';
import ThemeContext from '../../layout/ThemeContext';
import LoadingModal from '../../components/LoadingModal';
import { SucursalContext } from '../../components/User/SucursalContext';
import Swal from 'sweetalert2';
import { CategoriaContext } from '../../components/CategoriaContext';
import SearchBar from '../../components/SearchBar';



const ListadoPublicacion = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const { isDarkTheme } = useContext(ThemeContext);
    const { categoriaSeleccionada, setCategoriaSeleccionada } = useContext(CategoriaContext);

    const { showLoadingModal, hideLoadingModal } = LoadingModal();

    const { sucursalSeleccionada } = useContext(SucursalContext);



    const [publicaciones, setPublicaciones] = useState([]);
    const [input, setInput] = useState('');


    useEffect(() => {
        // Lógica para obtener las Publicaciones

        fetchPublicaciones();

    }, [sucursalSeleccionada, categoriaSeleccionada, input]);

    const fetchPublicaciones = async () => {
        // showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica
        if (input == '') {
            showLoadingModal();

        }

        try {
            // const token = localStorage.getItem('token');
            // const headers = {
            //     Authorization: `Bearer ${token}`
            // };

            const response = await axios.get(apiLocalKey + '/publicaciones', {
                // headers: headers,
                params: { sucursal: sucursalSeleccionada, categoria: categoriaSeleccionada, input: input },
            });
            // const response = await axios.get(apiLocalKey + '/publicaciones', {params: {sucursal: sucursalSeleccionada}},);
            setPublicaciones(response.data.result.data)
            hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
            // hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

        } catch (error) {


            hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las publicaciones',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })

        }
    };



    //esta funcion se ejecuta cuando cambia el input
    const ChangeInput = (e) => {
        setInput(e.target.value);
    }
    //cuando cambia el input, se ejecuta el use effect

    useEffect(() => {
        setInput(input);
        console.log(input);
    }, [input]);

    const limpiarFiltro = () => {
        setInput('');
        setCategoriaSeleccionada(null);
    }

    return (

        <>

            <Box sx={{ display: 'flex', justifyContent: 'flex', ml: 3 }}>
                <SearchBar inputValue={input} handleInputChange={ChangeInput} limpiarFiltro={limpiarFiltro} />


            </Box>




            <Grid container spacing={2} sx={{ ml: 1, justifyContent: 'center', maxWidth: 1, backgroundColor: 'primary', mb: 15, padding: 5 }}>

                <CardPublicacion publicaciones={publicaciones} />
            </Grid>
        </>



    )
}

export default ListadoPublicacion