import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import GestionLotes from './pages/GestionLotes';
import NuevoLote from './pages/NuevoLote';
import EditarLote from './pages/EditarLote';
import DetalleLote from './pages/DetalleLote';
import { GestionVentas, FormularioCrearVenta } from './pages/Ventas';
import RegistrarPago from './pages/RegistroPagos';
import GestionDeUsuariosCliente from './pages/GestionDeUsuariosCliente';
import Reportes from './pages/Reportes';
import ModelosCasa from './pages/ModelosCasa';
import MapaLotes from './pages/MapaLotes';
import ConfiguracionesLayout from './pages/Configuraciones/ConfiguracionesLayout';
import { ConfiguracionZona, ConfiguracionMora, ConfiguracionSistema } from './pages/Configuraciones/index';
import GestionServicios from './pages/GestionServicios/GestionServicios';
import GestionPagos from './pages/GestionPagos/GestionPagos';
import GestionMora from './pages/GestionMora';
import ReportesMora from './pages/ReportesMora';
import Perfil from './pages/Perfil/Perfil';
import PortalCliente from './pages/PortalCliente';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import RoleBasedRedirect from './components/RoleBasedRedirect';
import { useAuthStore } from './store/authStore';
import MainLayout from './components/Layout/MainLayout';

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
        {/* Ruta raíz - Redirige según rol del usuario */}
        <Route path="/" element={<RoleBasedRedirect />} />

        {/* Ruta pública - Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta del Portal Cliente (sin MainLayout) */}
        <Route
          path="/portal-cliente"
          element={
            <PrivateRoute>
              <PortalCliente />
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas con Layout (Solo Admin) */}
        <Route
          element={
            <AdminRoute>
              <MainLayout />
            </AdminRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lotes" element={<GestionLotes />} />
          <Route path="/lotes/nuevo" element={<NuevoLote />} />
          <Route path="/lotes/:uid/editar" element={<EditarLote />} />
          <Route path="/lotes/:uid" element={<DetalleLote />} />
          <Route path="/ventas/crear" element={<FormularioCrearVenta />} />
          <Route path="/registrar-pago" element={<RegistrarPago />} />
          <Route path="/clientes" element={<GestionDeUsuariosCliente />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/modelos-casa" element={<ModelosCasa />} />
          <Route path="/mapa" element={<MapaLotes />} />
          <Route path="/servicios" element={<GestionServicios />} />
          <Route path="/ventas" element={<GestionVentas />} />
          <Route path="/pagos" element={<GestionPagos />} />
          <Route path="/gestion-mora" element={<GestionMora />} />
          <Route path="/reportes-mora" element={<ReportesMora />} />
          <Route path="/perfil" element={<Perfil />} />

          {/* Configuraciones con Sidebar Interno */}
          <Route path="/configuraciones" element={<ConfiguracionesLayout />}>
            <Route index element={<ConfiguracionZona />} />
            <Route path="zona" element={<ConfiguracionZona />} />
            <Route path="mora" element={<ConfiguracionMora />} />
            <Route path="negocio" element={<ConfiguracionSistema />} />
          </Route>
        </Route>

        {/* Ruta 404 - Redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
