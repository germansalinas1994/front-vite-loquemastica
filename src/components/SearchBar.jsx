import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ handleInputChange, inputValue }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        fullWidth
        sx={{
          // Establece el ancho máximo para diferentes tamaños de pantalla
          width: { xs: '100%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
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
    </Box>
  );
};

export default SearchBar;
