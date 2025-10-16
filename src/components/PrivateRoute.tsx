/**
 * COMPONENTE DE PROTECCIÓN DE RUTAS
 * 
 * Protege rutas privadas verificando autenticación
 * Redirige al login si el usuario no está autenticado
 */

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el componente hijo
  return <>{children}</>;
};

export default PrivateRoute;
