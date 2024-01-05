import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from "react-router-dom";
import Layout from './layout/Layout.jsx';
//importo el provider del carrito, para que este disponible en toda la app
import { CarritoProvider } from './components/Cart/CarritoProvider.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './components/User/AuthContext';
import { SucursalProvider } from './components/User/SucursalContext';
import { CategoriaProvider } from './components/CategoriaContext.jsx';

import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <AuthProvider>

        {/* Para usar el ruteo de React, debemos envolver nuestra aplicación con el componente BrowserRouter, que es el que nos permite usar el hook useHistory */}
        <BrowserRouter>
          {/* para usar el carrito en toda la app, envuelvo la app con el provider del carrito */}
          {/* con esto ya puedo usar el carrito en toda la app */}

          <CarritoProvider>
            <SucursalProvider>
              {/* para usar el layout en toda la app, envuelvo la app con el layout */}

              <CategoriaProvider>

                <Layout>
                  {/* esta es la app que se renderiza en el layout y usa el carrito */}
                  <App />

                </Layout>
              </CategoriaProvider>
            </SucursalProvider>
          </CarritoProvider>


        </BrowserRouter>
      </AuthProvider>
    </Auth0Provider>

  </React.StrictMode>
)
