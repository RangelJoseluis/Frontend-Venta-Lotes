import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

/**
 * Componente de redirección basado en roles
 * Redirige al dashboard apropiado según el rol del usuario
 */
const RoleBasedRedirect = () => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Verificar si el usuario tiene rol de admin
    const isAdmin = user?.roles?.includes('admin');

    // Redirigir según el rol
    if (isAdmin) {
        return <Navigate to="/dashboard" replace />;
    } else {
        return <Navigate to="/portal-cliente" replace />;
    }
};

export default RoleBasedRedirect;
