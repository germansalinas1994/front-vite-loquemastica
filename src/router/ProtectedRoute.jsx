import { useContext } from 'react';
import { AuthContext } from '../components/User/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ rolesRequired, children }) => {
  const { role, loading, initializationDone } = useContext(AuthContext);

  // Si la inicialización no ha terminado, no hagas nada.
  if (!initializationDone) return null; // Si la inicialización no ha terminado, no hagas nada.

  if (loading) return null;

  if (role && rolesRequired.some(requiredRole => role.includes(requiredRole))) {
    return children;
  } else {
      return <Navigate to="/acceso_denegado" />;
  }
};

export default ProtectedRoute;



