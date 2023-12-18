import { Box, Card, Grid, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import LoadingModal from "../../components/LoadingModal";
import { get, useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@mui/material/Tooltip";

import Swal from "sweetalert2";




const MiCuenta = () => {

    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const { user } = useAuth0();

    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {


        //esto tambien lo puedo hacer con un if

        // if (isEditing) {
        //     setIsEditing(false);
        // } else {
        //     setIsEditing(true);
        // }

        //tambien lo puedo hacer con un if ternario

        // setIsEditing(isEditing ? false : true);

        //seteo el estado de isEditing con el valor contrario al que tiene actualmente
        setIsEditing(!isEditing);



    };
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
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };

        const response = await axios.get(apiLocalKey + '/getUsuario',
            {
                headers: headers,
            });
        setValue("nombre", response.data.result.data.nombre);
        setValue("apellido", response.data.result.data.apellido);
        setValue("telefono", response.data.result.data.telefono);
        setValue("dni", response.data.result.data.dni);
        setValue("email", response.data.result.data.email);


        debugger;
    }



    const onSubmit = async (data) => {
        try {
            //envio los datos del usuario a la api para que los guarde en la base de datos
            //tengo que enviar los datos del formulario
            data.email = user.email;
            //convierto el dni a un valor numerico para que no me lo tome como un string
            data.dni = parseInt(data.dni);
            debugger;
            showLoadingModal();

            const response = await axios.post(apiLocalKey + '/actualizarUsuario', data);
            debugger;
            hideLoadingModal();
            //pongo un swal para avisar que se guardaron los datos
            //si le da click en aceptar, lo redirijo escondo el modal de carga
            if (response.data.isError != true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos actualizados correctamente',
                    allowOutsideClick: false,
                    showConfirmButton: true,


                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsEditing(false);
                    }
                })

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                    footer: 'Intente nuevamente'
                })
            }



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
                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" gutterBottom>
                                Datos de la cuenta
                            </Typography>
                            <Tooltip title="Editar datos">

                                {<EditIcon onClick={handleEditClick} />} {/* Muestra el ícono de lápiz solo si no está en modo edición */}
                            </Tooltip>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Box sx={{ p: 3 }}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label="Email" {
                                ...register("email",
                                    {
                                        disabled: true
                                    }

                                )} />
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
                                        disabled: !isEditing,
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
                                label="Apellido" {
                                ...register("apellido",
                                    {
                                        disabled: !isEditing
                                    }

                                )} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: 3 }}>
                            <TextField fullWidth
                                label="Teléfono"
                                placeholder="Ingrese su telefóno"
                                InputLabelProps={{ shrink: true }}
                                {...register("telefono",
                                    {
                                        disabled: !isEditing,
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
                                    disabled: !isEditing,
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
                            {
                                isEditing ?
                                    <Button variant="contained" color="primary" type="submit" size="large">
                                        Guardar
                                    </Button>
                                    :
                                    <></>

                            }

                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </form>


    )

}

export default MiCuenta;