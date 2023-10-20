import TableSearch from "../../components/Categoria/TableSearch";
import {
    Typography, Box, Grid
} from "@mui/material";
// import { Link } from 'react-router-dom';
import BotonAgregar from "../../components/Botones/Agregar";
import axios from "axios";
import Swal from 'sweetalert2'
import LoadingModal from "../../components/LoadingModal";
import ModalFormCategoria from "../../components/Categoria/ModalFormCategoria";



import { useState, useEffect } from "react";


const ListadoCategoria = () => {
    const apiLocalKey = import.meta.env.VITE_APP_API_KEY

    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorDescripcion, setErrorDescripcion] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [reload, setReload] = useState(false);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();

    //Esta estado lo uso para saber si estoy editando o no, si no estoy editan voy a crear
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        // Lógica para obtener las categorías
        const fetchCategorias = async () => {
            showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica

            try {
                const response = await axios.get(apiLocalKey + '/categorias');
                setCategorias(response.data.result.data)
                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

            } catch (error) {
                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                console.log(error);
            }
        };

        fetchCategorias();

        //el reload es para que se ejecute el useEffect cada vez que cambia el valor de reload
    }, [reload]);


    //funcion que toma el evento de abrir el modal
    const handleOpenModal = () => {
        setOpenModal(true);
    }

    //funcion que toma el evento de cerrar el modal
    const handleCloseModal = async () => {
        await setFormData({ nombre: '', descripcion: '' });
        await setErrorDescripcion(false);
        await setErrorNombre(false);
        await setOpenModal(false);
        await setIsEditing(false);
    }

    //funcion que toma el evento de cambio de valor en los campos del modal
    const handleChange = (event) => {
        //aca hago un clave valor, para que el nombre del campo sea la clave y el valor sea el valor
        const { name, value } = event.target;
        //aca hago un spread operator para que no se pise el valor anterior
        //el ...prevState es para que no se pise el valor anterior
        //el [name] es para que el nombre del campo sea la clave y el valor sea el valor
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (name === 'nombre') {
            //el trim es para que no se pueda ingresar solo espacios
            setErrorNombre(!value.trim());
        } else if (name === 'descripcion') {
            setErrorDescripcion(!value.trim());
        }
    }



    //funcion que toma el evento de editar una categoria
    const handleEditCategoria = async (id) => {
        try {
            showLoadingModal();
            //Voy a buscar la categoria por id
            debugger;

            const response = await axios.get(apiLocalKey + '/categoria/' + id);
            //Seteo el estado con los datos de la categoria
            setFormData(response.data.result.data); // Asume que la respuesta contiene los datos de la categoría
            setOpenModal(true);
            setIsEditing(true);
            hideLoadingModal();
        } catch (error) {
            hideLoadingModal();
            Swal.fire({
                position: 'center',
                icon: 'error',
                allowOutsideClick: false,
                title: 'Hubo un error al recuperar los detalles de la categoría',
                showConfirmButton: true,
            });
        }
    };


    const handleDeleteCategoria = async (id) => {
        try {
            //pregunto si esta seguro de eliminar la categoria
            Swal.fire({
                title: '¿Estás seguro de eliminar la categoría?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showConfirmButton: true,

                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true, //invierte la ubicacion de los botones confirmar y cancelar

                confirmButtonColor: '#D32F2F',
                cancelButtonColor: '#6E8EA7',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    showLoadingModal();
                    //si esta seguro, elimino la categoria
                    const response = await axios.delete(apiLocalKey + '/categoria/' + id);
                    //muestro el msj de exito
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'Categoría eliminada correctamente',
                        showConfirmButton: true,
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
                title: 'Hubo un error al eliminar la categoría',
                showConfirmButton: true,
            });
        }
    };





    const validaFormulario = () => {
        let valida = true;
        //si el campo esta vacio, seteo el error en true
        if (!formData.nombre.trim()) {
            setErrorNombre(true);
            valida = false;
        }
        //si el campo esta vacio, seteo el error en true
        if (!formData.descripcion.trim()) {
            setErrorDescripcion(true);
            valida = false;
        }
        return valida;
    }


    const handleSubmit = async () => {
        debugger;

        if (validaFormulario()) {
            // Función para cargar categoría

            try {
                debugger;
                handleCloseModal();
                showLoadingModal();

                // showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica

                let resp = '';
                if (isEditing) {
                    // Si está editando, entonces envía un PUT
                    resp = await axios.put(apiLocalKey + '/categoria/' + formData.idCategoria, formData);
                    //muestro el msj de exito

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'Categoría editada correctamente',
                        showConfirmButton: true,

                    }).then((result) => {
                        if (result.isConfirmed) {
                            //aca deberia recargar el componente para que se vea la nueva categoria
                            //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                            //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                            hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                            setReload(prev => !prev);

                        }
                    })
                }
                else {
        
                    resp = await axios.post(apiLocalKey + '/categorias', formData);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'Categoría creada correctamente',
                        showConfirmButton: true,

                    }).then((result) => {
                        if (result.isConfirmed) {
                            //aca deberia recargar el componente para que se vea la nueva categoria
                            //Revierte el valor de reload para que se vuelva a ejecutar el useEffect
                            //Cada vez que se cambia el valor de reload, se ejecuta el useEffect
                            hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                            setReload(prev => !prev);

                        }
                    })

                }

                debugger;

                console.log(resp.data);  // Puedes ver la respuesta del servidor



                // Aquí puedes manejar la respuesta, por ejemplo, cerrar el modal, mostrar un mensaje de éxito, etc.
            } catch (error) {

                hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
                console.error("Hubo un error al guardar los datos:", error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    allowOutsideClick: false,
                    title: 'Hubo un error al guardar los datos',
                    showConfirmButton: true,

                })

                // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
            }
        }
    }

    return (
        <>

            <Box >
                <Typography variant="h4" component="h2" gutterBottom>
                    Listado de Categorías
                </Typography>
                <BotonAgregar onClick={handleOpenModal}></BotonAgregar>

                {/* Hago un componente para el modal, para que sea mas facil de leer */}
                <ModalFormCategoria
                    open={openModal}
                    handleClose={handleCloseModal}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errorNombre={errorNombre}
                    errorDescripcion={errorDescripcion}
                />

                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 6 }}>

                    <TableSearch categorias={categorias} onEdit={handleEditCategoria} onDelete={handleDeleteCategoria} />
                </Grid>
            </Box>


        </>

    );
}

export default ListadoCategoria;