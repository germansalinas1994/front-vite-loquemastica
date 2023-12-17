import React, {
  createContext, useContext, useState, useEffect,
} from 'react'

// 1. Creamos el contexto, que es donde vamos a almacenar el estado global en la aplicación
const CarritoContext = createContext({
  carrito: [],
  agregarAlCarrito: () => {},
  aumentarCantidad: () => {},
  disminuirCantidad: () => {},
  eliminarDelCarrito: () => {},
})

// 3. Creamos el hook personalizado, para poder consumir el contexto desde cualquier componente
export const useCarrito = () => useContext(CarritoContext)

// 2. Creamos el Provider que va a envolver a toda la aplicación, el carrito va a estar disponible en todos los componentes
export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
      return JSON.parse(carritoGuardado)
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
    // Si manejas el tema en el estado, también lo guardas aquí:
    // localStorage.setItem('tema', tema);
  }, [carrito]) // Observamos cambios en el estado carrito

  // 4. Creamos la función que va a modificar el estado global, recibe un objeto producto con una cantidad
  const agregarAlCarrito = (producto) => {
    // el prevCarrito es el estado anterior, y lo que retorna es el nuevo estado
    setCarrito((prevCarrito) => {
      // Buscamos si el producto ya está en el carrito por el id del producto que recibimos
      const productoExistente = prevCarrito.find((p) => p.id === producto.id)

      // Si el producto existe, retornamos el estado anterior con la cantidad modificada, los tres puntos en react se llaman spread operator, y lo que hacen es copiar el objeto o array que le sigue
      // En este caso, estamos copiando el producto existente, y modificando la cantidad
      if (productoExistente) {
        return prevCarrito.map((p) => (p.id === producto.id
          ? { ...p, cantidad: p.cantidad + producto.cantidad }
          : p))
      }
      // Si el producto no existe, retornamos el estado anterior con el nuevo producto agregado
      return [...prevCarrito, producto]
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  const aumentarCantidad = (idPublicacion) => {
    setCarrito((prevCarrito) => prevCarrito.map((p) => (p.id === idPublicacion
      ? { ...p, cantidad: p.cantidad + 1 }
      : p)))
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  const disminuirCantidad = (idPublicacion) => {
    setCarrito((prevCarrito) => {
      const producto = prevCarrito.find((p) => p.id === idPublicacion)

      if (producto) {
        // Si la cantidad es mayor que 1, disminuye la cantidad
        if (producto.cantidad > 1) {
          return prevCarrito.map((p) => (p.id === idPublicacion
            ? { ...p, cantidad: p.cantidad - 1 }
            : p))
        }
        // Si la cantidad es 1, elimina el producto del carrito

        return prevCarrito.filter((p) => p.id !== idPublicacion)
      }
      return prevCarrito // Si no se encuentra el producto, devuelve el carrito tal como está
    })
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  const eliminarDelCarrito = (idPublicacion) => {
    setCarrito((prevCarrito) => prevCarrito.filter((p) => p.id !== idPublicacion))
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  const vaciarCarrito = () => {
    setCarrito([])
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  return (
    <CarritoContext.Provider value={{
      carrito, agregarAlCarrito, aumentarCantidad, disminuirCantidad, eliminarDelCarrito, vaciarCarrito,
    }}
    >
      {children}
    </CarritoContext.Provider>
  )
}
