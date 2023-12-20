import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Typography, Fab, Tooltip } from "@mui/material";
import CardDomicilio from "../../components/User/CardDomicilio";
import AddIcon from '@mui/icons-material/Add';
import LoadingModal from "../../components/LoadingModal";
import Swal from "sweetalert2";
import ModalFormDomicilio from "../../components/User/ModalFormDomicilio";
import { set, useForm } from "react-hook-form"
import theme from '../../layout/theme.js'
import ModalDetalleDomicilio from "../../components/User/ModalDetalleDomicilio";


const Domicilios = () => {
    //para llamar a la api
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY;


    //Para traer y mostrar todos los domicilios
    const [domicilios, setDomicilios] = useState([]);

    //para recargar el componente cuando se agrega un domicilio, elimina o edita
    const [reload, setReload] = useState(false);

    //para mostrar el modal de carga
    const { showLoadingModal, hideLoadingModal } = LoadingModal();

    //para mostrar el modal de agregar domicilio
    const [openModal, setOpenModal] = useState(false);

    //para switchear entre el modal de agregar y editar domicilio
    const [isEditMode, setIsEditMode] = useState(false);

    //para mostrar el modal de detalle domicilio
    const [openModalDetalle, setOpenModalDetalle] = useState(false);

    //para mostrar el detalle del domicilio
    const [domicilio, setDomicilio] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm();


    useEffect(() => {
        getDomicilios();
    }, [reload]);

    //funcion para traer todos los domicilios
    const getDomicilios = async () => {
        try {
            showLoadingModal();

            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(apiLocalKey + "/domicilios",
                {
                    headers: headers,
                });

            hideLoadingModal();
            setDomicilios(response.data.result);


        } catch (error) {

            console.error(error);
            hideLoadingModal();
        }
    }





    //funcion para abrir el modal de agregar domicilio
    const handleFormDomicilio = () => {
        setOpenModal(true);
    }

    //funcion para cerrar el modal de agregar domicilio
    const handleCloseModal = async (event, reason) => {
        if (reason == 'backdropClick') {
            return;
        }
        // Si se hace click en el botón de cancelar o en la X, se cierra el modal y se resetea el formulario
        reset(
            {
                CodigoPostal: "",
                Aclaracion: "",
                IdDomicilio: "",
                Calle: "",
                Numero: "",
                Departamento: "",
            }
        );
        await setOpenModal(false);
    };

    //funcion para guardar el domicilio
    const onSubmit = async (data) => {
        handleCloseModal();
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            //si esta seguro, elimino la categoria
            const response = await axios.post(apiLocalKey + "/domicilio", data, {
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
                confirmButtonText: "Aceptar",

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
            Swal.fire({
                position: "center",
                icon: "error",
                allowOutsideClick: false,
                title: "Hubo un error al agregar el domicilio",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",

            }).then((result) => {
                if (result.isConfirmed) {
                    hideLoadingModal();
                }
            });
        }
    };











    //funcion para switchear entre el modal de agregar y editar domicilio
    const toggleEditMode = () => {
        setIsEditMode((prev) => !prev);
    };

    //funcion para obtener los datos de un domicilio y mostrarlos en el modal de editar domicilio
    const handleDetalleDomicilio = async (idDomicilio) => {
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.get(apiLocalKey + "/domicilio",
                {
                    headers: headers,
                    params: {
                        idDomicilio: idDomicilio
                    }

                },
              );

            setDomicilio(response.data.result);
            setValue("CodigoPostal", response.data.result.codigoPostal);
            setValue("Aclaracion", response.data.result.aclaracion);
            setValue("IdDomicilio", response.data.result.idDomicilio);
            setValue("Calle", response.data.result.calle);
            setValue("Numero", response.data.result.numero);
            setValue("Departamento", response.data.result.departamento);

            setOpenModalDetalle(true);
            hideLoadingModal();

        }
        catch (error) {
            console.error(error);
            Swal.fire({
                position: "center",
                icon: "error",
                allowOutsideClick: false,
                title: "Hubo un error al obtener el domicilio",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",

            }).then((result) => {
                if (result.isConfirmed) {
                    hideLoadingModal();
                }
            }
            );



        }
    }

    //funcion para cerrar el modal de detalle domicilio
    const handleCloseModalDetalle = async (event, reason) => {
        if (reason == "backdropClick") {
            return;
        }

        reset(
            {
                CodigoPostal: "",
                Aclaracion: "",
                IdDomicilio: "",
                Calle: "",
                Numero: "",
                Departamento: "",
            }
        );

        setIsEditMode(false);
        setOpenModalDetalle(false);
    };


    //funcion para guardar el domicilio editado
    const onSubmitEdit = async (data) => {
        handleCloseModalDetalle();
        try {
            showLoadingModal();
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.put(apiLocalKey + "/editarDomicilio", data, {
                headers: headers,
            });

            //muestro el msj de exito
            Swal.fire({
                position: "center",
                icon: "success",
                allowOutsideClick: false,
                title: "Domicilio editado correctamente",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",

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
                title: "Hubo un error al editar el domicilio",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",

            });
        }
    };



    //funcion para eliminar el domicilio
    const eliminarDomicilio = (idDomicilio) => {

        try {
            Swal.fire({
                title: "¿Estás seguro de eliminar el domicilio?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showConfirmButton: true,

                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true, //invierte la ubicacion de los botones confirmar y cancelar

                confirmButtonColor: theme.palette.error.main,

                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
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
                    <CardDomicilio domicilios={domicilios} editarDomicilio={handleDetalleDomicilio} eliminarDomicilio={eliminarDomicilio} />
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

            <ModalDetalleDomicilio
                open={openModalDetalle}
                handleClose={handleCloseModalDetalle}
                domicilio={domicilio}
                onSubmit={handleSubmit(onSubmitEdit)}
                register={register}
                errors={errors}
                reset={reset}
                watch={watch}
                isEditMode={isEditMode}
                toggleEditMode={toggleEditMode}
            />

        </Box>
    );
}

export default Domicilios;
