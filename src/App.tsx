import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GestionLotes from './pages/GestionLotes';
import NuevoLote from './pages/NuevoLote';
import EditarLote from './pages/EditarLote';
import DetalleLote from './pages/DetalleLote';
import FormularioCrearVenta from './pages/FormularioCrearVenta';
import RegistrarPago from './pages/RegistroPagos';
import GestionDeUsuariosCliente from './pages/GestionDeUsuariosCliente/';
import Reportes from './pages/Reportes';
import ModelosCasa from './pages/ModelosCasa';
import MapaLotes from './pages/MapaLotes/MapaLotes';
import ConfiguracionesLayout from './pages/ConfiguracionesLayout';
import ConfiguracionZona from './pages/ConfiguracionZona';
import ConfiguracionMora from './pages/ConfiguracionMora';
import ConfiguracionSistema from './pages/ConfiguracionSistema';
import GestionServicios from './pages/GestionServicios';
import FormularioServicio from './pages/FormularioServicio';
import GestionVentas from './pages/GestionVentas';
import GestionPagos from './pages/GestionPagos';
import GestionMora from './pages/GestionMora';
import ReportesMora from './pages/ReportesMora';
import Perfil from './pages/Perfil/Perfil';
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

        {/* Gestión de Mora */}
        <Route
          path="/gestion-mora"
          element={
            <PrivateRoute>
              <GestionMora />
            </PrivateRoute>
          }
        />

        {/* Reportes de Mora */}
        <Route
          path="/reportes-mora"
          element={
            <PrivateRoute>
              <ReportesMora />
            </PrivateRoute>
          }
        />

        {/* Perfil de Usuario */}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        {/* Configuraciones con Sidebar Interno */}
        <Route
          path="/configuraciones"
          element={
            <PrivateRoute>
              <ConfiguracionesLayout />
            </PrivateRoute>
          }
        >
          {/* Rutas Anidadas de Configuración */}
          <Route index element={<ConfiguracionZona />} />
          <Route path="zona" element={<ConfiguracionZona />} />
          <Route path="mora" element={<ConfiguracionMora />} />
          <Route path="negocio" element={<ConfiguracionSistema />} />
        </Route>

        {/* Ruta 404 - Redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
