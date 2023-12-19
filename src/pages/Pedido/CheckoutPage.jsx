// Componente CheckoutPage
import { useLocation } from 'react-router-dom';
import DetallePedido from '../../components/DetallePedido';
import { useCarrito } from '../../components/Cart/CarritoProvider';
// import { MercadoPagoButton } from '../../components/MercadoPagoButton';
import { Grid } from '@mui/material';
import DetalleEnvio from '../../components/DetalleEnvio';
import { useState,useEffect } from 'react';
import { useForm } from "react-hook-form"
import axios from 'axios';
import LoadingModal from '../../components/LoadingModal';
import ModalFormDomicilio from '../../components/User/ModalFormDomicilio';
import Swal from 'sweetalert2';


const CheckoutPage = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    const [openModal, setOpenModal] = useState(false);
    const [reload, setReload] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();
    const carrito = useCarrito().carrito;


    const location = useLocation();
    const productoSeleccionado = location.state?.productoSeleccionado;
    const carritoDesdeNavegacion = location.state?.carrito;

    //Logica para el manejo del envío

    const [envioSeleccionado, setEnvioSeleccionado] = useState("sucursal");
    const [domicilios, setDomicilios] = useState([]); // Suponiendo que cargas los domicilios desde algún lugar
    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState("0");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    //el domicilio debe tener un idDomicilio y un nombre

    useEffect(() => {
        // Lógica para obtener las Publicaciones
        const fetchDomilicios = async () => {
            // showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica
            showLoadingModal();

            try {
                const token = localStorage.getItem('token');
                const headers = {
                    Authorization: `Bearer ${token}`
                };
                // debugger;
                
                const response = await axios.get(apiLocalKey + '/domicilios', {
                    headers: headers,
                });

                setDomicilios(response.data.result)
                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                // hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

            } catch (error) {

                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                console.log(error);
            }
        };

        fetchDomilicios();
    }, [reload]);

     // Actualiza el estado del botón cada vez que cambian envioSeleccionado o domicilioSeleccionado
     useEffect(() => {
        if(envioSeleccionado === "sucursal"){
            setIsButtonDisabled(false);
            return;
        }
        if(envioSeleccionado === "domicilio" && domicilioSeleccionado !== "0"){
            setIsButtonDisabled(false);
            return;
        }
        setIsButtonDisabled(true);
    }, [envioSeleccionado, domicilioSeleccionado]);



    const handleEnvioChange = (event) => {
        debugger;
        setEnvioSeleccionado(event.target.value);
        if (event.target.value == "sucursal") {
            setValue("domicilio", "0", { shouldValidate: true });
            setDomicilioSeleccionado("0");
        }

    };

    const handleDomicilioChange = (event) => {
        setValue("domicilio", event.target.value, { shouldValidate: true });
        setDomicilioSeleccionado(event.target.value);

    }


    //logica del modal 

    const handleAgregarDomicilio = () => {
        //se muestra el modal
        setOpenModal(true);

    };

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
                title: "Hubo un error al agregar el domicilio",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
            });
        }
    };


    return (
        <Grid container spacing={2}>
            {/* Card a la izquierda */}
            <DetalleEnvio domicilios={domicilios} envioSeleccionado={envioSeleccionado} handleEnvioChange={handleEnvioChange} onDomicilioChange={handleDomicilioChange} handleAgregarDomicilio={handleAgregarDomicilio} register= {register} errors = {errors} />
            <ModalFormDomicilio
                    open={openModal}
                    handleClose={handleCloseModal}
                    onSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                    reset={reset}
                />

            {/* Card a la derecha */}
            <DetallePedido items={carritoDesdeNavegacion || [productoSeleccionado]} mostrarControles={false} habilitaPago = {isButtonDisabled} domicilioSeleccionado={domicilioSeleccionado} />
        </Grid>

    );

};

export default CheckoutPage;
