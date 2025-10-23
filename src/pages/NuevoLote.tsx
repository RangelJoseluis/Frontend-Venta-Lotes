/**
 * PÁGINA: NUEVO LOTE
 * Formulario para crear un nuevo lote en el sistema
 * Diseño limpio sin sidebar para mejor experiencia de usuario
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Save, 
  AlertCircle, 
  CheckCircle, 
  Home, 
  FileText, 
  Ruler, 
  MapPin, 
  Settings,
  MessageSquare,
  Navigation
} from 'lucide-react';
import { lotesService } from '../services/lotes.service';
import serviciosService from '../services/servicios.service';
import modelosCasaService from '../services/modelos-casa.service';
import { getErrorMessage } from '../services/http.service';
import type { CrearLoteDto, ModeloCasa, Servicio } from '../types';
import { obtenerCentroZona, obtenerZoomZona, obtenerZonaPredeterminada } from '../config/zona.config';
import './NuevoLote.css';

// Configurar iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Esquema de validación con Zod
const loteSchema = z.object({
  codigo: z.string().min(1, 'El código es requerido').max(20, 'Máximo 20 caracteres'),
  anchoM: z.number().min(1, 'El ancho debe ser mayor a 0'),
  largoM: z.number().min(1, 'El largo debe ser mayor a 0'),
  superficieM2: z.number().min(1, 'La superficie debe ser mayor a 0'),
  precioLista: z.number().min(1, 'El precio debe ser mayor a 0'),
  direccion: z.string().min(1, 'La dirección es requerida'),
  manzana: z.string().min(1, 'La manzana es requerida'),
  numeroLote: z.string().min(1, 'El número de lote es requerido'),
  topografia: z.enum(['plano', 'inclinado', 'irregular']),
  orientacion: z.enum(['norte', 'sur', 'este', 'oeste', 'noreste', 'noroeste', 'sureste', 'suroeste']).optional(),
  vista: z.enum(['ciudad', 'montaña', 'mar', 'parque', 'calle', 'interior']).optional(),
  estadoDocumentacion: z.enum(['pendiente', 'en_proceso', 'completa', 'observaciones']),
  estado: z.enum(['disponible', 'en_cuotas', 'vendido']),
  amueblado: z.boolean(),
  imagenesUrls: z.string().optional(),
  observaciones: z.string().optional(),
  modeloCasa: z.number().optional(),
  // Campos de coordenadas para el mapa
  ubicacionX: z.number().optional(), // Longitud
  ubicacionY: z.number().optional(), // Latitud
  geojson: z.string().optional(), // GeoJSON para polígonos
});

type LoteFormData = z.infer<typeof loteSchema>;

// Componente helper para actualizar el centro del mapa
const MapUpdater = ({ center, zoom, disabled }: { center: [number, number]; zoom?: number; disabled?: boolean }) => {
  const map = useMap();
  useEffect(() => {
    if (!disabled) {
      map.setView(center, zoom || obtenerZoomZona());
    }
  }, [center, zoom, map, disabled]);
  return null;
};

// Componente para manejar clicks en el mapa (modo dibujo)
const MapClickHandler = ({ 
  enabled, 
  onMapClick 
}: { 
  enabled: boolean; 
  onMapClick: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click: (e) => {
      if (enabled) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
};

const NuevoLote = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [codigoLote, setCodigoLote] = useState<string>('');
  const [serviciosDisponibles, setServiciosDisponibles] = useState<Servicio[]>([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [modelosCasaDisponibles, setModelosCasaDisponibles] = useState<ModeloCasa[]>([]);
  const [modeloCasaSeleccionado, setModeloCasaSeleccionado] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Estados para modo dibujo de polígono
  const [modoDibujo, setModoDibujo] = useState(false);
  const [puntosPoligono, setPuntosPoligono] = useState<[number, number][]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoteFormData>({
    resolver: zodResolver(loteSchema),
    defaultValues: {
      estado: 'disponible',
      estadoDocumentacion: 'pendiente',
      topografia: 'plano',
      amueblado: false,
    },
  });

  // Calcular superficie automáticamente
  const anchoM = watch('anchoM');
  const largoM = watch('largoM');

  // Observar coordenadas para vista previa del mapa
  const ubicacionX = watch('ubicacionX');
  const ubicacionY = watch('ubicacionY');

  const calcularSuperficie = () => {
    if (anchoM && largoM) {
      setValue('superficieM2', Number((anchoM * largoM).toFixed(2)));
    }
  };

  // Funciones para modo dibujo de polígono
  const iniciarDibujo = () => {
    setModoDibujo(true);
    setPuntosPoligono([]);
  };

  const agregarPunto = (lat: number, lng: number) => {
    setPuntosPoligono(prev => [...prev, [lat, lng]]);
  };

  const finalizarDibujo = () => {
    if (puntosPoligono.length >= 3) {
      // Generar GeoJSON del polígono
      const geojson = {
        type: "Polygon",
        coordinates: [[...puntosPoligono.map(p => [p[1], p[0]]), [puntosPoligono[0][1], puntosPoligono[0][0]]]]
      };
      setValue('geojson', JSON.stringify(geojson));
      
      // Calcular centro del polígono para ubicacionX y ubicacionY
      const centroLat = puntosPoligono.reduce((sum, p) => sum + p[0], 0) / puntosPoligono.length;
      const centroLng = puntosPoligono.reduce((sum, p) => sum + p[1], 0) / puntosPoligono.length;
      setValue('ubicacionX', centroLng);
      setValue('ubicacionY', centroLat);
    }
    setModoDibujo(false);
  };

  const cancelarDibujo = () => {
    setModoDibujo(false);
    setPuntosPoligono([]);
  };

  const limpiarPoligono = () => {
    setPuntosPoligono([]);
    setValue('geojson', '');
  };

  // Eliminar el último punto agregado
  const eliminarUltimoPunto = () => {
    if (puntosPoligono.length > 0) {
      const nuevosPuntos = puntosPoligono.slice(0, -1);
      setPuntosPoligono(nuevosPuntos);
    }
  };

  // Cargar código, servicios y modelos de casa al montar el componente
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setIsLoading(true);
        
        // Cargar próximo código de lote
        const codigo = await lotesService.obtenerProximoCodigo();
        setCodigoLote(codigo);
        setValue('codigo', codigo);

        // Cargar servicios disponibles
        const servicios = await serviciosService.obtenerActivos();
        console.log('✅ Servicios cargados:', servicios.length, servicios);
        setServiciosDisponibles(servicios);

        // Cargar modelos de casa disponibles
        const modelos = await modelosCasaService.obtenerActivos();
        console.log('✅ Modelos de casa cargados:', modelos.length, modelos);
        setModelosCasaDisponibles(modelos);
      } catch (err) {
        console.error('Error al cargar datos iniciales:', err);
        setError('Error al cargar datos del formulario. Por favor, recarga la página.');
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatosIniciales();
  }, [setValue]);

  const onSubmit = async (data: LoteFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Los servicios seleccionados ya son UIDs, pero el backend espera IDs
      // Necesitamos mapear UIDs a IDs usando el campo 'id' de cada servicio
      console.log('🔍 DEBUG - serviciosSeleccionados (UIDs):', serviciosSeleccionados);
      console.log('🔍 DEBUG - serviciosDisponibles:', serviciosDisponibles);
      
      // TEMPORAL: Enviar los UIDs como strings y el backend los resolverá
      // TODO: El backend debe aceptar UIDs en lugar de IDs internos
      const serviciosIds = serviciosSeleccionados as any;

      console.log('🔍 DEBUG - serviciosIds finales a enviar:', serviciosIds);

      const loteData: CrearLoteDto = {
        ...data,
        anchoM: Number(data.anchoM),
        largoM: Number(data.largoM),
        superficieM2: Number(data.superficieM2),
        precioLista: Number(data.precioLista),
        modeloCasaUid: modeloCasaSeleccionado || undefined,
        serviciosIds: serviciosIds.length > 0 ? serviciosIds : undefined,
      };

      console.log('📤 Enviando datos del lote:', loteData);
      console.log('🏠 Modelo de casa seleccionado (UID):', modeloCasaSeleccionado);
      console.log('🔧 Servicios UIDs a enviar:', serviciosIds);

      await lotesService.crear(loteData);
      
      console.log('✅ Lote creado exitosamente');
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('❌ Error al crear lote:', err);
      
      // Detectar error de código duplicado (409 CONFLICT)
      if (err?.response?.status === 409) {
        setError(
          `⚠️ Código Duplicado: ${err.response.data.message || 'Ya existe un lote con este código. Por favor, use un código diferente.'}`
        );
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="nuevo-lote-container">
        <div className="nuevo-lote-wrapper">
          <div className="success-container">
            <div className="success-card">
              <div className="success-icon">
                <CheckCircle />
              </div>
              <h2 className="success-title">¡Lote creado exitosamente!</h2>
              <p className="success-message">Redirigiendo al dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nuevo-lote-container">
      <div className="nuevo-lote-wrapper">
        {/* Header */}
        <div className="nuevo-lote-header">
          <div className="nuevo-lote-breadcrumb">
            <button onClick={() => navigate('/dashboard')}>
              <Home size={16} />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>Nuevo Lote</span>
          </div>
          <h1 className="nuevo-lote-title">Nuevo Lote</h1>
          <p className="nuevo-lote-subtitle">Complete los datos del nuevo lote</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle className="error-message-icon" size={20} />
            <div className="error-message-content">
              <h3>Error al crear el lote</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="nuevo-lote-form">
          {/* Información Básica */}
          <div className="form-section">
            <h2 className="form-section-title">
              <FileText size={20} />
              Información Básica
            </h2>
            <div className="form-grid form-grid-2">
              <div className="form-field">
                <label className="form-label form-label-required">
                  Código del Lote
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400, marginLeft: '0.5rem' }}>
                    (Autogenerado)
                  </span>
                </label>
                <input
                  {...register('codigo')}
                  type="text"
                  placeholder="Cargando..."
                  className="form-input calculated"
                  readOnly
                  style={{ backgroundColor: '#f8fafc', cursor: 'not-allowed' }}
                />
                {errors.codigo && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.codigo.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Precio de Lista</label>
                <input
                  {...register('precioLista', { valueAsNumber: true })}
                  type="number"
                  placeholder="95000000"
                  className={`form-input ${errors.precioLista ? 'error' : ''}`}
                />
                {errors.precioLista && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.precioLista.message}
                  </span>
                )}
              </div>
            </div>

            {/* Modelo de Casa */}
            <div className="form-field" style={{ marginTop: '1rem' }}>
              <label className="form-label">
                Modelo de Casa
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400, marginLeft: '0.5rem' }}>
                  (Opcional)
                </span>
              </label>
              {isLoading ? (
                <div style={{ padding: '0.75rem', textAlign: 'center', background: '#f8fafc', borderRadius: '0.5rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Cargando modelos...</span>
                </div>
              ) : (
                <select
                  value={modeloCasaSeleccionado || ''}
                  onChange={(e) => {
                    const selectedUid = e.target.value;
                    setModeloCasaSeleccionado(selectedUid);
                    console.log('🏠 Modelo de casa seleccionado (UID):', selectedUid);
                  }}
                  className="form-select"
                >
                  <option value="">Sin modelo de casa</option>
                  {modelosCasaDisponibles.map((modelo) => (
                    <option key={modelo.uid} value={modelo.uid}>
                      {modelo.nombre}
                      {modelo.precioBase ? ` - $${modelo.precioBase.toLocaleString('es-CO')}` : ''}
                      {modelo.metrosCubiertos ? ` - ${modelo.metrosCubiertos}m²` : ''}
                      {modelo.ambientes ? ` - ${modelo.ambientes} amb.` : ''}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Servicios Disponibles */}
            <div className="form-field" style={{ marginTop: '1rem' }}>
              <label className="form-label">
                Servicios del Lote
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400, marginLeft: '0.5rem' }}>
                  (Opcional - Seleccione los servicios disponibles)
                </span>
              </label>
              {isLoading ? (
                <div style={{ padding: '0.75rem', textAlign: 'center', background: '#f8fafc', borderRadius: '0.5rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Cargando servicios...</span>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0'
                }}>
                  {serviciosDisponibles.length === 0 ? (
                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}>No hay servicios disponibles</span>
                  ) : (
                    serviciosDisponibles.map((servicio) => (
                      <label 
                        key={servicio.uid} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '0.375rem',
                          transition: 'background 0.2s',
                          background: serviciosSeleccionados.includes(servicio.uid) ? '#e0f2fe' : 'transparent'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = serviciosSeleccionados.includes(servicio.uid) ? '#e0f2fe' : '#f1f5f9'}
                        onMouseLeave={(e) => e.currentTarget.style.background = serviciosSeleccionados.includes(servicio.uid) ? '#e0f2fe' : 'transparent'}
                      >
                        <input
                          type="checkbox"
                          checked={serviciosSeleccionados.includes(servicio.uid)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setServiciosSeleccionados([...serviciosSeleccionados, servicio.uid]);
                            } else {
                              setServiciosSeleccionados(serviciosSeleccionados.filter(uid => uid !== servicio.uid));
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: '#1e293b', fontWeight: 500 }}>
                          {servicio.nombre}
                        </span>
                        {servicio.esEsencial && (
                          <span style={{ 
                            fontSize: '0.625rem', 
                            padding: '0.125rem 0.375rem', 
                            background: '#fef3c7', 
                            color: '#92400e',
                            borderRadius: '0.25rem',
                            fontWeight: 600
                          }}>
                            ESENCIAL
                          </span>
                        )}
                      </label>
                    ))
                  )}
                </div>
              )}
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                💡 Seleccione los servicios que estarán disponibles en este lote (agua, luz, gas, etc.)
              </p>
            </div>
          </div>

          {/* Dimensiones */}
          <div className="form-section">
            <h2 className="form-section-title">
              <Ruler size={20} />
              Dimensiones
            </h2>
            <div className="form-grid form-grid-3">
              <div className="form-field">
                <label className="form-label form-label-required">Ancho (m)</label>
                <input
                  {...register('anchoM', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder="18"
                  onBlur={calcularSuperficie}
                  className={`form-input ${errors.anchoM ? 'error' : ''}`}
                />
                {errors.anchoM && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.anchoM.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Largo (m)</label>
                <input
                  {...register('largoM', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder="25"
                  onBlur={calcularSuperficie}
                  className={`form-input ${errors.largoM ? 'error' : ''}`}
                />
                {errors.largoM && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.largoM.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Superficie (m²)</label>
                <input
                  {...register('superficieM2', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder="450"
                  className={`form-input calculated ${errors.superficieM2 ? 'error' : ''}`}
                  readOnly
                />
                {errors.superficieM2 && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.superficieM2.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="form-section">
            <h2 className="form-section-title">
              <MapPin size={20} />
              Ubicación
            </h2>
            <div className="form-grid form-grid-3">
              <div className="form-field">
                <label className="form-label form-label-required">Manzana</label>
                <input
                  {...register('manzana')}
                  type="text"
                  placeholder="A"
                  className={`form-input ${errors.manzana ? 'error' : ''}`}
                />
                {errors.manzana && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.manzana.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Número de Lote</label>
                <input
                  {...register('numeroLote')}
                  type="text"
                  placeholder="001"
                  className={`form-input ${errors.numeroLote ? 'error' : ''}`}
                />
                {errors.numeroLote && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.numeroLote.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Topografía</label>
                <select
                  {...register('topografia')}
                  className={`form-select ${errors.topografia ? 'error' : ''}`}
                >
                  <option value="plano">Plano</option>
                  <option value="inclinado">Inclinado</option>
                  <option value="irregular">Irregular</option>
                </select>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: '1.5rem' }}>
              <div className="form-field">
                <label className="form-label form-label-required">Dirección</label>
                <input
                  {...register('direccion')}
                  type="text"
                  placeholder="Manzana A, Lote 1"
                  className={`form-input ${errors.direccion ? 'error' : ''}`}
                />
                {errors.direccion && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.direccion.message}
                  </span>
                )}
              </div>
            </div>

            {/* Dibujar Polígono del Lote */}
            <div style={{ 
              marginTop: '1.5rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
              borderRadius: '1rem',
              border: '2px solid #a78bfa'
            }}>
              <div style={{ marginTop: '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} style={{ color: '#7c3aed' }} />
                    <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#7c3aed' }}>
                      Dibujar Forma del Lote (Opcional)
                    </h4>
                  </div>
                  {!modoDibujo && puntosPoligono.length === 0 && (
                    <button
                      type="button"
                      onClick={iniciarDibujo}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <MapPin size={16} />
                      Dibujar en el Mapa
                    </button>
                  )}
                  {modoDibujo && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={finalizarDibujo}
                        disabled={puntosPoligono.length < 3}
                        style={{
                          padding: '0.5rem 1rem',
                          background: puntosPoligono.length >= 3 ? 'linear-gradient(135deg, #10b981, #059669)' : '#d1d5db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          cursor: puntosPoligono.length >= 3 ? 'pointer' : 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        ✓ Finalizar ({puntosPoligono.length} puntos)
                      </button>
                      <button
                        type="button"
                        onClick={eliminarUltimoPunto}
                        disabled={puntosPoligono.length === 0}
                        style={{
                          padding: '0.5rem 1rem',
                          background: puntosPoligono.length === 0 
                            ? '#9ca3af' 
                            : 'linear-gradient(135deg, #f59e0b, #d97706)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          cursor: puntosPoligono.length === 0 ? 'not-allowed' : 'pointer',
                          opacity: puntosPoligono.length === 0 ? 0.5 : 1
                        }}
                      >
                        ↶ Deshacer
                      </button>
                      <button
                        type="button"
                        onClick={cancelarDibujo}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        ✕ Cancelar
                      </button>
                    </div>
                  )}
                  {!modoDibujo && puntosPoligono.length > 0 && (
                    <button
                      type="button"
                      onClick={limpiarPoligono}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Limpiar Polígono
                    </button>
                  )}
                </div>

                {modoDibujo && (
                  <div style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                    border: '2px solid #fbbf24',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#92400e', fontWeight: 600 }}>
                      🖱️ Modo Dibujo Activo
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#78350f' }}>
                      Haz click en el mapa para marcar las esquinas del lote. Necesitas mínimo 3 puntos para formar un polígono.
                    </p>
                  </div>
                )}

                {!modoDibujo && puntosPoligono.length === 0 && (
                  <div style={{
                    padding: '1rem',
                    background: '#f8fafc',
                    border: '2px dashed #cbd5e1',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
                      Click en "Dibujar en el Mapa" para definir la forma exacta del lote
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                      Útil para lotes con formas irregulares o para delimitar el área exacta
                    </p>
                  </div>
                )}

                {!modoDibujo && puntosPoligono.length > 0 && (
                  <div style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                    border: '2px solid #10b981',
                    borderRadius: '0.5rem'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#065f46', fontWeight: 600 }}>
                      ✅ Polígono Definido
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#047857' }}>
                      {puntosPoligono.length} puntos • GeoJSON generado automáticamente
                    </p>
                  </div>
                )}

                {/* Campo oculto para GeoJSON */}
                <input type="hidden" {...register('geojson')} />
              </div>

              {/* Vista Previa del Mapa - Siempre visible con zona predeterminada */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <MapPin size={16} style={{ color: ubicacionX && ubicacionY ? '#059669' : '#7c3aed' }} />
                  <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: ubicacionX && ubicacionY ? '#059669' : '#7c3aed' }}>
                    {ubicacionX && ubicacionY ? '✅ Vista Previa de Ubicación' : '🗺️ Mapa de la Zona - Dibuja tu Lote'}
                  </h4>
                </div>
                <div style={{ 
                  height: '400px', 
                  borderRadius: '0.5rem', 
                  overflow: 'hidden',
                  border: `2px solid ${ubicacionX && ubicacionY ? '#10b981' : '#7c3aed'}`,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <MapContainer
                    center={ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY) 
                      ? [ubicacionY, ubicacionX] 
                      : obtenerCentroZona()}
                    zoom={ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY) 
                      ? 18 
                      : obtenerZoomZona()}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                  >
                      {/* Vista Satelital de Google Maps (mismo que MapaLotes) */}
                      <TileLayer
                        attribution='&copy; Google'
                        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                        maxZoom={22}
                      />
                      
                      {/* Marcador central - solo si hay coordenadas válidas */}
                      {ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY) && (
                        <Marker position={[ubicacionY, ubicacionX]}>
                          <Popup>
                            <div style={{ textAlign: 'center' }}>
                              <strong>📍 Centro del Lote</strong>
                              <br />
                              <small>
                                Lat: {ubicacionY.toFixed(6)}
                                <br />
                                Lng: {ubicacionX.toFixed(6)}
                              </small>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                      
                      {/* Polígono dibujado */}
                      {puntosPoligono.length > 0 && (
                        <Polygon
                          positions={puntosPoligono}
                          pathOptions={{
                            color: modoDibujo ? '#fbbf24' : '#10b981',
                            fillColor: modoDibujo ? '#fbbf24' : '#10b981',
                            fillOpacity: 0.3,
                            weight: 3
                          }}
                        />
                      )}
                      
                      {/* Marcadores de puntos del polígono */}
                      {puntosPoligono.map((punto, index) => (
                        <Marker
                          key={index}
                          position={punto}
                          icon={L.divIcon({
                            className: 'custom-marker',
                            html: `<div style="
                              width: 24px;
                              height: 24px;
                              background: ${modoDibujo ? '#fbbf24' : '#10b981'};
                              border: 3px solid white;
                              border-radius: 50%;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              font-size: 12px;
                              font-weight: bold;
                              color: white;
                              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                            ">${index + 1}</div>`,
                            iconSize: [24, 24],
                            iconAnchor: [12, 12]
                          })}
                        >
                          <Popup>
                            <div style={{ textAlign: 'center' }}>
                              <strong>Punto {index + 1}</strong>
                              <br />
                              <small>
                                Lat: {punto[0].toFixed(6)}
                                <br />
                                Lng: {punto[1].toFixed(6)}
                              </small>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                      
                      {/* Handler para clicks en modo dibujo */}
                      <MapClickHandler enabled={modoDibujo} onMapClick={agregarPunto} />
                      
                      <MapUpdater 
                        center={ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY) 
                          ? [ubicacionY, ubicacionX] 
                          : obtenerCentroZona()} 
                        zoom={ubicacionX && ubicacionY && !isNaN(ubicacionX) && !isNaN(ubicacionY) 
                          ? 18 
                          : undefined}
                        disabled={modoDibujo}
                      />
                    </MapContainer>
                  </div>
                  
                  {/* Información de la zona */}
                  <div style={{ 
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    background: modoDibujo ? '#fef3c7' : '#f0f9ff',
                    border: `1px solid ${modoDibujo ? '#fbbf24' : '#bae6fd'}`,
                    borderRadius: '0.5rem'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: modoDibujo ? '#92400e' : '#0c4a6e' }}>
                      {modoDibujo 
                        ? '🖱️ Haz click en el mapa para marcar las esquinas del lote'
                        : ubicacionX && ubicacionY 
                          ? `📍 Centro: ${ubicacionY.toFixed(6)}, ${ubicacionX.toFixed(6)}`
                          : `🗺️ Zona: ${obtenerZonaPredeterminada().nombre}`
                      }
                    </p>
                  </div>
                </div>

              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                background: '#fef3c7', 
                border: '1px solid #fde047',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#854d0e'
              }}>
                <strong>💡 Tip:</strong> Puedes obtener las coordenadas desde Google Maps haciendo click derecho en el mapa y seleccionando las coordenadas.
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="form-section">
            <h2 className="form-section-title">
              <Settings size={20} />
              Características
            </h2>
            <div className="form-grid form-grid-2">
              <div className="form-field">
                <label className="form-label">Orientación</label>
                <select {...register('orientacion')} className="form-select">
                  <option value="">Seleccionar...</option>
                  <option value="norte">Norte</option>
                  <option value="sur">Sur</option>
                  <option value="este">Este</option>
                  <option value="oeste">Oeste</option>
                  <option value="noreste">Noreste</option>
                  <option value="noroeste">Noroeste</option>
                  <option value="sureste">Sureste</option>
                  <option value="suroeste">Suroeste</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Vista</label>
                <select {...register('vista')} className="form-select">
                  <option value="">Seleccionar...</option>
                  <option value="ciudad">Ciudad</option>
                  <option value="montaña">Montaña</option>
                  <option value="mar">Mar</option>
                  <option value="parque">Parque</option>
                  <option value="calle">Calle</option>
                  <option value="interior">Interior</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Estado</label>
                <select {...register('estado')} className="form-select">
                  <option value="disponible">Disponible</option>
                  <option value="en_cuotas">En Cuotas</option>
                  <option value="vendido">Vendido</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Estado Documentación</label>
                <select {...register('estadoDocumentacion')} className="form-select">
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="completa">Completa</option>
                  <option value="observaciones">Con Observaciones</option>
                </select>
              </div>
            </div>

            <div className="form-checkbox-wrapper" style={{ marginTop: '1.5rem' }}>
              <input
                {...register('amueblado')}
                type="checkbox"
                id="amueblado"
                className="form-checkbox"
              />
              <label htmlFor="amueblado" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
                Amueblado
              </label>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="form-section">
            <h2 className="form-section-title">
              <MessageSquare size={20} />
              Información Adicional
            </h2>
            <div className="form-field">
              <label className="form-label">Observaciones</label>
              <textarea
                {...register('observaciones')}
                placeholder="Información adicional sobre el lote..."
                className="form-textarea"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-submit"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  Creando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Crear Lote
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoLote;