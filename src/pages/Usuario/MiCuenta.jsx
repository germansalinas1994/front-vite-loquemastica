import { Box, Card, Grid, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";
import { get, useForm } from "react-hook-form"
import { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Swal from "sweetalert2";




const MiCuenta = () => {

    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const { user } = useAuth0();

    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    //llamo al useEffect para que se ejecute cuando se renderiza el componente, para traer los datos del usuario

    useEffect(() => {
        debugger;
        showLoadingModal();
        try {
            getUserData();
        } catch (error) {
            console.error("Error al obtener el token y el rol:", error);
        }
        finally {
            hideLoadingModal();
        }
    }, []);

    const getUserData = async () => {
        const response = await axios.get(apiLocalKey + '/getUsuario', { params: { email: user.email } });
        setValue("nombre", response.data.result.data.nombre);
        setValue("apellido", response.data.result.data.apellido);
        setValue("telefono", response.data.result.data.telefono);
        setValue("dni", response.data.result.data.dni);

        debugger;
    }



    const onSubmit = async (data) => {
        try {
            //envio los datos del usuario a la api para que los guarde en la base de datos
            //tengo que enviar los datos del formulario
            data.email = user.email;
            debugger;

            showLoadingModal();

            debugger;
            const response = await axios.post(apiLocalKey + '/actualizarUsuario', data);
            hideLoadingModal();
            //pongo un swal para avisar que se guardaron los datos
            //si le da click en aceptar, lo redirijo escondo el modal de carga
            Swal.fire({
                icon: 'success',
                title: 'Datos actualizados correctamente',
                showConfirmButton: false,
                allowOutsideClick: false,
                showConfirmButton: true,


            }).then((result) => {
                if (result.isConfirmed) {
                    debugger;
                }
            }
            )



        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error al actualizar los datos',
                footer: 'Intente nuevamente'
            })

            console.error("Error al modificar el usuario:", error);

        }
     
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 15 }}>

                <Grid container spacing={3} component={Card} sx={{ width: '80%', maxWidth: '1200px', height: 1, maxHeight: '1000px', borderRadius: 4 }}>
                    <Grid item xs={12}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Datos de la cuenta
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <TextField fullWidth
                                label="Nombre"
                                placeholder="Ingrese su nombre"
                                InputLabelProps={{ shrink: true }}

                                {...register("nombre",
                                    {
                                        required: "El nombre es obligatorio",
                                        pattern: {
                                            value: /^[a-zA-Z\s]*$/,
                                            message: "El nombre debe contener solo letras"
                                        }

                                    })
                                }
                                error={Boolean(errors.nombre)}
                                helperText={errors.nombre && errors.nombre.message}

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <TextField
                                placeholder="Ingrese su apellido"
                                InputLabelProps={{ shrink: true }}
                                fullWidth 
                                label="Apellido" {...register("apellido")} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <TextField fullWidth
                                label="Teléfono"
                                placeholder="Ingrese su telefóno"
                                InputLabelProps={{ shrink: true }}
                                {...register("telefono",{
                                    maxLength: {
                                        value: 15,
                                        message: "El telefóno debe ser un valor numérico de hasta 15 dígitos",
                                    },
                                    pattern: {
                                        value: /^[0-9]{1,15}$/,
                                        message: "El telefóno no debe tener puntos ni comas",
                                    },

                                })}
                                error={Boolean(errors.telefono)}
                                helperText={errors.telefono && errors.telefono.message}
                                 />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <TextField
                                fullWidth
                                label="DNI"
                                placeholder="Ingrese su DNI"
                                InputLabelProps={{ shrink: true }}
                                {...register("dni", {
                                    // required: "El DNI es obligatorio",
                                    maxLength: {
                                        value: 8,
                                        message: "El DNI debe ser un valor numérico de 8 dígitos",
                                    },
                                    pattern: {
                                        value: /^[0-9]{8}$/,
                                        message: "El DNI no debe tener puntos ni comas",
                                    },
                                })}
                                error={Boolean(errors.dni)}
                                helperText={errors.dni && errors.dni.message}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Button variant="contained" color="primary" type="submit">
                                Guardar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </form>


    )

}

export default MiCuenta;