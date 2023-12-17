import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function Logout() {
  // cuando me deslogueo borro los datos del carrito de localstorage
  localStorage.removeItem('carrito')

  const { logout } = useAuth0()
  logout({ logoutParams: { returnTo: window.location.origin } })
}

export default Logout
