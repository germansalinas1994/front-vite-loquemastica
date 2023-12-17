// import CardProducto from "../../components/Producto/CardProducto";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import LoadingModal from "../../components/LoadingModal";

// import {
//     Typography, Button, TextField, Box, Modal
// } from "@mui/material";

// const ListadoProducto = () => {
//     const apiLocalKey = import.meta.env.VITE_APP_API_KEY

//     const [productos, setProductos] = useState([]);
//     const { showLoadingModal, hideLoadingModal } = LoadingModal();

//     useEffect(() => {
//         // Lógica para obtener las categorías
//         const fetchProductos = async () => {
//             showLoadingModal();  // <-- Mostrar el modal antes de comenzar la operación asincrónica

//             try {
//                 debugger;

//                 const response = await axios.get(apiLocalKey + '/categorias');
//                 setProductos(response.data.result.data)
//                 hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido

//             } catch (error) {
//                 hideLoadingModal();  // <-- Ocultar el modal cuando la operación ha concluido
//                 console.log(error);
//             }
//         };

//         fetchProductos();
//     }, []);

//     return (
//         <>
//             <Box
//                 sx={{
//                     maxWidth: 1,
//                     width: { xs: 0.3, md: 1 },

//                 }}
//             >
//                 <Typography
//                     variant="h4"
//                     sx={{
//                         fontWeight: 500,
//                         marginBottom: { xs: '10px', md: '0' },
//                     }}
//                 >
//                     Productos
//                 </Typography>

//                 <CardProducto productos={productos} />

//             </Box>

//         </>

//     )
// }

// export default ListadoProducto
