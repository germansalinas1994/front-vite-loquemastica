import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Layout from './layout/Layout'
import { CarritoProvider } from './components/Cart/CarritoProvider'
import { AuthProvider } from './components/User/AuthContext'
import { SucursalProvider } from './components/User/SucursalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the entire application with Auth0Provider */}
    <Auth0Provider
      domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      {/* Wrap the application with AuthProvider */}
      <AuthProvider>
        {/* Wrap the application with BrowserRouter for React routing */}
        <BrowserRouter>
          {/* Wrap the application with CarritoProvider to use the carrito in the entire app */}
          <CarritoProvider>
            {/* Wrap the application with SucursalProvider
            to use SucursalContext in the entire app */}
            <SucursalProvider>
              {/* Wrap the application with Layout component */}
              <Layout>
                {/* The App component that uses the carrito */}
                <App />
              </Layout>
            </SucursalProvider>
          </CarritoProvider>
        </BrowserRouter>
      </AuthProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
