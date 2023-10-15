import { useContext } from 'react';
import { AuthContext } from '../components/User/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roleRequired, children }) => {
  const { role, loading, initializationDone } = useContext(AuthContext);

  // Si la inicialización no ha terminado, no hagas nada.
  if (!initializationDone) return null; // Si la inicialización no ha terminado, no hagas nada.

  if (loading) return null;

  if (role && role.includes(roleRequired)) {
      return children;
  } else {
      return <Navigate to="/acceso_denegado" />;
  }
};

export default ProtectedRoute;
