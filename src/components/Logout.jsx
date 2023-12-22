import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingModal from '../components/LoadingModal';
// import Cookies from 'js-cookie';

function Logout() {
    const { showLoadingModal, hideLoadingModal } = LoadingModal();
    showLoadingModal();
    //cuando me deslogueo borro los datos del carrito de localstorage
    localStorage.removeItem('carrito');
    //borro la cookie del token
    // Cookies.remove('token');
    localStorage.removeItem('token');
    localStorage.setItem('sucursalSeleccionada',1)


    const { logout } = useAuth0()
    logout({ logoutParams: { returnTo: window.location.origin } })
}

export default Logout