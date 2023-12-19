
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import { useEffect } from "react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';


const ModalDetalleDomicilio = ({ open, handleClose, domicilio, onSubmit, register, errors, reset, watch, isEditMode, toggleEditMode }) => {

    //que hace esta funcion?
    useEffect(() => {
        if (domicilio && open) {
            reset({
                Calle: domicilio.calle,
                Altura: domicilio.altura,
                Departamento: domicilio.departamento,
                CodigoPostal: domicilio.codigoPostal,
                Aclaracion: domicilio.aclaracion,
                IdDomicilio: domicilio.idDomicilio
            });
        }
    }, [open, reset, domicilio]);

    return (
        <Modal
            open={open}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClose={handleClose}
            disableEscapeKeyDown={true} // Impide el cierre del modal al presionar la tecla Escape
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '75%', md: '600px' },
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: { xs: 2, sm: 3, md: 4 },
                }}
                component="form"
                onSubmit={onSubmit}
            >
                <IconButton
                    aria-label="cerrar"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="modal-title" variant="h5" component="h2">
                    Detalle Domicilio
                    <IconButton onClick={toggleEditMode}>
                        <EditIcon />
                    </IconButton>
                </Typography>
                <Box mt={3} mb={3}>
                    <TextField
                        type="hidden"
                        style={{ display: "none" }} // Asegúrate de que esté oculto
                        {...register("IdDomicilio")}
                        defaultValue={domicilio?.IdDomicilio}
                    />
                    <Box mt={2}>
                        <TextField fullWidth
                            label="Calle"
                            placeholder="Ingrese la calle"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}

                            {...register("Calle",
                                {
                                    required: "La calle es obligatoria",
                                    // pattern: {
                                    //     value: /^[a-zA-Z\s]*$/,
                                    //     message: "El nombre debe contener solo letras"
                                    // }

                                })
                            }
                            error={Boolean(errors.Calle)}
                            helperText={errors.Calle && errors.Calle.message}

                        />

                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="Número"
                            placeholder="Ingrese el número de calle"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}


                            {...register("Altura",
                                {
                                    required: "El número es obligatorio",

                                })
                            }
                            error={Boolean(errors.Altura)}
                            helperText={errors.Altura && errors.Altura.message}

                        />
                    </Box>
                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="Departamento"
                            placeholder="Ingrese el número de departamento"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}


                            {...register("Departamento")
                            }
                            error={Boolean(errors.Departamento)}
                            helperText={errors.Departamento && errors.Departamento.message}

                        />
                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="Código Postal"
                            placeholder="Ingrese el número del código postal"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}


                            {...register("CodigoPostal",
                                {
                                    required: "El código postal es obligatorio",

                                }
                            )
                            }
                            error={Boolean(errors.CodigoPostal)}
                            helperText={errors.CodigoPostal && errors.CodigoPostal.message}

                        />
                    </Box>

                    <Box mt={3} mb={3}>
                        <TextField fullWidth
                            mb={2}
                            label="Aclaración"
                            placeholder="Ingrese una aclaración"
                            InputLabelProps={{ shrink: true }}
                            disabled={!isEditMode}


                            {...register("Aclaracion")}
                            error={Boolean(errors.Aclaracion)}
                            helperText={errors.Aclaracion && errors.Aclaracion.message}

                        />
                    </Box>





                    {isEditMode && (

                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Button
                                sx={{
                                    mt: 1, mr: 2, width: '120px', textTransform: 'none',
                                }}
                                size="large"
                                variant="outlined"
                                color="primary"

                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>
                            <Button
                                size="large"
                                sx={{
                                    mt: 1, width: '120px', color: 'white', textTransform: 'none',
                                }}
                                variant="contained"
                                color="primary"

                                type="submit"
                            >
                                Guardar
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalDetalleDomicilio;
