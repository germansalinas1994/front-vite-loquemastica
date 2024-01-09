import React from 'react';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

const SearchBar = ({ handleInputChange, inputValue, limpiarFiltro }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%',mt:2 }}>
        <TextField
          fullWidth
          sx={{
            // Establece el ancho máximo para diferentes tamaños de pantalla
            width: { xs: '100%', sm: '80%', md: '60%', lg: '50%', xl: '50%' },
          }}
          label="Producto"
          placeholder='Ingrese el nombre del producto, descripción, categoría, marca'
          value={inputValue}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" color='primary' onClick={limpiarFiltro} sx={{ml:2, height:40}}>
          <Typography sx={{ fontSize: 14, color: 'white', textTransform: 'none' }}>
            Limpiar filtros

          </Typography>
        </Button>


      </Box>



    </>

  );
};

export default SearchBar;
