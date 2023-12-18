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

const CardDomicilio = ({ domicilios, editarDomicilio, eliminarDomicilio }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event, idDomicilio) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(idDomicilio);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    return (
        <Grid container spacing={2} justifyContent={'center'}>
            {domicilios.map((domicilio) => (
                <Grid item xs={12} md={7} key={domicilio.idDomicilio}>
                    <Card sx={{ display: 'flex', marginBottom: '20px', borderRadius: 3, height: '150px' }}>
                        <CardContent sx={{ flex: 2 }}>
                            <Typography variant="h5">{domicilio.descripcionCompleta}</Typography>
                            <Typography sx={{ mt: 1 }} variant='body1' color='text.secondary'>{domicilio.codigoPostal}</Typography>
                            <Typography sx={{ mt: 1 }} variant='body1' color='text.secondary'>{domicilio.aclaracion}</Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2 }}>
                            <IconButton
                                aria-label="more"
                                onClick={(event) => handleClick(event, domicilio.idDomicilio)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open && selectedId === domicilio.idDomicilio}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => { handleClose(); editarDomicilio(selectedId); }}>
                                    Editar
                                </MenuItem>
                                <MenuItem onClick={() => { handleClose(); eliminarDomicilio(selectedId); }}>
                                    Eliminar
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardDomicilio;
