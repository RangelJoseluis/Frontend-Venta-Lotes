import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AdminRouteProps {
    children: React.ReactNode;
}

/**
 * Componente de protección de rutas de administrador
 * Solo permite el acceso a usuarios con rol 'admin'
 * Redirige a clientes al portal-cliente
 */
const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        // Si no está autenticado, redirigir al login
        return <Navigate to="/login" replace />;
    }

    // Verificar si el usuario tiene rol de admin
    const isAdmin = user?.roles?.includes('admin');

    if (!isAdmin) {
        // Si es cliente, redirigir al portal cliente
        return <Navigate to="/portal-cliente" replace />;
    }

    // Si es admin, mostrar el contenido
    return <>{children}</>;
};

export default AdminRoute;
