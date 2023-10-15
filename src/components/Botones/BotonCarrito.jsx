import StyledBadge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrito } from '../Cart/CarritoProvider'; // Asegúrate de importar el hook correctamente


const BotonCarrito = () => {
    // 5. Consumimos el hook personalizado, el useCarrito nos retorna el estado global y la función para modificarlo
    const { carrito } = useCarrito();
    // 6. Iteramos sobre el carrito y sumamos la cantidad de productos
    const totalProductos = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    
    return (
        <StyledBadge badgeContent={totalProductos} color="secondary">
            <ShoppingCartIcon sx={{ fontSize: '1.7rem' }} />
        </StyledBadge>
    );
    
}

export default BotonCarrito;