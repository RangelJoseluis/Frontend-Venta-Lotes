/**
 * COMPONENTE: MAPA DE LOTES
 * 
 * Mapa interactivo que muestra los lotes disponibles según el rol del usuario.
 * Usa React-Leaflet para renderizar el mapa y los marcadores.
 */

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, DollarSign, Maximize2, Map, Satellite, Layers as LayersIcon, Filter, X, Search, Edit } from 'lucide-react';
import lotesMapaService from '../services/lotes-mapa.service';
import type { LoteParaMapa, RolMapa, TipoCapaMapa } from '../types/mapa';
import { COLORES_MAPA, TILES_CONFIG } from '../types/mapa';
import { useAuthStore } from '../store/authStore';
import { obtenerCentroZona, obtenerZoomZona } from '../config/zona.config';
import 'leaflet/dist/leaflet.css';
import './MapaLotes.css';
import './MapaLotes-filtros.css';
import './MapaLotes-detalles.css';

/**
 * Componente principal del mapa de lotes
 */
const MapaLotes = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [lotes, setLotes] = useState<LoteParaMapa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tipoCapa, setTipoCapa] = useState<TipoCapaMapa>('satelite'); // Vista satelital por defecto
  
  // Estado de filtros
  const [filtros, setFiltros] = useState({
    busqueda: '',
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

  /**
   * Detectar rol del usuario
   * - invitado: No autenticado o sin roles
   * - cliente: Tiene rol 'cliente'
   * - admin: Tiene rol 'admin'
   */
  const detectarRol = (): RolMapa => {
    // Fallback: Si authStore tiene problemas, leer directamente de localStorage
    let usuarioActual = user;
    
    if (isAuthenticated && !user) {
      console.log('⚠️ isAuthenticated=true pero user=null, leyendo de localStorage...');
      try {
        const userStr = localStorage.getItem('user');
        // Verificar que no sea null, undefined (string), o vacío
        if (userStr && userStr !== 'undefined' && userStr !== 'null' && userStr.trim() !== '') {
          usuarioActual = JSON.parse(userStr);
          console.log('✅ Usuario recuperado de localStorage:', usuarioActual);
        } else {
          console.warn('⚠️ localStorage.user está corrupto:', userStr);
          console.warn('💡 Solución: Cierra sesión y vuelve a iniciar sesión');
        }
      } catch (error) {
        console.error('❌ Error al leer usuario de localStorage:', error);
        console.warn('💡 Solución: Cierra sesión y vuelve a iniciar sesión');
      }
    }
    
    console.log('🔍 Detectando rol:', {
      isAuthenticated,
      user: usuarioActual,
      roles: usuarioActual?.roles
    });
    
    if (!isAuthenticated || !usuarioActual) {
      console.log('❌ No autenticado o sin usuario');
      return 'invitado';
    }
    
    if (usuarioActual.roles?.includes('admin')) {
      console.log('✅ Rol detectado: admin');
      return 'admin';
    }
    
    if (usuarioActual.roles?.includes('cliente')) {
      console.log('✅ Rol detectado: cliente');
      return 'cliente';
    }
    
    console.log('⚠️ Usuario autenticado pero sin rol reconocido, roles:', usuarioActual.roles);
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
   * Crear icono personalizado según el estado del lote
   */
  const crearIconoLote = (estado: string, esDelCliente: boolean = false) => {
    // Si es el lote del cliente, usar icono dorado especial
    if (esDelCliente) {
      return new Icon({
        iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path d="M18 0C9.716 0 3 6.716 3 15c0 8.284 15 33 15 33s15-24.716 15-33C33 6.716 26.284 0 18 0z" 
                  fill="url(#goldGradient)" stroke="#d97706" stroke-width="2"/>
            <circle cx="18" cy="15" r="7" fill="white"/>
            <text x="18" y="19" font-size="12" text-anchor="middle" fill="#f59e0b">⭐</text>
          </svg>
        `)}`,
        iconSize: [36, 48],
        iconAnchor: [18, 48],
        popupAnchor: [0, -48]
      });
    }

    // Icono normal según estado
    const color = COLORES_MAPA[estado as keyof typeof COLORES_MAPA] || '#6b7280';

    return new Icon({
      iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 30 42">
          <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 27 15 27s15-18.716 15-27C30 6.716 23.284 0 15 0z" 
                fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="15" cy="15" r="6" fill="white"/>
        </svg>
      `)}`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -42]
    });
  };

  /**
   * Formatear precio
   */
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  /**
   * Parsear GeoJSON y extraer coordenadas
   * Soporta Point y Polygon
   */
  const parsearGeoJSON = (geojsonStr: string) => {
    try {
      const geojson = JSON.parse(geojsonStr);
      
      if (geojson.type === 'Point') {
        // Formato Point: {"type":"Point","coordinates":[-72.222,11.376]}
        const [longitud, latitud] = geojson.coordinates;
        return {
          tipo: 'point' as const,
          centro: { latitud, longitud },
          coordenadas: [[latitud, longitud]]
        };
      } else if (geojson.type === 'Polygon') {
        // Formato Polygon: {"type":"Polygon","coordinates":[[[lng,lat],[lng,lat],...]]}
        const coords = geojson.coordinates[0].map(([lng, lat]: [number, number]) => [lat, lng]);
        
        // Calcular centro del polígono (promedio de coordenadas)
        const sumLat = coords.reduce((sum: number, [lat]: [number, number]) => sum + lat, 0);
        const sumLng = coords.reduce((sum: number, [, lng]: [number, number]) => sum + lng, 0);
        const centro = {
          latitud: sumLat / coords.length,
          longitud: sumLng / coords.length
        };
        
        return {
          tipo: 'polygon' as const,
          centro,
          coordenadas: coords
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error al parsear GeoJSON:', error);
      return null;
    }
  };

  /**
   * Obtener estilo del polígono según estado
   */
  const getEstiloPoligono = (estado: string) => {
    const color = COLORES_MAPA[estado as keyof typeof COLORES_MAPA] || '#6b7280';
    
    return {
      color: color,
      fillColor: color,
      fillOpacity: 0.3,
      weight: 3,
      opacity: 0.8
    };
  };

  return (
    <div className="mapa-container">
      {/* Header */}
      <div className="mapa-header">
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          <ArrowLeft />
          <span>Volver al Dashboard</span>
        </button>

        <div className="mapa-title">
          <MapPin />
          <h1>Mapa de Lotes</h1>
          <span className={`badge-rol badge-rol-${rol}`}>
            {rol === 'admin' ? '👑 Admin' : rol === 'cliente' ? '👤 Cliente' : '🌐 Invitado'}
          </span>
        </div>

        {/* Selector de Capas */}
        <div className="selector-capas">
          <button
            className={`btn-capa ${tipoCapa === 'mapa' ? 'active' : ''}`}
            onClick={() => setTipoCapa('mapa')}
            title="Vista de Mapa"
          >
            <Map size={18} />
            <span>Mapa</span>
          </button>
          <button
            className={`btn-capa ${tipoCapa === 'satelite' ? 'active' : ''}`}
            onClick={() => setTipoCapa('satelite')}
            title="Vista Satelital"
          >
            <Satellite size={18} />
            <span>Satélite</span>
          </button>
          <button
            className={`btn-capa ${tipoCapa === 'hibrido' ? 'active' : ''}`}
            onClick={() => setTipoCapa('hibrido')}
            title="Vista Híbrida"
          >
            <LayersIcon size={18} />
            <span>Híbrido</span>
          </button>
        </div>

        {/* Leyenda Dinámica */}
        <div className="mapa-leyenda">
          {/* Disponible - Visible para todos */}
          <div className="leyenda-item">
            <span className="leyenda-color" style={{ backgroundColor: COLORES_MAPA.disponible }}></span>
            <span>Disponible ({lotesFiltrados.filter(l => l.estado === 'disponible').length})</span>
          </div>
          
          {/* En Cuotas - Solo admin y cliente (su lote) */}
          {(rol === 'admin' || rol === 'cliente') && (
            <div className="leyenda-item">
              <span className="leyenda-color" style={{ backgroundColor: COLORES_MAPA.en_cuotas }}></span>
              <span>En Cuotas ({lotesFiltrados.filter(l => l.estado === 'en_cuotas').length})</span>
            </div>
          )}
          
          {/* Vendido - Solo admin */}
          {rol === 'admin' && (
            <div className="leyenda-item">
              <span className="leyenda-color" style={{ backgroundColor: COLORES_MAPA.vendido }}></span>
              <span>Vendido ({lotesFiltrados.filter(l => l.estado === 'vendido').length})</span>
            </div>
          )}
          
          {/* Indicador especial para clientes */}
          {rol === 'cliente' && (
            <div className="leyenda-item leyenda-item-destacado">
              <span className="leyenda-color" style={{ backgroundColor: '#f59e0b' }}>⭐</span>
              <span>Mi Lote</span>
            </div>
          )}
        </div>

        {/* Botón de Filtros */}
        <button
          className={`btn-filtros ${mostrarFiltros ? 'active' : ''}`}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          title="Mostrar/Ocultar Filtros"
        >
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </div>

      {/* Panel de Filtros Lateral */}
      {mostrarFiltros && (
        <div className="panel-filtros-overlay" onClick={() => setMostrarFiltros(false)}>
          <div className="panel-filtros" onClick={(e) => e.stopPropagation()}>
            <div className="filtros-header">
              <h3><Filter size={16} /> Filtros</h3>
              <button onClick={() => setMostrarFiltros(false)} className="btn-cerrar-panel">
                <X size={18} />
              </button>
            </div>

            <div className="filtros-content">
              {/* Búsqueda */}
              <div className="filtro-grupo">
                <label><Search size={14} /> Buscar por código</label>
                <input
                  type="text"
                  placeholder="Ej: L001..."
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
                  className="input-busqueda"
                />
              </div>

              {/* Precio */}
              <div className="filtro-grupo">
                <label><DollarSign size={14} /> Precio</label>
                <div className="rango-valores">
                  <span>${(filtros.precioMin / 1000000).toFixed(1)}M</span>
                  <span>${(filtros.precioMax / 1000000).toFixed(1)}M</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000000"
                  step="1000000"
                  value={filtros.precioMin}
                  onChange={(e) => setFiltros({ ...filtros, precioMin: Number(e.target.value) })}
                  className="slider"
                />
                <input
                  type="range"
                  min="0"
                  max="100000000"
                  step="1000000"
                  value={filtros.precioMax}
                  onChange={(e) => setFiltros({ ...filtros, precioMax: Number(e.target.value) })}
                  className="slider"
                />
              </div>

              {/* Superficie */}
              <div className="filtro-grupo">
                <label><Maximize2 size={14} /> Superficie</label>
                <div className="rango-valores">
                  <span>{filtros.superficieMin} m²</span>
                  <span>{filtros.superficieMax} m²</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filtros.superficieMin}
                  onChange={(e) => setFiltros({ ...filtros, superficieMin: Number(e.target.value) })}
                  className="slider"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filtros.superficieMax}
                  onChange={(e) => setFiltros({ ...filtros, superficieMax: Number(e.target.value) })}
                  className="slider"
                />
              </div>

              {/* Estados (solo admin) */}
              {rol === 'admin' && (
                <div className="filtro-grupo">
                  <label>Estados</label>
                  <div className="checkboxes-estados">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filtros.estados.disponible}
                        onChange={(e) => setFiltros({
                          ...filtros,
                          estados: { ...filtros.estados, disponible: e.target.checked }
                        })}
                      />
                      <span style={{ color: COLORES_MAPA.disponible }}>● Disponible</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filtros.estados.en_cuotas}
                        onChange={(e) => setFiltros({
                          ...filtros,
                          estados: { ...filtros.estados, en_cuotas: e.target.checked }
                        })}
                      />
                      <span style={{ color: COLORES_MAPA.en_cuotas }}>● En Cuotas</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={filtros.estados.vendido}
                        onChange={(e) => setFiltros({
                          ...filtros,
                          estados: { ...filtros.estados, vendido: e.target.checked }
                        })}
                      />
                      <span style={{ color: COLORES_MAPA.vendido }}>● Vendido</span>
                    </label>
                  </div>
                </div>
              )}

              <button onClick={limpiarFiltros} className="btn-limpiar-filtros">
                <X size={14} /> Limpiar
              </button>

              <div className="filtros-resultados">
                <strong>{lotesFiltrados.length}</strong> de <strong>{lotes.length}</strong> lotes
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Panel de Detalles del Lote */}
      {loteSeleccionado && (
        <div className="panel-detalles-overlay" onClick={() => setLoteSeleccionado(null)}>
          <div className="panel-detalles" onClick={(e) => e.stopPropagation()}>
            {/* Header del panel */}
            <div className="detalles-header">
              <div className="detalles-titulo">
                <h2>{loteSeleccionado.codigo}</h2>
                {loteSeleccionado.esDelCliente && (
                  <span className="badge-mi-lote">⭐ Mi Lote</span>
                )}
              </div>
              <button onClick={() => setLoteSeleccionado(null)} className="btn-cerrar-panel">
                <X size={20} />
              </button>
            </div>

            {/* Contenido del panel */}
            <div className="detalles-content">
              {/* Estado del lote */}
              <div className="detalles-seccion">
                <div className="detalles-estado">
                  <span 
                    className="badge-estado-grande"
                    style={{ 
                      backgroundColor: COLORES_MAPA[loteSeleccionado.estado],
                      color: 'white'
                    }}
                  >
                    {loteSeleccionado.estado.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Información principal */}
              <div className="detalles-seccion">
                <h3>Información General</h3>
                <div className="detalles-grid">
                  <div className="detalle-item">
                    <div className="detalle-icono">
                      <Maximize2 size={20} />
                    </div>
                    <div className="detalle-info">
                      <span className="detalle-label">Superficie</span>
                      <span className="detalle-valor">{loteSeleccionado.superficie} m²</span>
                    </div>
                  </div>

                  <div className="detalle-item">
                    <div className="detalle-icono">
                      <DollarSign size={20} />
                    </div>
                    <div className="detalle-info">
                      <span className="detalle-label">Precio</span>
                      <span className="detalle-valor">{formatearPrecio(loteSeleccionado.precio)}</span>
                    </div>
                  </div>

                  <div className="detalle-item">
                    <div className="detalle-icono">
                      <MapPin size={20} />
                    </div>
                    <div className="detalle-info">
                      <span className="detalle-label">Ubicación</span>
                      <span className="detalle-valor">{loteSeleccionado.ubicacion}</span>
                    </div>
                  </div>

                  {loteSeleccionado.topografia && (
                    <div className="detalle-item">
                      <div className="detalle-icono">
                        <Home size={20} />
                      </div>
                      <div className="detalle-info">
                        <span className="detalle-label">Topografía</span>
                        <span className="detalle-valor">{loteSeleccionado.topografia}</span>
                      </div>
                    </div>
                  )}

                  {loteSeleccionado.estadoDocumentacion && (
                    <div className="detalle-item">
                      <div className="detalle-icono">
                        <Home size={20} />
                      </div>
                      <div className="detalle-info">
                        <span className="detalle-label">Documentación</span>
                        <span className="detalle-valor">{loteSeleccionado.estadoDocumentacion}</span>
                      </div>
                    </div>
                  )}

                  <div className="detalle-item">
                    <div className="detalle-icono">
                      <Home size={20} />
                    </div>
                    <div className="detalle-info">
                      <span className="detalle-label">Amueblado</span>
                      <span className="detalle-valor">{loteSeleccionado.amueblado ? 'Sí' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modelo de casa */}
              {loteSeleccionado.modeloCasa && (
                <div className="detalles-seccion">
                  <h3>Modelo de Casa</h3>
                  <div className="modelo-casa-card">
                    <h4>{loteSeleccionado.modeloCasa.nombre}</h4>
                    <p className="modelo-precio">
                      Precio base: {formatearPrecio(loteSeleccionado.modeloCasa.precioBase)}
                    </p>
                    {loteSeleccionado.modeloCasa.descripcion && (
                      <p className="modelo-descripcion">{loteSeleccionado.modeloCasa.descripcion}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Imágenes */}
              {loteSeleccionado.imagenesUrls && (
                (() => {
                  // Parsear imagenesUrls (puede ser string separado por comas o array)
                  const imagenesValue = loteSeleccionado.imagenesUrls as any;
                  const urls: string[] = typeof imagenesValue === 'string'
                    ? imagenesValue.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
                    : Array.isArray(imagenesValue)
                    ? imagenesValue
                    : [];
                  
                  return urls.length > 0 ? (
                    <div className="detalles-seccion">
                      <h3>Imágenes</h3>
                      <div className="imagenes-grid">
                        {urls.map((url: string, index: number) => (
                          <img 
                            key={index} 
                            src={url} 
                            alt={`${loteSeleccionado.codigo} - Imagen ${index + 1}`}
                            className="lote-imagen"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()
              )}

              {/* Fechas */}
              <div className="detalles-seccion">
                <h3>Información Adicional</h3>
                <div className="detalles-fechas">
                  <div className="fecha-item">
                    <span className="fecha-label">Creado:</span>
                    <span className="fecha-valor">
                      {new Date(loteSeleccionado.creadoEn).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="fecha-item">
                    <span className="fecha-label">Actualizado:</span>
                    <span className="fecha-valor">
                      {new Date(loteSeleccionado.actualizadoEn).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="detalles-acciones">
                <button 
                  className="btn-ver-detalles"
                  onClick={() => navigate(`/lotes/${loteSeleccionado.uid}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    justifyContent: 'center',
                    marginBottom: '0.5rem'
                  }}
                >
                  <Home size={16} />
                  Ver Detalles Completos
                </button>
                {rol === 'admin' && (
                  <button 
                    className="btn-editar-lote"
                    onClick={() => navigate(`/lotes/${loteSeleccionado.uid}/editar`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.5rem',
                      background: 'white',
                      color: '#1e293b',
                      border: '2px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                  >
                    <Edit size={16} />
                    Editar Lote
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert-error">
          <p>{error}</p>
          <button onClick={cargarLotes}>Reintentar</button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Cargando mapa...</p>
        </div>
      )}

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

          {/* Renderizar lotes filtrados */}
          {lotesFiltrados.map((lote) => {
            // Intentar parsear como GeoJSON primero (soporta Point y Polygon)
            let geoData = null;
            
            // Prioridad 1: Campo geojson (nuevo)
            if (lote.geojson) {
              geoData = parsearGeoJSON(lote.geojson);
            }
            // Prioridad 2: Campo coordenadas (legacy)
            else if (lote.coordenadas) {
              // Intentar parsear como GeoJSON
              if (lote.coordenadas.includes('{')) {
                geoData = parsearGeoJSON(lote.coordenadas);
              } else {
                // Formato simple: "lat,lng"
                const coords = lotesMapaService.parsearCoordenadas(lote.coordenadas);
                if (coords) {
                  geoData = {
                    tipo: 'point' as const,
                    centro: coords,
                    coordenadas: [[coords.latitud, coords.longitud]]
                  };
                }
              }
            }
            
            if (!geoData) {
              console.warn(`⚠️ Lote ${lote.codigo} sin coordenadas válidas`, lote);
              return null;
            }

            // Popup compartido
            const popupContent = (
              <div className="popup-lote">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0 }}>{lote.codigo}</h3>
                  {lote.esDelCliente && (
                    <span style={{
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)'
                    }}>
                      ⭐ Mi Lote
                    </span>
                  )}
                </div>
                
                <div className="popup-info">
                  <div className="popup-row">
                    <Maximize2 size={16} />
                    <span>{lote.superficie} m²</span>
                  </div>
                  
                  <div className="popup-row">
                    <DollarSign size={16} />
                    <span>{formatearPrecio(lote.precio)}</span>
                  </div>

                  {lote.modeloCasa && (
                    <div className="popup-row">
                      <Home size={16} />
                      <span>{lote.modeloCasa.nombre}</span>
                    </div>
                  )}
                </div>

                <div className="popup-estado">
                  <span 
                    className="badge-estado"
                    style={{ 
                      backgroundColor: COLORES_MAPA[lote.estado],
                      color: 'white'
                    }}
                  >
                    {lote.estado.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <button 
                  className="btn-ver-detalle"
                  onClick={() => setLoteSeleccionado(lote)}
                >
                  Ver Detalles Completos
                </button>
              </div>
            );

            return (
              <div key={lote.uid}>
                {/* Si es polígono, dibujarlo */}
                {geoData.tipo === 'polygon' && (
                  <Polygon
                    positions={geoData.coordenadas as [number, number][]}
                    pathOptions={getEstiloPoligono(lote.estado)}
                  >
                    <Popup>{popupContent}</Popup>
                  </Polygon>
                )}

                {/* Siempre mostrar marcador en el centro */}
                <Marker
                  position={[geoData.centro.latitud, geoData.centro.longitud]}
                  icon={crearIconoLote(lote.estado, lote.esDelCliente)}
                >
                  <Popup>{popupContent}</Popup>
                </Marker>
              </div>
            );
          })}
        </MapContainer>
      )}

      {/* Stats */}
      <div className="mapa-stats">
        <div className="stat-item">
          <span className="stat-label">Total Lotes</span>
          <span className="stat-value">{lotes.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Disponibles</span>
          <span className="stat-value">
            {lotes.filter(l => l.estado === 'disponible').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapaLotes;
