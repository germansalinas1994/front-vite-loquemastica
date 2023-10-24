// ModalFormCategoria.jsx

import { Box, Typography, TextField, Button, Modal } from "@mui/material";

const ModalFormCategoria = ({ open, handleClose, formData, handleChange, handleSubmit, errorNombre, errorDescripcion }) => {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            onClose={handleClose}
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
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    {formData && formData.idCategoria ? 'Editar Categoría' : 'Cargar Categoría'}
                </Typography>
                <Box mt={2} component="form">
                    <Box>
                        <TextField
                            sx={{ mb: 2, width: { xs: '90%', sm: '75%', md: '500px' } }}
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            error={errorNombre}
                            helperText={errorNombre && "El nombre es obligatorio."}
                        />
                        <TextField
                            sx={{ mb: 2, width: { xs: '90%', sm: '75%', md: '500px' } }}
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            error={errorDescripcion}
                            helperText={errorDescripcion && "La descripción es obligatoria."}
                            margin="normal"
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button sx={{ mt: 1, mr: 2, width: '120px' }} size="large" variant="outlined" color= "primary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button size="large" sx={{ mt: 1, width: '120px' }} variant="contained" color="primary" onClick={handleSubmit}>
                            {formData && formData.idCategoria ? 'Actualizar' : 'Cargar'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalFormCategoria;
