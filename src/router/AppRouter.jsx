import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ListadoCategoria from '../pages/Categoria/ListadoCategoria';
// import ListadoProducto from '../pages/Producto/ListadoProducto';
import ListadoPublicacion from '../pages/Publicacion/ListadoPublicacion';
import NuevaCategoria from '../pages/Categoria/NuevaCategoria';
import Publicacion from '../pages/Publicacion/Publicacion';
import Carrito from '../pages/Carrito/ListadoCarrito';
import Logout from '../components/Logout';
import Prueba from '../components/Prueba';
import ProtectedRoute from './ProtectedRoute';
import LoadingModal from "../components/LoadingModal";
import { AuthContext } from '../components/User/AuthContext';
import { useContext, useEffect } from 'react';
import AccesoDenegado from '../pages/AccesoDenegado';
import CheckoutPage from '../pages/Pedido/CheckoutPage';
import MiCuenta from '../pages/Usuario/MiCuenta';
import Domicilio from '../pages/Usuario/Domicilio';



const AppRouter = () => {

    const { loading } = useContext(AuthContext);
    const { showLoadingModal, hideLoadingModal } = LoadingModal();


    //Declaro las variables de entorno para los roles
    const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
    const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;
    const rol_client = import.meta.env.VITE_APP_ROLE_CLIENT;





    return (
        <div>
            <Routes>
                <Route path="/" element={<ListadoPublicacion />} />
                <Route path="/home" element={<ListadoPublicacion />} />
                {/* <Route path="/productos" element={<ListadoProducto/>}/> */}
                <Route path="/productos" element={<ListadoPublicacion />} />
                <Route path="/categorias" element={<ListadoCategoria />} />
                <Route path="/nuevacategoria" element={<NuevaCategoria />} />
                <Route path="/publicacion/:id" element={<Publicacion />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Carrito />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/checkout" element={
                    <ProtectedRoute rolesRequired={[rol_admin, rol_client]}>

                        <CheckoutPage />
                    </ProtectedRoute>
                } />

                <Route path="/direcciones" element={
                    <ProtectedRoute rolesRequired={[rol_client]}>
                        <Domicilio />
                    </ProtectedRoute>
                } />



                <Route path="/cuenta" element={
                    <ProtectedRoute rolesRequired={[rol_admin, rol_client, rol_sucursal]}>
                        <MiCuenta />
                    </ProtectedRoute>
                } />




                {/* <Route path="/prueba" element={
                    <ProtectedRoute rolesRequired={[rol_admin, rol_client]}>
                        <Prueba />
                    </ProtectedRoute>
                } /> */}
                <Route path="/acceso_denegado" element={<AccesoDenegado />} />
                {/* esto es para si no existe la ruta que se quiere acceder que redirija a acceso denegado */}
                <Route path="*" element={<AccesoDenegado />} />


            </Routes>
        </div>
    )
}

export default AppRouter;