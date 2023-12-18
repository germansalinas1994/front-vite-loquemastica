import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Typography, Fab, Tooltip } from "@mui/material";
import CardDomicilio from "../../components/User/CardDomicilio";
import AddIcon from '@mui/icons-material/Add';
import LoadingModal from "../../components/LoadingModal";
import Swal from "sweetalert2";
import ModalFormDomicilio from "../../components/User/ModalFormDomicilio";
import { useForm } from "react-hook-form"


const Domicilios = () => {
    const [domicilios, setDomicilios] = useState([]);
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
    const [reload, setReload] = useState(false);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const [openModal, setOpenModal] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();


    useEffect(() => {
        getDomicilios();
    }, [reload]);

    const getDomicilios = async () => {
        try {

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(apiLocalKey + "/domicilios",
                {
                    headers: headers,
                });

            setDomicilios(response.data.result);




        } catch (error) {
            console.error(error);

        }
    }

    const handleFormDomicilio = () => {
        setOpenModal(true);
    }
    const handleCloseModal = async (event, reason) => {
        if (reason == 'backdropClick') {
            return;
        }

        // Si se hace click en el botón de cancelar o en la X, se cierra el modal y se resetea el formulario

        reset();
        await setOpenModal(false);
    };

    const onSubmit = async (data) => {
        handleCloseModal();
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            //si esta seguro, elimino la categoria
            const response = await axios.post(apiLocalKey + "/domicilio", data,{
                headers: headers,
            }
            
            );
            //muestro el msj de exito
            Swal.fire({
                position: "center",
                icon: "success",
                allowOutsideClick: false,
                title: "Domicilio agregado correctamente",
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    //aca deberia recargar el componente para que se vea la nueva categoria
                    //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                    //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                    setReload((prev) => !prev);
                    hideLoadingModal();
                }
            });
        } catch (error) {
            hideLoadingModal();
            Swal.fire({
                position: "center",
                icon: "error",
                allowOutsideClick: false,
                title: "Hubo un error al agregar el domicilio",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            });
        }
    };

















    const editarDomicilio = (idDomicilio) => {
        console.log("editar domicilio", idDomicilio);
    }

    const eliminarDomicilio = (idDomicilio) => {

        try {


            //pregunto si esta seguro de eliminar la categoria
            Swal.fire({
                title: "¿Estás seguro de eliminar el domicilio?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showConfirmButton: true,

                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true, //invierte la ubicacion de los botones confirmar y cancelar

                // confirmButtonColor: theme.palette.error.main,
                // cancelButtonColor: theme.palette.primary.main,

                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    debugger;
                    showLoadingModal();
                    const token = localStorage.getItem('token');
                    const headers = {
                        Authorization: `Bearer ${token}`
                    };

                    const response = await axios.put(apiLocalKey + "/eliminarDomicilio/" + idDomicilio, {},
                        {
                            headers: headers
                        },
                    );



                    //muestro el msj de exito
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'Domicilio eliminado correctamente',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //aca deberia recargar el componente para que se vea la nueva categoria
                            //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                            //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                            setReload(prev => !prev);
                            hideLoadingModal();

                        }
                    })
                }
            })
        } catch (error) {
            hideLoadingModal();
            Swal.fire({
                position: 'center',
                icon: 'error',
                allowOutsideClick: false,
                title: 'Hubo un error al eliminar el domicilio',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
            });
        }
    }


    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            {domicilios.length === 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se encontraron domicilios</Typography>
                </Box>
            ) : (
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <CardDomicilio domicilios={domicilios} editarDomicilio={editarDomicilio} eliminarDomicilio={eliminarDomicilio} />
                </Box>
            )}

            <Tooltip title="Agregar domicilio" placement="left">
                <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 50, right: 70 }} onClick={() => handleFormDomicilio()}>
                    <AddIcon />
                </Fab>
            </Tooltip>

            <ModalFormDomicilio
                open={openModal}
                handleClose={handleCloseModal}
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                reset={reset}
            />
        </Box>
    );
}

export default Domicilios;
