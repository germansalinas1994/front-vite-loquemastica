import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ListadoCategoria from '../pages/Categoria/ListadoCategoria';
// import ListadoProducto from '../pages/Producto/ListadoProducto';
import ListadoPublicacion from '../pages/Publicacion/ListadoPublicacion';
import NuevaCategoria from '../pages/Categoria/NuevaCategoria';
import Publicacion from '../pages/Publicacion/Publicacion';
import Carrito from '../pages/Carrito/ListadoCarrito';


const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ListadoPublicacion />} />
                <Route path="/home" element={<ListadoPublicacion />} />
                {/* <Route path="/productos" element={<ListadoProducto/>}/> */}
                <Route path="/productos" element={<ListadoPublicacion/>}/>
                <Route path="/categorias" element={<ListadoCategoria />} />
                <Route path="/nuevacategoria" element={<NuevaCategoria />} />
                <Route path="/publicacion/:id" element={<Publicacion/>} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Carrito/>} />
                {/* <Route path="*" element={ <Navigate to={"/home"}/> } /> */}
            </Routes>
        </div>
    )
}

export default AppRouter;