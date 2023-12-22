import { Card, CardContent, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography, Select, MenuItem, Button, Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import AddHomeIcon from '@mui/icons-material/AddHome';

const DetalleEnvio = ({ domicilios, envioSeleccionado, handleEnvioChange, onDomicilioChange, handleAgregarDomicilio, register, errors }) => {

    return (
        <Card sx={{ borderRadius: 2, minHeight: '190px' }}>
            <CardContent>
                <Typography variant="h5">¿Cómo querés recibir o retirar tu compra?</Typography>

                <FormControl component="fieldset" sx={{ marginTop: '20px', textAlign: 'center' }}>
                    <RadioGroup name="shippingOption" value={envioSeleccionado} onChange={handleEnvioChange}>
                        <FormControlLabel value="sucursal" control={<Radio />} label="Retira en sucursal" />
                        <FormControlLabel value="domicilio" control={<Radio />} label="Envío a domicilio - Gratis" />
                    </RadioGroup>
                </FormControl>

                {envioSeleccionado === "domicilio" && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                        <FormControl fullWidth error={Boolean(errors.domicilio)}>
                            <InputLabel id="domicilio-label">Domicilio</InputLabel>
                            <Select sx={{ width: '90%' }}
                                labelId="domicilio-label"
                                placeholder="Seleccione un domicilio"
                                id="domicilio-select"
                                label="Domicilio"
                                {...register("domicilio", { required: "Este campo es obligatorio" })}
                                defaultValue="0" // Asegúrate de que el valor por defecto sea ""
                                onChange={onDomicilioChange}

                            >
                                <MenuItem value="0" disabled>Seleccione un domicilio</MenuItem>
                                {domicilios.map((domicilio) => (
                                    <MenuItem key={domicilio.idDomicilio} value={domicilio.idDomicilio}>{domicilio.descripcionCompleta}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption" color="error">
                                {errors.domicilio && errors.domicilio.message}
                            </Typography>
                        </FormControl>


                        <Button variant="outlined" onClick={handleAgregarDomicilio} sx={{ marginRight: '10px' }}>
                            <AddHomeIcon onClick={handleAgregarDomicilio} sx={{ marginRight: '10px', fontSize: '40px' }} />
                            <Typography sx={{
                                textTransform: 'none', // Elimina las mayúsculas
                                fontSize: '14px', // Tamaño de fuente más pequeño
                            }}>
                                Agregar Domicilio
                            </Typography>
                        </Button>

                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default DetalleEnvio;
