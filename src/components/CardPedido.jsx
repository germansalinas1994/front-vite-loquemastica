import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { format } from "date-fns";
import EventNoteIcon from '@mui/icons-material/EventNote';
import Divider from '@mui/material/Divider';


const CardPedido = ({ pedidos, descargarFactura }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, idPedido) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(idPedido);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    }
    const formatDate = (date) => {
        return date ? format(new Date(date), "dd/MM/yyyy") : "";
    };

    return (

        <Grid container spacing={2} justifyContent={'center'} mt={1}>

            {pedidos.map((pedido) => (
                <Grid item xs={12} md={8} lg={8} key={pedido.id}>

                    <Card sx={{ display: 'flex', marginBottom: '20px', borderRadius: 5, boxShadow: 5 }}>
                        <CardContent sx={{ flex: 3, ml: 6, mr: 3 }}>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    {pedido.envio ?
                                        `${pedido.envio.descripcionEnvio} -  LLega a ${pedido.envio.domicilio.descripcionCompleta}` :
                                        `Retiras en la sucursal de ${pedido.publicacionPedido[0].publicacion.idSucursalNavigation.nombre}`}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" gutterBottom color={'primary.dark'}>
                                        Pedido #{pedido.orden_MercadoPago}
                                    </Typography>

                                    <IconButton
                                        sx={{ml:0.5}}
                                        aria-label="more"
                                        onClick={(event) => handleClick(event, pedido.id)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open && selectedId === pedido.id}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={() => { handleClose(); descargarFactura(selectedId); }}>
                                            Descargar factura
                                        </MenuItem>

                                    </Menu>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'left', mt: 0.5 }}>

                                <Typography variant="body" gutterBottom>

                                    <EventNoteIcon /> Fecha de compra: {formatDate(pedido.fechaAlta)}
                                </Typography>
                            </Box>


                            <Divider style={{ margin: '10px 0' }} />



                            {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {pedido.envio ?
                                                `Estado del envío: ${pedido.envio.descripcionEnvio}` :
                                                `Retiras en la sucursal de ${pedido.publicacionPedido[0].publicacion.idSucursalNavigation.nombre}`}
                                        </Typography> */}
                            {pedido.publicacionPedido.map((item) => (
                                <Box key={item.publicacion.idPublicacion} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Box sx={{ width: 130, height: 130, overflow: 'hidden', marginRight: 2 }}>
                                        <img
                                            src={item.publicacion.idProductoNavigation.urlImagen} // Asegúrate de que este es el campo correcto
                                            alt={`Imagen de ${item.publicacion.idProductoNavigation.nombre}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Cambio a 'contain' para ajustar la imagen completa en el recuadro
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            {item.publicacion.idProductoNavigation.nombre} - {item.cantidad} unidad(es)
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Precio unitario: ${item.precio.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Subtotal: ${item.subTotal.toFixed(2)}
                                        </Typography>

                                    </Box>

                                </Box>
                            ))}


                            <Typography variant="h6" sx={{ textAlign: 'right', mr:3 }}>
                                Total:   {formatPrice(pedido.total)}
                            </Typography>
                        </CardContent>
                        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
                            <IconButton
                                aria-label="more"
                                onClick={(event) => handleClick(event, pedido.id)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open && selectedId === pedido.id}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => { handleClose(); descargarFactura(selectedId); }}>
                                    Descargar factura
                                </MenuItem>

                            </Menu>
                        </Box> */}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardPedido;
