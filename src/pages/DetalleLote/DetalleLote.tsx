/**
 * PÁGINA: DETALLE DE LOTE
 * Vista completa de un lote con toda su información
 * Incluye: datos básicos, mapa, cuotas, pagos, galería
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Home,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Edit,
  FileText,
  Calculator
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { lotesService } from '../../services/lotes.service';
import { cuotasService } from '../../services/cuotas.service';
import { obtenerVentasPorLote } from '../../services/ventas.service';
import { getErrorMessage } from '../../services/http.service';
import type { Venta } from '../../types';
import type { Lote, Cuota } from './types';
import './DetalleLote.css';

const DetalleLote = () => {
  const navigate = useNavigate();
  const { uid } = useParams<{ uid: string }>();
  
  const [lote, setLote] = useState<Lote | null>(null);
  const [venta, setVenta] = useState<Venta | null>(null);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCuotas, setLoadingCuotas] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [puntosPoligono, setPuntosPoligono] = useState<[number, number][]>([]);
  const [centroMapa, setCentroMapa] = useState<[number, number] | null>(null);

  useEffect(() => {
    cargarDatosLote();
  }, [uid]);

  const cargarDatosLote = async () => {
    if (!uid) {
      setError('UID del lote no proporcionado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Cargar lote
      const loteData = await lotesService.obtenerPorUid(uid);
      setLote(loteData);
      console.log('✅ Lote cargado:', loteData);

      // Cargar polígono si existe
      if (loteData.geojson) {
        try {
          const geojsonData = JSON.parse(loteData.geojson);
          if (geojsonData.type === 'Polygon' && geojsonData.coordinates && geojsonData.coordinates[0]) {
            const puntos: [number, number][] = geojsonData.coordinates[0]
              .slice(0, -1)
              .map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
            setPuntosPoligono(puntos);
            
            // Calcular centroide del polígono
            const sumLat = puntos.reduce((sum, punto) => sum + punto[0], 0);
            const sumLng = puntos.reduce((sum, punto) => sum + punto[1], 0);
            const centroide: [number, number] = [
              sumLat / puntos.length,
              sumLng / puntos.length
            ];
            setCentroMapa(centroide);
            console.log('✅ Centroide calculado:', centroide);
          }
        } catch (err) {
          console.error('Error al parsear GeoJSON:', err);
        }
      } else if (loteData.ubicacionX && loteData.ubicacionY) {
        // Si no hay polígono, usar ubicación directa
        setCentroMapa([parseFloat(loteData.ubicacionY), parseFloat(loteData.ubicacionX)]);
      }

      // Cargar venta y cuotas si el lote está en cuotas o vendido
      if (loteData.estado === 'en_cuotas' || loteData.estado === 'vendido') {
        try {
          setLoadingCuotas(true);
          
          // Obtener la venta asociada al lote
          const ventas = await obtenerVentasPorLote(loteData.uid);
          
          if (ventas && ventas.length > 0) {
            const ventaActual = ventas[0]; // Tomamos la primera venta (debería ser única)
            setVenta(ventaActual);
            console.log('✅ Venta cargada:', ventaActual);
            
            // Cargar cuotas de la venta
            if (ventaActual.uid) {
              const cuotasData = await cuotasService.obtenerPorVenta(ventaActual.uid);
              setCuotas(cuotasData);
              console.log('✅ Cuotas cargadas:', cuotasData.length);
            }
          } else {
            console.log('⚠️ No se encontró venta asociada al lote');
          }
        } catch (err) {
          console.error('❌ Error al cargar venta/cuotas:', err);
        } finally {
          setLoadingCuotas(false);
        }
      }

    } catch (err) {
      const mensaje = getErrorMessage(err);
      setError(mensaje);
      console.error('❌ Error al cargar lote:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatearPrecio = (precio: string | number) => {
    const numero = typeof precio === 'string' ? parseFloat(precio) : precio;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(numero);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return '#10b981';
      case 'en_cuotas':
        return '#f59e0b';
      case 'vendido':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const obtenerTextoEstado = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'Disponible';
      case 'en_cuotas':
        return 'En Cuotas';
      case 'vendido':
        return 'Vendido';
      default:
        return estado;
    }
  };

  if (loading) {
    return (
      <div className="detalle-lote-container">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Cargando detalles del lote...</p>
        </div>
      </div>
    );
  }

  if (error || !lote) {
    return (
      <div className="detalle-lote-container">
        <div className="error-state">
          <AlertCircle size={48} color="#ef4444" />
          <h2>Error al cargar el lote</h2>
          <p>{error || 'Lote no encontrado'}</p>
          <button onClick={() => navigate('/lotes')} className="btn-volver">
            <ArrowLeft size={20} />
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detalle-lote-container">
      {/* Header */}
      <div className="detalle-header">
        <div className="header-left">
          <button onClick={() => navigate('/lotes')} className="btn-back">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>
              <Home size={28} />
              Lote {lote.codigo}
            </h1>
            <p className="header-subtitle">
              {lote.manzana} - Lote {lote.numeroLote}
            </p>
          </div>
        </div>
        <div className="header-actions">
          <span 
            className="estado-badge"
            style={{ backgroundColor: obtenerColorEstado(lote.estado) }}
          >
            {obtenerTextoEstado(lote.estado)}
          </span>
          <button
            onClick={() => navigate(`/lotes/editar/${lote.uid}`)}
            className="btn-editar"
          >
            <Edit size={20} />
            Editar
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="detalle-content">
        {/* Columna izquierda */}
        <div className="detalle-main">
          {/* Información básica */}
          <div className="detalle-card">
            <h2 className="card-title">
              <FileText size={20} />
              Información Básica
            </h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Código</span>
                <span className="info-value">{lote.codigo}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Precio de Lista</span>
                <span className="info-value precio">{formatearPrecio(lote.precioLista)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Superficie</span>
                <span className="info-value">{parseFloat(lote.superficieM2).toFixed(2)} m²</span>
              </div>
              <div className="info-item">
                <span className="info-label">Dimensiones</span>
                <span className="info-value">
                  {parseFloat(lote.anchoM).toFixed(2)}m × {parseFloat(lote.largoM).toFixed(2)}m
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Dirección</span>
                <span className="info-value">{lote.direccion}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Manzana</span>
                <span className="info-value">{lote.manzana}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Número de Lote</span>
                <span className="info-value">{lote.numeroLote}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Topografía</span>
                <span className="info-value">{lote.topografia}</span>
              </div>
              {lote.orientacion && (
                <div className="info-item">
                  <span className="info-label">Orientación</span>
                  <span className="info-value">{lote.orientacion}</span>
                </div>
              )}
              {lote.vista && (
                <div className="info-item">
                  <span className="info-label">Vista</span>
                  <span className="info-value">{lote.vista}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Amueblado</span>
                <span className="info-value">
                  {lote.amueblado ? (
                    <span style={{ color: '#10b981' }}>
                      <CheckCircle size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      Sí
                    </span>
                  ) : (
                    <span style={{ color: '#64748b' }}>No</span>
                  )}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado Documentación</span>
                <span className="info-value">{lote.estadoDocumentacion}</span>
              </div>
            </div>

            {lote.observaciones && (
              <div style={{ marginTop: '1.5rem' }}>
                <span className="info-label">Observaciones</span>
                <p className="observaciones">{lote.observaciones}</p>
              </div>
            )}
          </div>

          {/* Modelo de Casa */}
          {lote.modeloCasa && (
            <div className="detalle-card">
              <h2 className="card-title">
                <Home size={20} />
                Modelo de Casa
              </h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Nombre</span>
                  <span className="info-value">{lote.modeloCasa.nombre}</span>
                </div>
                {lote.modeloCasa.precioBase && (
                  <div className="info-item">
                    <span className="info-label">Precio Base</span>
                    <span className="info-value precio">
                      {formatearPrecio(lote.modeloCasa.precioBase)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Servicios */}
          {lote.servicios && lote.servicios.length > 0 && (
            <div className="detalle-card">
              <h2 className="card-title">
                <CheckCircle size={20} />
                Servicios Disponibles
              </h2>
              <div className="servicios-grid">
                {lote.servicios.map((servicio) => (
                  <div key={servicio.uid} className="servicio-item">
                    <CheckCircle size={16} color="#10b981" />
                    <span>{servicio.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mapa */}
          {centroMapa && (
            <div className="detalle-card">
              <h2 className="card-title">
                <MapPin size={20} />
                Ubicación
              </h2>
              <div className="mapa-container">
                <MapContainer
                  center={centroMapa}
                  zoom={18}
                  style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; Google'
                    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    maxZoom={22}
                  />
                  
                  {/* Marcador central */}
                  <Marker position={centroMapa}>
                    <Popup>
                      <div style={{ textAlign: 'center' }}>
                        <strong>📍 {lote.codigo}</strong>
                        <br />
                        <small>{lote.direccion}</small>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Polígono del lote */}
                  {puntosPoligono.length > 0 && (
                    <Polygon
                      positions={puntosPoligono}
                      pathOptions={{
                        color: '#3b82f6',
                        fillColor: '#3b82f6',
                        fillOpacity: 0.3,
                        weight: 3
                      }}
                    />
                  )}
                </MapContainer>
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha - Información adicional */}
        <div className="detalle-sidebar">
          {/* Fechas */}
          <div className="detalle-card">
            <h3 className="card-title-small">
              <Calendar size={18} />
              Fechas
            </h3>
            <div className="info-list">
              <div className="info-item-small">
                <span className="info-label-small">Creado</span>
                <span className="info-value-small">{formatearFecha(lote.creadoEn)}</span>
              </div>
              <div className="info-item-small">
                <span className="info-label-small">Actualizado</span>
                <span className="info-value-small">{formatearFecha(lote.actualizadoEn)}</span>
              </div>
            </div>
          </div>

          {/* Información de Venta y Cuotas */}
          {(lote.estado === 'en_cuotas' || lote.estado === 'vendido') && venta && (
            <div className="detalle-card">
              <h3 className="card-title-small">
                <FileText size={18} />
                Información de Venta
              </h3>
              <div className="info-list">
                <div className="info-item-small">
                  <span className="info-label-small">Cliente</span>
                  <span className="info-value-small">
                    {venta.cliente?.nombres && venta.cliente?.apellidos 
                      ? `${venta.cliente.nombres} ${venta.cliente.apellidos}`
                      : 'N/A'}
                  </span>
                </div>
                <div className="info-item-small">
                  <span className="info-label-small">Precio de Venta</span>
                  <span className="info-value-small" style={{ color: '#10b981', fontWeight: 600 }}>
                    {formatearPrecio(venta.precioVenta)}
                  </span>
                </div>
                <div className="info-item-small">
                  <span className="info-label-small">Modalidad de Pago</span>
                  <span className="info-value-small">
                    {venta.modalidadPago === 'contado' ? 'Contado' : 'Cuotas'}
                  </span>
                </div>
                {venta.modalidadPago === 'cuotas' && venta.montoInicial && (
                  <div className="info-item-small">
                    <span className="info-label-small">Cuota Inicial</span>
                    <span className="info-value-small">{formatearPrecio(venta.montoInicial)}</span>
                  </div>
                )}
                <div className="info-item-small">
                  <span className="info-label-small">Fecha de Venta</span>
                  <span className="info-value-small">{formatearFecha(venta.fechaVenta)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Plan de Cuotas */}
          {(lote.estado === 'en_cuotas' || lote.estado === 'vendido') && cuotas.length > 0 && (
            <div className="detalle-card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="card-title-small">
                <Calculator size={18} />
                Plan de Cuotas ({cuotas.length} cuotas)
              </h3>
              
              {loadingCuotas ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div className="spinner-large"></div>
                  <p>Cargando cuotas...</p>
                </div>
              ) : (
                <>
                  {/* Resumen de cuotas */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '0.5rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        Total Cuotas
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                        {cuotas.length}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        Pagadas
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>
                        {cuotas.filter(c => c.estado === 'pagada').length}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        Pendientes
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>
                        {cuotas.filter(c => c.estado === 'pendiente').length}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        Vencidas
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>
                        {cuotas.filter(c => c.estaVencida).length}
                      </div>
                    </div>
                  </div>

                  {/* Tabla de cuotas */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      fontSize: '0.875rem'
                    }}>
                      <thead>
                        <tr style={{ 
                          background: '#f1f5f9',
                          borderBottom: '2px solid #e2e8f0'
                        }}>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>#</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Valor</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Pagado</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Pendiente</th>
                          <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Vencimiento</th>
                          <th style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cuotas.map((cuota) => (
                          <tr key={cuota.uid} style={{ 
                            borderBottom: '1px solid #e2e8f0',
                            background: cuota.estaVencida && cuota.estado !== 'pagada' ? '#fef2f2' : 'white'
                          }}>
                            <td style={{ padding: '0.75rem' }}>
                              <span style={{ fontWeight: 600 }}>Cuota {cuota.numeroCuota}</span>
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              {formatearPrecio(cuota.valor)}
                            </td>
                            <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                              {formatearPrecio(cuota.montoPagado)}
                            </td>
                            <td style={{ padding: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>
                              {formatearPrecio(cuota.montoPendiente)}
                            </td>
                            <td style={{ padding: '0.75rem' }}>
                              {new Date(cuota.fechaVencimiento).toLocaleDateString('es-CO', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                              {cuota.estaVencida && cuota.estado !== 'pagada' && (
                                <span style={{ 
                                  marginLeft: '0.5rem',
                                  color: '#ef4444',
                                  fontSize: '0.75rem',
                                  fontWeight: 600
                                }}>
                                  (Vencida)
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                              <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '0.375rem',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                background: cuota.estado === 'pagada' ? '#d1fae5' : '#fef3c7',
                                color: cuota.estado === 'pagada' ? '#065f46' : '#92400e'
                              }}>
                                {cuota.estado === 'pagada' ? 'Pagada' : 'Pendiente'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mensaje si no hay cuotas */}
          {(lote.estado === 'en_cuotas' || lote.estado === 'vendido') && !venta && !loadingCuotas && (
            <div className="detalle-card">
              <h3 className="card-title-small">
                <Calculator size={18} />
                Información de Venta
              </h3>
              <div className="info-alert">
                <AlertCircle size={16} />
                <p>No se encontró información de venta asociada a este lote.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleLote;
