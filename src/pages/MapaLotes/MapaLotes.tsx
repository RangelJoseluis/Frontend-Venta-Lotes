/**
 * COMPONENTE: MAPA DE LOTES (MODULAR)
 * 
 * Mapa interactivo que muestra los lotes disponibles según el rol del usuario.
 * Usa React-Leaflet para renderizar el mapa y los marcadores.
 * 
 * ESTRUCTURA MODULAR:
 * - Componentes extraídos a su propia carpeta
 * - Utilidades separadas en /utils
 * - Tipos definidos en types.ts
 */

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import lotesMapaService from '../../services/lotes-mapa.service';
import { obtenerClientes } from '../../services/clientes.service';
import type { LoteParaMapa, RolMapa, TipoCapaMapa } from '../../types/mapa';
import type { Cliente } from '../../types';
import { TILES_CONFIG } from '../../types/mapa';
import { useAuthStore } from '../../store/authStore';
import { obtenerCentroZona, obtenerZoomZona } from '../../config/zona.config';
import { crearIconoLote } from './utils/iconHelpers';
import { getEstiloPoligono, formatearPrecio } from './utils/formatters';
import type { FiltrosState } from './types';

// Componentes modulares
import ZoomController from './components/ZoomController/ZoomController';
import MapHeader from './components/MapHeader/MapHeader';
import FilterPanel from './components/FilterPanel/FilterPanel';
import LoteDetailsPanel from './components/LoteDetailsPanel/LoteDetailsPanel';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';
import LoteMarker from './components/LoteMarker/LoteMarker';
import MapStats from './components/MapStats/MapStats';

// Estilos
import 'leaflet/dist/leaflet.css';
import './MapaLotes.css';

/**
 * Componente principal del mapa de lotes
 */
const MapaLotes = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [lotes, setLotes] = useState<LoteParaMapa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tipoCapa, setTipoCapa] = useState<TipoCapaMapa>('satelite');
  
  // Estado de filtros
  const [filtros, setFiltros] = useState<FiltrosState>({
    busqueda: '',
    busquedaCliente: '',
    precioMin: 0,
    precioMax: 100000000,
    superficieMin: 0,
    superficieMax: 10000,
    estados: {
      disponible: true,
      en_cuotas: true,
      vendido: true
    }
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [loteSeleccionado, setLoteSeleccionado] = useState<LoteParaMapa | null>(null);
  
  // Estado para clientes y react-select
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<{ value: string; label: string } | null>(null);
  const [cargandoClientes, setCargandoClientes] = useState(false);

  /**
   * Detectar rol del usuario
   */
  const detectarRol = (): RolMapa => {
    let usuarioActual = user;
    
    if (isAuthenticated && !user) {
      console.log('⚠️ isAuthenticated=true pero user=null, leyendo de localStorage...');
      try {
        const userStr = localStorage.getItem('user');
        if (userStr && userStr !== 'undefined' && userStr !== 'null' && userStr.trim() !== '') {
          usuarioActual = JSON.parse(userStr);
          console.log('✅ Usuario recuperado de localStorage:', usuarioActual);
        } else {
          console.warn('⚠️ localStorage.user está corrupto:', userStr);
        }
      } catch (error) {
        console.error('❌ Error al leer usuario de localStorage:', error);
      }
    }
    
    console.log('🔍 Detectando rol:', { isAuthenticated, user: usuarioActual, roles: usuarioActual?.roles });
    
    if (!isAuthenticated || !usuarioActual) {
      return 'invitado';
    }
    
    if (usuarioActual.roles?.includes('admin')) {
      return 'admin';
    }
    
    if (usuarioActual.roles?.includes('cliente')) {
      return 'cliente';
    }
    
    return 'invitado';
  };
  
  const rol = detectarRol();

  // Verificar y recargar usuario si está autenticado pero user es null
  useEffect(() => {
    if (isAuthenticated && !user) {
      console.log('⚠️ Usuario autenticado pero user es null, recargando...');
      const { checkAuth } = useAuthStore.getState();
      checkAuth();
    }
  }, [isAuthenticated, user]);

  // Cargar lotes al montar el componente
  useEffect(() => {
    cargarLotes();
  }, [rol]);

  // Cargar clientes si es admin
  useEffect(() => {
    if (rol === 'admin') {
      cargarClientes();
    }
  }, [rol]);

  /**
   * Cargar lista de clientes
   */
  const cargarClientes = async () => {
    try {
      setCargandoClientes(true);
      const clientesData = await obtenerClientes();
      setClientes(clientesData);
      console.log(`✅ ${clientesData.length} clientes cargados`);
    } catch (err: any) {
      console.error('❌ Error al cargar clientes:', err);
    } finally {
      setCargandoClientes(false);
    }
  };

  /**
   * Cargar lotes desde el backend según el rol
   */
  const cargarLotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const lotesData = await lotesMapaService.obtenerLotesVisibles(rol);
      setLotes(lotesData);
      console.log(`✅ ${lotesData.length} lotes cargados para rol: ${rol}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los lotes');
      console.error('❌ Error al cargar lotes:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filtrar lotes según los criterios activos
   */
  const lotesFiltrados = lotes.filter(lote => {
    // Filtro por búsqueda (código)
    if (filtros.busqueda && !lote.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase())) {
      return false;
    }

    // Filtro por precio
    if (lote.precio < filtros.precioMin || lote.precio > filtros.precioMax) {
      return false;
    }

    // Filtro por superficie
    if (lote.superficie < filtros.superficieMin || lote.superficie > filtros.superficieMax) {
      return false;
    }

    // Filtro por estado (solo si el usuario puede ver ese estado)
    if (rol === 'admin' && !filtros.estados[lote.estado as keyof typeof filtros.estados]) {
      return false;
    }

    return true;
  });

  /**
   * Limpiar todos los filtros
   */
  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      busquedaCliente: '',
      precioMin: 0,
      precioMax: 100000000,
      superficieMin: 0,
      superficieMax: 10000,
      estados: {
        disponible: true,
        en_cuotas: true,
        vendido: true
      }
    });
  };

  /**
   * Handler para cambio de cliente seleccionado
   */
  const handleClienteChange = (selected: { value: string; label: string } | null) => {
    setClienteSeleccionado(selected);
    if (selected) {
      setFiltros({ ...filtros, busquedaCliente: selected.label });
    } else {
      setFiltros({ ...filtros, busquedaCliente: '' });
    }
  };

  return (
    <div className="mapalotes-container">
      {/* Header del mapa */}
      <MapHeader
        rol={rol}
        tipoCapa={tipoCapa}
        setTipoCapa={setTipoCapa}
        clienteSeleccionado={clienteSeleccionado}
        setClienteSeleccionado={handleClienteChange}
        clientes={clientes}
        cargandoClientes={cargandoClientes}
        lotesFiltrados={lotesFiltrados}
        mostrarFiltros={mostrarFiltros}
        setMostrarFiltros={setMostrarFiltros}
        onVolverDashboard={() => navigate('/dashboard')}
      />

      {/* Panel de Filtros */}
      <FilterPanel
        mostrarFiltros={mostrarFiltros}
        setMostrarFiltros={setMostrarFiltros}
        filtros={filtros}
        setFiltros={setFiltros}
        limpiarFiltros={limpiarFiltros}
        lotesFiltrados={lotesFiltrados}
        lotes={lotes}
        rol={rol}
      />

      {/* Panel de Detalles del Lote */}
      <LoteDetailsPanel
        loteSeleccionado={loteSeleccionado}
        setLoteSeleccionado={setLoteSeleccionado}
        rol={rol}
        onNavigate={(path) => navigate(path)}
      />

      {/* Error Alert */}
      {error && (
        <ErrorAlert error={error} onReintentar={cargarLotes} />
      )}

      {/* Loading State */}
      {loading && <LoadingOverlay />}

      {/* Mapa */}
      {!loading && !error && (
        <MapContainer
          center={obtenerCentroZona()}
          zoom={obtenerZoomZona()}
          style={{ height: '100%', width: '100%' }}
          className="leaflet-map"
        >
          <TileLayer
            key={tipoCapa}
            url={TILES_CONFIG[tipoCapa].url}
            attribution={TILES_CONFIG[tipoCapa].atribucion}
            maxZoom={22}
          />

          {/* Componente de zoom automático al cliente */}
          <ZoomController clienteSeleccionado={clienteSeleccionado} lotes={lotes} />

          {/* Renderizar lotes filtrados */}
          {lotesFiltrados.map((lote) => (
            <LoteMarker
              key={lote.uid}
              lote={lote}
              onSelectLote={setLoteSeleccionado}
              crearIconoLote={crearIconoLote}
              getEstiloPoligono={getEstiloPoligono}
              formatearPrecio={formatearPrecio}
            />
          ))}
        </MapContainer>
      )}

      {/* Stats */}
      <MapStats lotes={lotes} />
    </div>
  );
};

export default MapaLotes;
