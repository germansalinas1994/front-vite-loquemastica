import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


export default function NuevaCategoria() {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        descripcion: "",
        prueba: "",
        descripcionError: "",
        pruebaError: ""
    });

    const validateDescripcion = () => {
        if (formData.descripcion === "") {
            //que hace el prev?
            //el prev sirve para no perder los datos que ya tenia el objeto, y solo modificar el campo que necesito
            // es para ver el estado anterior y modificarlo
            setFormData(prev => ({ ...prev, descripcionError: "La descripción no puede estar vacía" }));
            return false;
        } else {
            setFormData(prev => ({ ...prev, descripcionError: "" }));
            return true;
        }
    };

    const validatePrueba = () => {
        if (formData.prueba === "") {
            setFormData(prev => ({ ...prev, pruebaError: "Prueba no puede estar vacío" }));
            return false;
        } else {
            setFormData(prev => ({ ...prev, pruebaError: "" }));
            return true;
        }
    };

    const handleInputChange = (key) => (e) => {
        debugger;
        setFormData(prev => ({ ...prev, [key]: e.target.value }));

        // Check if the new value is valid (will also update error styles immediately)
        if (key === "descripcion") validateDescripcion();
        if (key === "prueba") validatePrueba();
    };
    //como hago el submit asincronico
    const onSubmit = async (e) => {  // Agrega la palabra clave async
        e.preventDefault();

        // Validaciones
        const isDescripcionValid = validateDescripcion();
        const isPruebaValid = validatePrueba();

        if (!isDescripcionValid || !isPruebaValid) return;

        // Preparar los datos
        const data = {
            descripcion: formData.descripcion,
        }
        console.log(data);

        // Llamar al servidor
        try {
            const resp = await axios.post(apiLocalKey + '/categorias', data);
            console.log(resp.data);  // Puedes ver la respuesta del servidor
            Swal.fire({
                position: 'center',
                icon: 'success',
                allowOutsideClick: false,
                title: 'Categoría creada correctamente',
                showConfirmButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/categorias");

                }
            })


            // Aquí puedes manejar la respuesta, por ejemplo, cerrar el modal, mostrar un mensaje de éxito, etc.
        } catch (error) {
            console.error("Hubo un error al guardar los datos:", error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
        }
    };

    return (
        <>

            <h1>Register</h1>
            <Box component="form" onSubmit={onSubmit} autoComplete="off">
                <TextField
                    label="Descripción"
                    variant="outlined"
                    id="descripcion"
                    type="text"
                    fullWidth
                    name="descripcion"
                    error={Boolean(formData.descripcionError)}
                    helperText={formData.descripcionError}
                    onChange={handleInputChange("descripcion")}
                    value={formData.descripcion}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Prueba"
                    variant="outlined"
                    id="prueba"
                    type="text"
                    fullWidth
                    name="prueba"
                    error={Boolean(formData.pruebaError)}
                    helperText={formData.pruebaError}
                    onChange={handleInputChange("prueba")}
                    value={formData.prueba}
                    sx={{ mt: 2 }}
                />
                <Button variant="outlined" type="submit" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </>
    );
}
