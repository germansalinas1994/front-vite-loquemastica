import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import CardPublicacion from '../../components/Publicacion/CardPublicacion';
import { Card } from '@mui/material';
import ThemeContext from '../../layout/ThemeContext';
import LoadingModal from '../../components/LoadingModal';


const ListadoPublicacion = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const { isDarkTheme } = useContext(ThemeContext);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();



    const [publicaciones, setPublicaciones] = useState([]);


    useEffect(() => {
        debugger;
        // Lógica para obtener las Publicaciones
        const fetchPublicaciones = async () => {
            // showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica
            showLoadingModal();

            try {
                debugger;
                const response = await axios.get(apiLocalKey + '/publicaciones');
                debugger;
                setPublicaciones(response.data.result.data)
                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                // hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

            } catch (error) {

                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                console.log(error);
            }
        };

        fetchPublicaciones();
    }, []);


    return (

        <Card container sx={{      
        backgroundColor: isDarkTheme ? '#000000' : '#F5F5F5', 
        borderRadius:2,
        padding: '20px 10px', display:'flex'}}>
    {/* //el flexgrow es para que se estire y ocupe todo el espacio disponible */}
            <Grid container spacing={2} justifyContent="center" sx={{display:'flex', maxWidth:1, backgroundColor:'primary', mb:15}}>
                <CardPublicacion publicaciones={publicaciones} />
            </Grid>
        </Card>

    )
}

export default ListadoPublicacion