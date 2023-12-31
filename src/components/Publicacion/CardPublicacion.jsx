import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";




//ESTAS SON LAS TARJETAS DE LAS PUBLICACIONES DE LOS PRODUCTOS QUE SE RECORRE EN EL LISTADO



const CardPublicacion = ({ publicaciones }) => {
    // Helper function to format price with commas and decimals
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    }

    // Helper function to calculate price per installment
    const calculateInstallment = (price) => {
        return formatPrice(price / 12);
    }


    if (publicaciones.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>No se han agregado publicaciones</Typography>
            </Box>
        );
    }

    return (
        <>
            {publicaciones.map((p) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={2} key={p.idPublicacion} mb={2} mt={2}>
                    <Card
                        sx={{
                            height: '100%', // Asegura que la tarjeta ocupe todo el espacio disponible en el Grid.
                            maxWidth: 345, // Valor fijo para un tamaño uniforme
                            cursor: 'pointer',
                            borderRadius: 5,
                            boxShadow: 5,
                            mr: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            '&:hover': { boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.6)' }
                        }}
                    >


                        <Box sx={{ position: 'relative', width: 1, justifyContent: 'center' }}>
                            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
                                {p.idProductoNavigation.nombre}
                            </Typography>

                        </Box>
                        <Divider />


                        <CardActionArea sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                            <Link to={`/publicacion/${p.idPublicacion}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        image={p.idProductoNavigation.urlImagen}
                                        sx={{ 
                                            width: '93%', // Ancho fijo
                                            height: 300, // Altura fija
                                            objectFit: 'contain' // Asegura que la imagen se ajuste dentro del espacio sin deformarse
                                        }}
                                    />
                                </Box>
                            </Link>
                        </CardActionArea>

                        <Divider />

                        <Box sx={{ position: 'relative', width: 1 }}>

                            <CardContent>

                                <Typography align="center" sx={{ fontWeight: 'bold' }} variant="h6">
                                    {formatPrice(p.idProductoNavigation.precio)}
                                </Typography>

                            </CardContent>
                        </Box>

                    </Card>

                </Grid >
            ))}
        </>
    )
}

export default CardPublicacion;
