import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from '../../components/LoadingModal';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userImage, setUserImage] = useState(null); // Nuevo estado para almacenar la imagen del usuario
  


  const apiLocalKey = import.meta.env.VITE_APP_API_KEY;
  const rol_admin = import.meta.env.VITE_APP_ROLE_ADMIN;
  const rol_sucursal = import.meta.env.VITE_APP_ROLE_SUCURSAL;
  const url_app = import.meta.env.VITE_APP_URL_APP;

  //ESTE ESTADO PERMITE SABER SI SE OBTUVO EL TOKEN Y EL ROL, INICIALMENTE ESTA EN FALSE, 
  // porque fallaba el ruteo sino, primero renderizaba el ruteo y luego obtenia el token y el rol,deberia ser al reves
  const [initializationDone, setInitializationDone] = useState(false); // Nuevo estado
  const { isAuthenticated, getIdTokenClaims, isLoading, user } = useAuth0();
  const { showLoadingModal, hideLoadingModal } = LoadingModal();


  const fetchTokenAndRole = async () => {

    if (!isLoading && isAuthenticated) {
      try {
        showLoadingModal();
        // Obtener el token y el rol del usuario una vez que se autentica y no está cargando
        const tokenClaims = await getIdTokenClaims();

        if (tokenClaims.rol_usuario.length == 0) {
          window.location.reload();
        }


        debugger;

        if(tokenClaims.rol_usuario[0] ==  rol_admin || tokenClaims.rol_usuario[0] == rol_sucursal)
        {
          //redirecciono a la pagina de sucursal y admin 
          window.location.href = url_app;
        }

        
        //guardo el token en una cookie
        setUserToken(tokenClaims.__raw);
        //guardo el token en el local storage
        localStorage.setItem('token', tokenClaims.__raw);
        setUserRole(tokenClaims.rol_usuario);
        setUserImage(tokenClaims.picture); // Nuevo estado para almacenar la imagen del usuario



        //voy a llamar a la api para guardar el usuario en la base de datos

        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const response = await axios.post(apiLocalKey + '/cargarUsuario', { nombreUsuario: user.name, email: user.email, imagenUsuario: user.picture },
          {
            headers: headers,
          });



      }
      catch (error) {
        console.error("Error al obtener el token y el rol:", error);
      } finally {
        // una vez que se obtiene el token y el rol, se setea el estado en true
        setInitializationDone(true); // Establecer cuando todo esté listo
      }
    } else if (!isLoading && !isAuthenticated) {
      //si no se logro la autenticacion y no esta cargando, se setea el estado en true para que pueda ir a la ruta invalida
      //elimino el token del local storage
      localStorage.removeItem('token');
      localStorage.setItem('sucursalSeleccionada', 1)
      //borro el carrito del local storage
      localStorage.removeItem('carrito');
      hideLoadingModal();
      setInitializationDone(true); // Establecer si no está autenticado
    }
  };

  useEffect(() => {
    if (isLoading) {
      showLoadingModal();
    } else {
      hideLoadingModal();
      fetchTokenAndRole();
    }
  }, [isAuthenticated, getIdTokenClaims, isLoading]);

  return (
    <AuthContext.Provider value={{ token: userToken, role: userRole, loading: isLoading, initializationDone }}>
      {children}
    </AuthContext.Provider>
  );
};
