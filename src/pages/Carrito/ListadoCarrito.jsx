import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import LoadingModal from '../../components/LoadingModal'
import { useCarrito } from '../../components/Cart/CarritoProvider'
import CardCarrito from '../../components/Cart/CardCarrito'

function ListadoCarrito() {
  const apiLocalKey = import.meta.env.VITE_APP_API_KEY
  const {
    carrito, aumentarCantidad, disminuirCantidad, eliminarDelCarrito, vaciarCarrito,
  } = useCarrito()
  const [publicacionesCarrito, setPublicacionesCarrito] = useState([])
  const { showLoadingModal, hideLoadingModal } = LoadingModal()

  useEffect(() => {
    fetchProductosCarrito()
  }, [])

  const fetchProductosCarrito = async () => {
    showLoadingModal()

    try {
      const response = await axios.post(`${apiLocalKey}/publicacionesCarrito`, carrito)
      setPublicacionesCarrito(response.data.result.data)
      hideLoadingModal()
    } catch (error) {
      hideLoadingModal()
      console.log(error)
    }
  }

  const handleDisminuirCantidad = async (idPublicacion) => {
    const publicacion = publicacionesCarrito.find((p) => p.idPublicacion === idPublicacion)

    if (publicacion) {
      const updatedPublicaciones = publicacionesCarrito.map((p) => (p.idPublicacion === idPublicacion ? { ...p, cantidad: Math.max(1, p.cantidad - 1) } : p))

      setPublicacionesCarrito(updatedPublicaciones)
      disminuirCantidad(idPublicacion)
    }
  }

  const handleAumentarCantidad = async (idPublicacion) => {
    const publicacion = publicacionesCarrito.find((p) => p.idPublicacion === idPublicacion)

    if (publicacion) {
      const updatedPublicaciones = publicacionesCarrito.map((p) => (p.idPublicacion === idPublicacion ? { ...p, cantidad: p.cantidad + 1 } : p))

      setPublicacionesCarrito(updatedPublicaciones)
      aumentarCantidad(idPublicacion)
    }
  }

  const handleEliminarPublicacion = async (idPublicacion) => {
    const updatedPublicaciones = publicacionesCarrito.filter((p) => p.idPublicacion !== idPublicacion)

    setPublicacionesCarrito(updatedPublicaciones)
    eliminarDelCarrito(idPublicacion)
  }

  const limpiarCarrito = async () => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro que desea vaciar el carrito?',
        text: 'Se eliminarán todos los productos del carrito!',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        reverseButtons: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })

      if (result.isConfirmed) {
        setPublicacionesCarrito([])
        vaciarCarrito()

        Swal.fire({
          position: 'center',
          icon: 'success',
          allowOutsideClick: false,
          title: 'Se vació el carrito con éxito',
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
        })
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        allowOutsideClick: false,
        title: 'Hubo un error al vaciar el carrito',
        showConfirmButton: true,
      })
    }
  }

  return (
    <CardCarrito
      publicacionesCarrito={publicacionesCarrito}
      disminuir={handleDisminuirCantidad}
      aumentar={handleAumentarCantidad}
      eliminar={handleEliminarPublicacion}
      vaciar={limpiarCarrito}
    />
  )
}

export default ListadoCarrito
