import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GestionLotes from './pages/GestionLotes';
import NuevoLote from './pages/NuevoLote';
import EditarLote from './pages/EditarLote';
import DetalleLote from './pages/DetalleLote';
import FormularioCrearVenta from './pages/FormularioCrearVenta';
import RegistrarPago from './pages/RegistrarPago';
import GestionDeUsuariosCliente from './pages/GestionDeUsuariosCliente';
import Reportes from './pages/Reportes';
import ModelosCasa from './pages/ModelosCasa';
import MapaLotes from './pages/MapaLotes';
import Configuraciones from './pages/Configuraciones';
import GestionServicios from './pages/GestionServicios';
import FormularioServicio from './pages/FormularioServicio';
import GestionVentas from './pages/GestionVentas';
import GestionPagos from './pages/GestionPagos';
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
          path="/lotes"
          element={
            <PrivateRoute>
              <GestionLotes />
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
          path="/lotes/:uid/editar"
          element={
            <PrivateRoute>
              <EditarLote />
            </PrivateRoute>
          }
        />

        <Route
          path="/lotes/:uid"
          element={
            <PrivateRoute>
              <DetalleLote />
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

        <Route
          path="/modelos-casa"
          element={
            <PrivateRoute>
              <ModelosCasa />
            </PrivateRoute>
          }
        />

        <Route
          path="/mapa"
          element={
            <PrivateRoute>
              <MapaLotes />
            </PrivateRoute>
          }
        />

        {/* CRUD de Servicios */}
        <Route
          path="/servicios"
          element={
            <PrivateRoute>
              <GestionServicios />
            </PrivateRoute>
          }
        />

        <Route
          path="/servicios/nuevo"
          element={
            <PrivateRoute>
              <FormularioServicio />
            </PrivateRoute>
          }
        />

        <Route
          path="/servicios/:uid/editar"
          element={
            <PrivateRoute>
              <FormularioServicio />
            </PrivateRoute>
          }
        />

        {/* CRUD de Ventas */}
        <Route
          path="/ventas"
          element={
            <PrivateRoute>
              <GestionVentas />
            </PrivateRoute>
          }
        />

        {/* CRUD de Pagos */}
        <Route
          path="/pagos"
          element={
            <PrivateRoute>
              <GestionPagos />
            </PrivateRoute>
          }
        />

        <Route
          path="/configuraciones"
          element={
            <PrivateRoute>
              <Configuraciones />
            </PrivateRoute>
          }
        />

        {/* Ruta 404 - Redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
