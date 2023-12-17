import { useEffect, useState } from 'react'
import axios from 'axios'

function useCategorias() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categorias')
        setCategorias(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return { categorias, loading }
}

export default useCategorias
