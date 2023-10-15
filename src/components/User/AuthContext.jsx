import { createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from '../../components/LoadingModal';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  //ESTE ESTADO PERMITE SABER SI SE OBTUVO EL TOKEN Y EL ROL, INICIALMENTE ESTA EN FALSE, 
  // porque fallaba el ruteo sino, primero renderizaba el ruteo y luego obtenia el token y el rol,deberia ser al reves
  const [initializationDone, setInitializationDone] = useState(false); // Nuevo estado
  const { isAuthenticated, getIdTokenClaims, isLoading } = useAuth0(); 
  const { showLoadingModal, hideLoadingModal } = LoadingModal();

  const fetchTokenAndRole = async () => {
    if (!isLoading && isAuthenticated) { 
      try {
        // Obtener el token y el rol del usuario una vez que se autentica y no está cargando
        const tokenClaims = await getIdTokenClaims();
        setUserToken(tokenClaims.__raw);
        setUserRole(tokenClaims.rol_usuario);
      } catch (error) {
        console.error("Error al obtener el token y el rol:", error);
      } finally {
        // una vez que se obtiene el token y el rol, se setea el estado en true
        setInitializationDone(true); // Establecer cuando todo esté listo
      }
    } else if (!isLoading && !isAuthenticated) {
      //si no se logro la autenticacion y no esta cargando, se setea el estado en true para que pueda ir a la ruta invalida
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
