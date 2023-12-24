import { useEffect, useState } from 'react';
import LoadingModal from "../../components/LoadingModal";
import axios from "axios";
// con el useCarrito, puedo tener los datos del carrito en cualquier componente, sin necesidad de pasarlos por props
import { useCarrito } from '../../components/Cart/CarritoProvider'; // importo el hook que me permite acceder al estado global del carrito

import CardCarrito from '../../components/Cart/CardCarrito';
import Swal from 'sweetalert2';



const ListadoCarrito = () => {

    const apiLocalKey = import.meta.env.VITE_APP_API_KEY
    const carrito = useCarrito().carrito;  //uso el hook para obtener solo las publicaciones(id) y cantidades del carrito

    const { aumentarCantidad, disminuirCantidad, eliminarDelCarrito, vaciarCarrito } = useCarrito();

    const [publicacionesCarrito, setPublicacionesCarrito] = useState([]);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();

    // el use effect se ejecuta cuando el componente se renderiza, o cuando sucede alguna condicion que se le pasa en el array
    useEffect(() => {
        // Lógica para obtener los publicaciones de los productos agregados al carrito
        fetchProductosCarrito(); // llamo a la funcion que obtiene las publicaciones

    }, []);

    const fetchProductosCarrito = async () => {
        showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };

            const response = await axios.post(apiLocalKey + '/publicacionesCarrito', carrito,
                { headers: headers } 
            
            ); // le paso el array de publicaciones del carrito
            setPublicacionesCarrito(response.data.result.data)
            hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

        } catch (error) {
            hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
        }
    };







    const handleDisminuirCantidad = async (idPublicacion) => {
        // Lógica para disminuir la cantidad

        //tengo que actulizar publicacionesCarrito que son las que vienen del back, la cantidad
        //tengo que buscar la publicacion en publicacionesCarrito, y actualizarle la cantidad
        //para eso uso el metodo find, que me devuelve el elemento del array que cumple con la condicion

        //si el id de la publicacion del array es igual al id de la publicacion que viene por parametro
        //entonces le modifico la cantidad, sino, retorno el elemento tal cual, ademas de restar
        // si la cantidad es 1 y le resto, tengo que eliminar la publicacion del carrito

        //primero busco la publicacion en el array de publicacionesCarrito
        const publicacion = publicacionesCarrito.find(p => p.idPublicacion === idPublicacion);
        //si la encuentro, la modifico
        if (publicacion) {
            // Si la cantidad es mayor que 1, disminuye la cantidad
            //aca tengo que actualizar el array de publicacionesCarrito, con la cantidad modificada
            //por eso uso el metodo map, que me devuelve un nuevo array, con los elementos modificados
            //si el id de la publicacion del array es igual al id de la publicacion que viene por parametro
            //entonces le modifico la cantidad, sino, retorno el elemento tal cual
            //los 3 puntos son el spread operator, que lo que hace es copiar el objeto que le sigue
            if (publicacion.cantidad > 1) {
                setPublicacionesCarrito(publicacionesCarrito.map(p =>
                    p.idPublicacion === idPublicacion
                        ? { ...p, cantidad: p.cantidad - 1 }
                        : p
                ));

            }
            // Si la cantidad es 1, elimina el producto del carrito
            else {
                setPublicacionesCarrito(publicacionesCarrito.filter(p => p.idPublicacion !== idPublicacion));
            }

            disminuirCantidad(idPublicacion);

        }


    };

    const handleAumentarCantidad = async (idPublicacion) => {
        // Lógica para aumentar la cantidad

        //busco la publicacion en el array de publicacionesCarrito, y la aumento en 1
        const publicacion = publicacionesCarrito.find(p => p.idPublicacion === idPublicacion);

        if (publicacion) {
            //la aumento en 1
            //aca tengo que actualizar el array de publicacionesCarrito, con la cantidad modificada
            //por eso uso el metodo map, que me devuelve un nuevo array, con los elementos modificados
            //si el id de la publicacion del array es igual al id de la publicacion que viene por parametro
            //entonces le modifico la cantidad, sino, retorno el elemento tal cual
            //los 3 puntos son el spread operator, que lo que hace es copiar el objeto que le sigue
            setPublicacionesCarrito(publicacionesCarrito.map(p =>
                p.idPublicacion === idPublicacion
                    ? { ...p, cantidad: p.cantidad + 1 }
                    : p
            ));

            //la aumento en el carrito
            aumentarCantidad(idPublicacion);

        }

    };

    const handleEliminarPublicacion = async (idPublicacion) => {
        // Lógica para eliminar la publicación del carrito

        //busco la publicacion en el array de publicacionesCarrito, y la elimino
        const publicacion = publicacionesCarrito.find(p => p.idPublicacion === idPublicacion);

        if (publicacion) {
            //la elimino del array de publicacionesCarrito que viene del backend
            setPublicacionesCarrito(publicacionesCarrito.filter(p => p.idPublicacion !== idPublicacion));
            //la elimino del carrito
            eliminarDelCarrito(idPublicacion);

        }



    };

    const limpiarCarrito = async () => {
        // Lógica para vaciar el carrito

        try {
            Swal.fire({
                title: "¿Estás seguro que desea vaciar el carrito?",
                text: "Se eliminarán todos los productos del carrito!",
                icon: "warning",
                showConfirmButton: true,

                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true, //invierte la ubicacion de los botones confirmar y cancelar

                // confirmButtonColor: theme.palette.primary.main,
                // cancelButtonColor: theme.palette.primary.main,

                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    //vaciar el array de publicacionesCarrito que viene del backend
                    setPublicacionesCarrito([]);
                    //vaciar el carrito
                    vaciarCarrito();

                    //muestro el msj de exito
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        allowOutsideClick: false,
                        title: 'Se vació el carrito con éxito',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    })
                }
            })
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                allowOutsideClick: false,
                title: 'Hubo un error al vaciar el carrito',
                showConfirmButton: true,
            });
        }

    }

    return (
            <CardCarrito publicacionesCarrito={publicacionesCarrito} disminuir={handleDisminuirCantidad} aumentar={handleAumentarCantidad} eliminar={handleEliminarPublicacion} vaciar={limpiarCarrito} />
    );
}

export default ListadoCarrito;


