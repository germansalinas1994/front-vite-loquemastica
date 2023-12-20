// SucursalContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCarrito } from '../Cart/CarritoProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'
import Swal from 'sweetalert2';


export const SucursalContext = createContext();

export const SucursalProvider = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const carrito = useCarrito().carrito;  //uso el hook para obtener solo las publicaciones(id) y cantidades del carrito
  const { vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  const [sucursales, setSucursales] = useState([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(() => {
    const sucursalGuardada = localStorage.getItem('sucursalSeleccionada');
    return sucursalGuardada ? JSON.parse(sucursalGuardada) : 1;
  });



  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
        const response = await axios.get(`${apiLocalKey}/sucursales`);
        setSucursales(response.data.result);
      } catch (error) {
        console.error("Error al obtener las sucursales:", error);
      }
    };

    fetchSucursales();
  }, []);

  const handleChangeSucursal = (event) => {

    let sucursalGuardada = parseInt(localStorage.getItem('sucursalSeleccionada'));
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    if (sucursalGuardada == 1) {
      setSucursalSeleccionada(event);
      localStorage.setItem('sucursalSeleccionada', JSON.stringify(event));
      vaciarCarrito();
      localStorage.setItem('carrito', JSON.stringify(carrito));
      navigate('/');
    }
    else if(carrito == null || carrito.length == 0){
      setSucursalSeleccionada(event);
      localStorage.setItem('sucursalSeleccionada', JSON.stringify(event));
      navigate('/');
    }
    else {
      try {
        Swal.fire({
          title: "¿Estás seguro de cambiar de sucursal?",
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
            if (!isLoading && isAuthenticated) {
              if (event != parseInt(localStorage.getItem('sucursalSeleccionada'))) {
                vaciarCarrito();
                localStorage.setItem('sucursalSeleccionada', JSON.stringify(event));
                setSucursalSeleccionada(event);
                localStorage.setItem('carrito', JSON.stringify(carrito));


              }

              // navigate('/');

            }
            //muestro el msj de exito
            Swal.fire({
              position: 'center',
              icon: 'success',
              allowOutsideClick: false,
              title: 'Sucursal modificada con éxito',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {

                navigate('/');
              }
            })
          }
        })
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          allowOutsideClick: false,
          title: 'Hubo un error al modificar la sucursal',
          showConfirmButton: true,
        });
      }

    }



  }

  return (
    <SucursalContext.Provider value={{ sucursales, sucursalSeleccionada, setSucursalSeleccionada, handleChangeSucursal }}>
      {children}
    </SucursalContext.Provider>
  );
};
