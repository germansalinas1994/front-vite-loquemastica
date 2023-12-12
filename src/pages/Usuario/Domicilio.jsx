import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from "@mui/material";

const Domicilios = () => {

    const [domicilios, setDomicilios] = useState([]);
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const { user } = useAuth0();
    useEffect(() => {

        getDomicilios();

    }, []);

    const getDomicilios = async () => {
        try {



            const response = await axios.get(apiLocalKey + "/getDomicilios", { params: { email: user.email } });

            if(response.data.result != null){
                setDomicilios(response.data.result);
                console.log(domicilios)
            }





        } catch (error) {
            console.error(error);

        }
    }


    if (domicilios.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se econtraron domicilios</Typography>
            </Box>
        );
    }
    return (

        // vamos a hacer un componente para listado de domicilios, van a ser cards como las del carrito pero con la informacion del domicilio

        //voy a hacer un boton para agregar domicilio, que me lleve a un formulario para agregar domicilio
        <div>
            <h1>HAY DOMICILIOS</h1>
        </div>
    )
}

export default Domicilios;