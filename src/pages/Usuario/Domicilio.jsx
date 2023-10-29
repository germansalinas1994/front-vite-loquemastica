import { useEffect,useState } from "react";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

const Domicilios = () => {

    const [domicilios, setDomicilios] = useState([]);
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const { user } = useAuth0();
    useEffect(() => {

        // getDomicilios();

    }, []);

    const getDomicilios = async () => {
        try {
            const response = await axios.post(apiLocalKey + "/domicilios" , {email : user.email});


        } catch (error) {
            console.error(error);

        }
    }

    return (
        <div>
            <h1>Domicilios</h1>
        </div>
    )
}

export default Domicilios;