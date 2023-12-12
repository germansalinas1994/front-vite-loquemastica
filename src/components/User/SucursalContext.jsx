// SucursalContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCarrito } from '../Cart/CarritoProvider';

export const SucursalContext = createContext();

export const SucursalProvider = ({ children }) => {
  const carrito = useCarrito().carrito;  //uso el hook para obtener solo las publicaciones(id) y cantidades del carrito
  const { vaciarCarrito } = useCarrito();

  const [sucursales, setSucursales] = useState([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(() => {
    const sucursalGuardada = localStorage.getItem('sucursalSeleccionada');
    return sucursalGuardada ? JSON.parse(sucursalGuardada) : 1;
  });

  useEffect(() => {
    //si cambia la sucursal, vacio el carrito
    vaciarCarrito();
    localStorage.setItem('sucursalSeleccionada', JSON.stringify(sucursalSeleccionada));
  }, [sucursalSeleccionada]);

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

  return (
    <SucursalContext.Provider value={{ sucursales, sucursalSeleccionada, setSucursalSeleccionada }}>
      {children}
    </SucursalContext.Provider>
  );
};
