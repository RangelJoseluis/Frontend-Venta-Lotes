import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NuevoLote from './pages/NuevoLote';
import FormularioCrearVenta from './pages/FormularioCrearVenta';
import RegistrarPago from './pages/RegistrarPago';
import GestionDeUsuariosCliente from './pages/GestionDeUsuariosCliente';
import Reportes from './pages/Reportes';
import PrivateRoute from './components/PrivateRoute';
import { useAuthStore } from './store/authStore';

/**
 * COMPONENTE PRINCIPAL DE LA APLICACIÓN
 * 
 * Configura React Router con:
 * - Rutas públicas (Login)
 * - Rutas protegidas (Dashboard, etc.)
 * - Redirección automática según autenticación
 */

function App() {
  const { checkAuth } = useAuthStore();

  /**
   * Verificar autenticación al cargar la app
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz - Redirige según autenticación */}
        <Route 
          path="/" 
          element={
            <Navigate to="/dashboard" replace />
          } 
        />

        {/* Ruta pública - Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/lotes/nuevo"
          element={
            <PrivateRoute>
              <NuevoLote />
            </PrivateRoute>
          }
        />

        <Route
          path="/crear-venta"
          element={
            <PrivateRoute>
              <FormularioCrearVenta />
            </PrivateRoute>
          }
        />

        <Route
          path="/registrar-pago"
          element={
            <PrivateRoute>
              <RegistrarPago />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <GestionDeUsuariosCliente />
            </PrivateRoute>
          }
        />

        <Route
          path="/reportes"
          element={
            <PrivateRoute>
              <Reportes />
            </PrivateRoute>
          }
        />

        {/* Ruta 404 - Redirige al dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
