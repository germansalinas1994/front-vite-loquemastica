// CategoriaContext.js
import React, { createContext, useEffect, useState } from 'react';

export const CategoriaContext = createContext();

export const CategoriaProvider = ({ children }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    

  return (
    <CategoriaContext.Provider value={{ categoriaSeleccionada, setCategoriaSeleccionada }}>
      {children}
    </CategoriaContext.Provider>
  );
};
